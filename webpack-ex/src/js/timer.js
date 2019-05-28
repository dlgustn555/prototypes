import Mustache from 'mustache'
import { timerTemplate } from '../template/timerTemplate'
import { getSelector } from '../util'
import { DEFAULT_DURATION } from '../constant'
import { of, defer, interval, animationFrameScheduler, concat } from 'rxjs'
import { tap, map, take, takeWhile, startWith } from 'rxjs/operators'

export default () => {
  getSelector('#timer_area').innerHTML = Mustache.render(timerTemplate)
  
  const eSec = getSelector('#sec')
  const ONE_MINUTE = 60
  
  interval(1000).pipe(
    take(60)
  ).subscribe(value => eSec.innerHTML = ONE_MINUTE - value - 1)
}