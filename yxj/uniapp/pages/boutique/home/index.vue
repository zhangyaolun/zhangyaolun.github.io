<template>
	<view class="container">
		<h-swiper :TabCur="TabCur" :tabList="tabList" @tabSelect="tabSelect"></h-swiper>
		<scroll-view :scroll-top="0" scroll-y="true" class="scroll-Y scrollView" :lower-threshold='100' @scrolltoupper="upper" @scrolltolower="lower"
		@scroll="scroll" v-for="(item,index) in tabList" :key="index" v-if="TabCur === index">
			<view class="scroll-view-item" v-for="(it,idx) in item.list" :key="idx">{{it.title}}</view>
		</scroll-view>
		<loading />
	</view>
</template>

<script>
import hSwiper from '@/components/boutique/home/swiper/swiper'
export default {
	components: {
		hSwiper
	},
	data() {
		return {
			tabList:[
				{title: '系列课', list: []}, 
				{title: '单节课', list: []},
			],
			TabCur: 0,
			seriesIsEnd: true,
			seriesPage: 0,
			singletonIsEnd: true,
			singletonPage: 0
		};
	},
	async onShow() {
		this.seriesPage = 0
		this.singletonPage = 0
		await this.getSeriesCurriculumList();
		this.$loading(false);
	},
	methods: {
		scroll (e) {
			console.log(e.detail.scrollTop)
			
		},
		/* 滚动到顶部 */
		upper (e) {
			console.log(e)
		},
		/* 滚动到底部 */
		async lower (e) {
			console.log('23')
				// if (this.TabCur === 0) {
				// 	if (!this.seriesIsEnd) await this.getSeriesCurriculumList()
				// } else if (this.TabCur === 0) {
				// 	if (!this.singletonIsEnd) await this.getSingletonCurriculumList()
				// }
				//this.$loading(false)
		},
		/* tab切换 */
		async tabSelect (e) {
			if (this.TabCur * 1 === e.currentTarget.dataset.id * 1) return
			let index = e.currentTarget.dataset.id * 1
			index === 0 ? await this.getSeriesCurriculumList() : await this.getSingletonCurriculumList()
			this.TabCur = index
			this.$loading(false);
		},
		/* 系列课列表查询 */
		getSeriesCurriculumList() {
			this.$loading();
			let page = this.seriesPage === 0 ? 0 : this.seriesPage
			return new Promise((resolve, reject) => {
				this.$api.boutiqueHome
					.getSeriesCurriculumList({limit: 20, start: page })
					.then(res => {
						this.seriesIsEnd = res.isEnd
						console.log(this.seriesPage === 0);
						this.seriesPage === 0 ? this.tabList[0].list = res.list : this.tabList[0].list.push(...res.list)
						this.seriesPage = ++page
						
						resolve();
					})
					.catch(err => {
						reject();
					});
			});
		},
		/* 单节课列表查询 */
		getSingletonCurriculumList() {
			this.$loading();
			let page = this.singletonPage === 0 ? 0 : this.singletonPage
			return new Promise((resolve, reject) => {
				this.$api.boutiqueHome
					.getSingletonCurriculumList({limit: 20, start: page})
					.then(res => {
						this.singletonIsEnd = res.isEnd
						this.singletonPage === 0 ? this.tabList[1].list = res.list : this.tabList[1].list.push(...res.list)
						this.singletonPage = ++page
						console.log(res);
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

<style lang="scss" scoped>
.scrollView{
	width: 100%;
	height: 100%;
	background: #fff;
	position: absolute;
	top: 90upx;
	left: 0;
}
.scroll-view-item{
	height: 200upx;
}	
</style>
