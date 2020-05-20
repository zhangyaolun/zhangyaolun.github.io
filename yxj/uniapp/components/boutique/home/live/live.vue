<template>
	<view class="liveAnnouncement bg-white">
		<view class="cu-bar bg-white mt10">
			<view class="action">
				<text class="cuIcon-titles text-orange"></text>
				<text class="text-black text-bold fontSize15">直播预告</text>
			</view>
		</view>

		<view class="liveAnnouncement_main bg-white" v-for="(item, index) in liveList" :key="index">
			<view class="liveAnnouncement_main-left"><image class="img" :src="item.subjectImg" mode="aspectFill"></image></view>
			<view class="liveAnnouncement_main-right">
				<text class="text-black text-bold ellipsis">{{ item.subjectTitle }}</text>
				<view v-if="Object.keys(item.subjectMaster).length > 0">
					<text class="text-black ellipsis smallFont">{{ item.subjectMaster.hospital }}</text>
					<text class="text-black ellipsis smallFont">{{ item.subjectMaster.name + ' ' + item.subjectMaster.title }}</text>
				</view>
				<view class="main-right-bottom">
					<view class="cu-tag">距开播20小时</view>
					<image class="img" src="/static/img/heat.png" mode="aspectFill"></image>
					<text class="text-grey ">{{ item.pvNum }}</text>
				</view>
				<view class="bg-gradual-orange text-center shadow-blur">预约</view>
			</view>
		</view>

		<button class="cu-btn">往期回顾</button>
	</view>
</template>

<script>
export default {
	props: {
		liveList: {
			type: Array
		}
	}
};
</script>

<style lang="scss" scoped>
@import 'common/style/public.scss';
.liveAnnouncement {
	.liveAnnouncement_main {
		display: flex;
		width: 100%;
		background-color: #fff;
		padding: 15upx 25upx;
		border-top: 2upx solid #f1f1f1;
		.liveAnnouncement_main-left {
			width: 22%;
			.img {
				height: 200upx;
				border-radius: 8upx;;
			}
		}
		.liveAnnouncement_main-right {
			flex: 1;
			position: relative;
			margin-left: 20upx;
			.ellipsis {
				width: 80% !important;
				display: block;
				height: 45upx;
				line-height: 45upx;
			}
			.smallFont {
				font-size: 24upx;
				color: #666;
			}
			.main-right-bottom {
				position: absolute;
				left: 0;
				bottom: 8upx;
				.cu-tag {
					border: 2upx solid #f58c23;
					color: #f58c23;
					background: #fff;
					border-radius: 8upx;;
				}
				.img {
					width: 30upx;
					height: 36upx;
					margin-left: 35upx;
					vertical-align: middle;
				}
				.text-grey {
					display: inline-block;
					font-size: 24upx;
					margin-left: 15upx;
					vertical-align: middle;
				}
			}
			.bg-gradual-orange {
				width: 120upx;
				height: 50upx;
				line-height: 55upx;
				border-radius: 50upx;
				font-size: 24upx;
				position: absolute;
				right: 0;
				bottom: 8upx;
			}
		}
	}

	.cu-btn {
		width: 70%;
		margin: 40upx 15%;
		border-radius: 50upx;
		color: #f58c23;
		background: #f4f4f4;
		height: 80upx;
		line-height: 80upx;
	}
}
</style>
