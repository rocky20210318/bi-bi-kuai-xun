// 日期格式化工具
export function format (date, fmt) { // author: meizz
    // console.log(date)
    var o = {
        'Y+': date.getFullYear(), // 月份
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'H+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S+': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((Array(RegExp.$1.length + 1).join('0') + o[k]).substr(('' + o[k]).length)))
        }
    }
    return fmt
}

// 判断是否为JSON格式
export function isJSON (str) {
    try {
        const obj = JSON.parse(str)
        return !!obj && typeof obj === 'object'
    } catch (e) {}
    return false
}

// 防抖 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
export function debounce (fn, delay, scope) {
    let timer = null
    // 返回函数对debounce作用域形成闭包
    return function () {
        // setTimeout()中用到函数环境总是window,故需要当前环境的副本；
        const context = scope || this
        const args = arguments
        // 如果事件被触发，清除timer并重新开始计时
        clearTimeout(timer)
        timer = setTimeout(function () {
            fn.apply(context, args)
        }, delay)
    }
}

// 节流 每隔一段时间，只执行一次函数。
export function throttle (fn, threshold, scope) {
    let timer
    return function () {
        const context = scope || this
        const args = arguments
        if (!timer) {
            timer = setTimeout(function () {
                fn.apply(context, args)
                timer = null
            }, threshold)
        }
    }
}
// 特殊字符及sql判断
export function stringTset (test) {
    const regEn = /[`~!@#$%^&*()_+<>?:"{},/'[\]]/im
    const regCn = /[！#￥（——）：；“”‘、，|《。》？、【】[\]]/im
    const regSql = /select|update|delete|exec|count|’|"|=||>|<|%/i
    return regEn.test(test) || regCn.test(test) || regSql.test(test)
}

// 判断是否是pc端
export function isPC () {
    const userAgentInfo = navigator.userAgent
    const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
    let flag = true
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false
            break
        }
    }
    return flag
}

/**
     * 为数字加上单位：万或亿
     *
     * 例如：
     *      1000.01 => 1000.01
     *      10000 => 1万
     *      99000 => 9.9万
     *      566000 => 56.6万
     *      5660000 => 566万
     *      44440000 => 4444万
     *      11111000 => 1111.1万
     *      444400000 => 4.44亿
     *      40000000,00000000,00000000 => 4000万亿亿
     *      4,00000000,00000000,00000000 => 4亿亿亿
     *
     * @param {number} number 输入数字.
     * @param {number} decimalDigit 小数点后最多位数，默认为2
     * @return {string} 加上单位后的数字
     */
export function addChineseUnit () {
    var addWan = function (integer, number, mutiple, decimalDigit) {
        var digit = getDigit(integer)
        if (digit > 3) {
            var remainder = digit % 8
            // ‘十万’、‘百万’、‘千万’显示为‘万’
            if (remainder >= 5) {
                remainder = 4
            }
            return Math.round(number / Math.pow(10, remainder + mutiple - decimalDigit)) / Math.pow(10, decimalDigit) + '万'
        } else {
            return Math.round(number / Math.pow(10, mutiple - decimalDigit)) / Math.pow(10, decimalDigit)
        }
    }

    const getDigit = function (num) {
        const Num = String(num).split('.')[0]
        return Num.length - 1
    }

    return function (number, decimalDigit) {
        decimalDigit = decimalDigit == null ? 2 : decimalDigit
        var integer = Math.floor(number)
        var digit = getDigit(integer)
        // ['个', '十', '百', '千', '万', '十万', '百万', '千万']
        var unit = []
        if (digit > 3) {
            var multiple = Math.floor(digit / 8)
            if (multiple >= 1) {
                var tmp = Math.round(integer / Math.pow(10, 8 * multiple))
                unit.push(addWan(tmp, number, 8 * multiple, decimalDigit))
                for (var i = 0; i < multiple; i++) {
                    unit.push('亿')
                }
                return unit.join('')
            } else {
                return addWan(integer, number, 0, decimalDigit)
            }
        } else {
            return number
        }
    }
}
