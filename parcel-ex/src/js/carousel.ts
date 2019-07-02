
import Mustache from 'mustache'
import { getSelector, translateX } from '../util'
import { carouselTemplate, contentTemplate } from '../template/carouselTemplate'
import { panels, EVENT_TTYPE, SUPPORT_TOUCH, THRESHOLD, DEFAULT_DURATION } from '../constant'
import '../style/carousel.css'
import '../style/carousel.scss'
import { IUpdateState } from '../type/carousel'
import { ajax } from 'rxjs/ajax'
import {
  fromEvent, merge, defer, interval,
  of, concat, animationFrameScheduler
} from 'rxjs'
import {
  map, filter, startWith, switchMap,
  takeUntil, share, first, withLatestFrom,
  scan, takeWhile, distinctUntilChanged
} from 'rxjs/operators'

export default () => {
  getSelector('#carousel_area').innerHTML = Mustache.render(carouselTemplate, { panels })
  const eCarouselContent = getSelector('#carousel_content')

  renderPostContent(eCarouselContent, 1)

  const eView = getSelector('#carousel')
  const eContainer = getSelector('.container', eView)
  const PANEL_COUNT = panels.length

  const { start$, move$, end$, resize$ } = getObservable(eView)
  const drag$ = getDragObservable(start$, end$, move$)
  const drop$ = getDropObservable(drag$, end$, resize$)
  const panel$ = getPanelObservable(drag$, drop$, PANEL_COUNT)
  const carousel$ = getCarouselObservable(panel$)

  carousel$.pipe(
    map(({ index }) => index),
    distinctUntilChanged()
  ).subscribe(index => renderPostContent(eCarouselContent, index + 1))

  carousel$.subscribe(({ posX }) => {
    translateX(eContainer, posX)
  })
}

const getPanelObservable = (drag$, drop$, PANEL_COUNT) => {
  return merge(drag$, drop$).pipe(
    scan((state, { distinct, size }) => {
      const updateState: IUpdateState = {
        from: distinct - (state.index * state.size)
      }
      
      if (!size) {
        updateState.to = updateState.from
        return { ...state, ...updateState }
      }

      let tobeIndex = state.index
      if (Math.abs(distinct) >= THRESHOLD) {
        tobeIndex = distinct < 0
          ? Math.min(tobeIndex + 1, PANEL_COUNT - 1)
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

const getCarouselObservable = (panel$) => {
  return panel$.pipe(
    switchMap(({ from, to, index }) => ( from === to ? of({ index, posX: to }) : animation(from, to, index)))
  )
}

const animation = (from, to, index) => {
  return defer(() => {
    const scheduler = animationFrameScheduler
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
    switchMap((startX: number) => move$.pipe(
      map((moveX: number) => moveX - startX),
      takeUntil(end$)
    )),
    map(distinct => ({ distinct })), 
    share()
  )
}

const getObservable = (eView: HTMLElement) => {
  const start$ = fromEvent(eView, EVENT_TTYPE.start).pipe(getPageX)
  const move$ = fromEvent(eView, EVENT_TTYPE.move).pipe(getPageX)
  const end$ = fromEvent(eView, EVENT_TTYPE.end)
  const resize$ = fromEvent(window, 'resize').pipe(
    startWith(0),
    map((): number => eView.clientWidth)
  )

  return { start$, move$, end$, resize$ }
}

const getPageX = observable$ => {
  return observable$.pipe(
    map((event: any): number => SUPPORT_TOUCH ? event.changedTouches[0].pageX : event.pageX)
  )
}

const renderPostContent = (eCarouselContent: HTMLElement, postNo: number): void => {
  ajax(`https://jsonplaceholder.typicode.com/posts/${postNo}`).pipe(
    map(({ response, status }) => ({ response, status })),
    filter(({ status }) => (status === 200)),
    map(({ response }) => (response))
  ).subscribe(({ title, body }) => {
    eCarouselContent.innerHTML = Mustache.render(contentTemplate, { postNo, title, body })
  })
}
