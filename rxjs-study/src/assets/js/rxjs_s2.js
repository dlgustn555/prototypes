import { Observable, fromEvent, interval } from 'rxjs'
import { take } from 'rxjs/operators'
import Mustache from 'mustache'
import { countTemplate } from 'TEMPLATE/samples'

const runStep2 = () => {
  const oResult = document.querySelector('#result')
  test2(oResult)
  createObservable(oResult)
}

const test2 = (oResult) => {
  const oB4 = document.querySelector('.b4')
  fromEvent(oB4, 'click').subscribe(() => {
    oResult.innerHTML = ''
    interval(1000).pipe(
      take(6)
    ).subscribe(count => {
      oResult.innerHTML += Mustache.render(countTemplate, { count })
    }, () => {}, () => console.log('Complete!!'))
  })
}

const createObservable = (oResult) => {
  const iterval$ = new Observable(function subscribe(observer) {
    let count = 0
    const id = setInterval(() => {
      observer.next(count++)
    }, 1000)

    return function() {
      console.log('Interval 제거')
      clearInterval(id)
    }
  })

  const oB3 = document.querySelector('.b3')
  fromEvent(oB3, 'click')
    .subscribe(() => {
      oResult.innerHTML = ''
      const subscription = iterval$.subscribe(count => {
        oResult.innerHTML += Mustache.render(countTemplate, { count })
        if (count === 5) {
          subscription.unsubscribe()
        }
      })
    })
}

export default runStep2
