/*分类管理*/
var classConIndex = function() {
	var channelli = function() {
		classConPost();
	}
	var classConPost = function() {
		var classConPost_data = {'level':1,'channelCode':''}
		var classConsuc = function(data){
			var classList = '',parentId='';
			if(data.result){
				for(var i=0;i<data.result.length;i++){
					classList+='<div class="panel panel-white" id="collapseListItem'+i+'"><div class="panel-heading"><h5 class="panel-title"><a class="accordion-toggle collapsed classIs_toggle classOitem" data-toggle="collapse" data-parent="#accordion0" href="#collapseOne'+i+'" oIndex="1" oList="'+i+'" parentId="'+data.result[i].id+'" o_name="'+data.result[i].categoryName+'"><i class="icon-arrow"></i><font style="vertical-align: inherit;">'+data.result[i].categoryName+'</font></a><a href="#" class="btn btn-xs btn-light-beige tooltips classIs_toggle classCon_newAdd" data-placement="top" data-original-title="点击新增一级分类" item_oIndex="1" item_id=""><i class="fa fa-edit"></i></a></h5></div><div id="collapseOne'+i+'" class="panel-collapse collapse"><div class="panel-body collapseOne_body"></div></div></div>'
				}
				$('.classIs_container .classIs_panelBody').html(classList);
				classConClick();
			}else{
				classList='<div class="panel panel-white"><div class="panel-heading"><h5 class="panel-title"><a class="accordion-toggle collapsed classIs_toggle classOitem" data-toggle="collapse" data-parent="#accordion0" href="#collapseOne'+i+'" oIndex="1" oList="'+i+'" parentId="'+i+'" o_name=""><i class="icon-arrow"></i><font style="vertical-align: inherit;"></font></a><a href="#" class="btn btn-xs btn-light-beige tooltips classIs_toggle classCon_newAdd" data-placement="top" data-original-title="点击新增一级分类" item_oIndex="1" item_id=""><i class="fa fa-edit"></i></a></h5></div></div>'
				$('.classIs_container .classIs_panelBody').html(classList);
			}
			classCon_newAdd();
			runTooltips();
		}
		doPost('/category/searchCategoryByLevel',classConPost_data,classConsuc);
	}
	
	var classConClick = function() {
		$('.classOitem').unbind('click').on('click',function(){
			var _this = $(this),num = _this.attr('oIndex'),oList= _this.attr('oList'),par_name=_this.attr('o_name');
			if(!_this.hasClass('collapsed')) return;
				num++;
			var classConPost_dat = {'parentId':_this.attr('parentId')}
			var classConsuc = function(data){
				if(data.result){
				var classList = '';
				for(var i=0;i<data.result.length;i++){
					classList+='<div class="panel-group accordion" id="collapseListItem'+oList+'accordionOitem'+i+'"><div class="panel panel-white"><div class="panel-heading"><h5 class="panel-title"><a class="accordion-toggle collapsed classIs_toggle  classoTwo" data-toggle="collapse" data-parent="#collapseListItem'+oList+'accordionOitem'+i+'" href="#collapseListItem'+oList+'collapseTwo'+i+'" oIndex="2" oList="'+i+'" parentId="'+data.result[i].id+'" o_name="'+par_name+' / '+data.result[i].categoryName+'" itemIndex="'+oList+'"><i class="icon-arrow"></i><font style="vertical-align: inherit;">'+data.result[i].categoryName+'</font></a><a href="#" class="btn btn-xs btn-light-beige tooltips classIs_toggle classCon_newAdd" data-placement="top" data-original-title="点击新增二级分类" item_oIndex="2" item_name="'+par_name+'" item_id="'+_this.attr('parentId')+'"><i class="fa fa-edit"></i></a></h5></div><div id="collapseListItem'+oList+'collapseTwo'+i+'" class="panel-collapse collapse"><div class="panel-body collapseOne_body"></div></div></div></div>'
				}
				$("#collapseListItem"+oList+" #collapseOne"+oList+" .collapseOne_body").html(classList);
				classotTwo();
			}else{
				classList='<div class="panel-group accordion" id="collapseListItem'+oList+'accordionOitem'+i+'"><div class="panel panel-white"><div class="panel-heading"><h5 class="panel-title"><a class="accordion-toggle collapsed classIs_toggle classoTwo" data-toggle="collapse" data-parent="#collapseListItem'+oList+'accordionOitem'+i+'" href="#" oIndex="2" oList="" parentId="" o_name=""  itemIndex="'+oList+'"><i class="icon-arrow"></i><font style="vertical-align: inherit;"></font></a><a href="#" class="btn btn-xs btn-light-beige tooltips classIs_toggle classCon_newAdd" data-placement="top" data-original-title="点击新增二级分类" item_oIndex="2" item_name="'+par_name+'" item_id="'+_this.attr('parentId')+'"><i class="fa fa-edit"></i></a></h5></div></div></div>'
				$("#collapseListItem"+oList+" #collapseOne"+oList+" .collapseOne_body").html(classList);
			}
				runTooltips();
			}
			doPost('/category/findByParentId',classConPost_dat,classConsuc);
		})
		function classotTwo(){
			$('.classoTwo').unbind('click').on('click',function(){
				var _this = $(this),num = _this.attr('oIndex'),oList= _this.attr('oList'),
					itemIndex= _this.attr('itemIndex'),
					par_name=_this.attr('o_name');
				if(!_this.hasClass('collapsed')) return;
					num++;
				var classConPost_da = {'parentId':_this.attr('parentId')}
				var classConsuc = function(data){
					if(data.result){
						var classList = '';
						for(var i=0;i<data.result.length;i++){
							classList+='<div class="panel-group accordion" id="coItem'+itemIndex+oList+'accorClassoTwo'+i+'"><div class="panel panel-white"><div class="panel-heading"><h5 class="panel-title"><a class="accordion-toggle collapsed classIs_toggle classoThree" data-toggle="collapse" data-parent="#coItem'+itemIndex+oList+'accorClassoTwo'+i+'" href="#coItem'+itemIndex+oList+'classoTh'+i+'" oIndex="'+num+'" oList="'+i+'" parentId="'+data.result[i].id+'" o_name="'+par_name+' / '+data.result[i].categoryName+'"  itemIndex="'+itemIndex+oList+'"><i class="icon-arrow"></i><font style="vertical-align: inherit;">'+data.result[i].categoryName+'</font></a><a href="#" class="btn btn-xs btn-light-beige tooltips classIs_toggle classCon_newAdd" data-placement="top" data-original-title="点击新增三级分类" item_oIndex="3" item_name="'+par_name+'" item_id="'+_this.attr('parentId')+'"><i class="fa fa-edit"></i></a></h5></div><div id="coItem'+itemIndex+oList+'classoTh'+i+'" class="panel-collapse collapse"><div class="panel-body collapseOne_body"></div></div></div></div>'
						}
						$("#collapseListItem"+itemIndex+"collapseTwo"+oList+" .collapseOne_body").html(classList);
						classoThree();
					}else{
						classList='<div class="panel-group accordion" id="coItem'+itemIndex+oList+'accorClassoTwo'+i+'"><div class="panel panel-white"><div class="panel-heading"><h5 class="panel-title"><a class="accordion-toggle collapsed classIs_toggle classoThree" data-toggle="collapse" data-parent="#coItem'+itemIndex+oList+'accorClassoTwo'+i+'" href="#coItem'+itemIndex+oList+'classoTh'+i+'" oIndex="" oList="" parentId="" o_name="" itemIndex="'+itemIndex+oList+'"><i class="icon-arrow"></i><font style="vertical-align: inherit;"></font></a><a href="#" class="btn btn-xs btn-light-beige tooltips classIs_toggle classCon_newAdd" data-placement="top" data-original-title="点击新增三级分类" item_oIndex="3" item_name="'+par_name+'" item_id="'+_this.attr('parentId')+'"><i class="fa fa-edit"></i></a></h5></div></div></div>'
						$("#collapseListItem"+itemIndex+"collapseTwo"+oList+" .collapseOne_body").html(classList);
					}
					runTooltips();
				}
				doPost('/category/findByParentId',classConPost_da,classConsuc);
			})
		}
		function classoThree(){
			$('.classoThree').unbind('click').on('click',function(){
				var _this = $(this),num = _this.attr('oIndex'),oList= _this.attr('oList'),
					itemIndex= _this.attr('itemIndex'),
					par_name=_this.attr('o_name');
				if(!_this.hasClass('collapsed')) return;
					num++;
				var classConPost_d = {'parentId':_this.attr('parentId')}
				var classConsuc = function(data){
					var classList = '';
					if(data.result){
						for(var i=0;i<data.result.length;i++){
							classList +='<div class="panel-group accordion" id="classoFore'+itemIndex+oList+'"><div class="panel panel-white"><div class="panel-heading"><h5 class="panel-title"><a class="accordion-toggle collapsed classIs_toggle" data-toggle="collapse" data-parent="" href="#" oIndex="'+num+'"><font style="vertical-align: inherit;">'+data.result[i].categoryName+'</font></a><a href="#" class="btn btn-xs btn-light-beige tooltips classIs_toggle classCon_newAdd" data-placement="top" data-original-title="点击新增四级分类" item_oIndex="4" item_name="'+par_name+'" item_id="'+_this.attr('parentId')+'"><i class="fa fa-edit"></i></a></h5></div></div></div>'
						}
					}else{
						classList ='<div class="panel-group accordion" id="classoFore'+itemIndex+oList+'"><div class="panel panel-white"><div class="panel-heading"><h5 class="panel-title"><a class="accordion-toggle collapsed classIs_toggle" data-toggle="collapse" data-parent="#classoThree'+num+'" href="#classoFo'+oList+'" oIndex="'+num+'"><font style="vertical-align: inherit;"></font></a><a href="#" class="btn btn-xs btn-light-beige tooltips classIs_toggle classCon_newAdd" data-placement="top" data-original-title="点击新增四级分类" item_oIndex="4" item_name="'+par_name+'" item_id="'+_this.attr('parentId')+'"><i class="fa fa-edit"></i></a></h5></div></div></div>'
					}
					$("#coItem"+itemIndex+"classoTh"+oList+" .collapseOne_body").html(classList);
					runTooltips();
				}
				doPost('/category/findByParentId',classConPost_d,classConsuc);
			})
		}
	};
	function classCon_newAdd(){
		$('.classIstation_name').editable({
            validate: function (value) {
                if (!$.trim(value)) {return '不能为空';}
            }
        });
		$('#accordion0').on('click','.classCon_newAdd',function(){
			$(this).blur();
			var _this=$(this),
			panel_title=_this.attr('data-original-title');
			var level = _this.attr('item_oIndex'),
				parentId = _this.attr('item_id');
			$('.item_name').html(_this.attr('item_name'));
			$('.panel_title').html(panel_title.substring(2,panel_title.length));
			$('.classCon_elasticDiv').show().addClass("animated bounceIn").on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				$(this).removeClass("animated bounceIn");
			});
			$('.classCon_elasticDiv').scrollUnique();
			$('.buttonClassCon_true').unbind("click").on('click',function(){
				xcsoftTitle();
				var categoryName = $('.classIstation_name').html(),
					icon = '';
				if(categoryName == '点击输入分类名称'){xcsoft.error('请点击输入分类名称',1500);return;};
				$('.classCon_name').hide();
				$('.classCon_type').show();
				$('.buttonClass_true').unbind("click").on('click',function(){
					var oType = $(this).attr('oType'),
						_name = '',
						_olList = 'salesOl';
					if(oType == '0'){
						_name = 'sclass_sales';
						_olList = 'salesOl';
					}else{
						_name = 'sclass_sales2';
						_olList = 'waresOl';
					}
					var sales_name = $("."+_name+" .form-control").val(),
						sales_textarea = $("."+_name+" textarea").val();
					$("."+_olList).append('<li>'+sales_name+'：'+sales_textarea+'</li>');
					$("."+_name+" .form-control").val('');
					$("."+_name+" textarea").val('');
				})
				$('.buttonClass_submit').unbind("click").on('click',function(){
					var salesAttributeValue = {},waresAttributeValue = {};
					for(var o=0;o<$(".salesOl li").length;o++){
						salesAttributeValue[o]=$(".salesOl li").eq(o).html()
					}
					for(var s=0;s<$(".waresOl li").length;s++){
						waresAttributeValue[s]=$(".waresOl li").eq(s).html()
					}
					var classConPost_add = {
						'channelCode':'',
						'level':level,
						'parentId':parentId,
						'categoryName':categoryName,
						'icon':icon,
						'salesAttributeValue':JSON.stringify(salesAttributeValue),
						'waresAttributeValue':JSON.stringify(waresAttributeValue)
					}
					var btn_exmineClick = function(){
						var classConsuc = function(data){
							if(data.msg == '添加分类成功'){
								modReload('添加成功');
							}else{
								xcsoft.error('添加失败',1000);
							}
						}
						doPost('/category/addCategory',classConPost_add,classConsuc);
					}
					examIndexUp('添加此分类',btn_exmineClick);
					showData('examineIndex');
				})
			})
		})
		$('.classDiv_close').on('click',function(){
			$('.classCon_elasticDiv').hide();
		})
	}
	return {
		init: function() {
			channelli();
		}
	};
}();

