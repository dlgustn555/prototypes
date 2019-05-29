
import Mustache from 'mustache'
import { getSelector } from '../util'
import { carouselTemplate, contentTemplate } from '../template/carouselTemplate'
import { panels } from '../constant'
import '../style/carousel.css'
import '../style/carousel.scss'
import { ajax } from 'rxjs/ajax'
import { map, filter } from 'rxjs/operators'

export default () => {
  getSelector('#carousel_area').innerHTML = Mustache.render(carouselTemplate, { panels })
  const eCarouselContent = getSelector('#carousel_content')

  renderPostContent(eCarouselContent, 1)
}

const renderPostContent = (eCarouselContent: HTMLElement, postNo: number): void => {
  ajax(`https://jsonplaceholder.typicode.com/posts/${postNo}`).pipe(
    map(({ response, status }) => ({ response, status })),
    filter(({ status }) => (status === 200)),
    map(({ response }) => (response))
  ).subscribe(({ title, body }) => {
    eCarouselContent.innerHTML = Mustache.render(contentTemplate, { postNo, title, body })
  })
}