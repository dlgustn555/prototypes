import Mustache from 'mustache'
import { blackText } from '../template'
import '../style/text.css'
import '../style/greenText.css'

export default () => {
  document.body.innerHTML = Mustache.render(blackText)
}