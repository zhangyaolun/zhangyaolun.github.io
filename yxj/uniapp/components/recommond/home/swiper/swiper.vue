<template>
	<!--  square-dot -->
	<swiper
		class="swiper"
		:indicator-dots="false"
		:circular="true"
		:autoplay="false"
		interval="5000"
		duration="500"
		@change="cardSwiper"
		indicator-color="#8799axx3"
		indicator-active-color="#fff"
		v-if="swiperList"
	>
		<swiper-item v-for="(item, index) in swiperList" :key="index" :class="cardCur == index ? 'cur' : ''">
			<view class="swiper-item">
				<image :src="item.subjectImg" mode="aspectFill"></image>
				<view class="slide-mask">
					<text class="liveIcon">直播</text>
					<text class="livePv">{{ item.pvNum }}人在看</text>
					<text class="liveTitle">{{ item.subjectTitle }}</text>
				</view>
			</view>
		</swiper-item>
	</swiper>
</template>

<script>
export default {
	props: {
		swiperList: {
			type: Array
		}
	},
	data() {
		return {
			cardCur: 0
		};
	},
	methods: {
		cardSwiper(e) {
			this.cardCur = e.detail.current;
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
