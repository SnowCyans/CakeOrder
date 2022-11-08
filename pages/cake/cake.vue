<template>
	<view>
		<view class="cont">
			<view class="cake-item" v-for="(item,i) in 8" :key="i" @click="handleDetail(i)">
				<view class="poster">
					
				</view>
				<view class="info-count">
					<view class="info">
						<view class="fs-28">
							草莓
						</view>
						<view class="fs-16">
							QWERTR
						</view>
						<view class="fs-18">
							<text class="fs-14">￥</text>
							666.00
						</view>
					</view>
					<view class="cart-btn">
						
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			handleDetail(i){
				console.log(i)
				uni.navigateTo({
					url:'/pages/detail/detail?i=' + i
				})
			}
		}
	}
</script>

<style lang="scss">
	.cont{
		display: flex;
		flex-wrap:wrap;
		padding: 15upx;
		justify-content: space-between;
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
</style>
