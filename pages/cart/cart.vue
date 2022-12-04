<template>
	<view>
		<view class="flex padding" v-for="(item,i) in cartList":key="item.id + '-' + item.idx" >
			<view class="flex align-center">
				<!-- <text class="iconfont icon-gouxuan margin-right-xs" :class="item.ischeck ? 'color-yellow' : '' " @click="cartCheck(i)"></text> -->
				<radio :checked="item.ischeck" color="#b895b7" @click="cartCheck(i)" ></radio>
				<image :src="item.img" mode="" class="poster margin-right"></image>
			</view>
			<view class="flex justify-between info">
				<view class="">
					{{item.name}}
					<view class="margin-tb-xs">
						￥{{item.list[item.idx].price}}
					</view>
				</view>
				
				<view class="flex flex-direction align-end">
					<view class="edit margin-bottom-xs">
						<text class="iconfont icon-bianji" @click="handleEdit(i)"></text>
					</view>
					{{item.list[item.idx].spec}}×{{item.num}}
				</view>
			</view>
		</view>
		<view class="price-btn flex fixed bg-white">
			<view class="flex flex-sub padding align-center">
				<!-- <text class="iconfont icon-gouxuan margin-right-xs" :class="allInfo ? 'color-yellow' : '' " @click="cartAllCheck(allInfo)"></text> -->
				<radio :checked="allInfo" color="#b895b7" class="margin-right-xs" @click="cartAllCheck(allInfo)"></radio>
				全选
				<view class="margin-left-xs">
					共计：￥<text class="color-red padding-right-xs">{{allPrice}}</text>元
				</view>
			</view>
			<view class="bg-zise padding color-fff">
				立即结算
			</view>
		</view>
		
		<!-- 编辑遮罩 -->
		<u-overlay :show="isShow" @click="handleOver()">
			<view class="overlayInfo bg-white margin padding-top padding-lr" @tap.stop>
			<view class="flex justify-between nfo">
				<image :src="cartList[cartIdx].img" mode="" class="poster margin-right"></image>
				<view class="">
					{{cartList[cartIdx].name}}
					<view class="margin-tb-xs">{{cartList[cartIdx].french}}</view>
					￥{{checkedCartInfo.price}}
				</view>
				</view>
				
				<view class="flex justify-between padding-tb u-border-bottom">
					<view class="">
						规格选择
					</view>
					<view class="drop" >
						<view @click="dropShow = true">
							{{checkedCartInfo.spec}} - {{checkedCartInfo.edible}}
							<text class="iconfont icon-xiala"></text>
						</view>
						
						<view v-show="dropShow" class="drop-list bg-white" >
							<view  class="padding-sm" v-for="(item ,i) in cartList[cartIdx].list" :key="i" @click="handleDropList(i)">
								{{item.spec}} - {{item.edible}}
								
							</view>
						</view>
					</view>
				</view>
				
				<view class="flex justify-between padding-tb-sm align-center u-border-bottom">
					<view class="">
						数量选择
					</view>
						<u-number-box :value="num" buttonSize="25" @change="valChange"></u-number-box>
				</view>
				<view class="flex">
					<button @click="handleCancel()" size="mini" class="bg-kaqise cu-btn lg">取消</button>
					<button @click="handleConfirm()" size="mini" class="bg-zise cu-btn lg">确认</button>
				</view>
			
			</view>
		</u-overlay>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
	export default {
		data() {
			return {
				isShow:false,
				dropShow:false,
				cartIdx:0,
				dropIdx:0,
				// num:1
				num:1
			};
		},
		methods:{
			...mapMutations('cart',['cartCheck','cartCheckAll','cartAllCheck']),
			// 编辑
			handleEdit(idx){
				this.cartIdx = idx
				this.dropIdx = this.cartList[idx].idx
				console.log(idx);
				this.num = this.cartList[idx].num
				this.isShow = true
				
			},
			// 关闭编辑遮罩
			handleOver(){
				this.isShow =false
				this.dropShow = false
			},
			// 步进器
			valChange({value}) {
				this.num = value
			},
			// 点击选中下拉列表某一项
			handleDropList(dropIdx){
				this.dropShow = false
				this.dropIdx = dropIdx
			},
			// 取消
			handleCancel(){
				this.isShow = false
				this.dropShow = false
				this.dropIdx = 0
			},
			// 确定
			handleConfirm(){
				let {cartIdx,dropIdx,num} = this
				console.log(cartIdx,dropIdx,num);
				this.$store.commit('cart/cartDropList',{cartIdx,dropIdx,num})
				this.isShow = false
				this.dropShow = false
			}
		},
		computed:{
			...mapState('cart',['cartList']),
			...mapGetters('cart',['allInfo','allPrice']),
			
			// 过滤下拉选中的商品信息
			checkedCartInfo(){
				let {cartList,cartIdx,dropIdx} = this
				return cartList[cartIdx].list[dropIdx]
			},
		}
	}
</script>

<style lang="scss">
	// page{
	// 	padding-bottom: 100upx;
	// }
.poster{
	width: 180upx;
	height: 180upx;
	background-color: #d8d8d8;
}
.info{
	width: 60%;
	.edit{
		width: 80upx;
		height: 80upx;
		line-height: 80upx;
		background-color: #e6e6ee;
		border-radius: 50%;
		text-align: center;
	}
}
.price-btn{
	height: 100upx;
}
.overlayInfo{
	position: absolute;
	top:50%;
	left: 0;
	width: 690upx;
	transform: translateY(-50%);
	border-radius: 10upx;
}
.cu-btn.lg{
	width: 50%;
}
.drop{
	position: relative;
	.drop-list{
		width: 250upx;
		position: absolute;
		top:60upx;
		right: 0;
		box-shadow: 0 0 10upx rgba(0, 0, 0, 0.2);
		z-index: 1;
		view:hover{
			background-color: #898889;
		}
	}
}
</style>
