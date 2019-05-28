import '../style/carousel.css'
import '../style/carousel.scss'
import Mustache from 'mustache'
import { panels, SUPPORT_TOUCH, THRESHOLD } from '../constant'
import { carouselTempalte } from '../template/carouselTemplate'
import { getSelector, getSelectorAll, translateX } from '../util'
import { fromEvent, merge } from 'rxjs'
import { map, mapTo, scan, first, switchMap, takeUntil, startWith, withLatestFrom, tap, share, distinct } from 'rxjs/operators'


export default () => {
  
  renderCarousel()

  const eView = getSelector('#carousel')
  const eContainer = getSelector('.container', eView)
  const panelCount = getSelectorAll('.panel', eContainer).length
  const oEvents = getEvents()
 
  const start$ = fromEvent(eView, oEvents.start).pipe(getPageX)
  const move$ = fromEvent(eView, oEvents.move).pipe(getPageX)
  const end$ = fromEvent(eView, oEvents.end)

  const resize$ = fromEvent(window, 'resize').pipe(
    startWith(0),
    map(() => eView.clientWidth)
  )

  const drag$ = start$.pipe(
    switchMap(startX => move$.pipe(
      map(moveX => moveX - startX),
      takeUntil(end$)
    )),
    map(distinct => ({ distinct })), 
    share(),
  )
  const drop$ = drag$.pipe(
    switchMap(distinct => end$.pipe(
      first(),
      map(() => distinct)
    )),
    withLatestFrom(resize$, (drag, size) => {
      return { ...drag, size }
    }),
  )

  const carousel$ = merge(drag$, drop$).pipe(
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

  carousel$.subscribe(state => translateX(eContainer, state.to))
}

const renderCarousel = () => {
  document.body.innerHTML = Mustache.render(carouselTempalte, { panels })
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
