var content = new Vue({
    el : "#enter" ,
    data : {
        userInfo : {}
    } ,
    mounted : function () {
        var carousel = layui.carousel;
        var $ = layui.jquery;

        this.userInfo = JSON.parse( sessionStorage.getItem("userInfo") ) || {};
        carousel.render({
            elem: "#swiper-container" ,
            width : "100%" ,
            height : "400px" ,
            autoplay : true ,
            arrow : "none"
        })
        // var swiper = new Swiper('.swiper-container', {
        //     loop : true ,
        //     autoplay : true ,
        //     allowTouchMove : false ,
        //     pagination: {
        //         el: '.swiper-pagination',
        //     },
        // });
        // $('.swiper-container').hover(function(){
        //         swiper.autoplay.stop();
        //     },function(){
        //         swiper.autoplay.start();
        //     }
        // )
    }
})