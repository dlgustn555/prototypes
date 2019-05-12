import { of, interval, from, empty, observable } from 'rxjs'
import { map } from 'rxjs/operators'
import Mustache from 'mustache'
import { todoTemplate } from 'TEMPLATE/sampleTemplate'
import axios from 'axios'

const callObserver = (message, interval$) => {
  const subscription = interval$.subscribe(
    (count = 0) => {
      console.log(`${message} 번째 : ${count}`)
      if (count === 5) {
        empty()
        subscription.unsubscribe()
      }
    }
    , error => console.log(error)
    , complete => console.log('Complete!!: ', complete)
  )
}
const testInterval = () => {
  // 1초마다 상태변경이 일어나는 입력 Observable
  const interval$ = interval(1000)
  
  // 데이터변경 전파
  callObserver('첫', interval$)
  setTimeout(() => {
    callObserver('두', interval$)
  }, 2000)
}

const getTodos = async () => {
  try {
    const oResult = document.querySelector('#result')
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos')
    oResult.innerHTML = ''
    data.forEach(todo => {
      oResult.innerHTML += Mustache.render(todoTemplate, todo)
    })
  } catch (error) {
    console.log(error)
  }
}

const b1Observer = () => {
  const oResult = document.querySelector('#result')
  oResult.innerHTML = ''

  const aNum = [1, 2, 3, -1, 4]
  of(aNum).pipe(
      map(num => (num > 0 ? num : empty()))
    )
    .subscribe({
      next: observable => {
        console.log('CALL')
        observable.subscribe(num => console.log(num))
      },
      error: error => console.log(error),
      complete: () => console.log('COMPLETE!!')
    })
  
  /* 
  from(aNum).pipe(
    map(num => (num > 0 ? num : empty() ))
  ).subscribe({
    next: number => {
      console.log(number)
      oResult.innerHTML += Mustache.render(b1Template, { number })
    },
    error: error => console.log(error),
    complete: () => console.log('Complete!!')
  })
   */
}

export {
  testInterval,
  b1Observer,
  getTodos
}
