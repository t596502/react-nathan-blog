// 截流
export const debounce = (fn, delay, scope) => {
  let timer = null;
  return function () {
    let context = scope || this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}
// 点击防抖
export const throttle = (func, delay) => {
  let prev = Date.now();
  return function () {
    const context = this;
    const args = arguments;
    const now = Date.now();
    if (now - prev >= delay) {
      func.apply(context, args);
      prev = Date.now();
    }
  }
}
/**
 * 
 * @param {key} name 
 */
export const setCookie = (key, val, time) => {//设置cookie方法
  var date = new Date(); //获取当前时间
  var expires = time;  //将date设置为分钟
  // date.setTime(date.getTime()+expiresDays*24*3600*1000); //格式化为cookie识别的时间
  date.setTime(date.getTime() + expires * 60 * 1000); //格式化为cookie识别的时间
  document.cookie = key + "=" + val + ";expires=" + date.toGMTString()
}
/**
 * 获取cookie
 */
export const getCookie = (name) => {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}
/**
 * 移除cookie
 */
export const removeCookie = (name) => {
  setCookie(name, "", -1);
}

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
};

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
};