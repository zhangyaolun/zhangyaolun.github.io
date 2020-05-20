<template>
	<view class="loading-popup" v-if="is_loading">
		<view class="cu-load load-modal">
			<image src="/static/img/loading-1-1.gif" mode="aspectFit"></image>
			<view class="gray-text">{{toastMsg}}</view>
		</view>
	</view>
</template>

<script>
	
export default {
	props: {
		toastMsg: {
			value: String,
			default: '加载中...'
		}
	},
	computed: {
		is_loading() {
			return this.$store.state.common.loading
		}
	}
};
</script>

<style lang="scss"></style>