/*品牌管理*/
var shopMain = function() {
	var channelAddClick = function() {
		oPost('');
		//查询
		$('.buttonshop_search').on('click',function(){
			var brandName = $('#form-field-1').val();
			oPost(brandName);
		})
		//新增品牌
		$('.brandAdd').on('click',function(){
			showData('elasticIndex');
		})
		$('.roleDiv_close').on('click',function(){$('.elasticIndex').hide();});
		//确定新增
		$('.butAdd_sure').on('click',function(){
			var brandName = $('.brandName').val(),
				industryRanking = $('.industryRanking').val(),
				yearSales = $('.yearSales').val(),
				fit = $('.fit').val(),
				proposalChannel = $('.proposalChannel').val(),
				priceSection = $('.priceSection').val(),
				recommendedReasons = $('.recommendedReasons').val();
			var dataAdd = {
				'brandName':brandName,
				'industryRanking':industryRanking,
				'yearSales':yearSales,
				'fit':fit,
				'proposalChannel':proposalChannel,
				'priceSection':priceSection,
				'recommendedReasons':recommendedReasons
			}
			if(!checkNotEmpty(brandName)){xcsoft.error('请输入品牌名',1500);return;};
			if(!checkNotEmpty(industryRanking)){xcsoft.error('请输入行业排名',1500);return;};
			if(!checkNotEmpty(yearSales)){xcsoft.error('请输入年销售额',1500);return;};
			if(!checkNotEmpty(fit)){xcsoft.error('请输入适合人群年龄区间',1500);return;};
			if(!checkNotEmpty(proposalChannel)){xcsoft.error('请输入建议渠道',1500);return;};
			if(!checkNotEmpty(priceSection)){xcsoft.error('请输入价格区间',1500);return;};
			var btn_exmineClick = function(){
				var addConsuc = function(data){
					if(data.msg == '添加成功'){
						modReload('添加成功');
					}else{
						xcsoft.error('添加失败',1000);
					}
				}
				doPost('/brand/addBrand',dataAdd,addConsuc);
			}
			examIndexUp('此操作',btn_exmineClick);
			showData('examineIndex');
		})
		
		function oPost(brandName_seach){
			var searchConsuc = function(data){
				if(data.result){
					var _result = data.result,ohtml='';
					for(var t=0;t<_result.length;t++){
						var logo = _result[t].logo?_result[t].logo:'',
							recommendedReasons = _result[t].recommendedReasons?_result[t].recommendedReasons:'',
							industryRanking = _result[t].industryRanking?_result[t].industryRanking:'';
						ohtml+='<tr><td class="center">'+_result[t].brandName+'</td><td class="center">'+industryRanking+'</td><td class="center">'+_result[t].yearSales+'</td><td class="center">'+_result[t].fit+'</td><td class="center">'+_result[t].proposalChannel+'</td><td class="center">'+_result[t].priceSection+'</td><td class="center">'+recommendedReasons+'</td></tr>'
					}
					$('#shop_table tbody').show();
					$('#shop_table tbody').html(ohtml);
					$('.userIndex_table_false').hide();
				}else{
					$('#shop_table tbody').hide();
					$('.userIndex_table_false').show();
				}
			}
			var odata = {
				'brandName':brandName_seach
			}
			doPost('/brand/searchBrand',odata,searchConsuc);
		}
	
	};
	return {
		init: function() {
			channelAddClick();
		}
	};
}();

