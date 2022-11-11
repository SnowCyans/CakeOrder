<template>
	<view>
		<view class="cake-item">
				<image class="poster" :src="list.img"></image>
			<view class="info-count">
				<view class="info flex align-center justify-between padding-xs">
					<view>
					<view class="fs-28">
						{{list.bcname}}
					</view>
					<view class="fs-16">
						{{list.french}}
					</view>
					</view>
					
					
					<!-- 购物车 -->
					<view class="cart-btn margin-right-sm">
						<text class="iconfont icon-gouwuche"></text>
					</view>
				</view>
				<!-- 价格 -->
				<view class="fs-18">
					<text class="fs-16">￥</text>
					{{list.price}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"goods-item",
		props:['list'],
		data() {
			return {
				
			};
		},
		onLoad(options){
			console.log(options);
			console.log(this.list);
		}
	}
</script>

<style lang="scss">
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
	background-color: #ffde50;
	text-align: center;
}
</style>