import { fromEvent } from 'rxjs'
import { pluck, map, mergeAll, filter } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import Mustache from 'mustache'
import { userIdTemplate } from 'TEMPLATE/users'

const runExample2Code = () => {
  const oIdUl = document.querySelector('#_idUl')
  searchButton(oIdUl)
}

const searchButton = (oIdUl) => {
  const oSearch = document.querySelector('#search')
  oIdUl.innerHTML = ''

  fromEvent(oSearch, 'keyup').pipe(
    pluck('target', 'value'),
    map(value => ajax(`https://api.github.com/search/users?q=${value}`)),
    mergeAll(),
    filter(response => response.status === 200),
    pluck('response', 'items')
  ).subscribe(items => {
    oIdUl.innerHTML = Mustache.render(userIdTemplate, { items })
  })
}

export default runExample2Code