/*SPU管理spu管理*/
var skuMain = function() {
	var skuIstation = function() {
		channelList();
		searchBrand(2,'brand_id');
		searchBrand(1,'brandName');
		sendBusiness(11);
		//查询所有分类
		ByLevelcategory_id();
		skuIsClick();
		//查询用户
        JSONfindUser('productManagerId',2);
		//检测金额
		checkNotAB('checkMoneyOne','checkMoneyTwo');
		//富文本上传图片
		$('.summernote').summernote({
	        height: 200,
	        tabsize: 2,
	        lang: 'zh-CN',
	        callbacks: {  
	            onImageUpload: function(files) {
	                img = sendFile(files[0]);  
	            }
	        } 
	    });
	    function sendFile(file) {  
		    data = new FormData();  
		    data.append("file", file);  
		    $.ajax({  
		        data: data,  
		        type: "POST",  
		        url: "/upload/file",  
		        cache: false,  
		        contentType: false,  
		        processData: false,  
		        success: function(url) {  
		        	if(url.result){
		                $("#summernote").summernote('insertImage', url.result, 'image name'); //url.result
					}else{
						xcsoft.error('文件上传失败',1000);
					}
		        }  
		    });  
		}
	    
	    $('.panel-heading .note-btn-group').last().remove();
	    $('.panel-heading .note-btn-group').last().find('button').last().remove();
	    dopostData(1);
	};
	var skuIsClick = function() {
		//查询
		$('.button_search').on('click',function(){
			dopostData(1);
		})
		
		//新增
		$('.sukAdd').unbind('click').on('click',function(){
			Reset();
			ByLevelData('multipleScroller');
			$('.butSUK_nextTwo').attr('otype','1');
			$(".sukTwo_lableSpan").html('');
			$(".breadcrumb").html('');
			$('.sukIndex').show().addClass("animated slideInLeft").on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				$(this).removeClass("animated slideInLeft");
			});
			$('.sukIndex').scrollUnique();
			$('.sukIndex_type').show();
			$('.sukIndex_two').hide();
			$('.butSUK_up').hide();
		})
		$('.sukDiv_close').on('click',function(){
			$('.sukIndex').hide();
		})
		
		/*点击下一步*/
		$('.butSUK_next').unbind('click').on('click',function(){
			var Next_attr = $('.multipleScroller').val();
			if(!checkNotEmpty(Next_attr)){xcsoft.error('请选择商品类型',1500);return;};
			if(Next_attr.length >=2){xcsoft.error('只能选择一个类型',1500);return;};
			typeList(Next_attr,1);
		})
		/*点击上一步*/
		$('.butSUK_up').unbind('click').on('click',function(){
			var Next_attr = $(this).attr('id');
			if($('.breadcrumb li').length==1){
				ByLevelData('multipleScroller');
				$('.breadcrumb').html('');
				$('.butSUK_up').hide();
			}else{
				typeList(Next_attr,2);
			}
		})
		
		function typeList(Next_attr,type){
			if(type == 1){
				Next_attr2 = Next_attr[0].split('-');
				$('.breadcrumb').append('<li class="active" oid="'+Next_attr+'"><a href="#">'+Next_attr2[1]+'</a></li>');
				if($('.breadcrumb li').length>=2){
					$('.butSUK_up').attr('id',$('.breadcrumb li').eq(-2).attr('oid'));
				}
			}else{
				Next_attr2 = Next_attr.split('-');
				$('.breadcrumb li').eq(-1).remove();
			}
			$('.breadcrumb li').length>=1?$('.butSUK_up').show():$('.butSUK_up').hide();
			
			var findByParentIdSuc = function(data){
				if(data.result){
					var channal_html='';
					for(var r=0;r<data.result.length;r++){
						categoryCode = data.result[r].categoryCode || '';
						channal_html+='<option value="'+data.result[r].id+'-'+data.result[r].categoryName+'-'+JSONstringify(data.result[r].salesAttributeValue)+'-'+JSONstringify(data.result[r].waresAttributeValue)+'-'+categoryCode+'"><font style="vertical-align: inherit;">'+data.result[r].categoryName+'</font></option>'
					}
					$('.multipleScroller').html(channal_html);
				}else{
					var ab = '';
					for(var p=0;p<$('.breadcrumb li').length;p++){
						ab += $('.breadcrumb li').eq(p).find('a').html() + '-';
					}
					ab = ab.substr(0, ab.length - 1);
					$(".sukTwo_lableSpan").html(ab);
					$(".sukTwo_lableSpan").attr('oid',Next_attr2[0]+'-'+Next_attr2[4]);
					var sales = JSONparse(Next_attr2[2]),
						wares = JSONparse(Next_attr2[3]),
						salesLi = '',waresLi = '',
						salesDiv = '',waresDiv = '',
						sarr = Object.keys(sales),
						warr = Object.keys(wares);
						saleswares(sarr,sales,salesLi,salesDiv,'salesAtt','salesAttDiv');
						saleswares(warr,wares,waresLi,waresDiv,'waresAtt','waresAttDiv');
					//全选
					$('.tabbable').on('click','.butTable_more',function(){		
						var _checked,_this=$(this);
						if(_this.attr('btnChecked') != 'false'){
							_checked=true;
							_this.attr('btnChecked','false');
							$(this).parent().find("input[name='checkName']").each(function(k,v) { 
            				v.checked = _checked;
       					});
							tableContent();
						}else{
							_checked=false;
							_this.attr('btnChecked','true');
							$(this).parent().find("input[name='checkName']").each(function(k,v) { 
            				v.checked = _checked;
       					});
							$('#sample_table tbody').html('');
						}
					})
					$(".salesAttDiv input[name='checkName']").change(function() {
						tableContent();
				    });
					var abc = [];
					var selectedArr = {};
					for(var i=0;i<$('.salesAtt li').length;i++){
						abc.push($('.salesAtt li').eq(i).html());
					}
					function tableContent() {
						$(".salesAttDiv .tabbable_div").each(function(index, ele) {
							var aa = $(this).find("input[name='checkName']");
							selectedArr[index] = []
							for(var i = 0; i < aa.length; i++) {
								if(aa[i].checked){
									selectedArr[index][i] = {};
									selectedArr[index][i]["dataid"] = $(aa[i]).attr("data-id");
									selectedArr[index][i]["datatext"] = $(aa[i]).attr('value');
								}
							}
						})
						getResult(selectedArr);
					}
					var SkuCell = function(celllist, dataid) {
						$('#sample_table tbody').append('<tr id="' + dataid + '" class="sku_cell"><td class="center">' + celllist + '</td><td class="center"><input class="form-control" type="text" placeholder="请输入市场价" value="" onblur="this.value<=0?this.value=\'\':this.value=this.value"/></td><td class="center"><input class="form-control" type="text" placeholder="请输入建议售价" value="" onblur="this.value<=0?this.value=\'\':this.value=this.value"/></td><td class="center"><input class="form-control" type="text" placeholder="请输入税率" value="17"  onblur="this.value<=0?this.value=\'\':this.value=this.value"/><span class="input-group-addon">%</span></td><td class="center"><input class="form-control" type="text" placeholder="请输入重量" value="" onblur="this.value<=0?this.value=\'\':this.value=this.value"/><span class="input-group-addon">克</span></td><td class="center"><input class="form-control" type="text" placeholder="请输入税务号" value="" onblur="this.value<=0?this.value=\'\':this.value=this.value"/></td><td class="center"><input class="form-control" type="text" placeholder="请输入返利" value="0" onblur="this.value<0?this.value=\'\':this.value=this.value"/></td></tr>')
					};
					
					function getResult() {
						var head = arguments[0][0];
						for(var i in arguments[0]) {
							if(i != 0) {
								head = group(head, arguments[0][i])
							}
						}
						tabledata = [];
						$(".sku_cell").each(function(index) {
							tabledata.push($(this).attr("id"))
						}).hide()
						for(var j = 0, len = head.length; j < len; j++) {
							if(head[j]){
								var newcell = head[j]["datatext"];
								var dataid = head[j]["dataid"];
								if(tabledata.indexOf(dataid) < 0) {
									SkuCell(newcell, dataid);
								} else {
									$("#" + dataid).show()
								}
							}
						}
					};
					function group(first, second) {
						var result = [];
						for(var i = 0, leni = first.length; i < leni; i++) {
							for(var j = 0, len = second.length; j < len; j++) {
								if(first[i] && second[j]){
									result.push({
										dataid: first[i]["dataid"] + "-" + second[j]["dataid"],
										datatext: first[i]["datatext"] + "/" + second[j]["datatext"]
									})
								}
							}
						}
						return result
					}
					$('.sukIndex_type').hide();
					$('.sukIndex_two').show();
				}
			}
			findByParentId(Next_attr2[0],findByParentIdSuc);
		}
		
		$('.productType').on("change propertychange", function(){
			$(".suk_sendType input[type=radio]").each(function(k,v) { 
	            v.checked = false;
	        });
	        if($('.productType').val() == 2){
	        	$('.suk_sendType').show();
	        }else{
	        	$('.suk_sendType').hide();
	        	$('.suk_sendBusiness').hide();
	        }
		})
		
		//提交
		$('.butSUK_nextTwo').unbind('click').on('click',function(){
			var productName = $('.productName').val(),	
				oidArr = $(".sukTwo_lableSpan").attr('oid').split('-'),
				categoryId = oidArr[0],
				categoryCode = oidArr[1],
				marketPrice = $('.marketPrice').val(),
				brandName = $('.brandName').val()?$('.brandName').val().split('|')[1]:'',
				brandId = $('.brandName').val()?$('.brandName').val().split('|')[0]:'',
				instalmentsPrice = $('.instalmentsPrice').val(),
				instalmentsNum = $('.instalmentsNum').val(),
				purchasePrice = $('.purchasePrice').val(),
				productManagerId = $('.productManagerId').val(),
				productNature = $(".productNature input[type='radio']:checked").val(),
				Is3c = $(".productIs3c input[type='radio']:checked").val(),
				productType = $('.productType').val(),
				suk_sendType = '',
			    suk_sendBusiness = $(".sendBusiness").val(),
				productDetail =  $('.summernote').summernote('code');
			if($('.productType').val() == 2){
				suk_sendType = $('.suk_sendType input[type=radio]:checked').val();
				if(!checkNotEmpty(suk_sendType)){xcsoft.error('请选择发货方式',1500);return;};
			}
			if(!checkNotEmpty(productName)){xcsoft.error('请输入商品名称',1500);return;};
			if(!checkNotEmpty(marketPrice)){xcsoft.error('请输入市场价格',1500);return;};
			if(!checkNotEmpty(brandName)){xcsoft.error('请选择品牌',1500);return;};
			if(!checkNotEmpty(instalmentsPrice)){xcsoft.error('请输入分期价格',1500);return;};
			if(!checkNotEmpty(instalmentsNum)){xcsoft.error('请输入期数',1500);return;};
			if(!checkNotEmpty(purchasePrice)){xcsoft.error('请输入采购价格',1500);return;};
			
			var serviceType = '';
			for(var i=0;i<$('.spushopImg .file_list_item .file_preview').length;i++){
				serviceType +=$('.spushopImg .file_list_item .file_preview').eq(i).find('.up_images').attr('src')+',';
    		}
			if(serviceType){
				serviceType = serviceType.substr(0, serviceType.length - 1);
			}
			var _this = $(this),oData = {},oDUrl='',oDataConsuc='';
			var btn_exmineClick = function(){
				if(_this.attr('otype') == 1){
					var waresLi = [],waresDiv = [],waresDhtml='',wfalg=false,productAttributeValue='',
					salesLi = [],salesDiv = [],salesDhtml='',sfalg=false,salesAttributeValue='';
					var ad = waresLiDiv(waresLi,'waresAtt',waresDhtml,waresDiv,wfalg,productAttributeValue);
					var ed = waresLiDiv(salesLi,'salesAtt',salesDhtml,salesDiv,sfalg,salesAttributeValue);
					if((typeof ad) == 'undefined'){return;}
					if((typeof ed) == 'undefined'){return;}
					if($('.salesAttDiv').html() != ''){
						if($('#sample_table tbody tr').length==0){
							xcsoft.error('请选择销售属性',1500);return;
						}
					}
					function waresLiDiv(sal,ware,wareh,waresDi,sfa,product){
						for(var i=0;i<$("."+ware+" li").length;i++){
							sal.push($("."+ware+" li").eq(i).find('a').html());
							wareh = '';
							$("#"+ware+i+" input[name='checkName']").each(function(k,v){
								if(v.checked){
									wareh+=v.value+'|'
									sfa=true;
								}
							})
							if(!sfa){xcsoft.error('请输入商品属性',1500);return;};
							wareh = wareh.substr(0, wareh.length - 1); 
							waresDi.push(wareh);
						}
						for(var j=0;j<sal.length;j++){
							product += sal[j]+'：'+waresDi[j]+','
						}
						product = product.substr(0, product.length - 1);
						return product;
					}
					var weight = '';
					for(var t=0;t<$('.sku_cell').length;t++){
						if($('.sku_cell').eq(t).css('display') == 'table-row'){
							for(var d=0;d<$('.sku_cell').eq(t).find('td').length;d++){
								if(d==0){
									weight+=$('.sku_cell').eq(t).find('td')[0].innerHTML+'|'
								}else{
									var wVal = $('.sku_cell').eq(t).children('td:eq('+d+')').find("input").val();
									if(wVal == ''){
										xcsoft.error('销售属性各属性输入不能为空',2000);
										return ;
									}else{
										if(d == 1 || d==2){
											wVal = (wVal*100).toFixed(0)
										}else if(d == 3){
											wVal = (wVal/100).toFixed(2)
										}else if(d == 6){
											if(wVal<1){
												wVal = wVal
											}else{
												wVal = (wVal*100).toFixed(0)
											}
										}
										weight+=wVal+'|'
									}
								}
							}
							weight = weight.substr(0, weight.length - 1);
							weight+=','
						}
					}
					weight = weight.substr(0, weight.length - 1);
					
					oData = {
						'productName':productName,	//商品名称
						'categoryId':categoryId,		//分类ID
						'categoryCode':categoryCode,		//分类Code
						'marketPrice':(marketPrice*100).toFixed(0),		//市场价格
						'brandId':brandId ,			//品牌ID
						'brandName':brandName,		//品牌名称
						'instalmentsPrice':(instalmentsPrice*100).toFixed(0),	//分期价格
						'instalmentsNum':instalmentsNum,		//期数
						'purchasePrice':(purchasePrice*100).toFixed(0),		//采购价格
						'productManagerId':productManagerId || '',	//产品经理ID
						'productNature':productNature,		//有无序列号
						'is3c':Is3c,		//3C   非3C
						'productType':productType,		//实物，虚拟物品，赠品
						'salesAttributeValue':ed,	//销售属性值 以JSON格式传输
						'productAttributeValue':ad, //商品属性值 以JSON格式传输
						'productDetail':productDetail,		//产品详情
						'skuModList':weight,		//,
						'sendType':suk_sendType,		//,0发卡密 1供应商发
						'sendBusiness':suk_sendBusiness,		//,发送供应商的ID
						'imageList':serviceType,		//,主图
					}
					
					oDUrl='/items/addProductSpu';
					oDataConsuc = function(data){
						if(data.msg == '添加成功'){
							modReload('添加成功');
						}else{
							xcsoft.error('添加失败',1000);
						}
					}
				}else{
					var weight = '';
					for(var t=0;t<$('.sku_cell').length;t++){
						if($('.sku_cell').eq(t).css('display') == 'table-row'){
							for(var d=0;d<$('.sku_cell').eq(t).find('td').length;d++){
								if(d==0){
									weight+=$('.sku_cell').eq(t).find('td')[0].innerHTML+'|'
								}else{
									var wVal = $('.sku_cell').eq(t).children('td:eq('+d+')').find("input").val();
									if(wVal == ''){
										xcsoft.error('销售属性各属性输入不能为空',2000);
										return ;
									}else{
										if(d == 1 || d==2){
											wVal = (wVal*100).toFixed(0)
										}else if(d == 3){
											wVal = (wVal/100).toFixed(2)
										}else if(d == 6){
											if(wVal<1){
												wVal = wVal
											}else{
												wVal = (wVal*100).toFixed(0)
											}
										}
										weight+=wVal+'|'
									}
								}
							}
							weight = weight+$('.sku_cell').eq(t).attr('id');
							weight+=','
						}
					}
					weight = weight.substr(0, weight.length - 1);
					oData = {
						'id':_this.attr('otype'),
						'productName':productName,	//商品名称
						'categoryId':categoryId,		//分类ID
						'categoryCode':categoryCode,		//分类Code
						'marketPrice':(marketPrice*100).toFixed(0),		//市场价格
						'brandId':brandId,			//品牌ID
						'brandName':brandName,		//品牌名称
						'instalmentsPrice':(instalmentsPrice*100).toFixed(0),	//分期价格
						'instalmentsNum':instalmentsNum,		//期数
						'purchasePrice':(purchasePrice*100).toFixed(0),		//采购价格
						'productManagerId':productManagerId || '',	//产品经理ID
						'productNature':productNature,		//有无序列号
						'is3c':Is3c,		//3C   非3C
						'productType':productType,		//实物，虚拟物品，赠品
						'productDetail':productDetail,		//产品详情
						'skuModList':weight,		//sku,
						'sendType':suk_sendType,		//,0发卡密 1供应商发
						'sendBusiness':suk_sendBusiness,		//,发送供应商的ID
						'imageList':serviceType,		//,主图
					}
					
					oDUrl='/items/modProductSpu';
					oDataConsuc = function(data){
						if(data.msg == '修改成功'){
							modReload('修改成功');
						}else{
							xcsoft.error('修改失败',1000);
						}
					}
				}
				console.log(oData)
				doPost(oDUrl,oData,oDataConsuc);
			}
			examIndexUp('此操作',btn_exmineClick);
			showData('examineIndex');
		})
	};
	//属性
	function saleswares(sarr,sales,salesLi,salesDiv,salesAtt,salesAttDiv){
		if(salesAtt == 'salesAtt'){
			sarr.length == 0?$('.showNone_Table').hide():$('.showNone_Table').show();
		}else{
			sarr.length == 0?$('.showNone_waresAtt').hide():$('.showNone_waresAtt').show();
		}
		for(var n=0;n<sarr.length;n++){
			var naMe = sales[n].split('：');
			salesLi+='<li><a href="#'+salesAtt+n+'" data-toggle="tab">'+naMe[0]+'</a></li>'
			salesDiv+='<div class="tab-pane fade tabbable_div in" id="'+salesAtt+n+'"><button type="button" class="btn btn-info butTable_more" btnChecked="true">全选</button><div class="content_tab" >'
			var mAttr;
			naMe[1].split('|')?mAttr = naMe[1].split('|'):mAttr = naMe[1];
			for(var m=0;m<mAttr.length;m++){
				salesDiv+='<div class="content_div"><label class="checkbox-inline "><font style="vertical-align: middle;">'+mAttr[m]+'</font></label><input type="checkbox" value="'+mAttr[m]+'" name="checkName" class="green" data-id="'+n+m+'"></div>'
			}
			salesDiv+='</div></div>'
		}
		$("."+salesAtt).html(salesLi);
		$("."+salesAttDiv).html(salesDiv);
		$("."+salesAtt+" li").eq(0).addClass('active');
		$("."+salesAttDiv+" .tabbable_div").eq(0).addClass('active in');
		
	}
	//查询所有分类
	function ByLevelData(category_id){
		var ByLevelSuc = function(data){
			if(data.result){
				var channal_html = '';
				for(var r=0;r<data.result.length;r++){
					categoryCode = data.result[r].categoryCode || '';
					channal_html+='<option value="'+data.result[r].id+'-'+data.result[r].categoryName+'-'+JSONstringify(data.result[r].salesAttributeValue)+'-'+JSONstringify(data.result[r].waresAttributeValue)+'-'+categoryCode+'"><font style="vertical-align: inherit;">'+data.result[r].categoryName+'</font></option>'
				}
				$("."+category_id).html(channal_html);
			}
		}
		searchCategoryByLevel(1,'',ByLevelSuc);
	}
	//数据
	function dopostData(currentPage){
		var brandName = $('.SPU_number').val(),
			channal_id = $('.channal_id').val(),
			sprice = $('.checkMoneyOne').val(),
			eprice = $('.checkMoneyTwo').val(),
			product_name = $('.product_name').val(),
			category_id = $('.category_id').val()?$('.category_id').val().split('-')[0]:'',
			brand_id = $('.brand_id').val()?$('.brand_id').val().split('|')[0]:'';
		if(!category_id){return;}
		var searchBrand = {
			'spu_id':brandName || '',
			'channal_id':channal_id || '',
			'sprice':(sprice*100).toFixed(0) || parseFloat(0),
			'eprice':(eprice*100).toFixed(0) || parseFloat(0),
			'product_name':product_name || '',
			'categoryCode':category_id || '',
			'brand_id':brand_id,
			'currentPage':currentPage
		};
		var searchConsuc = function(data){
			var _result = data.result,ohtml='',productAttr = ['','实物','虚拟物品'],natureAttr = ['非3C','3C'];
			if(_result.reslutList.length != 0){
				for(var i=0;i<_result.reslutList.length;i++){
					var natu = _result.reslutList[i].is3c || 0,
						manager = _result.reslutList[i].manager || '',
						inNum = _result.reslutList[i].inNum || '',
						actualStock = _result.reslutList[i].actualStock || '',
						taxNo = _result.reslutList[i].taxNo || '',
						channelList = _result.reslutList[i].channelList || '';
					ohtml+='<tr><td class="center">'+_result.reslutList[i].spuCode+'</td><td class="center">'+checkValue(_result.reslutList[i].productName)+'</td><td class="center">'+(_result.reslutList[i].taxRate)*100+'%</td><td class="center">'+productAttr[_result.reslutList[i].productType]+'</td><td class="center">'+checkValue(_result.reslutList[i].cateName)+'</td><td class="center">'+natureAttr[natu]+'</td><td class="center">'+((_result.reslutList[i].marketPrice)/100).toFixed(2)+'</td><td class="center">'+((_result.reslutList[i].proPrice)/100).toFixed(2)+'</td><td class="center">'+((_result.reslutList[i].inPrice)/100).toFixed(2)+'</td><td class="center">'+inNum+'</td><td class="center">'+manager+'</td><td class="center">'+channelList+'</td><td class="center">'+taxNo+'</td><td class="center"><a href="#" class="btn btn-xs btn-blue tooltips buttonRole_title" data-placement="top" data-original-title="编辑" oid="'+_result.reslutList[i].id+'"><i class="fa fa-edit"></i></a></td></tr>'
				}
				$('#table_data tbody').html(ohtml);
				$('#table_data tbody').show();
				$('.userIndex_table_false').hide();
				runTooltips();
				buttonRole_click();
				if(!$('.stock_table tbody').attr('oPage')){
					OpageDisplay(_result.currentPage,_result.totalPage,'userPage');
				}
				$('.stock_table tbody').attr('oPage','1');
			}else{
				$('#table_data tbody').hide();
				$('.userPage').hide();
				$('.userIndex_table_false').show();
			}
		}
		doPost('/items/searchItemsList',searchBrand,searchConsuc);
	}
	function buttonRole_click(){
		//编辑
		$('.buttonRole_title').bind('click',function(){
			var _this = $(this);
			_this.blur();
			$('.sukIndex').show().addClass("animated slideInLeft").on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				$(this).removeClass("animated slideInLeft");
			});
			$('.sukIndex').scrollUnique();
			var ByIdConsuc = function(data){
				var _result=data.result,
				categoryCode = _result.categoryCode ||'',
				serviceTypeHtml=''
				$('.productName').val(_result.productName);	
				$(".sukTwo_lableSpan").attr('oid',_result.categoryId+'-'+categoryCode);
				$(".sukTwo_lableSpan").html(_result.categoryName);
				$('.marketPrice').val(_result.marketPrice/100);
				$('.brandName').val(_result.brandId+'|'+_result.brandName);
				$('.instalmentsPrice').val(_result.instalmentsPrice/100);
				$('.instalmentsNum').val(_result.instalmentsNum);
				$('.purchasePrice').val(_result.purchasePrice/100);
				$('.productManagerId').val(_result.productManagerId);
				$('.sendBusiness').val(_result.sendBusiness || $(".sendBusiness option").eq(0).attr("value"));
				$(".productNature input[value="+_result.productNature+"]").attr("checked",'checked');
				$(".productIs3c input[value="+_result.is3c+"]").attr("checked",'checked');
				$('.productType').val(_result.productType);
				if(_result.imageList){
					var _serviceType = _result.imageList.split(',');
					for(var i=0;i<_serviceType.length;i++){
						serviceTypeHtml +='<div oIndex="'+i+'" class="col-sm-3 file-preview-frame file_preview" style="cursor: pointer;width: 120px;height: 120px;padding: 0 0 0 0;border-radius: 2px;margin: 0 0 15px 15px;border: 1px solid #E6E8E8;"><img src="'+_serviceType[i]+'" class="file-preview-image up_images" title="" alt="" style="width:120px;height:120px;"/><div class="preview_timg center" style="display: none;"><img src="images/timg2.gif" class="file-preview_timg" title="" alt="" style="position:relative;left: 0;right: 0;margin: 0 auto;"><div>上传中...</div></div><div class="preview_del center" style="display: block;"><img src="images/close_window.png" class="file-preview_timg preview_del_img" oIndex="'+i+'" title="" alt=""></div></div>';
		    		}
				}
				$('.spushopImg .file_list_item').html(serviceTypeHtml);
				if($('.spushopImg .file_list_item .file_preview').length >= 10){
			    	$('.spushopImg .file_list .fileinput-button').hide();
			    }
				$(".suk_sendType input[type=radio]").each(function(k,v) { 
		            v.checked = false;
		        });
		        if(_result.productType == 2){
		        	$('.suk_sendType').show();
		        	$(".suk_sendType input[type=radio]").each(function(k,v) { 
			            if(v.value == _result.sendType){
			            	v.checked = true;
			            }
			        });
		        }else{
		        	$('.suk_sendBusiness').hide();	
		        	$('.suk_sendType').hide();
		        }
				
				$('.summernote').summernote('code',_result.productDetail);
				$('#sample_table tbody').html('');
				for(var i=0;i<data.result.skuList.length;i++){
					var salesAttri= data.result.skuList[i].salesAttributeName || '';
					$('#sample_table tbody').append('<tr id="' + data.result.skuList[i].id + '" class="sku_cell"><td class="center">' + salesAttri + '</td><td class="center"><input class="form-control" type="text" placeholder="请输入市场价" value="" onblur="this.value<=0?this.value=\'\':this.value=this.value"/></td><td class="center"><input class="form-control" type="text" placeholder="请输入建议售价" value="" onblur="this.value<=0?this.value=\'\':this.value=this.value"/></td><td class="center"><input class="form-control" type="text" placeholder="请输入税率" value="17"  onblur="this.value<=0?this.value=\'\':this.value=this.value"/><span class="input-group-addon">%</span></td><td class="center"><input class="form-control" type="text" placeholder="请输入重量" value="" onblur="this.value<=0?this.value=\'\':this.value=this.value"/><span class="input-group-addon">克</span></td><td class="center"><input class="form-control" type="text" placeholder="请输入税务号" value="" onblur="this.value<=0?this.value=\'\':this.value=this.value"/></td><td class="center"><input class="form-control" type="text" placeholder="请输入返利" value="0" onblur="this.value<0?this.value=\'\':this.value=this.value"/></td></tr>')
					$('#sample_table tbody tr').eq(i).children('td:eq(1)').find("input").val((data.result.skuList[i].marketPrice)/100);
					$('#sample_table tbody tr').eq(i).children('td:eq(2)').find("input").val((data.result.skuList[i].proposalPrice)/100);
					$('#sample_table tbody tr').eq(i).children('td:eq(3)').find("input").val((data.result.skuList[i].taxRate)*100);
					$('#sample_table tbody tr').eq(i).children('td:eq(4)').find("input").val(data.result.skuList[i].weight);
					$('#sample_table tbody tr').eq(i).children('td:eq(5)').find("input").val(data.result.skuList[i].taxNo);
					$('#sample_table tbody tr').eq(i).children('td:eq(6)').find("input").val((data.result.skuList[i].reBate)/100);
				}
				
			}
			var ByIdBrand = {'id':_this.attr('oid')}
			doPost('/items/searchSpuById',ByIdBrand,ByIdConsuc);
			$('.sukIndex_type').hide();
			$('.sukIndex_two .salesAtt').parent().parent().hide();
			$('.sukIndex_two .waresAtt').parent().parent().hide();
			$('.butSUK_nextTwo').attr('otype',_this.attr('oid'));
			$('.sukIndex_two').show();
		})
	}
	
    $('.spushopImg .file_list_item').unbind('click').on('click',function(event){
    	var _event = window.event || event;
    	if(_event.target.attributes.class.value == 'file-preview_timg preview_del_img'){
    		var btn_exmineClick = function(){
	    		for(var i=0;i<$('.spushopImg .file_list_item .file_preview').length;i++){
	    			if($('.spushopImg .file_list_item .file_preview').eq(i).attr('oIndex')  == _event.target.attributes.oindex.value){
	    				$('.spushopImg .file_list_item .file_preview').eq(i).remove();
	    			}
	    		}
	    		if($('.spushopImg .file_list_item .file_preview').length < 10){
			    	$('.spushopImg .file_list .fileinput-button').show();
			    }	
			    $('.examineIndex').hide();
    		}
    		examIndexUp('此操作',btn_exmineClick);
			showData('examineIndex');
    	}
	})
	/*商品主图上传*/
	$('.buttonchanSKU_newAdd').unbind('click').on('click',function(){
		$('.buttonchanSKU_inputFile').unbind('click').click();
		$('.buttonchanSKU_inputFile').unbind('change propertychange').on("change propertychange", function(){
			var	_this=$(this),
				value = _this[0].value,
				index = value.lastIndexOf("\\"),
				oName = value.substring((index+1),value.length);
			if(!oName){oName = $('.buttonchanSKU_newAdd').html();}
			var prefix=value.substring(value.lastIndexOf(".")+1,value.length);
			if(!prefix){return false;}
			$('.buttonchanSKU_newAdd').html(oName);
			if(!value){return false;}
			var filesize = (_this[0].size / 1024).toFixed(2); 
			if(!prefix){return false;}
		    if(prefix!='jpg'&&prefix!='png'&&prefix!='jpeg'&&prefix!='JPG'&&prefix!='PNG'&&prefix!='JPEG'&&prefix!='jpeg'&&prefix!='JPEG'){
		    	alert("图片类型必须是jpeg,jpg,png,JPEG,JPG,PNG");
			    return false;
		    }
		    if(filesize >= 20480){
		    	alert("文件大小不能大于20M");
			    return false;
		    }
		    var img_length = $('.spushopImg .file_list_item .file_preview').length || 0;
		    $('.spushopImg .file_list_item').append('<div oIndex="'+img_length+'" class="col-sm-3 file-preview-frame file_preview" style="cursor: pointer;width: 120px;height: 120px;padding: 0 0 0 0;border-radius: 2px;margin: 0 0 15px 15px;border: 1px solid #E6E8E8;"><img src="" class="file-preview-image up_images" title="" alt="" style="width:120px;height:120px;"/><div class="preview_timg center"><img src="images/timg2.gif" class="file-preview_timg" title="" alt="" style="position:relative;left: 0;right: 0;margin: 0 auto;"><div>上传中...</div></div><div class="preview_del center"><img src="images/close_window.png" class="file-preview_timg preview_del_img" oIndex="'+img_length+'" title="" alt=""></div></div>');
			var suc=function(url){
				if(url.result){
					setTimeout(function(){
						if($('.spushopImg .file_list_item .file_preview .up_images').length == 1){
							$('.spushopImg .file_list_item .file_preview .up_images').eq(0).attr('src',url.result);
						}else{
							$('.spushopImg .file_list_item .file_preview .up_images').eq(-1).attr('src',url.result);
						}
						$('.spushopImg .file_list .file_preview .preview_timg').eq(-1).hide();
						$('.spushopImg .file_list .file_preview .preview_del').eq(-1).show();
					    if($('.spushopImg .file_list_item .file_preview').length >= 10){
					    	$('.spushopImg .file_list .fileinput-button').hide();
					    }
					},200)
				}
			}
		    ajaxFileUpload(_this,suc);
			function ajaxFileUpload(target,callback) {
				var pid=$(target).attr("id");
				$.ajaxFileUpload({
				    url : '/upload/file', //用于文件上传的服务器端请求地址
				    secureuri : false, //一般设置为false
				    fileElementId : pid, //文件上传空间的id属性  <input type="file" id="file" name="file" />
				    type : 'post',
				    dataType : 'json', //返回值类型 一般设置为json
				    success : function(data) //服务器成功响应处理函数
				    {  
				     if(data.httpCode==200){
				        callback(data);
				      }else{
				      }
				    },
				    error : function(data)//服务器响应失败处理函数
				    {
				      alert("上传失败");
				    }
				})
				return false;
			}
		})
	})
	
		
		
		
	function OpageDisplay(pageNo,totalPages,userPage){
		$('.userPage').show();
		var currentPage = pageNo;
        var totalPages = totalPages;
        $("#page").bootstrapPaginator({
            bootstrapMajorVersion:3, //对应的bootstrap版本
            currentPage: currentPage, //当前页数
            numberOfPages: 10, //每次显示页数
            totalPages:totalPages, //总页数
            shouldShowPage:true,//是否显示该按钮
            useBootstrapTooltip:true,
           //点击事件
            onPageClicked: function (event, originalEvent, type, page) {
               dopostData(page);
            }
        });
	}
	function Reset(){
		$('.productName').val('');	
		$('.marketPrice').val(0);
		$('.brandName').val('');
		$(".sendBusiness option").eq(0).prop("selected", 'selected');
		$('.instalmentsPrice').val(0);
		$('.instalmentsNum').val(1);
		$('.purchasePrice').val(0);
		$('.spushopImg .file_list_item').html('');
		$('.productManagerId').val('');
		$(".productNature input[value='false']").prop("checked",'checked');
		$(".productIs3c input[value='0']").prop("checked",'checked');
		$('.productType').val(1);
		$('.summernote').summernote('code','');
		$('#sample_table tbody').html('');
		$('.sukIndex_two .salesAtt').parent().parent().show();
		$('.sukIndex_two .waresAtt').parent().parent().show();
	}
	return {
		init: function() {
			skuIstation();
		}
	};
}();



