import 'CSS/style.css'
import towImage from 'IMAGE/2.jpg'
import * as test from 'JS/image.js'
import { fromEvent } from 'rxjs'

document.addEventListener('DOMContentLoaded', function () {
  const image2 = document.getElementById('image2')
  image2.src = towImage

  test.logHello()

  const oClickBtn = document.querySelector('.clickBtn')
  // 클릭이벤트 Input 에대한 입력을 아래와 같이 받는다!!
  const click$ = fromEvent(oClickBtn, 'click')
  
  // 상태변경에 대한 전파를 한다. 어떻게!?
  click$.subscribe({
    next(event) {
      console.log('next')
      console.log(event)
    },
    error(error) {
      console.log('error')
      console.log(error)
    },
    complete() {
      console.log('complete')
    }
  })
})