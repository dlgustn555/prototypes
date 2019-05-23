import Mustache from 'mustache'
import { carouselTempalte } from '../template/carouselTemplate'
import '../style/carousel.css'

export default () => {
  document.body.innerHTML = Mustache.render(carouselTempalte)
  
}