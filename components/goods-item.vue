<template>
	<view class="contain">
		<view class="cake-item padding-xs">
				<image class="poster" :src="list.img" @click="handleDetail"></image>
			<view class="info-count">
				<view class="info flex align-center justify-between padding-xs">
					<view>
					<view class="fs-28">
						{{list.name}}
					</view>
					<view class="fs-16">
						{{list.french}}
					</view>
					</view>
					
					
					<!-- 购物车 -->
					<view class="cart-btn margin-right-sm">
						<text @click="show = true" class="iconfont icon-gouwuche"></text>
					</view>
				</view>
				<!-- 价格 -->
				<view class="fs-18">
					<text class="fs-16">￥</text>
					{{list.price}}
				</view>
			</view>
		</view>
		
		<!-- 添加购物车提示模态框 -->
		<u-modal :show="show" :zoom="true" :showConfirmButton="true" :showCancelButton="true" @confirm="confirm" @cancel="show=false" :content='content' cancelColor="#e3cfbd" confirmColor="#b895b7"></u-modal>
		
		<!-- 消息提示框 -->
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		name:"goods-item",
		props:['list'],
		data() {
			return {
				show:false,
				content:'确定添加到购物车吗？'
			};
		},
		onLoad(options){
			console.log(options);
			console.log(this.list);
		},
		
		methods:{
			// 跳转到详情页面
			handleDetail(){
				uni.setStorage({
					key:'detail',
					data:this.list,
					success:() => {
						uni.navigateTo({
							url:'/pages/detail/detail'
						})
					}
				})
			},
			// 确认添加到购物车
			confirm(){
				this.$store.commit('cart/cartAdd',{...this.list,idx:0})
				this.$refs.uToast.show({
					type:'success',
					message:'添加成功'
				})
				this.show = false
			}
		}
	}
</script>

<style lang="scss">
	.contain{
		padding-bottom: 100upx;
	}
.cake-item{
	width: 350upx;
	.poster{
		height: 350upx;
		background-color: #f5f5f5;
	}
	.fs-28{
		margin-top: 24upx;
	}
	.fs-18{
		margin-bottom: 22upx;
	}
	.fs-16{
		margin: 14upx 0;
	}
}
.cart-btn{
	width: 60upx;
	height: 60upx;
	line-height: 60upx;
	border-radius: 50%;
	background-color: #b895b7;
	text-align: center;
}
</style>