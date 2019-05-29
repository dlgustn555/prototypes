import '../style/carousel.css'
import '../style/carousel.scss'
import Mustache from 'mustache'
import { panels, DEFAULT_DURATION, SUPPORT_TOUCH, THRESHOLD } from '../constant'
import { carouselTempalte, contentTemplate } from '../template/carouselTemplate'
import { getSelector, translateX } from '../util'
import {
  defer, animationFrameScheduler, concat,
  interval, fromEvent, merge, of
} from 'rxjs'
import {
  take, takeWhile, mergeAll, filter, distinctUntilChanged,
  map, mapTo, scan, first, switchMap, takeUntil,
  startWith, withLatestFrom, tap, share, distinct
} from 'rxjs/operators'

import { ajax } from 'rxjs/ajax'

export default () => {
  getSelector('#carousel_area').innerHTML = Mustache.render(carouselTempalte, { panels })
  const eCarouselContent = getSelector('#carousel_content')
  renderPostContent(eCarouselContent, 1)

  const eView = getSelector('#carousel')
  const eContainer = getSelector('.container', eView)
  const panelCount = panels.length
  const { start$, move$, end$, resize$ } = getObservable(eView)
  const drag$ = getDragObservable(start$, end$, move$)
  const drop$ = getDropObservable(drag$, end$, resize$)
  const panel$ = getPanelObservable(drag$, drop$, panelCount)
  const carousel$ = getCarouselObservable(panel$)

  carousel$.pipe(
    map(({ index }) => index),
    distinctUntilChanged()
  ).subscribe(index => renderPostContent(eCarouselContent, index + 1))

  carousel$.subscribe(({ index, posX }) => {
    translateX(eContainer, posX)
  })
}

const renderPostContent = (eCarouselContent, postNo) => {
  ajax(`https://jsonplaceholder.typicode.com/posts/${postNo}`).pipe(
    map(({ response, status }) => ({ response, status })),
    filter(({ status }) => (status === 200)),
    map(({ response }) => (response)),
  ).subscribe(({ title, body }) => {
    eCarouselContent.innerHTML = Mustache.render(contentTemplate, { postNo, title, body })
  })
}

const getPanelObservable = (drag$, drop$, panelCount) => {
  return merge(drag$, drop$).pipe(
    scan((state, { distinct, size }) => {
      const updateState = {
        from: distinct - (state.index * state.size),
      }
      
      if (!size) {
        updateState.to = updateState.from
        return { ...state, ...updateState }
      }

      let tobeIndex = state.index
      if (Math.abs(distinct) >= THRESHOLD) {
        tobeIndex = distinct < 0
          ? Math.min(tobeIndex + 1, panelCount - 1)
          : Math.max(tobeIndex - 1, 0)
      }
      updateState.index = tobeIndex
      updateState.to = tobeIndex * size * -1
      updateState.size = size

      return { ...state, ...updateState }
    }, {
      from: 0,
      to: 0,
      index: 0,
      size: 0
    })
  )
}

const animation = (from, to, index) => {
  return defer(() => {
    const scheduler = animationFrameScheduler;
    const start = scheduler.now()
    
    const interval$ = interval(0, scheduler).pipe(
      map(() => (scheduler.now() - start) / DEFAULT_DURATION),
      takeWhile(rate => rate <= 1)
    )

    return concat(interval$, of(1)).pipe(
      map(rate => {
        return {
          index,
          posX: from + (to - from ) * rate
        }
      })
    )
  })
}

const getCarouselObservable = (panel$) => {
  return panel$.pipe(
    switchMap(({ from, to, index }) => ( from === to ? of({ index, posX: to }) : animation(from, to, index)))
  )
}

const getDropObservable = (drag$, end$, resize$) => {
  return drag$.pipe(
    switchMap(distinct => end$.pipe(
      first(),
      map(() => distinct)
    )),
    withLatestFrom(resize$, (drag, size) => {
      return { ...drag, size }
    }),
    share()
  )
}
const getDragObservable = (start$, end$, move$) => {
  return start$.pipe(
    switchMap(startX => move$.pipe(
      map(moveX => moveX - startX),
      takeUntil(end$)
    )),
    map(distinct => ({ distinct })), 
    share()
  )
}

const getObservable = (eView) => {
  const oEvents = getEvents()
  const start$ = fromEvent(eView, oEvents.start).pipe(getPageX)
  const move$ = fromEvent(eView, oEvents.move).pipe(getPageX)
  const end$ = fromEvent(eView, oEvents.end)
  const resize$ = fromEvent(window, 'resize').pipe(
    startWith(0),
    map(() => eView.clientWidth)
  )

  return { start$, move$, end$, resize$ }
}

const getPageX = observable$ => {
  return observable$.pipe(
    map(event => SUPPORT_TOUCH ? event.changedTouches[0].pageX : event.pageX)
  )
}

const getEvents = () => {
  return {
    start: SUPPORT_TOUCH ? 'touchstart' : 'mousedown',
    move: SUPPORT_TOUCH ? 'touchmove' : 'mousemove',
    end: SUPPORT_TOUCH ? 'touchend' : 'mouseup'
  }
}
