import Mustache from 'mustache'
import { blackText } from '../template'
import '../style/text.css'
import '../style/greenText.css'
import '../style/test.scss'

export default () => {
  document.body.innerHTML = Mustache.render(blackText)
}