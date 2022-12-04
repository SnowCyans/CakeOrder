<template>
	<view class="top">
		<!-- 导航栏组件 -->
		<nav-custom></nav-custom>
		<view class="flex flex-wrap  justify-between">
			<!-- 商品组件 -->
			<goodsItem v-for="(item,i) in goodsList" :key="i" :list="item"></goodsItem>
		</view>
		
		<!-- 底部选项卡 -->
	<tabBar></tabBar>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				goodsList:[],
				pages:0,
				bcid :1,
				// 打卡或关闭弹出层
				isShow:false,
				classfyList:[],
				
			};
		},
		async onLoad(){
			this.loadDate()
			const res = await this.$get('/1.1/classes/classify')
			console.log(res);
			this.classfyList = res.results
		},
		
		// 上拉触底事件
		onReachBottom(){
			this.loadDate()
		},
		// 下拉刷新事件
		onPullDownRefresh(){
			this.pages = 0
			this.goodsList = []
			this.loadDate()
		},
		methods:{
			...mapMutations('condition',['changeCondition']),
			
			// 分页
			async loadDate(){
				let skip = this.pages * 8
				let cond = JSON.stringify(this.$store.state.condition.cond)
				let url = `/1.1/classes/goodsList?where=${cond}&limit=8&skip=${skip}`
				const res = await this.$get(url)
				// 把res的results结构出来
				console.log(res);
				let {results} = res
				// 判断results是否有数据 如果有就改变数据列表
				if(results.length){
					this.pages++
					
						// 将两个数组的数据合并然后赋给goodsList数组
						this.goodsList = [
							...this.goodsList,
							...res.results
						]
					
					// 数据加载完关闭下拉刷新
					uni.stopPullDownRefresh()
				} else{
					uni.showToast({
						title:'没有咯！'
					})
				}
			},
			
		}
	}
</script>

<style lang="scss">
	.top{
		margin-top: 100upx;
	}
</style>
