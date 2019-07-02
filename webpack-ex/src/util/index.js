const getSelector = (selector, eTarget = null) => {
  eTarget = eTarget || document
  return eTarget.querySelector(selector)
}

const getSelectorAll = (selector, eTarget = null) => {
  eTarget = eTarget || document
  return eTarget.querySelectorAll(selector)
}

const translateX = (eTarget, posX) => {
  eTarget.style.transform = `translate3d(${posX}px, 0, 0)`
}

export {
  getSelector,
  getSelectorAll,
  translateX
}