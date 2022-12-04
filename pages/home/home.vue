<template>
	<scroll-view scroll-y="true" :scroll-into-view="scrollItem" scroll-with-animation class="scrollcont" @scroll="handleScroll">
		<view id="top"></view>
			<!-- 导航栏组件 -->
			<navCustom></navCustom>
			
			<swiper class="banner" :indicator-dots="true" indicator-color="#282c35" indicator-active-color="#ffdb09" :interval="2000" :duration="1000" :autoplay="true">
				<swiper-item v-for="item in banner" :key="item.objectId">
					<view>
						<image  :src="item.img" @click="handleBanner(item.link)"></image>
					</view>
				</swiper-item>
			</swiper>
			<homeTitle title="本季推荐" entTitle="Recommend" entTit="White Lover"></homeTitle>
			<scroll-view scroll-x="true" >
				<view class="item-scroll">
					<image v-for="(item,i) in 3" src="../../static/img/recommend1.jpeg" mode="heightFix"></image>
				</view>
			</scroll-view>
			<homeTitle title="法式经典" entTitle="French Classic" entTit="French"></homeTitle>
			<image class="classFy" src="../../static/img/1.jpg" mode=""></image>
			
			<!-- goods-Item组件 -->
			<view class="flex justify-between flex-wrap">
				<goodsItem v-for="(item,i) in goodsList" :key="i" :list="item"></goodsItem>
			</view>
			
			<!-- 返回顶部 -->
			<view class="back-top" v-if="isShow" @click="backTop">
				<text class="iconfont icon-tubiao_fanhuidingbu"></text>
			</view>
			
		<tabBar></tabBar>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				isShow:false,
				scrollItem:'',
				banner:[],
				goodsList:[]
			};
		},
		methods:{
			// 滑动到一定距离显示返回顶部按钮
			handleScroll(e){
				// console.log(e.detail.scrollTop);
				let {scrollTop} = e.detail
				this.isShow = scrollTop > 300
				// 距离为0的时候将scroll-into-view的值赋为原值,方便下次点击返回顶部继续滚动
				this.scrollItem = "scrollItem"
			},
			// 返回顶部
			backTop(){
				this.scrollItem = 'top'
			},
			handleBanner(link){
				console.log(link);
				uni.navigateTo({
					url:`/pages/home/home-banner?link=${link}`
				})
			}
		},
		async onLoad(){
			const res =await this.$get('/1.1/classes/banner')
			console.log(res);
			this.banner = res.results
			
			const res2 = await this.$get(`/1.1/classes/goods?where={"bcid":1}&limit=8&skip=0`)
			console.log(res2);
			this.goodsList = res2.results
		}
	}
</script>

<style lang="scss">
.banner{
	height: 1000upx;
	swiper-item {
		height: 1000upx;
		image{
			width: 100%;
			height: 1000upx;
		}
	}
}
.item-scroll{
	white-space: nowrap;
	image{
		height: 290upx;
	}
}
.classFy{
	width: 100%;
	height: 380upx;
}
.back-top{
	width: 100upx;
	height: 100upx;
	position: fixed;
	bottom: 120upx;
	right: 60upx;
	background-color: #fff;
	box-shadow: 0 0 10upx 5upx gray;
	border-radius: 50%;
	text-align: center;
	line-height: 100upx;
}
.scrollcont{
	height: 100vh;
}
</style>