/*预审产品*/
var productsMain = function() {
	var productsClick = function() {
		checkNotAB('checkMoneyOne','checkMoneyTwo');
		ByLevelcategory_id();
		searchBrand(2,'brand_id');
		dopostData(1);
		var channelSuc = function(data){
			if(data.result){
				var channal_html='',ohtml='<option value=""><font style="vertical-align: inherit;">全部</font></option>';
				for(var r=0;r<data.result.length;r++){
					channal_html+='<div style="min-width:140px;white-space: nowrap;"><input type="checkbox" id="channelName'+r+'" class="" value="'+data.result[r].channelCode+'"><label class="checkbox-inline products_line" for="channelName'+r+'"><font style="vertical-align: middle;">'+data.result[r].channelName+'</font></label></div>'
					ohtml+='<option value="'+data.result[r].channelCode+'"><font style="vertical-align: inherit;">'+data.result[r].channelName+'</font></option>'
				}
				$('.tdlable').html(channal_html);
				$('.channal_id').html(ohtml);
			}
		}
		doPost('/channel/channelList','',channelSuc);
		//查询
		$('.button_search').on('click',function(){
			dopostData(1);
		})
		
		
		//数据
		function dopostData(currentPage){
			var brandName = $('.spu_id').val(),
				channal_id = $('.channal_id').val(),
				sprice = $('.checkMoneyOne').val(),
				eprice = $('.checkMoneyTwo').val(),
				product_name = $('.product_name').val(),
				category_id = $('.category_id').val()?$('.category_id').val().split('-')[0]:'',
				brand_id = $('.brand_id').val()?$('.brand_id').val().split('|')[0]:'';
			if(!category_id){return;}
			var searchBrand = {
				'spu_id':brandName || '',
				'channal_id':channal_id || '',
				'sprice':(sprice*100).toFixed(0) || parseFloat(0),
				'eprice':(eprice*100).toFixed(0) || parseFloat(0),
				'product_name':product_name || '',
				'categoryCode':category_id,
				'brand_id':brand_id || '',
				'currentPage':currentPage,
				'status':'-1'
			};
			var searchConsuc = function(data){
				var _result = data.result,ohtml='',aHtml='',cHtml='',productAttr = ['','实物','虚拟物品'],natureAttr = ['非3C','3C'];
				if(_result.reslutList.length != 0){
					var natu = '',
						manager ='',
						inNum = '',
						channelList ='';
					for(var i=0;i<_result.reslutList.length;i++){
						    natu = _result.reslutList[i].is3c || 0;
							manager = _result.reslutList[i].manager || '';
							inNum = _result.reslutList[i].inNum || '';
							channelList = _result.reslutList[i].channelList||'';
						ohtml+='<tr><td class="center">'+checkValue(_result.reslutList[i].spuCode)+'</td><td class="center">'+checkValue(_result.reslutList[i].productName)+'</td><td class="center">'+(_result.reslutList[i].taxRate)*100+'%</td><td class="center">'+productAttr[_result.reslutList[i].productType]+'</td><td class="center">'+_result.reslutList[i].cateName+'</td><td class="center">'+natureAttr[natu]+'</td><td class="center">'+((_result.reslutList[i].marketPrice)/100).toFixed(2)+'</td><td class="center">'+((_result.reslutList[i].proPrice)/100).toFixed(2)+'</td><td class="center">'+((_result.reslutList[i].inPrice)/100).toFixed(2)+'</td><td class="center">'+inNum+'</td><td class="center">'+manager+'</td><td class="center">'+channelList+'</td><td class="center"><a href="javascript:;" class="btn btn-xs btn-primary tooltips buttonUser_Enable" duata-placement="top" nature="'+_result.reslutList[i].status+'" oid="'+_result.reslutList[i].id+'">提报</a></td></tr>'
						}
					$('#table_data tbody').html(ohtml);
					$('.panel-body table tbody').show();
					$('.userPage').show();
					$('.userIndex_table_false').hide();
					runTooltips();
					products();
					OpageDisplay(_result.currentPage,_result.totalPage,'userPage');
				}else{
					$('.panel-body table tbody').hide();
					$('.userPage').hide();
					$('.userIndex_table_false').show();
				}
			}
			doPost('/items/tbItemsList',searchBrand,searchConsuc);
		}
		function products(){
			$('.buttonUser_Enable').unbind('click').on('click',function(){
				var _this = $(this);
				var ByIdConsuc = function(data){
					var _result=data.result,productAttr = ['','实物','虚拟物品'],natureAttr = ['非3C','3C'];
					if(_result.channelList){
						var channelListAttr = _result.channelList.split(',');
						$(".tdlable input[type='checkbox']").each(function(k,v){
							$(".tdlable input[type='checkbox']").eq(k).show();
							v.checked = false;
						})
						for (var t=0;t<channelListAttr.length;t++) {
							$(".tdlable input[type='checkbox']").each(function(k,v){
								if(v.value == channelListAttr[t]){
									$(".tdlable input[type='checkbox']").eq(k).hide();
								}
							})
						}
					}
					var _atu = _result.is3c || 0;	
					var chelder_html = '<tr><td class="center" style="border:none;">申请人</td><td class="center" style="border:none;">'+$.cookie("username")+'</td>/tr><tr><td class="center">SPU编号</td><td class="center">'+_result.spuCode+'</td>/tr><tr><td class="center">商品名称</td><td class="center">'+_result.productName+'</td>/tr><tr><td class="center">品牌</td><td class="center">'+checkValue(_result.brandName)+'</td>/tr><tr><td class="center">产品属性</td><td class="center">'+natureAttr[_atu]+'</td>/tr><tr><td class="center">产品类型</td><td class="center">'+productAttr[_result.productType]+'</td>/tr><tr><td class="center">所属分类</td><td class="center">'+_result.categoryName+'</td>/tr>'
					
					
					var _imageList = _result.imageList;
					if(_imageList){
						chelder_html +='<tr><td class="center" colspan="2">商品主图</td></tr>'
						var _imageListAttr = _imageList.split(',');
						for(var p=0;p<_imageListAttr.length;p++){
							if(p < 3){
								chelder_html +='<tr><td class="center" colspan="2" style="background-color: #f9f9f9;"><img src="'+_imageListAttr[p]+'" alt="" style="width:80%;"/></td></tr>'
							}
						}
					}
					
					$('#table_chelder tbody').html(chelder_html);	
					
					
					$('#sample_table tbody').html('');
					var salesAttributeName = '';
					for(var i=0;i<data.result.skuList.length;i++){
						salesAttributeName = data.result.skuList[i].salesAttributeName;
						if(salesAttributeName == 'null' || salesAttributeName == null){
							salesAttributeName = '';
						}
						$('#sample_table tbody').append('<tr id="' + data.result.skuList[i].id + '" class="sku_cell"><td class="center">' + data.result.skuList[i].skuCode + '</td><td class="center">' + salesAttributeName + '</td><td class="center"><input class="form-control tbprice" type="text" name="price" placeholder="请输入售价" index="'+i+'|'+data.result.skuList[i].skuCode+'" value="" proposalPrice="' + data.result.skuList[i].proposalPrice + '" onblur="this.value<=0?this.value=\'\':this.value=this.value"/></td><td class="center"><input class="form-control tbbankRate" type="text" placeholder="请输入佣金率" value="" name="bankRate" index="'+i+'|'+data.result.skuList[i].skuCode+'" onblur="this.value<=0?this.value=\'\':this.value=this.value"/><span class="input-group-addon">%</span></td><td class="center grossInte"></td><td class="center grossInteRate"></td><td class="center"></td><td class="center"></td></tr>')
					}
					$('.sukDiv_close').on('click',function(){
						$('.productsIndex').hide();
					})
					
					/*输入售价*/
					$("#sample_table tbody input[name='price']").unbind('blur').on('blur', function(){
						var _indexAttr = $(this).attr('index');
						calToHand(_indexAttr);	
					})
					/*输入佣金率*/
					$("#sample_table tbody input[name='bankRate']").unbind('blur').on('blur',function(){
						var _indexAttr = $(this).attr('index');
						calToHand(_indexAttr)
					})
					
					function calToHand(code){
						var _indexAttr = code.split('|'),
							_indexAttrIndex= _indexAttr[0],
							_indexcode= _indexAttr[1],
							_rate = $('#sample_table tbody tr').eq(_indexAttrIndex).find('.tbbankRate').val(),
							_price = $('#sample_table tbody tr').eq(_indexAttrIndex).find('.tbprice').val();
						if(_price == '' || _rate == ''){
							$('#sample_table tbody tr').eq(_indexAttrIndex).find('.grossInte').html('');
							$('#sample_table tbody tr').eq(_indexAttrIndex).find('.grossInteRate').html('');
							return ;
						}
						var SpuById = {
							'skuCode':_indexcode,
							'price':(parseInt(_price)*100).toFixed(0),
							'bankRate':(parseInt(_rate)/100).toFixed(2)
						}
						var SpuByIdsuc = function(data){
							if(data.result){
								$('#sample_table tbody tr').eq(_indexAttrIndex).find('.grossInte').html((parseInt(data.result.grossInte)/100).toFixed(2));
								$('#sample_table tbody tr').eq(_indexAttrIndex).find('.grossInteRate').html(data.result.grossInteRate*100+'%');
							}
						}
						doPost('/grossInterest/calculationToHand',SpuById,SpuByIdsuc);
					}
					
				}
				
				var ByIdBrand = {'id':_this.attr('oid')}
				doPost('/items/searchSpuById',ByIdBrand,ByIdConsuc);
				showData('productsIndex');
			})
			//提报
			$('.butSUK_proTwo').on('click',function(){
				var channelList='',falg=false;
				$(".tdlable input[type='checkbox']").each(function(k,v) {
					if($(".tdlable input[type='checkbox']").eq(k).css('display') == 'inline-block'){
						if(v.checked){
							channelList+=v.value+','
							falg=true;
						}
					}
		        }); 
		        if(!falg){xcsoft.error('请选择上架渠道',1500);return ;}
		        channelList = channelList.substr(0, channelList.length - 1);
		        var weight = '';
				for(var t=0;t<$('.sku_cell').length;t++){
					if($('.sku_cell').css('display') == 'table-row'){
						for(var d=0;d<$('.sku_cell').eq(t).find('td').length;d++){
							if(d==0){
								weight+=$('.sku_cell').eq(t).find('td')[0].innerHTML+'|'
							}else{
								if(d == 2 || d==3){
									var wVal = $('.sku_cell').eq(t).children('td:eq('+d+')').find("input").val();
									if(wVal == ''){
										xcsoft.error('提报商品的售价和税率输入不能为空',1500);
										return ;
									}else{
										d == 2?wVal = (wVal*100).toFixed(0):wVal = (wVal/100).toFixed(2);
										weight+=wVal+'|'
									}
								}
							}
						}
						weight = weight.substr(0, weight.length - 1);
						weight+=','
					}
				}
				weight = weight.substr(0, weight.length - 1);
				var addSkuPro = {
					'channelList':channelList,
					'tbSkuList':weight,
					'status':'1'
				}
				var btn_exmineClick = function(){
					var addSkuProConsuc = function(data){
						if(data.msg == '提交成功'){
							modReload('提报成功');
						}else{
							xcsoft.error('提报失败',1000);
						}
					}
					doPost('/items/addSkuPro',addSkuPro,addSkuProConsuc);
				}
				examIndexUp('提报此商品',btn_exmineClick);
				showData('examineIndex');
			})
		}
		function OpageDisplay(pageNo,totalPages,userPage){
			$('.userPage').show();
			var currentPage = pageNo;
	        var totalPages = totalPages;
	        $("#page").bootstrapPaginator({
	            bootstrapMajorVersion:3, //对应的bootstrap版本
	            currentPage: currentPage, //当前页数
	            numberOfPages: 10, //每次显示页数
	            totalPages:totalPages, //总页数
	            shouldShowPage:true,//是否显示该按钮
	            useBootstrapTooltip:true,
	           //点击事件
	            onPageClicked: function (event, originalEvent, type, page) {
	               dopostData(page);
	            }
	        });
	   }
	};
	return {
		init: function() {
			productsClick();
		}
	};
}();


