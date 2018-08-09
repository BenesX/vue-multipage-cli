import Vue from 'vue'
import App from './App.vue'
import inject from 'Plugins/inject'
import '../../style/all.less'

// window.GLOBAL.vbus = new Vue()
inject.install(Vue)
new Vue({
    render: h => h(App)
}).$mount('#app')
