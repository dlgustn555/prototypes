import { fromEvent, from } from 'rxjs'
import { pluck, filter } from 'rxjs/operators'
import users from 'CONSTANT/users'
import userTemplate from 'TEMPLATE/users'
import Mustache from 'mustache'

const runRxJSCode = () => {
  const oResult = document.querySelector('#result')
  const f2Subscription = clickF2(oResult)
  donotF2Click(f2Subscription, oResult)
  clickF1()
  click1()
  click2()
}

const donotF2Click = (f2Subscription, oResult) => {
  const donotF2 = document.querySelector('.donotF2')
  fromEvent(donotF2, 'click').subscribe(() => {
    oResult.innerHTML = ''
    f2Subscription.unsubscription()
  })
}

const clickF2 = (oResult) => {
  const oF2 = document.querySelector('.f2')

  return fromEvent(oF2, 'click').subscribe(() => {
    oResult.innerHTML = ''
    from(users)
      .pipe(
        filter(({ nationality }) => nationality === '촉')
      )
      .subscribe(user => {
        oResult.innerHTML += Mustache.render(userTemplate, user)
      })
  })
}

const clickF1 = () => {
  const oF1 = document.querySelector('.f1')
  oF1.addEventListener('click', () => {
    const aF1 = users.filter(user => user.nationality === '촉')
    console.log(aF1.length)
  })
}

const click1 = () => {
  const oB1 = document.querySelector('.b1')

  // 비동기 마우스클릭 이벤트 입력을 받는다. ==> Observable
  const b1$ = fromEvent(oB1, 'click')

  // 변경된 데이터를 가지고 비즈니스로직 처리를 한다.
  const b1Observer = event => console.log(event)

  // 비동기 데이터의 상태변경을 구독자or감시자 에게 전파한다. === > Observer
  b1$.subscribe(b1Observer)
}

const click2 = () => {
  const oB2 = document.querySelector('.b2')
  fromEvent(oB2, 'click')
    .pipe(pluck('target', 'tagName'))
    .subscribe(tagName => console.log(tagName))
}

export default runRxJSCode
