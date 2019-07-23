var URL = http.urls.logistics;
var content = new Vue({
    el : "#content" ,
    data : {
        navData : [
            { text : "已售订单管理" , linker : "./index.html" } ,
            // { text : "虚拟对码订单" , linker : "./fictitious_order.html" } ,
            { text : "发货" , linker : "./deliver.html" } ,
            { text : "发货设置" , linker : "./deliver_config.html" } ,
            { text : "物流工具" , linker : "./tool.html" } ,
            { text : "售卖区域" , linker : "./sale_area.html" } ,
            { text : "导入物流单" , linker : "javascript:void(0)" }
        ] ,
        file : {
            name : ""
        }
    } ,
    mounted : function () {
        var upload = layui.upload;
        var that = this;
        var layer = layui.layer;

        var loadidx;
        //执行实例
        var uploadInst = upload.render({
            elem: "#file" ,
            url: URL.importExcel ,
            accept : "file" ,
            exts : "csv|xlsx|xls" ,
            before : function () {
                loadidx = layer.load(2);
            } ,
            data : {
                sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId
            } ,
            auto : false ,
            bindAction : "#import" ,
            choose : function ( obj ) {
                //预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
                obj.preview(function(index, file, result) {
                    that.file = file;
                })
            } ,
            done: function(res){
                layer.msg("上传成功");
                //上传完毕回调
                layer.close(loadidx);
            },
            error: function(){
                //请求异常回调
                layer.msg("上传失败");
                layer.close(loadidx);
            }
        });
    }
})

