const getSelector = (selector, eTarget = null) => {
  eTarget = eTarget || document
  return eTarget.querySelector(selector)
}

const getSelectorAll = (selector, eTarget = null) => {
  return eTarget.querySelectorAll(selector)
}

export {
  getSelector,
  getSelectorAll
}