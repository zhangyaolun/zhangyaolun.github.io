<template>
	<scroll-view scroll-x class="bg-white nav text-center">
		<view class="cu-item" :class="index == TabCur ? 'text-red cur' : ''" v-for="(item, index) in tabList" :key="index" @tap="tabSelect" :data-id="index">{{item.title}}</view>
	</scroll-view>
</template>

<script>
export default {
	props: {
		TabCur: {
			type: String | Number
		},
		tabList: {
			type: Array
		}
	},
	data() {
		return {
			
		};
	},
	methods: {
		tabSelect(e) {
			this.$emit('tabSelect', e);
		}
	}
};
</script>

<style lang="scss" scoped>
uni-swiper /deep/ .uni-swiper-dots-horizontal {
	bottom: 80upx;
}
.slide-mask {
	width: 100%;
	height: 70upx;
	background: rgba(0, 0, 0, 0.5);
	position: absolute;
	bottom: 0;
	left: 0;
	padding: 0 20upx;
	box-sizing: border-box;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	text-align: left;
	line-height: 74upx;
	color: #fff;
	font-size: 24upx;
	.liveIcon {
		padding: 4upx 10upx;
		background: #d93639;
		border-radius: 4upx;
	}
	.livePv {
		margin: 0 25upx 0 15upx;
	}
}
</style>
