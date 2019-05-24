import '../style/carousel.css'
import Mustache from 'mustache'
import { carouselTempalte } from '../template/carouselTemplate'
import { getSelector, getSelectorAll } from '../util'
import { fromEvent, merge } from 'rxjs'
import { map, mapTo, scan, first, switchMap, takeUntil, startWith, withLatestFrom, tap, share, distinct } from 'rxjs/operators'

export default () => {
  document.body.innerHTML = Mustache.render(carouselTempalte)
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
      updateState.to = !size ?  updateState.from : distinct

      return { ...state, ...updateState }
    }, {
      from: 0,
      to: 0,
      index: 0,
      size: 0
    })
  )


  carousel$.subscribe(v => console.log(v))
}

const SUPPORT_TOUCH = 'ontouchstart' in window
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
