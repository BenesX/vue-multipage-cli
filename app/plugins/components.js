/**
 * 挂载全局组件
 */
import VueLazyComp from '@/components/vue-lazy-comp'

const componentInstall = (Vue, options) => {
    Vue.component(VueLazyComp.name, VueLazyComp)
}

export { componentInstall }
