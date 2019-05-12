import { fromEvent }  from 'rxjs'
import { pluck } from 'rxjs/operators'

const runRxjsSmaple = () => {
  clickB1()
  // clickB2()
  clickB2_V2()
}

const clickB2_V2 = () => {
  const oB2 = document.querySelector('.b2')
  const click$ = fromEvent(oB2, 'click').pipe(pluck('currentTarget'))
  
  click$.subscribe(currentTarget => {
    console.log(currentTarget)
  })
}

const clickB2 = () => {
  const oB2 = document.querySelector('.b2')
  
  // B2 버튼 클릭이벤트를 입력 받는다. === Observable
  const click$ = fromEvent(oB2, 'click')
  
  // 상태의 변경을 구독자(observer)에게 전파한다.
  click$.subscribe(observer)

  // 변경 데이터를 전달받아 소비/사용 한다. // Observer <==== subscribe <===== Observable
  const observer = event => {
    console.log('Click B2 Button!!')
    console.log(event)
  }
}

const clickB1 = () => {
  const oB1 = document.querySelector('.b1')
  oB1.addEventListener('click', event => {
    console.log('Click B1 Button!!')
  })
}

export default runRxjsSmaple

