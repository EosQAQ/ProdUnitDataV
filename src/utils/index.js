/**
 * @param {Function} fn 防抖函数
 * @param {Number} delay 延迟时间
 */
export function debounce(fn, delay) {
  var timer;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

// 方法四
export function toThousands(v) {
  var num = (v || 0).toString(), result = '';
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result;
    num = num.slice(0, num.length - 3);
  }
  if (num) { result = num + result; }
  return result;
}

/**
 * 千分位
 * @param {*} number 
 * @returns 
 */
export function formatter(number) {
  const numbers = number.toString().split('').reverse()
  const segs = []

  while (numbers.length) segs.push(numbers.splice(0, 3).join(''))

  return segs.join(',').split('').reverse().join('')
}

/**
 * @param {date} time 需要转换的时间
 * @param {String} fmt 需要转换的格式 如 yyyy-MM-dd、yyyy-MM-dd HH:mm:ss
 */
export function formatTime(time, fmt) {
  if (!time) return '';
  else {
    const date = new Date(time);
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds(),
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      );
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        );
      }
    }
    return fmt;
  }
}

/**
 * 获取时间间隔
 * @param {*} step 
 * @returns 
 */
export function timeSlot(step) {   //  step = 间隔的分钟
  var date = new Date()
  date.setHours(0)    // 时分秒设置从零点开始
  date.setSeconds(0)
  date.setUTCMinutes(0)
  // console.log(date.getHours())
  // console.log(date.getSeconds())
  // console.log(new Date(date.getTime()))

  var arr = [], timeArr = [];
  var slotNum = 24 * 60 / step   // 算出多少个间隔
  for (var f = 0; f < slotNum; f++) {   //  stepM * f = 24H*60M
    // arr.push(new Date(Number(date.getTime()) + Number(step*60*1000*f)))   //  标准时间数组
    var time = new Date(Number(date.getTime()) + Number(step * 60 * 1000 * f))  // 获取：零点的时间 + 每次递增的时间
    var hour = '', sec = '';
    time.getHours() < 10 ? hour = '0' + time.getHours() : hour = time.getHours()  // 获取小时
    time.getMinutes() < 10 ? sec = '0' + time.getMinutes() : sec = time.getMinutes()   // 获取分钟
    timeArr.push(hour + ':' + sec)
  }
  return timeArr
}

/**
 * 获取当月天数
 * @returns 
 */
export function mGetDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var d = new Date(year, month, 0);
  var a = d.getDate();
  var arr = [];
  for (var i = 1; i <= a; i++) {
    arr.push(i + "");
  }
  return arr
}

/**
 * 
 * @param {*} _t 
 * @param {*} type 
 * @returns 
 */
export function GetZJRL(_t, type) {

  const czinfo = _t.$czinfo
  let zjrl = 0;
  czinfo.forEach(element => {

    if (element.type == type) {
      if (type == "hd") {
        element.jzs.forEach((v, i) => {
          zjrl += Number(v.zjrl)
        })
      } else {
        zjrl += Number(element.zjrl)
      }
    }
  });
  //console.log(zjrl);
  return zjrl;
}