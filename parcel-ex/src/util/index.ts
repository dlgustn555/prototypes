

export const getSelector = (selector: string, eTarget: null | HTMLElement | Document = null): HTMLElement => {
  eTarget = eTarget || document
  return eTarget.querySelector(selector)
}

export const getSelectorAll = (selector: string, eTarget: null | HTMLElement | Document = null): NodeListOf<HTMLElement> => {
  eTarget = eTarget || document
  return eTarget.querySelectorAll(selector)
}
