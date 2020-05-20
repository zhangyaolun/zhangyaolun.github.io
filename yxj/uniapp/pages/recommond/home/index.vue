<template>
	<view>
		<h-swiper :swiperList="swiperList" />
		<h-live :liveList="liveList" />
		<h-follow :followList="followList" />
		<loading />
	</view>
</template>

<script>
import hSwiper from '@/components/recommond/home/swiper/swiper'
import hLive from '@/components/recommond/home/live/live'
import hFollow from '@/components/recommond/home/follow/follow'

export default {
	data() {
		return {
			swiperList: [], // 轮播图数据集合
			liveList: [],   // 直播预告数据集合
			followList: []  // 我的关注数据集合
		};
	},
	components: {
		hSwiper, // 轮播图
		hLive,   // 直播预告
		hFollow  // 我的关注
	},
	async onShow() {
		// hyphens: auto;
		// lang="en-US"
		this.$loading();
		await this.$store.dispatch('userInfo/login', {})
		await this.getSubscribeStudio();
		await this.getLiveList();
		this.$loading(false);
		console.log(uni)
	},
	async onPullDownRefresh (){
	  await this.$store.dispatch('userInfo/login', {})
	  await this.getSubscribeStudio();
	  await this.getLiveList();
	  uni.hideNavigationBarLoading();
	  uni.stopPullDownRefresh();
	 },
	methods: {
		/* 获取用户关注直播间 */
		getSubscribeStudio() {
			return new Promise((resolve, reject) => {
				/*
					 start 起始索引
					 limit 起始数量
					 */
				this.$api.recommondHome
					.getSubscribeStudio({ limit: 20, start: 0 })
					.then(res => {
						if (res.isEnd && res.list.length > 0) this.followList = res.list;
						resolve();
					})
					.catch(err => {
						reject();
					});
			});
		},
		/* 获取直播 */
		getLiveList() {
			return new Promise((resolve, reject) => {
				this.$api.recommondHome
					.getLiveList()
					.then(res => {
						this.swiperList = res.bannerList;
						this.liveList = res.notStartList;
						resolve();
					})
					.catch(err => {
						reject();
					});
			});
		}
	}
};
</script>
