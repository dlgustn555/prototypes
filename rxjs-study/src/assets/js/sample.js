import { fromEvent } from 'rxjs'
import * as testCode from 'JS/sampleObservers'

const runSampleCode = () => {
  clickB1()
  clickB2()
  clickB3()
}

const clickB3 = () => {
  const oB3 = document.querySelector('.b3')
  fromEvent(oB3, 'click').subscribe(testCode.testInterval)
}

const clickB2 = () => {
  const oB2 = document.querySelector('.b2')
  fromEvent(oB2, 'click').subscribe(testCode.getTodos)
}

const clickB1 = () => {
  const oB1 = document.querySelector('.b1')
  const b1$ = fromEvent(oB1, 'click')
  b1$.subscribe(testCode.b1Observer)
}

export default runSampleCode
