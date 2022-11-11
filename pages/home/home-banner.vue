<template>
	<view>
		<web-view :src="webViewSrc"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webViewSrc:""
			};
		},
		onLoad({link,key2,type}){
			this.webViewSrc = `${link}&key2=${key2}&type=${type}`
		}
	}
</script>

<style lang="scss">

</style>
