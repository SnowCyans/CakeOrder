<template>
	<view>
		<view class="cu-bar">
			<view class="action">
				<u-icon name="arrow-left"></u-icon>
				<text class="padding-xs" @click="handleBack">返回</text>
			</view>
			<view class="content text-bold">
				商品详情
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		name:"nav-custom",
		data() {
			return {
				
			};
		},
		methods:{
			handleBack(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss">
.cu-bar{
	background-color: #f1f1f1;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 1;
}
</style>