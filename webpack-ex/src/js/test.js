import Mustache from 'mustache'
import { blackText } from '../template'
import '../style/text.css'

export default () => {
  document.body.innerHTML = Mustache.render(blackText)
}