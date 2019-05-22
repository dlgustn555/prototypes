import { fromEvent, from, partition, Observable, Subject, interval } from 'rxjs'
import {
  pluck, map, mergeAll, filter, mergeMap, publish,
  debounceTime, distinctUntilKeyChanged , tap, switchMap, catchError,
  retry, finalize,
  share
} from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import Mustache from 'mustache'
import { idTemplate } from 'TEMPLATE'
import 'CSS/style.css'

document.addEventListener('DOMContentLoaded', function () {
  // obserableSearch()
  // testT1()
  // testEample()
  // testSample1()
  // obserableSearchBySubject()
  // test3()
  // test4()
  // test5()
   test6()
  // testSwitch()
})

const testSwitch = () => {
  const test = 'a'
  switch (test) {
    case 'a': { 
      const result = 'A'
      console.log('Do Someting ', result)
      break
    }
    case 'b': {
      const result = 'B'
      console.log('Do Someting ', result)
      break
    }
    default: {
      const result = 'None'
      console.log('Do Someting ', result)
    }
  }
}

const test6 = () => {
  const oPopup = window.open('', '테스트!!!', 'width=100')

  const common$ = new Observable(observer => {
    const stopId = setInterval(() => {
        console.log('common')
        observer.next({
            closed: oPopup.closed,
            // permission: _value(Notification, 'permission'),
          permission: Notification.permission,
        })
    }, 1000)
    return () => clearInterval(stopId)
  }).pipe(
      tap(common => console.log('common$ : ', common)),
      publish()
  )

  const subscription = common$.connect()

  // 새창의 열림/닫힘 상태를 감시
  common$.pipe(
      distinctUntilKeyChanged('closed'),
      filter(({ closed }) => ( closed === true))
  ).subscribe(() => subscription.unsubscribe())

  
  // 크롬 알림 허용 상태를 감시
  common$.pipe(
    distinctUntilKeyChanged('permission'),
    tap(common => console.log(common.permission)),
    filter(({ permission }) => ( permission !== 'default'))
  ).subscribe(async ({ permission }) => {
    console.log('permission$ : ', permission)
    if (permission === 'granted') {
      if (!this.state.accountManager.partnerChromeNotify) {
        await this.updatePartnerNotify('partnerChromeNotify')
      }
      Cookies.set('useWebpush', 'true', { expires: 7300, path: '/' })
      this.setState({ isDeniedChromePush: false })
    }
    subscription.unsubscribe()
  })
}



const test5 = () => {
  const handle = window.open('', '테스트!!!', '')
  
  const popup$ = new Observable(observer => {
    let num = 0
    const iId = setInterval(() => {
      console.log('popup : ', ++num)
      observer.next(handle.closed)
    }, 1000)
    return () => clearInterval(iId)
  }).pipe(
    distinctUntilChanged(),
    filter(closed => closed)
  ).subscribe(() => {
    popup$.unsubscribe()
    numSubscription.unsubscribe()
  })


  const num$ = new Observable(observer => {
    let count = 0
    const clearId = setInterval(() => {
      console.log('Interval!! : ', ++count)
      observer.next(count)
    }, 1000)
    return () => {
      console.log('interavle 제거')
      clearInterval(clearId)
    }
  }).pipe(
    publish()
  )

  const [odd$, even$] = partition(num$, num => num % 2 == 1)
  odd$.subscribe()
  even$.subscribe()

  const numSubscription = num$.connect()
}

const test4 = () => {
  let count = 0
  /* const clearI = setInterval(() => {
    console.log('Interval!! : ', count++)
    if (count > 10) {
      clearInterval(clearI)
    }
  }, 1000)
 */
  const num$ = new Observable(observer => {
    const clearId = setInterval(() => {
      console.log('Interval!! : ', ++count)
      observer.next(count)
    }, 1000)
    return () => {
      console.log('interavle 제거')
      clearInterval(clearId)
    }
  }).pipe(
    publish()
  )

  const [odd$, even$] = partition(num$, num => num % 2 == 1)
  
  odd$.subscribe(odd => {
    if (odd > 10) {
      console.log('ODD ', odd)
      numSubscription.unsubscribe()
    }
  })

  even$.subscribe(even => {
    if (even > 6) {
      console.log('EVEN ', even)
      numSubscription.unsubscribe()
    }
  })

  const numSubscription = num$.connect()
}

