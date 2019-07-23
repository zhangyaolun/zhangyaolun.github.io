layui.use(['jquery', 'layer', 'element', 'laypage', 'laydate', 'form'], function () {
  window.jQuery = window.$ = layui.jquery;
  window.layer = layui.layer;
  var laypage = layui.laypage,
    laydate = layui.laydate,
    form = layui.layform;
    // layer = parent.layer === undefined ? layui.layer : parent.layer,
  // 日期时间
  laydate.render({
    elem: '#filter-fromDate',
    type: 'datetime'
  });
  laydate.render({
    elem: '#filter-toDate',
    type: 'datetime'
  });
  // 日期时间结束

  $(function () {
    // // 树结构
    // var zTreeObj;
    // // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
    // var setting = {
    //   callback: {
    //     onClick: onClick
    //   }
    // };
    // // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
    // var zNodes = [{
    //   name: "全部分类",
    //   name: "test1",
    //   open: true,
    //   children: [{
    //     name: "test1_1"
    //   },
    //   {
    //     name: "test1_2"
    //   }
    //   ]
    // },
    // {
    //   name: "test2",
    //   open: false,
    //   children: [{
    //     name: "test2_1"
    //   },
    //   {
    //     name: "test2_2"
    //   }
    //   ]
    // }
    // ];
    // // 树节点的点击事件
    // function onClick(event, treeId, treeNode, clickFlag) {
    //   $("#classifyId").val(treeNode.name);
    //   $(".brandTree").hide();
    // }
    // // 初始化树节点
    // $(document).ready(function () {
    //   zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
    // });
    // 商品列表增加点击样式
    // $(".pruductList ul").click(function () {
    //   $(this).addClass('active').siblings().removeClass('active');
    // });
    // 品牌选取
    // $("#filter-brand .selectBrand").click(function () {
    // $("body").on("click", "#filter-brand .selectBrand", function () {
    //   var brand = [{ name: 'nike' }, { name: 'new blance' }];
    //   var brandHtml = '<div class="brandDialog"><div class="cf"><div class="grid-wrap"><div class="productManger brandManger" ><div class="produtHead brandHead"><ul><li class="brandWidth">品牌名称</li></ul></div><div class="pruductList brandList">';
    //   for (var i = 0; i < brand.length; i++) {
    //     brandHtml += '<ul @click="selectBrand"><li class="brandWidth">' + brand[i].name + '</li></ul>';
    //   }
    //   brandHtml += '</div></div></div></div></div>';
      // layer.open({
      //   title: '选取品牌'
      //   , content: brandHtml
      //   , btn: ['确定', '取消']
      //   , area: ['757px', '525px']
      //   , type: 1
      //   , yes: function () {
      //     var value = $(".brandList ul.active").children('li').text()
      //     $("#brand_id").val(value);

      //     layer.closeAll();
      //   }
      // });
    //   $(".brandList ul").click(function () {
    //     $(this).addClass('active').siblings().removeClass('active');
    //     var value = $(this).children('li').text();
    //     // $("#brand_id").val(value);
    //   });
    // });
    // 品牌选取结束
  });
  // 树结构结束
});