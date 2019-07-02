import { IPanel } from '../type/carousel'
import image1 from '../image/1.jpg'
import image2 from '../image/2.jpg'
import image3 from '../image/3.jpg'
import image4 from '../image/5.jpg'

export const panels: IPanel[] = [
  {
    color: 'lightgreen',
    image: image1
  },
  {
    color: 'lightpink',
    image: image2
  },
  {
    color: 'royalblue',
    image: image3
  },
  {
    color: 'darkred',
    image: image4
  }
]

export const SUPPORT_TOUCH = 'ontouchstart' in window
export const THRESHOLD = 30
export const DEFAULT_DURATION = 300
export const EVENT_TTYPE = {
  start: SUPPORT_TOUCH ? 'touchstart' : 'mousedown',
  move: SUPPORT_TOUCH ? 'touchmove' : 'mousemove',
  end: SUPPORT_TOUCH ? 'touchend' : 'mouseup'
}