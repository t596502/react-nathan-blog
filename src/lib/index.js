
import hljs from 'highlight.js'
import marked from 'marked'
import xss from 'xss'

export const translateMarkdown = plainText => {
    return marked(xss(plainText), {
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: true,
        smartLists: true,
        smartypants: true,
        highlight: function(code) {
            return hljs.highlightAuto(code).value
        }
    })
}

export const decodeQuery = (url = '') => {
    let params = {}

    const paramsStr = url.replace(/\.*\?/, '') // a=1&b=2&c=&d=xxx&e
    paramsStr.split('&').forEach(v => {
        const d = v.split('=')
        if (d[1] && d[0]) params[d[0]] = d[1]
    });
    return params
}

// 取数组中的随机数
export const random = arr => Math.floor(Math.random() * arr.length)

/**
 * 对数组进行分组
 * @param {Array} arr - 分组对象
 * @param {Function} f
 * @returns 数组分组后的新数组
 */
export const groupBy = (arr, f) => {
    const groups = {}
    arr.forEach(item => {
        const group = JSON.stringify(f(item))
        groups[group] = groups[group] || []
        groups[group].push(item)
    })
    return Object.keys(groups).map(group => groups[group])
}
