new Vue({el:"#app",data:{oBackTopFixed:!1,headerName:"快报列表",newsList:[]},filters:{},mounted:function(){FastClick.attach(document.body);var e=this;commentJs.homeHader("快报列表"),commentJs.kefuLogo("kefu_logo"),setTimeout(function(){e.getInfo()},10),window.addEventListener("scroll",this.handleScroll)},methods:{getInfo:function(e){var t=this;o.homeNews(11,function(e){t.newsList=[],e.result&&0<e.result.length&&(e.result.forEach(function(e,o){e.isOpen&&(e.createTimeVal=new Date(e.createTime),t.newsList.push(e))}),function(e){for(var o=0;o<e.length-1;o++)for(var t=0;t<e.length-1-o;t++)if(e[t].createTimeVal<e[t+1].createTimeVal){var n=e[t];e[t]=e[t+1],e[t+1]=n}}(t.newsList))})},handleScroll:function(){var e=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;this.oBackTopFixed=100<e},oBackTop:function(){document.body.scrollTop=0,document.documentElement.scrollTop=0}}});