function test3() {
  document.querySelector('#search').addEventListener('keyup', function (event) {
    const keyup$ = new Observable(observer => observer.next(event)).pipe(
      pluck('target', 'value'),
      tap(value => console.log('tab$: ', value)),
      share()
    )
    /* keyup$.subscribe(value => console.log('AAA: ', value))
    keyup$.subscribe(value => console.log('BBB: ', value)) */

    // const subject = new Subject()
    const [user$, reset$] = partition(keyup$, value => value.length > 0)
    user$.subscribe(value => console.log('User : ', value.lenght))
    reset$.subscribe(value => console.log('Rest: ', value.length))

//     keyup$.subscribe(subject)
    

/*     const [$user, $reset] = partition(subject, value => {
      console.log('partition: ', value.length)
      return value.length > 0
    })
    $user.subscribe(value => console.log('$user : ', value.length))
    $reset.subscribe(value => console.log('$reset : ', value.length)) */
  })
}

const obserableSearchBySubject = () => {
  const subject = new Subject()
  const keyup$ = fromEvent(document.getElementById('search'), 'keyup').pipe(
    pluck('target', 'value'),
    tap(() => console.log('keyup$ tab!!'))
  )
  
  keyup$.subscribe(subject)
  const [user$, reset$] = partition(subject, value => value.lenght > 0)
  user$.subscribe(value => console.log('user$: ', value))
  reset$.subscribe(value => console.log('reset$: ', value))
}


const obserableSearch = () => {
  const oIdUl = document.querySelector('#suggestLayer')
  const oSearch = document.querySelector('#search')
  const oLoading = document.querySelector('#loading')

  oIdUl.innerHTML = ''

  const keyup$ = fromEvent(oSearch, 'keyup').pipe(
    debounceTime(300),
    pluck('target', 'value'),
    distinctUntilChanged(),
    tap(() => console.log('Key Up'))
  )

  const [user$, reset$] = partition(keyup$, value => value.length > 0)

  user$.pipe(
    tap(() => { oLoading.style.display = 'block' }),
    switchMap(value => ajax(`https://api.github.com/search/users?q=${value}`)),
    filter(response => response.status === 200),
    pluck('response', 'items'),
    tap(() => { oLoading.style.display = 'none' }),
    // retry(2),
    finalize(() => { oLoading.style.display = 'none' })
  ).subscribe(
    items => {
      oIdUl.innerHTML = Mustache.render(idTemplate, { items })
    },
    error => console.log('[Observer catch ERROR]: ', error)
  )

  reset$.pipe(
    filter(value => value.length === 0)
  ).subscribe(() => {
    oIdUl.innerHTML = ''
  })
}


const testSample1 = () => {
  const subject = new Subject()
  subject.subscribe({
    next: value => console.log('observer..: ', value)
  })
  subject.subscribe({
    next: value => console.log('2 observer=> ', value)
  })
  subject.next(20)
}

const testEample = () => {
  const coldWebsocket$ = new Observable(function subscribe(observer) {
    const socket = new WebSocket('ws://someurl')
    const handler = event => observer.next(event)
    socket.addEventListener('message', handler)
    return () => socket.close()
  })

  const socket = new WebSocket('wc://someurl')
  const hotWebsocket$ = new Observable(function subscribe(observer) {
    const handler = event => observer.next(event)
    socket.addEventListener('message', handler)
    return () => socket.removeEventListener('message', handler)
  })
}

const testT1 = () => {
  const oT1 = document.querySelector('.t1')
  fromEvent(oT1, 'click').pipe(
    tap(x => console.log(x))
  ).subscribe(output => console.log('OUT : ' , output))
}