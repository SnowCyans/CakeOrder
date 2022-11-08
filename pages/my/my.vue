<template>
	<view >
		<view class="cont">
			
		</view>
		<view class="margin bg-white">
			<view class="text-center">
				<image class="avatar" src="../../static/logo.png" mode=""></image>
			</view>
			<view class="fs-28 text-center">
				QQ
			</view>
			<view v-for="(item,i) in 2" :key="i" class="flex grid">
				<view v-for="(item,i) in gridArr" :key="i" class="flex flex-direction align-center padding">
					<text :class="['iconfont', item.icon]"></text>
					{{item.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gridArr:[
					{
						icon:'icon-danju',
						name:'我的订单'
						}
					,
					{
						icon:'icon-jifen',
						name:'待收货'
					},
					{
						icon:'icon-ziliaoshouce',
						name:'待付款'
					},
					{
						icon:'icon-youhuijuan',
						name:'会员等级'
					}
				]
			};
		}
	}
</script>

<style lang="scss">
page{
	background-color: #fff;
}
.cont{
	background-color: #f6f6f6;
	height: 400upx;
}
.bg-white{
	margin-top: -200upx;
}
.grid .iconfont{
	font-size: 60upx;
	color: #888;
}
.avatar{
	width: 150upx;
	height: 150upx;
	border-radius: 50%;
	margin-top: -75upx;
}
</style>
