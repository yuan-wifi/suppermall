import { p_1mgk2ku } from './p_1mgk2ku.js'
import { p_1m7rtj4 } from './p_1m7rtj4.js'
import { p_1me7hv4 } from './p_1me7hv4.js'
import { pd1 } from './productDetail1.js'

let detailobj = {
  '1mgk2ku': p_1mgk2ku,
  '1m7rtj4': p_1m7rtj4,
  '1me7hv4': p_1me7hv4
}

export function getDetailData(iid) {
  return detailobj[iid] ? detailobj[iid].data : pd1.data;
}
