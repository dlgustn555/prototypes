
import Mustache from 'mustache'
import { getSelector } from '../util'
import { carouselTemplate } from '../template/carouselTemplate'
import { panels } from '../constant'
import '../style/carousel.css'

export default () => {
  getSelector('#carousel_area').innerHTML = Mustache.render(carouselTemplate, { panels })
}