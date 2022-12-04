<template>
	<view>
		<view class="cu-bar bg-white">
			<view class="action">
					<u-icon
					@click="backToHome()"
					                    name="home"
					                    size="22"
									color="gray"
					                ></u-icon>
				</text>
				
			</view>
			<view class="content text-bold">
				CAKEORDER
			</view>
				
			<view class="action">
				<text class="cuIcon-search text-grey"></text>
				<text class="cuIcon-sort text-bold"></text>
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
			// 返回首页
			backToHome(){
				uni.navigateTo({
					url:'/pages/home/home'
				})
			}
		}
	}
</script>

<style lang="scss">
.cu-bar{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 1;
}
</style>