<template>
	<view>
		<!-- 底部选项卡 -->
		<view class="flexfi flex bg-white align-center justify-center">
			<view v-for="(item,i) in tabArr" :key="i" @click="handleLog(item,i)" class="flex align-center padding-tb-xs fs-30">
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
									<view class="padding-tb-sm  margin-top u-border-top" @click="liClick()">
										<u-cell  title="口味筛选" :isLink="true" :arrow-direction="isLiUpDown"></u-cell>
									</view>
									<u-cell-group v-if="liShow">
											<u-cell v-for="(item2,i) in item.list"   :title="item2.tname" @click="handleList(item2,true)">
												<text
												
												    	    slot="value"
												    	    class="cu-tag round bg-yellow"
												    	>{{item2.num}}</text>
											</u-cell>
									</u-cell-group>
									<view class="padding-tb-sm" @click="seClick()">
										<u-cell  title="场景筛选" :isLink="true" :arrow-direction="isSeUpDown"></u-cell>
									</view>
									<u-cell-group v-if="seShow">
											<u-cell v-for="(item22,i) in item.scene"  :title="item22.tname" @click="handleList(item22,false)">
												<text
												    	    slot="value"
												    	    class="cu-tag round bg-yellow"
												    	>{{item22.num}}</text>
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
				tabArr:[
					{name:'分类',bcid:'',target:''},
					{name:'蛋糕',bcid:'1',target:'/pages/cake/cake'},
					{name:'面包',bcid:'11',target:'/pages/cake/cake'},
					{name:'小食',bcid:'6',target:'/pages/cake/cake'},
					{name:"购物车",bcid:'',target:'/pages/cart/cart'}
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
		async created(){
			const res = await this.$get('/1.1/classes/classify')
			console.log(res);
			this.classfyList = res.results
		},
		methods:{
			...mapMutations('condition',['changeCondition']),
			// 关闭弹出层
			close(){
				this.isShow = false
			},
			
			//点击底部栏切换数据
			handleLog(item,i){
				let {bcid,target} = item
				console.log(bcid);
				console.log(target);
				
				if(bcid){
					this.goodsList = []
					this.pages = 0
					// 把要修改的数据传给mutations
					this.changeCondition({bcid:Number(bcid)})
					uni.navigateTo({
						url:target
					})
				}
				if(!bcid && !target){
					this.isShow = true
				}
				if(!bcid && target){
					uni.navigateTo({
						url:target
					})
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
				this.isShow = false
				uni.navigateTo({
					url:'/pages/cake/cake'
				})
			},
			//显示和隐藏筛选
			liClick(){
				this.liShow = !this.liShow
				this.liShow ? this.isLiUpDown = 'up' : this.isLiUpDown = 'down'
				// 如果口味筛选展开了，就让场景筛选关闭
				if(this.isLiUpDown){
					this.isSeUpDown = 'down'
					this.seShow = false
				}
			},
			seClick(){
				this.seShow = !this.seShow
				this.seShow ? this.isSeUpDown = 'up' : this.isSeUpDown = 'down'
				// 如果场景筛选展开了 就让口味筛选关闭
				if(this.isSeUpDown){
					this.isLiUpDown = 'down'
					this.liShow = false
				}
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
