<template>
	<view class="content">
		<nav-custom></nav-custom>
		<view class="logo iconfont icon-canju"></view>
		<view class="uni-form-item uni-column">
			<input type="tel" class="uni-input" name="" v-model="info.userName" placeholder="请输入用户名" />
		</view>
		<view class="uni-form-item uni-column">
			<input type="password" class="uni-input" v-model="info.password" name="" placeholder="请输入密码" />
		</view>
		<button type="primary" @click="UserLogin">登陆</button>
		<view class="links"><view class="link-highlight" @tap="gotoRegistration">注册账号</view></view>
	</view>
</template>

<script>
	import {mapActions,mapState} from 'vuex'
	export default {
		data() {
			return {
				info:{
					userName:'powderBlue',
					password:'123'
				}
			}
		},
		onLoad() {
			
		},
		computed:{
			...mapState('user',['userInfo']),
		},
		methods: {
			...mapActions('user',['updateUser']),
			// 登录
			 UserLogin(){
				// const res =await this.$post('/1.1/login',this.info)
				// console.log(res);
				this.updateUser(this.info)
			},
			gotoRegistration: function () {
				uni.navigateTo({url: 'registration'});
			}
		}
	}
</script>

<style lang="scss" scoped>
	$color-primary: #b49950;
	.content{
		padding: 100upx;
	}
	.logo{
		text-align: center;
		height: 200upx;
		font-size: 100upx;
		margin-top: 80upx;
	}
	.uni-form-item{
		margin-bottom: 40upx;
		padding: 0;
		border-bottom: 1px solid #e3e3e3;
		.uni-input{
			font-size: 30upx;
			padding: 7px 0;
			height: 100upx;
		}
	}
	button[type="primary"]{
		background-color: $color-primary;
		border-radius: 0;
		font-size: 34upx;
		margin-top: 60upx;
	}
	.links{
		text-align: center;
		margin-top: 40upx;
		font-size: 26upx;
		color: #999;
		view{
			display: inline-block;
			vertical-align: top;
			margin: 0 10upx;
		}
		.link-highlight{
			color: $color-primary
		}
	}
</style>
