<template>
	<view class="content">
		<nav-custom ></nav-custom>
		<view class="logo logo iconfont icon-canju"></image></view>
		<view class="uni-form-item uni-column">
			<input type="tel" class="uni-input" v-model="info.username" name="" placeholder="请输入用户名" />
		</view>
		<view class="uni-form-item uni-column">
			<input type="password" class="uni-input" v-model="info.password" name="" placeholder="请输入密码" />
		</view>
		<button type="primary" @click="registClick">注册</button>
		<view class="links">已有账号？<view class="link-highlight" @tap="gotoLogin">点此登陆</view></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{
					username:'',
					password:'123'
				},
			}
		},
		onLoad() {

		},
		methods: {
			// 注册
			async registClick(){
				const res = await this.$post('/1.1/users',this.info)
				console.log(res);
				let {code} = res
				let title = code === 202 ? '账号已被占用' : '注册成功'
				uni.showToast({
					title,
					icon:'none'
				})
			},
			// 跳转到登录页
			gotoLogin: function () {
				uni.navigateTo({
					url: 'login'
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	$color-primary: #b49950;
	.content{
		padding: 60upx 100upx 100upx;
	}
	.logo{
	    text-align: center;
		height: 200upx;
		font-size: 100upx;
		margin-top: 120upx;
	}
	.uni-form-item{
		margin-bottom: 40upx;
		padding: 0;
		border-bottom: 1px solid #e3e3e3;
		.uni-input{
			font-size: 30upx;
			height: 100upx;
			padding: 7px 0;
		}
	}
	.column-with-btn{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		button{
			font-size: 24upx;
			margin: 0;
			width: 180upx;
			text-align: center;
			&:after{
				border: none
			}
			&.active{
				background-color: $color-primary;
				color: $uni-text-color-inverse;
			}
		}
	}
	.img-captcha{
		width: 150upx;
		height: 60upx;
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
