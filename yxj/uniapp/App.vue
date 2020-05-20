<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
export default {
	computed: mapGetters(['userInfo']),
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
@import "colorui/main.css";

@import "colorui/icon.css";
@import "common/style/public.scss";

/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
