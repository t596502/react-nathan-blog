// 截流
export const debounce = (fn, delay, scope) => {
    let timer = null;
    let count = 1;
    return function () {
        let context = scope || this,
            args = arguments;
        clearTimeout(timer);
        console.log(Date.now(), ", 触发第", count++, "次滚动事件！");
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