/*渠道SKU对应*/
var channelSkuMain = function() {
	/*渠道SKU对应点击修改相关事件*/
	var channelSkuClick = function() {
		channelList();
		//查询用户
        JSONfindUser('managerId',1);
        searchBrand(2,'brand_id');
        //查询
		$('.buttonchanSKU_search').unbind('click').on('click',function(){
			dopostData(1);
		})
		dopostData(1);
		
		function dopostData(currentPage){
			var channal_id = $('.channal_id').val(),
				brandId = $('.brand_id').val()?$('.brand_id').val().split('|')[0]:'',
				managerId = $('.managerId').val();
			var searchBrand = {
				'channelCode':channal_id || '',
				'brandId':brandId || '',
				'managerId':managerId || '',
				'currentPage':currentPage
			};
			var searchConsuc = function(data){
				var _result = data.result,ohtml='',aHtml='',cHtml='',productAttr = ['','实物','虚拟物品'],natureAttr = ['非3C','3C'];
				if(_result.reslutList.length != 0){
					for(var i=0;i<_result.reslutList.length;i++){
						var natu = _result.reslutList[i].is3c || 0,
							manager = _result.reslutList[i].manager || '',
							channelLi = _result.reslutList[i].channelCode?JSONchannelList(_result.reslutList[i].channelCode):'',
							channelSkuCode = _result.reslutList[i].channelSkuCode || '',
							channelProductAttribute = _result.reslutList[i].channelProductAttribute || '',
							nature = _result.reslutList[i].status;
						ohtml+='<tr><td class="center">'+_result.reslutList[i].skuCode+'</td><td class="center">'+channelSkuCode+'</td><td class="center">'+_result.reslutList[i].skuName+'</td><td class="center">'+((_result.reslutList[i].taxRate)*100).toFixed(0)+'%</td><td class="center">'+productAttr[_result.reslutList[i].productType]+'</td><td class="center">'+_result.reslutList[i].cateName+'</td><td class="center">'+natureAttr[natu]+'</td><td class="center">'+manager+'</td><td class="center">'+channelLi+'</td><td class="center"><a href="javascript:;" class="btn btn-xs btn-primary tooltips buttonChannel_title" duata-placement="top" nature="'+nature+'" productNature="'+_result.reslutList[i].productNature+'" oid="'+_result.reslutList[i].id+'" btn_data="'+_result.reslutList[i].skuCode+'|'+channelLi+'|'+channelSkuCode+'|'+channelProductAttribute+'|'+_result.reslutList[i].channelCode+'|'+_result.reslutList[i].channelCategoryCode+'|'+_result.reslutList[i].remark1+'|'+_result.reslutList[i].remark2+'">修改</a></td></tr>'
						}
					$('#table_data tbody').html(ohtml);
					$('.panel-body table tbody').show();
					$('.userPage').show();
					$('.userIndex_table_false').hide();
					runTooltips();
					buttonRole_click();
					OpageDisplay(_result.currentPage,_result.totalPage,'userPage');
				}else{
					$('.panel-body table tbody').hide();
					$('.userPage').hide();
					$('.userIndex_table_false').show();
				}
			}
			doPost('/items/channelItemsList',searchBrand,searchConsuc);
		}
		function buttonRole_click(){
			$('.buttonChannel_title').unbind('click').on('click',function(){
				$('.products_lable .channelSKU_number').parent().parent().remove();
				$('.products_lable .channelSKU_Attribute').parent().parent().remove();
				$('.products_lable .remark1').parent().parent().remove();
				$('.products_lable .remark2').parent().parent().remove();
				var _this = $(this),
					_thisAttr = _this.attr('btn_data').split('|'),
					_numberAttr = _thisAttr[2].split(',');
					_attributeAttr = _thisAttr[3].split(','),
					_channelCode = _thisAttr[4],
					_categoryCode = _thisAttr[5],
					_remark1 = _thisAttr[6].split(','),
					_remark2 = _thisAttr[7].split(','),
					prodNature = _this.attr('productNature');
				prodNature == 'true'?$('.oNatureFile').show():$('.oNatureFile').hide();
				$('.butSUK_nextTwo').attr('oid',_this.attr('oid'));
				$('.channelCode').val(_thisAttr[0]);
				$('.channelName').val(_thisAttr[1]);
				for(var n=0;n<_numberAttr.length;n++){
					$('.json_add').before('<div class="col-md-12" ><label class="col-md-3 control-label center" >渠道商品编号</label><div class="col-sm-6" ><input type="text" placeholder="请输入渠道商品编号" class="form-control channelSKU_number"></div></div><div class="col-md-12" ><label class="col-md-3 control-label center" >备注1</label><div class="col-sm-6" ><input type="text" placeholder="请输入备注1" class="form-control remark1"></div></div><div class="col-md-12" ><label class="col-md-3 control-label center" >备注2</label><div class="col-sm-6" ><input type="text" placeholder="请输入备注2" class="form-control remark2"></div></div><div class="col-md-12" ><label class="col-md-3 control-label center" >渠道商品销售属性</label><div class="col-sm-6" ><input type="text" placeholder="请输入渠道商品销售属性" class="form-control channelSKU_Attribute"></div></div>');
					$('.products_lable .channelSKU_number').eq(n).val(_numberAttr[n]);
					$('.products_lable .channelSKU_Attribute').eq(n).val(_attributeAttr[n]);
					if(_remark1[n] == 'null'){_remark1[n] = '';}
					if(_remark2[n] == 'null'){_remark2[n] = '';}
					$('.products_lable .remark1').eq(n).val(_remark1[n]);
					$('.products_lable .remark2').eq(n).val(_remark2[n]);
					console.log(_remark1[n])
				}
				
				if(_channelCode){
					var searchConsuc = function(data){
						var Codehtml='<option value="">请选择</option>';
						if(data.result){
							var _result = data.result;
							for(var t=0;t<_result.length;t++){
								Codehtml+='<option value="'+_result[t].categoryCode+'">'+_result[t].categoryName+'</option>'
							}
							$('.channelCategoryCode').html(Codehtml);
							((_categoryCode == 'null') || !_categoryCode)?$('.channelCategoryCode').val(''):$('.channelCategoryCode').val(_categoryCode);
						}else{
							$('.channelCategoryCode').html('');
						}
					}
					doPost('/items/searchChannelCategory?channelCode='+_channelCode,'',searchConsuc);
				}else{
					$('.channelCategoryCode').html('');
				}
				showData('channelIndex');
			})
			$('.sukDiv_close').unbind('click').on('click',function(){	
				$('.products_lable').find('.channelSKU_number').each(function(){
					$(this).parent().parent().remove();
				})
				$('.products_lable').find('.channelSKU_Attribute').each(function(){
					$(this).parent().parent().remove();
				})
				$('.channelIndex').hide();
			})
			$('.json_add .butAdd_primary').on('click',function(){
				$('.json_add').before('<div class="col-md-12" ><label class="col-md-3 control-label center" >渠道商品编号</label><div class="col-sm-6" ><input type="text" placeholder="请输入渠道商品编号" class="form-control channelSKU_number"></div></div><div class="col-md-12" ><label class="col-md-3 control-label center" >备注1</label><div class="col-sm-6" ><input type="text" placeholder="请输入备注1" class="form-control remark1"></div></div><div class="col-md-12" ><label class="col-md-3 control-label center" >备注2</label><div class="col-sm-6" ><input type="text" placeholder="请输入备注2" class="form-control remark2"></div></div><div class="col-md-12" ><label class="col-md-3 control-label center" >渠道商品销售属性</label><div class="col-sm-6" ><input type="text" placeholder="请输入渠道商品销售属性" class="form-control channelSKU_Attribute"></div></div>');
			})
			$('.butSUK_nextTwo').unbind('click').on('click',function(){
				var channelSkuCode = '',
					_this=$(this),
					channelSku_falg = true,
					channelProductAttribute='',
					remark1='',
					remark1_false=true,
					remark2_false=true,
					remark2='',
					channelProductAttribute_falg = true,
					channelCategoryCode = $('.channelCategoryCode').val();
				$('.products_lable').find('.channelSKU_number').each(function(k,v){
					if(!v.value){
						channelSku_falg = false;
					}else{
						channelSkuCode += v.value+','
					}
				})
				$('.products_lable').find('.channelSKU_Attribute').each(function(k,v){
					if(!v.value){
						channelProductAttribute_falg = false;
					}else{
						channelProductAttribute += v.value+','
					}
				})
				$('.products_lable').find('.remark1').each(function(k,v){
					if(!v.value){
						remark1_false = false;
					}else{
						remark1 += v.value+','
					}
				})
				$('.products_lable').find('.remark2').each(function(k,v){
					if(!v.value){
						remark2_false = false;
					}else{
						remark2 += v.value+','
					}
				})
				if(channelProductAttribute == ''){channelProductAttribute_falg = true;}
				if(remark1 == ''){remark1_false = true;}
				if(remark2 == ''){remark2_false = true;}
				if(!channelSku_falg){xcsoft.error('请输入渠道商品编号',1500);return;};
				if(!channelProductAttribute_falg){xcsoft.error('请输入渠道商品销售属性',1500);return;};
				if(!remark1_false){xcsoft.error('请输入备注1',1500);return;};
				if(!remark2_false){xcsoft.error('请输入备注2',1500);return;};
				channelSkuCode = channelSkuCode.substr(0, channelSkuCode.length - 1);
				remark1 = remark1.substr(0, remark1.length - 1);
				remark2 = remark2.substr(0, remark2.length - 1);
				channelProductAttribute = channelProductAttribute.substr(0, channelProductAttribute.length - 1);
				var modSkuBrand = {
					'id':_this.attr('oid'),
					'channelSkuCode':channelSkuCode,
					'channelProductAttribute':channelProductAttribute,
					'channelCategoryCode':channelCategoryCode,
					'remark1':remark1,
					'remark2':remark2,
					'modType':1
				}
		        var btn_exmineClick = function(){
					var modSkuProConsuc = function(data){
						if(data.msg == '修改成功'){
							modReload('修改成功');
						}else{
							xcsoft.error(data.msg,1000);
						}
					}
					doPost('/items/modSkuProById',modSkuBrand,modSkuProConsuc);
				}
				examIndexUp('此操作',btn_exmineClick);
				showData('examineIndex');
			})
		}
		function OpageDisplay(pageNo,totalPages,userPage){
			$('.userPage').show();
			var currentPage = pageNo;
	        var totalPages = totalPages;
	        $("#page").bootstrapPaginator({
	            bootstrapMajorVersion:3, //对应的bootstrap版本
	            currentPage: currentPage, //当前页数
	            numberOfPages: 10, //每次显示页数
	            totalPages:totalPages, //总页数
	            shouldShowPage:true,//是否显示该按钮
	            useBootstrapTooltip:true,
	           //点击事件
	            onPageClicked: function (event, originalEvent, type, page) {
	               dopostData(page);
	            }
	        });
		}
		//导出
		$('.buttonchanSKU_up').unbind('click').on('click',function(){
			var btn_exmineClick = function(){
				window.location.href = "/items/exportChannelItemsListExcel?channelCode="+$('.channal_id').val()+"&brandId="+$('.brand_id').val()+"&managerId="+$('.managerId').val();
				xcsoft.success('导出提交，请稍候...',1500);
				$('.examineIndex').hide();
			}
			examIndexUp('此操作',btn_exmineClick);
			showData('examineIndex');
		})
	};
	return {
		init: function() {
			channelSkuClick();
		}
	};
}();


