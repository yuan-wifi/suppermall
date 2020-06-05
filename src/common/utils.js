export function debounce(func, delay) {
  let timer = null;
  return function(...args) {
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay);
  }
}

export function formatDate(date, fmt) {
  let o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

export function getHourMinuteSecond(num = 0) {
  let count = parseInt(num);
  let [hour, minute, second] = [0, 0, 0];
  if(count) {
    hour = parseInt(count  / 3600);
    minute = parseInt(count % 3600 / 60);
    second = count - hour * 3600 - minute * 60;
  }
  
  return {
    hour: hour > 10 ? hour + '' : '0' + hour,
    minute: minute > 10 ? minute + '' : '0' + minute,
    second: second > 10 ? second + '' : '0' + second
  }
}
