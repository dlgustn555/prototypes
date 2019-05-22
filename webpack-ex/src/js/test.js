import Mustache from 'mustache'
import { blackText } from '../template'

export default () => {
  document.body.innerHTML = Mustache.render(blackText)
}