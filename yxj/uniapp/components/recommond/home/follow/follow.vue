<template>
	<view class="followAnnouncement bg-white">
		<view class="cu-bar bg-white mt10">
			<view class="action">
				<text class="cuIcon-titles text-red"></text>
				<text class="text-black text-bold fontSize15">我的关注</text> 
			</view>
			<view class="action">
				<text class="text-black">更多</text>
			</view>
		</view>
		
		<view class="follow_main bg-white" v-for="(item, index) in followList" :key="index">
			<view class="follow_main-left">
				<!-- <image class="img" :src="item.studioImg" mode="aspectFill"></image> -->
				<audio-wave></audio-wave>
			</view>
			<view class="follow_main-right">
				<text class="text-black text-bold ellipsis">{{item.studioTitle}}</text> 
				<text class="text-black ellipsis smallFont">{{item.studioIntro}}</text>
				<view class="main-right-bottom">
					<text class="text-grey ">粉丝 {{item.fansNum}}</text>
					<text class="text-grey ">视频 {{item.subjectNum}}</text>
					<text class="text-grey ">人气 {{item.hots}}</text>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
import audioWave from '@/components/audioWave/index'
	
export default {
	props: {
		followList: {
			type: Array
		}
	},
	components: {
		audioWave
	},
};
</script>

<style lang="scss" scoped>
.followAnnouncement{
		.follow_main{
			display: flex;
			width: 100%;
			background-color: #fff;
			padding: 15upx 25upx 30upx;
			border-top: 2upx solid #f1f1f1;
			.follow_main-left{
				position: relative;
				width: 120upx;
				height: 120upx;
				background: rgba(0, 0, 0, 0.5);
				border-radius: 50%;
				.img{
					height: 120upx;
					border-radius: 50%;
				}
			}
			.follow_main-right{
				flex: 1;
				position: relative;
				margin-left: 20upx;
				.ellipsis{
					width: 80% !important;
					display: block;
					height: 45upx;
					line-height: 45upx;
				} 
				.smallFont{
					font-size: 24upx;
					color: #666;
				}
				.main-right-bottom{
					position: absolute;
					left: 0;
					bottom: 0;
					.text-grey{
						display: inline-block;
						font-size: 24upx;
						color: #999;
						margin-right: 20upx;
						vertical-align: middle;
					}
				}
			}
		}
			
	}
	
</style>
