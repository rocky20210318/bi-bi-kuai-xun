import './styles/reset.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueGlobal from './vue-global'
import 'lib-flexible'
import { api } from './utils/api'
import { isPC } from './utils/index'
import { Row, Col, Icon, NavBar, Image, Lazyload } from 'vant'
import AV from 'leancloud-storage'

if (isPC && document.documentElement.clientWidth > 450) {
    document.getElementById('app').style.display = 'none'
    var ifrm = document.createElement('iframe')
    ifrm.setAttribute('src', window.location.href)
    ifrm.style.width = '100%'
    ifrm.style.height = '100%'
    ifrm.style.border = '0'
    document.body.appendChild(ifrm)
} else {
    AV.init({
        appId: 'TAROl3rPLevygkbbF8rnPgPB-MdYXbMMI',
        appKey: 'o4cis1ee0kxYJNjSiWP5TuY3'
        // serverURLs: 'https://aliasapi.luckms.com'
    })

    Vue.config.productionTip = false
    VueGlobal.init(Vue)

    // 封装的axios添加到原型链上
    Vue.prototype.$api = api

    // ui插件
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Icon)
    Vue.use(NavBar)
    Vue.use(Image)
    Vue.use(Lazyload)

    window.vueApp = new Vue({
        router,
        render: h => h(App)
    }).$mount('#app')
}
