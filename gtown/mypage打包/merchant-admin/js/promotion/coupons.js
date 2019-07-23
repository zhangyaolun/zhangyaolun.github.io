var content = new Vue({
    el : "#content" ,
    data : {
        navData : [
            { text : "拼团管理" , linker : "./index.html" } ,
            // { text : "代金券管理" , linker : "javascript:void(0)" }
        ]
    } ,
    mounted : function () {
        var form = layui.form;
        var laydate = layui.laydate;
        var upload = layui.upload;

        laydate.render({
            elem : "#limitDate" ,
            type : "datetime"
        })
        //执行实例
        var uploadInst = upload.render({
            elem: '#upload1',
            url: '/upload/' ,
            done: function(res){
                //上传完毕回调
            } ,
            error: function(){
                //请求异常回调
            }
        });
        form.render();
    } ,
    methods : {
    } ,
    updated : function () {

    }
})