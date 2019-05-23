import '../style/carousel.css'
import Mustache from 'mustache'
import { carouselTempalte } from '../template/carouselTemplate'
import { getSelector, getSelectorAll } from '../util'
import { fromEvent } from 'rxjs'
import { map, first, switchMap, takeUntil, startWith, withLatestFrom } from 'rxjs/operators'

export default () => {
  document.body.innerHTML = Mustache.render(carouselTempalte)
  const eView = getSelector('#carousel')
  const eContainer = getSelector('.container', eView)
  const panelCount = getSelectorAll('.panel', eContainer).length
  const oEvents = getEvents()
 
  const start$ = fromEvent(eView, oEvents.start).pipe(getPageX)
  const move$ = fromEvent(eView, oEvents.move).pipe(getPageX)
  const end$ = fromEvent(eView, oEvents.end)

  const drag$ = start$.pipe(
    switchMap(startX => move$.pipe(
      map(moveX => moveX - startX),
      takeUntil(end$)
    ))
  )
  const drop$ = drag$.pipe(
    switchMap(() => end$.pipe(first())),
    withLatestFrom(resize$)
  )

  const resize$ = fromEvent(window, 'resize').pipe(
    startWith(0),
    map(() => eView.clientWidth)
  )

  // resize$.subscribe(width => console.log('RESIZE: ', width))

  drop$.subscribe(() => console.log('DROP!!'))
  // drag$.subscribe(distinctX => console.log('Drag: ', distinctX))
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
