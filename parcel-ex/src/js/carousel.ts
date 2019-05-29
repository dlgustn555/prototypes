
import Mustache from 'mustache'
import { getSelector } from '../util'
import { carouselTemplate } from '../template/carouselTemplate'
import { panels } from '../constant'
import '../style/carousel.css'
import '../style/carousel.scss'

export default () => {
  getSelector('#carousel_area').innerHTML = Mustache.render(carouselTemplate, { panels })
}