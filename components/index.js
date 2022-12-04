import navCustom from './nav-custom'
import homeTitle from './home-title'
import goodsItem from './goods-item'
import tabBar from './tabbar'
import navBack from './nav-back.vue'

export default{
	install(Vue){
		Vue.component('navCustom',navCustom)
		Vue.component('homeTitle',homeTitle)
		Vue.component('goodsItem',goodsItem)
		Vue.component('tabBar',tabBar)
		Vue.component('navBack',navBack)
	}
}