/*利率修改*/
var taxPateMain = function() {
	var taxPateClick = function() {
		$('.buttonchanSKU_search').unbind('click').on('click',function(){
			dopostData(1);
		})
		channelList()
		dopostData(1);
		function dopostData(currentPage){
			var channal_id = $('.channal_id').val();
			var searchBrand = {
				'channelCode':channal_id || '',
				'currentPage':currentPage
			};
			
			var searchConsuc = function(data){
				var _result = data.result,ohtml='',aHtml='',cHtml='',productAttr = ['','实物','虚拟物品'],natureAttr = ['非3C','3C'];
				if(_result.reslutList.length != 0){
					for(var i=0;i<_result.reslutList.length;i++){
						var natu = _result.reslutList[i].is3c || 0,
							channelSkuCode = _result.reslutList[i].channelSkuCode || '',
							manager = _result.reslutList[i].manager || '',
							channelList = _result.reslutList[i].channelCode?JSONchannelList(_result.reslutList[i].channelCode):'',
							nature = _result.reslutList[i].status;
						ohtml+='<tr><td class="center">'+_result.reslutList[i].skuCode+'</td><td class="center">'+channelSkuCode+'</td><td class="center">'+checkValue(_result.reslutList[i].skuName)+'</td><td class="center">'+((_result.reslutList[i].taxRate)*100).toFixed(0)+'%</td><td class="center">'+productAttr[_result.reslutList[i].productType]+'</td><td class="center">'+checkValue(_result.reslutList[i].cateName)+'</td><td class="center">'+natureAttr[natu]+'</td><td class="center">'+manager+'</td><td class="center">'+channelList+'</td><td class="center"><a href="javascript:;" class="btn btn-xs btn-primary tooltips buttonRole_title" duata-placement="top" nature="'+nature+'" oid="'+_result.reslutList[i].id+'" oData="'+_result.reslutList[i].skuCode+'|'+channelList+'|'+(_result.reslutList[i].taxRate)*100+'">修改</a></td></tr>'
						}
					$('#table_data tbody').html(ohtml);
					$('.panel-body table tbody').show();
					$('.userPage').show();
					$('.userIndex_table_false').hide();
					runTooltips();
					buttonRole_click();
					OpageDisplay(_result.currentPage,_result.totalPage,'userPage');
				}else{
					$('.panel-body table tbody').hide();
					$('.userPage').hide();
					$('.userIndex_table_false').show();
				}
			}
			doPost('/items/channelItemsList',searchBrand,searchConsuc);
		}
		function buttonRole_click(){
			butTable_more('butTable_more','content_tab');
			$('.buttonRole_title').unbind('click').on('click',function(){
				var _this = $(this),
					_thisAttr = _this.attr('oData').split('|');
				$('.butSUK_nextTwo').attr('oid',_this.attr('oid'));
				$('.channelIndex tbody').html('<tr><td class="center">'+_thisAttr[0]+'</td><td class="center">'+_thisAttr[1]+'</td><th class="center">'+(parseFloat(_thisAttr[2])).toFixed(0)+'%</th><td class="center"><input type="number" style="width:60%;display: inline-block;" placeholder="请输入费率" class="form-control taxRate_number"><span style="margin-left: 2%;">%</span></td></tr>')
				showData('channelIndex');
			})
			$('.sukDiv_close').on('click',function(){
				$('.channelIndex').hide();
			})
			$('.butSUK_nextTwo').on('click',function(){
				var taxRate = $(".taxRate_number").val(),_this=$(this);
				if(!checkNotEmpty(taxRate)){xcsoft.error('请输入费率',1500);return;};
				var modSkuBrand = {
					'id':_this.attr('oid'),
					'taxRate':(taxRate/100),
					'modType':2
				}
				var btn_exmineClick = function(){
					var modSkuProConsuc = function(data){
						if(data.msg == '修改成功'){
							modReload('修改成功');
						}else{
							xcsoft.error('修改失败',1000);
						}
					}
					doPost('/items/modSkuProById',modSkuBrand,modSkuProConsuc);
				}
				examIndexUp('此操作',btn_exmineClick);
				showData('examineIndex');
			})
		}
		function OpageDisplay(pageNo,totalPages,userPage){
			$('.userPage').show();
			var currentPage = pageNo;
	        var totalPages = totalPages;
	        $("#page").bootstrapPaginator({
	            bootstrapMajorVersion:3, //对应的bootstrap版本
	            currentPage: currentPage, //当前页数
	            numberOfPages: 10, //每次显示页数
	            totalPages:totalPages, //总页数
	            shouldShowPage:true,//是否显示该按钮
	            useBootstrapTooltip:true,
	           //点击事件
	            onPageClicked: function (event, originalEvent, type, page) {
	               dopostData(page);
	            }
	        });
		}
		//批量上传
		/*uploadFile('buttonchanSKU_newAdd','11');*/
	};
	return {
		init: function() {
			taxPateClick();
		}
	};
}();

