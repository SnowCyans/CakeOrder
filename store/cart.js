import Vue from 'vue'
export default {
	namespaced:true,
	state:() => ({
		cartList: [{
				id: "10090",
				twoId: 10089,
				name: "拿破仑莓恋",
				french: "Napoléon aux fraises",
				price: "218.00",
				img: "https://static.mcake.com/new_goods/napolunmeilian/N0201/list/1.jpg",
				list:[
					{id: 10090, sku: "n0201", ahead: "提前5小时预定", edible: "2-3人食", spec: "1斤", price: "218.00"},
					{id: 10091, sku: "n0202", ahead: "提前5小时预定", edible: "4-7人食", spec: "2斤", price: "318.00"},
					{id: 10092, sku: "n0203", ahead: "提前5小时预定", edible: "8-12人食", spec: "3斤", price: "458.00"},
					{id: 10093, sku: "n0205", ahead: "提前5小时预定", edible: "12-20人食", spec: "5斤", price: "750.00"}
				],
				ischeck:false,
				num:1, //商品数量
				idx:0 //标志选中的子商品信息
				
			},
			{
				id: "11547",
				twoId: 11540,
				name: "白色恋人",
				french: "Blanc Amant",
				price: "218.00",
				tid: 11,
				ischeck:true,
				num:2, //商品数量
				idx:0,  //标志选中的子商品信息
				tname: "限定",
				list:[
					{id: 10090, sku: "n0201", ahead: "提前5小时预定", edible: "2-3人食", spec: "1斤", price: "218.00"},
					{id: 10091, sku: "n0202", ahead: "提前5小时预定", edible: "4-7人食", spec: "2斤", price: "318.00"},
					{id: 10092, sku: "n0203", ahead: "提前5小时预定", edible: "8-12人食", spec: "3斤", price: "458.00"},
				],
				img: "https://static.mcake.com/new_goods/napolunmeilian/N0201/list/1.jpg"
			}
		]
	}),
	mutations:{
		cartCheck(state,idx){
			state.cartList[idx].ischeck = !state.cartList[idx].ischeck
		},
		// 全选和取消全选
		cartAllCheck(state,flag){
			state.cartList.forEach((item) => item.ischeck = !flag)
		},
		// 子商品下拉选中处理
		cartDropList(state,{cartIdx,dropIdx,num}){
			state.cartList[cartIdx].idx = dropIdx
			state.cartList[cartIdx].num = num
		},
		
		// 添加到购物车
		cartAdd(state,goodObj){
			// 新增商品(购物车已有该商品处理)
			console.log(goodObj);
			let {cartList} = state
			let len = cartList.length
			for(let i =0; i < len;i++){
				let {id,idx} = goodObj
				if(cartList[i].id === id && cartList[i].idx === idx) {
					state.cartList[i].num++
					return
				}
			}
			
			// 添加非响应式数据
			// goodObj.ischeck = false
			// goodObj.num = 1
			// goodObj.idx = 0
			//添加非响应式数据
			Vue.set(goodObj,'ischeck',false)
			Vue.set(goodObj,'num',1)
			// 商品详情传了个idx 所以这里不用再作添加了
			// Vue.set(goodObj,'idx',0)
			state.cartList.push(goodObj)
			
		}
	},
	getters:{
		allInfo(state){
			return state.cartList.every((item) => { return item.ischeck})
		},
		// 总价格
		allPrice(state){
			let allPrices = 0
			state.cartList.forEach((item) => {
				 if(item.ischeck){
					 allPrices += item.list[item.idx].price * item.num
				 }
			})
			return allPrices
			// return state.cartList.reduce((total,item) => total += item.list[item.idx].price * item.num ,0)
		}
	}
}