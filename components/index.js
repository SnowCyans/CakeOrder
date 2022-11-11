import textComp from './text-comp'
import navCustom from './nav-custom'
import homeTitle from './home-title'
import goodsItem from './goods-item'

export default{
	install(Vue){
		Vue.component('textComp',textComp)
		Vue.component('navCustom',navCustom)
		Vue.component('homeTitle',homeTitle)
		Vue.component('goodsItem',goodsItem)
	}
}
