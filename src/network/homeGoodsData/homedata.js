import {firstPopPage} from './firstPopPage.js'
import {secondPopPage} from './secondPopPage.js'
import {thirdPopPage} from './thirdPopPage.js'

let popData = {
  1: firstPopPage,
  2: secondPopPage,
  3: thirdPopPage
}

let newData = {
  1: thirdPopPage,
  2: firstPopPage,
  3: secondPopPage
}

let sellData = {
  1: secondPopPage,
  2: thirdPopPage,
  3: firstPopPage
}

export function getHomedata(type, page) {
  if (type === 'pop') {
    return popData[parseInt(page)];
  } else
  if (type === 'new') {
    return newData[parseInt(page)];
  } else
  if (type === 'sell') {
    return sellData[parseInt(page)];
  }
}
