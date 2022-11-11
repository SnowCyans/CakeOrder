<template>
	<view>
		<view class="flex padding justify-between align-center">
		<view class="flex align-center">
			<text class="iconfont icon-canju"></text>
			<view class="fs-28 margin-left">
				{{title}}
				<view>{{entTitle}}</view>
			</view>
		</view>
		
		<view class="">
			{{entTit}}
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"home-title",
		props:['title','entTitle','entTit'],
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.iconfont{
	font-size: 60upx;
}
</style>