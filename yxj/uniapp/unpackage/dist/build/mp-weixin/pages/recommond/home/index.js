(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/recommond/home/index"],{5476:function(n,t,e){"use strict";(function(n){e("d38b"),e("921b");o(e("66fd"));var t=o(e("a1cd"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},"606b":function(n,t,e){"use strict";e.r(t);var o=e("bd76"),i=e.n(o);for(var r in o)"default"!==r&&function(n){e.d(t,n,(function(){return o[n]}))}(r);t["default"]=i.a},a1cd:function(n,t,e){"use strict";e.r(t);var o=e("ae9f"),i=e("606b");for(var r in i)"default"!==r&&function(n){e.d(t,n,(function(){return i[n]}))}(r);var u,c=e("f0c5"),a=Object(c["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);t["default"]=a.exports},ae9f:function(n,t,e){"use strict";var o={loading:function(){return e.e("components/loading/loading").then(e.bind(null,"0800"))}},i=function(){var n=this,t=n.$createElement;n._self._c},r=[];e.d(t,"b",(function(){return i})),e.d(t,"c",(function(){return r})),e.d(t,"a",(function(){return o}))},bd76:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(e("4795"));function i(n){return n&&n.__esModule?n:{default:n}}function r(n,t,e,o,i,r,u){try{var c=n[r](u),a=c.value}catch(s){return void e(s)}c.done?t(a):Promise.resolve(a).then(o,i)}function u(n){return function(){var t=this,e=arguments;return new Promise((function(o,i){var u=n.apply(t,e);function c(n){r(u,o,i,c,a,"next",n)}function a(n){r(u,o,i,c,a,"throw",n)}c(void 0)}))}}var c=function(){e.e("components/recommond/home/swiper/swiper").then(function(){return resolve(e("5a6c"))}.bind(null,e)).catch(e.oe)},a=function(){e.e("components/recommond/home/live/live").then(function(){return resolve(e("6131"))}.bind(null,e)).catch(e.oe)},s=function(){e.e("components/recommond/home/follow/follow").then(function(){return resolve(e("b8c7"))}.bind(null,e)).catch(e.oe)},l={data:function(){return{swiperList:[],liveList:[],followList:[]}},components:{hSwiper:c,hLive:a,hFollow:s},onShow:function(){var n=this;return u(o.default.mark((function t(){return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n.$loading(),t.next=3,n.$store.dispatch("userInfo/login",{});case 3:return t.next=5,n.getSubscribeStudio();case 5:return t.next=7,n.getLiveList();case 7:n.$loading(!1);case 8:case"end":return t.stop()}}),t)})))()},methods:{getSubscribeStudio:function(){var n=this;return new Promise((function(t,e){n.$api.recommondHome.getSubscribeStudio({limit:20,start:0}).then((function(e){e.isEnd&&e.list.length>0&&(n.followList=e.list),t()})).catch((function(n){e()}))}))},getLiveList:function(){var n=this;return new Promise((function(t,e){n.$api.recommondHome.getLiveList().then((function(e){n.swiperList=e.bannerList,n.liveList=e.notStartList,t()})).catch((function(n){e()}))}))}}};t.default=l}},[["5476","common/runtime","common/vendor"]]]);