/*商品上架审核*/
var examineMain = function() {
	var productsClick = function() {
		checkNotAB('checkMoneyOne','checkMoneyTwo');
		ByLevelcategory_id();
		searchBrand(2,'brand_id');
		var searchConsuc = function(data){
			if(data.result){
				var channal_html='';
				for(var r=0;r<data.result.length;r++){
					channal_html+='<option value="'+data.result[r].channelCode+'"><font style="vertical-align: inherit;">'+data.result[r].channelName+'</font></option>'
				}
				$('.channal_id').html(channal_html);
				dopostData(1);
			}
		}
		doPost('/channel/channelList','',searchConsuc);
		
		//查询
		$('.button_search').on('click',function(){
			dopostData(1);
		})
		products();
		//数据
		function dopostData(currentPage){
			var brandName = $('.spu_id').val(),
				channal_id = $('.channal_id').val(),
				sprice = $('.checkMoneyOne').val(),
				eprice = $('.checkMoneyTwo').val(),
				product_name = $('.product_name').val(),
				status = $('.status').val(),
				category_id = $('.category_id').val()?$('.category_id').val().split('-')[0]:'',
				brand_id = $('.brand_id').val()?$('.brand_id').val().split('|')[0]:'';
			if(!category_id){return;}
			var searchBrand = {
				'spu_code':brandName || '',
				'channal_code':channal_id,
				'sprice':(sprice*100).toFixed(0) || parseFloat(0),
				'eprice':(eprice*100).toFixed(0) || parseFloat(0),
				'product_name':product_name || '',
				'categoryCode':category_id || '',
				'brand_id':brand_id,
				'status':parseInt(status),
				'userName':$.cookie("username"),
				'currentPage':currentPage,
			};
			
			var searchConsuc = function(data){
				var _result = data.result,ohtml='',aHtml='',cHtml='',productAttr = ['','实物','虚拟物品'],natureAttr = ['非3C','3C'];
				data.msg == '0'?($('.button_examineSpu').removeClass('show'),$('.button_examineSpu').addClass('hide')):($('.button_examineSpu').removeClass('hide'),$('.button_examineSpu').addClass('show'));
				if(_result.reslutList.length != 0){
					for(var i=0;i<_result.reslutList.length;i++){
						var natu = _result.reslutList[i].is3c || 0,
							manager = _result.reslutList[i].product_manager_id || '',
							stock = _result.reslutList[i].stock,
							category_name = _result.reslutList[i].category_name || '';
							instalments_num = _result.reslutList[i].instalments_num || '';
							channelList = _result.reslutList[i].channelList||'';
						ohtml+='<tr style="cursor: pointer;" instalmentsPrice="'+_result.reslutList[i].instalments_price+'" oid="'+_result.reslutList[i].spu_code+'"><td class="center check">'
						if(status == 1 && data.msg == '1'){
							ohtml+='<input type="checkbox" name="checkName" id="'+_result.reslutList[i].spu_code+'" class="flat-grey foocheck" />'	
						}
						ohtml+='</td><td class="center">'+checkValue(_result.reslutList[i].spu_code)+'</td><td class="center">'+checkValue(_result.reslutList[i].product_name)+'</td><td class="center">'+(_result.reslutList[i].tax_rate)*100+'%</td><td class="center">'+productAttr[_result.reslutList[i].product_type]+'</td><td class="center">'+category_name+'</td><td class="center">'+natureAttr[natu]+'</td><td class="center">'+((_result.reslutList[i].market_price)/100).toFixed(2)+'</td><td class="center">'+((_result.reslutList[i].purchase_price)/100).toFixed(2)+'</td><td class="center">'+((_result.reslutList[i].instalments_price)/100).toFixed(2)+'</td><td class="center">'+instalments_num+'</td><td class="center">'+manager+'</td><td class="center">'+checkValue(_result.reslutList[i].channel_name)+'</td></tr>'
						}
					$('#table_data tbody').html(ohtml);
					$('.panel-body table tbody').show();
					$('.userPage').show();
					$('.userIndex_table_false').hide();
					runTooltips();
					OpageDisplay(_result.currentPage,_result.totalPage,'userPage');
				}else{
					$('.panel-body table tbody').hide();
					$('.userPage').hide();
					$('.userIndex_table_false').show();
				}
			}
			doPost('/items/examineList',searchBrand,searchConsuc);
		}
		function products(){
			//全选
			butTable_more('butTable_more','content_tab');
			//批量审核
			$('.button_examineSpu').on('click',function(){
				if($("#table_data tbody tr").length == 0)return;
				var exFalg = true,oid='';
				$("#table_data tbody input[name='checkName']").each(function(k,v) { 
		            if(v.checked){
		            	oid+=v.id+','
		            	exFalg = false;
		            }
		        }); 
		        if(exFalg){xcsoft.error('请选择商品',1500);return ;}
		        oid = oid.substring(0,oid.length - 1);
		        $('.btn_exmine').attr('oid',oid);
				showData('examineIndex');
				$('.sukDiv_close').on('click',function(){
					$('.examineIndex').hide();
				})
				
			})
			$('.btn_exmine').on('click',function(){
		        var oidd = $('.btn_exmine').attr('oid')
				var btn_exmineClick = function(){
					var examineSpuConsuc = function(data){
						if(data.msg == '审核成功'){
							modReload('审核成功');
						}else{
							xcsoft.error('审核失败',1000);
						}
					}
					var examineSpu = {
						'spuList':oidd,
						'status':2,
						'channal_code':$('.channal_id').val(),
						'userName':$.cookie("username")
					}
					doPost('/items/toExamine',examineSpu,examineSpuConsuc);
				}
				examIndexUp('此操作',btn_exmineClick);
				showData('examineIndex');
			})
			$('#table_data tbody').unbind('dblclick').on('dblclick','tr td',function(event){
				var _this = $(this),
					instalmentsPrice = _this.parent().attr('instalmentsPrice');
				if(event.target.attributes['class'].value == 'center'){
					$('#table_data tbody tr').removeClass('success').eq(_index).addClass('success');
					showData('productsIndex');	
					var ByIdConsuc = function(data){
						$('#sample_table tbody').html('');
						var _result = data.result;
						if(_result.length!=0){
							$('.userIndex_table').hide();
							var sales_attribute_name = '';
							for(var i=0;i<_result.length;i++){
								sales_attribute_name = (_result[i].sales_attribute_name != 'null' && _result[i].sales_attribute_name != '')? _result[i].sales_attribute_name:'';
								$('#sample_table tbody').append('<tr id="" class="sku_cell"><td class="center">' + _result[i].skuCode + '</td><td class="center">' + sales_attribute_name + '</td><td class="center">' + ((_result[i].price)/100).toFixed(2) + '</td><td class="center">' + (_result[i].taxRate*100).toFixed(0) + '%</td><td class="center grossInte"></td><td class="center grossInteRate"></td><td class="center"></td><td class="center"></td></tr>')
								var SpuById = {
									'skuCode':_result[i].skuCode,
									'price':_result[i].price,
									'bankRate':_result[i].taxRate
								}
								var SpuByIdsuc = function(data){
									if(data.result){
										$('#sample_table tbody tr').eq(i).find('.grossInte').html((parseInt(data.result.grossInte)/100).toFixed(2));
										$('#sample_table tbody tr').eq(i).find('.grossInteRate').html(data.result.grossInteRate*100+'%');
									}
								}
								doPost('/grossInterest/calculationToHand',SpuById,SpuByIdsuc);
							}
						}else{
							$('.userIndex_table').show();
						}
					}
					var ByIdBrand = {
						'spu_code':_this.parent().attr('oid'),
						'channal_code':$('.channal_id').val()
						}
					doPost('/items/examineBySpuCode',ByIdBrand,ByIdConsuc);
					var _index = $(this).index();
					$('.sukDiv_close').on('click',function(){
						$('.productsIndex').hide();
					})
				}
			})
		}
		function OpageDisplay(pageNo,totalPages,userPage){
			$('.userPage').show();
			var currentPage = pageNo;
	        var totalPages = totalPages;
	        $("#page").bootstrapPaginator({
	            bootstrapMajorVersion:3, //对应的bootstrap版本
	            currentPage: currentPage, //当前页数
	            numberOfPages: 10, //每次显示页数
	            totalPages:totalPages, //总页数
	            shouldShowPage:true,//是否显示该按钮
	            useBootstrapTooltip:true,
	           //点击事件
	            onPageClicked: function (event, originalEvent, type, page) {
	               dopostData(page);
	            }
	        });
	   }
	};
	return {
		init: function() {
			productsClick();
		}
	};
}();

