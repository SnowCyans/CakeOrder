<template>
	<view>
		<!-- 导航栏组件 -->
		<nav-custom></nav-custom>
		<view class="flex flex-wrap  justify-between">
			<goodsItem v-for="item in goodsList" :key="item.objectId" :list="item"></goodsItem>
		</view>
		
		<view class="flexfi flex bg-white align-center justify-center">
			<view v-for="(item,i) in tabArr" :key="i" @click="handleLog(item,i)" class="flex align-center padding-xs fs-30">
				{{item.name}}
				<u-line v-if="i < tabArr.length - 1" direction="col" length="15" margin="30upx"></u-line>
			</view>
		</view>
		
	
			<!-- 分类弹出层 -->
			<u-popup :show="isShow" mode="left"  @close="close">
						<view class="pop-cont">
							<view class="padding"  v-for="(item,i) in classfyList" :key="item.objectId">
								
								<view v-if="i === 0">
									<text  class="iconfont youhuijuan text-bold">{{item.bname}}</text>
									<view class="padding-tb-sm  margin-top u-border-top" @click="liClick">
										<!-- <text class="text-bold">口味筛选</text> -->
										<u-cell  title="口味筛选" :isLink="true" :arrow-direction="isLiUpDown"></u-cell>
									</view>
									<u-cell-group v-if="liShow">
											<u-cell v-for="(item2,i) in item.list"   :title="item2.tname" @click="handleList(item2,true)">
												<text
												    	    slot="value"
												    	    class="u-slot-value"
												    	>99</text>
											</u-cell>
									</u-cell-group>
									<view class="padding-tb-sm" @click="seClick">
										<!-- <text class="text-bold">场景筛选</text> -->
										<u-cell  title="场景筛选" :isLink="true" :arrow-direction="isSeUpDown"></u-cell>
									</view>
									<u-cell-group v-if="seShow">
											<u-cell v-for="(item22,i) in item.scene"  :title="item22.tname" @click="handleList(item22,false)">
												<text
												    	    slot="value"
												    	    class="u-slot-value"
												    	>99</text>
											</u-cell>
									</u-cell-group>
								</view>
							
							</view>
						</view>
			</u-popup>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				goodsList:[],
				pages:0,
				tabArr:[
					{name:'分类',bcid:'',targget:''},
					{name:'蛋糕',bcid:'1',targget:'/pages/cake'},
					{name:'面包',bcid:'11',targget:'/pages/bread'},
					{name:'小食',bcid:'6',targget:'/pages/food'},
					{name:"购物车",bcid:'',targget:'/pages/cart'}
				],
				bcid :1,
				// 打卡或关闭弹出层
				isShow:false,
				classfyList:[],
				//筛选显示
				liShow:false,
				seShow:false,
				// 判断箭头是展开还是收起
				isLiUpDown:'down',
				isSeUpDown:'down'
				
			};
		},
		onLoad(){
			this.loadDate()
			this.$get('/1.1/classes/classify').then((res) => {
				console.log(res);
				this.classfyList = res.results
			})
			
		},
		computed:{
			cond(){
				return this.$store.state.condition.cond
			}
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
			// 关闭弹出层
			close(){
				this.isShow = false
			},
			handleDetail(i){
				console.log(i)
				uni.navigateTo({
					url:'/pages/detail/detail?i=' + i
				})
			},
			// 分页
			loadDate(){
				let skip = this.pages * 8
				let cond = JSON.stringify(this.$store.state.condition.cond)
				let url = `/1.1/classes/goodsList?where=${cond}&limit=8&skip=${skip}`
				this.$get(url).then((res) => {
					// 把res的results结构出来
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
					
				})
			},
			refreshLoad(){
				this.pages = 0
				this.goodsList = []
				this.isShow = false
				this.loadDate()
			},
			//点击底部栏切换数据
			handleLog(item,i){
				let {bcid,targget} = item
				console.log(bcid);
				console.log(this.$store.state.condition.cond.bcid);
				if(bcid){
					this.goodsList = []
					this.pages = 0
					// 把要修改的数据传给mutations
					this.changeCondition({bcid:Number(bcid)})
					this.loadDate()
				}
				if(i ===  0){
					this.isShow = true
				}
			},
			//筛选
			handleList({bid,tid},type){

				let obj = {bcid:bid}
				console.log(obj);
				//如果type为true 再obj里添加一个fid属性 为false添加一个sid属性
				type ? obj.fid = tid : obj.sid = tid
				//然后把Obj传给mutations
				this.changeCondition(obj)
				// 刷新页面
				this.refreshLoad()
			},
			//显示和隐藏筛选
			liClick(){
				this.liShow = !this.liShow
				this.liShow ? this.isLiUpDown = 'up' : this.isLiUpDown = 'down'
			},
			seClick(){
				this.seShow = !this.seShow
				this.seShow ? this.isSeUpDown = 'up' : this.isSeUpDown = 'down'

			}
		}
	}
</script>

<style lang="scss">
	.flexfi{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		box-shadow: 0 0 8upx 1upx gray;
	}
	.pop-cont{
		width: 400upx;
		margin-top: 150upx;
	}
</style>