/*渠道分类管理*/
var shopchannelMain = function() {
	var skuIstation = function() {
		channelList(1);
		var channelcode = $.cookie('channelcode') || '';
		$('.channal_id').val(channelcode);
		dopostData();
		skuIsClick();
	};
	var skuIsClick = function() {
		//查询
		$('.button_search').unbind('click').on('click',function(){
			if($('.channal_id').val() == ''){xcsoft.error('请先选择渠道',1200);return;}
			dopostData();
		})
		
		//新增
		$('.sukAdd').unbind('click').on('click',function(){
			if($('.channal_id').val() == ''){xcsoft.error('请先选择渠道',1200);return;}
			$('.taxRate_number').val('');
	        showData('channelIndex');
		})
		//确定
		$('.butSUK_nextTwo').unbind('click').on('click',function(){
			var channal_val = $('.taxRate_number').val();
			if(!checkNotEmpty(channal_val)){xcsoft.error('请填写渠道名称',1200);return;}
			var btn_exmineClick = function(){
				var channal_new = {'channelCode':$('.channal_id').val(),'categoryName':channal_val}
		        var newConsuc = function(data){
		        	$.cookie('channelcode',$('.channal_id').val());
					modReload('添加成功');
				}
		        doPost('/items/addChannelCategory',channal_new,newConsuc);
			}
			examIndexUp('此操作',btn_exmineClick);
			showData('examineIndex');
		})
		$('.sukDiv_close').unbind('click').on('click',function(){
			$('.channelIndex').hide();
		})
	};
	//数据
	function dopostData(){
		var searchBrand = {
			'channelCode':$('.channal_id').val()
		};
		var searchConsuc = function(data){
			var ohtml='';
			if(data.result){
				var _result = data.result;
				for(var t=0;t<_result.length;t++){
					ohtml+='<tr><td class="center">'+checkValue(_result[t].channelCode)+'</td><td class="center">'+checkValue(_result[t].categoryCode)+'</td><td class="center">'+checkValue(_result[t].categoryName)+'</td><<td class="center"><a href="javascript:;" class="btn btn-xs btn-blue tooltips buttonUser_Role" data-placement="top" data-original-title="" categoryName="'+_result[t].categoryName+'" oid="'+_result[t].id+'"><i class="fa">编辑</i></a><a href="javascript:;" class="btn btn-xs btn-red tooltips buttonUser_class" data-placement="top" data-original-title="" oid="'+_result[t].id+'"><i class="fa">删除</i></a></td></tr>'
				}
				$('#table_data tbody').html(ohtml);
				$('#table_data tbody').show();
				$('.userIndex_table_false').hide();
				runTooltips();
				modClick();
			}else{
				$('#table_data tbody').hide();
				$('.userIndex_table_false').show();
			}
		}
		doPost('/items/searchChannelCategory',searchBrand,searchConsuc);
	}
	
	var modClick = function() {
		//删除
		$('.buttonUser_class').unbind('click').on('click',function(){
			var _thid = $(this).attr('oid');
			var btn_exmineClick = function(){
				var channal_new = {'id':_thid}
		        var newConsuc = function(data){
		        	$.cookie('channelcode',$('.channal_id').val());
					modReload('删除成功');
				}
		        doPost('/items/delChannelCategory',channal_new,newConsuc);
			}
			examIndexUp('此操作',btn_exmineClick);
			showData('examineIndex');
		})
		//修改
		$('.buttonUser_Role').unbind('click').on('click',function(){
			var _this = $(this),
				_oid = _this.attr('oid'),
				_categoryName = _this.attr('categoryName');
			$('.taxRate_number').val(_categoryName);
	        showData('channelIndex');
	        //确定
			$('.butSUK_nextTwo').unbind('click').on('click',function(){
				var channal_val = $('.taxRate_number').val();
				if(!checkNotEmpty(channal_val)){xcsoft.error('请填写渠道名称',1200);return;}
				var btn_exmineClick = function(){
					var channal_mod = {'id':_oid,'categoryName':channal_val}
			        var modConsuc = function(data){
			        	$.cookie('channelcode',$('.channal_id').val());
						modReload('修改成功');
					}
			        doPost('/items/updateChannelCategory',channal_mod,modConsuc);
				}
				examIndexUp('此操作',btn_exmineClick);
				showData('examineIndex');
			})
		})
	};
	return {
		init: function() {
			skuIstation();
		}
	};
}();
