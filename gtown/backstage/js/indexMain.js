/*渠道配置*/
var indexMain = function() {
	/*渠道增加相关事件*/
	var channelAddClick = function() {
		datetimepickerData();
		//删除
		tableDelete('butCheckbox_more','mainTable','');
		buttonRole_click();
		$(".button_del").unbind('click').on('click',function(){
			if($(".mainTable tbody").find("tr").length == 0)return;
			var falg = false,idList='';
			$(".mainTable tbody input[name='test']:checked").each(function(k,v) { 
	            idList += v.id+','; 
	            falg = true; 
	        }); 
	        if(!falg){xcsoft.error('请选择删除的数据',1000);return;}
	        idList = idList.substr(0, idList.length - 1);
			var btn_exmineClick = function(){
				var delData = {'idList':idList}
		        var delConsuc = function(data){
					if(data.msg == '删除成功'){
						modReload('删除成功');
					}else{
						xcsoft.error('删除失败',1000);
					}
				}
		        doPost('/channel/delchannelPro',delData,delConsuc);
			}
			examIndexUp('删除',btn_exmineClick);
	        showData('examineIndex');
		})
		
		
		//渠道
		var searchConsuc = function(data){
			if(data.result){
				var channal_html='';
				for(var r=0;r<data.result.length;r++){
					channal_html+='<option value="'+data.result[r].channelName+'"><font style="vertical-align: inherit;">'+data.result[r].channelName+'</font></option>'
				}
				$('.channal_id').html(channal_html)
			}
		}
		doPost('/channel/channelList','',searchConsuc);
		$('.two_orderTime').datetimepicker({  
			minView: "month",
			language:"zh-CN",
		    todayBtn : "linked",  
		    format: 'yyyy-mm-dd',
		    autoclose : true,  
		    todayHighlight : true
		})
		dopostData();
		//数据
		function dopostData(){
			var searchConsuc = function(data){
				console.log(data)
				var _result = data.result,ohtml='';
				if(_result){
					for(var t=0;t<_result.length;t++){
						ohtml+='<tr><td class="center"><div class="checkbox-table"><input type="checkbox" name="test" class="flat-grey foocheck" id="'+_result[t].id+'"></div></td><td class="center">'+_result[t].channelCode+'</td><td class="center">'+_result[t].channelName+'</td><td class="center">'+_result[t].transmission+'</td><td class="center">'+_result[t].filePrefix+'</td><td class="center">'+_result[t].route+'</td><td class="center"><a href="#" class="btn btn-xs btn-blue tooltips buttonRole_title" data-placement="top" data-original-title="编辑" odata="'+JSONstringify(JSON.stringify(_result[t]))+'"><i class="fa fa-edit"></i></a></td></tr>'
					}
					$('#myTable tbody').html(ohtml);
					$('#myTable tbody').show();
					$('.userIndex_table_false').hide();
					runTooltips();
					buttonRole_click();
				}else{
					$('#myTable tbody').hide();
					$('.userPage').hide();
					$('.userIndex_table_false').show();
				}
			}
			doPost('/channel/channelProList','',searchConsuc);
		}
		
		function buttonRole_click(){
			//新增
			$('.button_newAdd').unbind('click').on('click',function(){
				$('.butAdd_sure').attr('oid','1');
				Reset();
				$('#index_tableOne thead th').eq(0).show();
				$('.filePreCode').parent().show();
				$('.filePreCode').removeClass('editable-disabled');
				showData('elasticIndex');
			})
			//编辑
			$('.buttonRole_title').unbind('click').on('click',function(){
				Reset();
				$('#index_tableOne thead th').eq(0).hide();
				$('.filePreCode').parent().hide();
				var _this = $(this),
					oData = JSONparse(_this.attr('odata'));
				_this.blur();
				if(oData.json){
					var _oDataJson = JSON.parse(oData.json);
					console.log(_oDataJson)
					$('.two_orderld').val(_oDataJson.orderld);
					$('.two_total').val(_oDataJson.total);
					$('.two_orderTime').val(_oDataJson.orderTime);
					$('.two_userNanme').val(_oDataJson.userNanme);
					$('.two_itemCode').val(_oDataJson.itemCode);
					$('.two_phone').val(_oDataJson.phone);
					$('.two_itemPpecs').val(_oDataJson.itemPpecs);
					$('.two_province').val(_oDataJson.province);
					$('.two_count').val(_oDataJson.count);
					$('.two_city').val(_oDataJson.city);
					$('.two_price').val(_oDataJson.price);
					$('.two_area').val(_oDataJson.area);
					$('.two_address').val(_oDataJson.address);
					$('.two_zipCode').val(_oDataJson.zipCode);
					$('.two_remark').val(_oDataJson.remark);
					$('.two_invoice').val(_oDataJson.invoice);
				}
				$('.filePreCode').val(oData.channelCode);
				$('.channal_id').val(oData.channelName);
				$('.transmission').val(oData.transmission);
				$('.filePrefix').val(oData.filePrefix || '');
				$('.route').val(oData.route || '');
				showData('elasticIndex');
				$('.butAdd_sure').attr('oid',oData.id);
			})
			$('.roleDiv_close').unbind('click').on('click',function(){
				$('.elasticIndex').hide();
			})
			//确定
			$('.butAdd_sure').unbind('click').on('click',function(){
				var channal_id = $('.channal_id').val(),
					transmission = $('.transmission').val(),
					filePrefix = $('.filePrefix').val(),
					route = $('.route').val(),
					channelCode = $('.filePreCode').val(),
					two_orderld = $('.two_orderld').val(),
					two_total = $('.two_total').val(),
					two_orderTime = $('.two_orderTime').val(),
					two_userNanme = $('.two_userNanme').val(),
					two_itemCode = $('.two_itemCode').val(),
					two_phone = $('.two_phone').val(),
					two_itemPpecs = $('.two_itemPpecs').val(),
					two_province = $('.two_province').val(),
					two_count = $('.two_count').val(),
					two_city = $('.two_city').val(),
					two_price = $('.two_price').val(),
					two_area = $('.two_area').val(),
					two_address = $('.two_address').val(),
					two_zipCode = $('.two_zipCode').val(),
					two_remark = $('.two_remark').val(),
					two_invoice = $('.two_invoice').val(),
					_this = $(this);
				if(!checkNotEmpty(channelCode)){xcsoft.error('请输入渠道编号',1500);return;};
				var channelData={},oUrl = '',channelConsuc,Josn={};
				Josn = {
					'orderld':two_orderld,
					'total':(two_total/100).toFixed(2) || parseInt(0),
					'orderTime':two_orderTime,
					'userNanme':two_userNanme,
					'itemCode':two_itemCode,
					'phone':two_phone,
					'itemPpecs':two_itemPpecs,
					'province':two_province,
					'count':two_count,
					'city':two_city,
					'price':(two_price/100).toFixed(2) || parseInt(0),
					'area':two_area,
					'address':two_address,
					'zipCode':two_zipCode,
					'remark':two_remark,
					'invoice':two_invoice
				}
				Josn = JSON.stringify(Josn);
				var btn_exmineClick = function(){
					if(_this.attr('oid') == 1){
						channelData = {
							'channelCode':channelCode,
							'channelName':channal_id,
							'transmission':transmission,
							'filePrefix':filePrefix,
							'route':route,
							'json':Josn
						}
						oUrl = '/channel/addchannelPro';
						channelConsuc = function(data){
							if(data.msg == '新增成功'){
								modReload('新增成功');
							}else{
								xcsoft.error('新增失败',1000);
							}
						}
					}else{
						channelData = {
							'channelName':channal_id,
							'transmission':transmission,
							'filePrefix':filePrefix,
							'route':route,
							'json':Josn,
							'id':_this.attr('oid')
						}
						oUrl = '/channel/modchannelPro';
						channelConsuc = function(data){
							if(data.msg == '修改成功'){
								modReload('修改成功');
							}else{
								xcsoft.error('修改失败',1000);
							}
						}
					}
					doPost(oUrl,channelData,channelConsuc);
				}
				examIndexUp('此操作',btn_exmineClick);
		        showData('examineIndex');
			})
		}
		function Reset(){
			$('.filePreCode').val('');
			$('.channal_id').val($('.channal_id option').eq(0).val());
			$('.transmission').val('execl');
			$('.filePrefix').val('');
			$('.route').val('');
			$('.two_orderld').val('');
			$('.two_total').val('');
			$('.two_orderTime').val('');
			$('.two_userNanme').val('');
			$('.two_itemCode').val('');
			$('.two_phone').val('');
			$('.two_itemPpecs').val('');
			$('.two_province').val('');
			$('.two_count').val('');
			$('.two_city').val('');
			$('.two_price').val('');
			$('.two_area').val('');
			$('.two_address').val('');
			$('.two_zipCode').val('');
			$('.two_remark').val('');
			$('.two_invoice').val('');
		}
	};
	return {
		init: function() {
			channelAddClick();
		}
	};
}();

/*渠道管理*/
var indexIsMain = function() {
	/*渠道增加相关事件*/
	var channelAddClick = function() {
		dopostData();
		buttonRole_click();	
		$('.button_search').unbind('click').on('click',function(){
			dopostData();
		})
			
		//数据
		function dopostData(){
			var _val = $('.channelType_id').val(),_data = '';
			if(_val){
				_data = {
					'channelType':parseInt(_val)
				}
			}
			var searchConsuc = function(data){
				console.log(data)
				var _result = data.result,ohtml='',
					channelAttr = ['','分期','集采','积分'],
					orderAttr = ['否','是'],
					managementAttr = ['','供货','入驻','自营'];
				if(_result){
					for(var t=0;t<_result.length;t++){
						ohtml+='<tr><td class="center"><div class="checkbox-table"><input type="checkbox" name="test" class="flat-grey foocheck" id="'+_result[t].id+'"></div></td><td class="center">'+_result[t].channelCode+'</td><td class="center">'+_result[t].channelName+'</td><td class="center">'+channelAttr[_result[t].channelType || 0]+'</td><td class="center">'+orderAttr[_result[t].orderEnable || 0]+'</td><td class="center">'+managementAttr[_result[t].managementType || 0]+'</td><td class="center">'+_result[t].priority+'</td><td class="center"><a href="#" class="btn btn-xs btn-blue tooltips buttonRole_title" data-placement="top" data-original-title="编辑" odata="'+JSONstringify(JSON.stringify(_result[t]))+'"><i class="fa fa-edit"></i></a></td></tr>'
					}
					$('#myTable tbody').html(ohtml);
					$('#myTable tbody').show();
					$('.userIndex_table_false').hide();
					runTooltips();
					buttonRole_click();	
				}else{
					$('#myTable tbody').hide();
					$('.userPage').hide();
					$('.userIndex_table_false').show();
				}
			}
			doPost('/channel/channelList',_data,searchConsuc);
		}
		
		//修改
		function buttonRole_click(){
			//新增
			$('.button_newAdd').unbind('click').on('click',function(){
				$('.butAdd_sure').attr('oid','1');
				$('#index_tableOne thead th').eq(0).show();
				$('.channelCode').parent().show();
				Reset();
				showData('elasticIndex');
			})
			$('.roleDiv_close').unbind('click').on('click',function(){
				$('.elasticIndex').hide();
			})
			
			//修改
			$('.buttonRole_title').unbind('click').on('click',function(){
				Reset();
				$('.channelCode').prop('disabled',true);
				var _this = $(this),
					_thisData = JSONparse($(this).attr('odata')),
					logisticsAttr = _thisData.logistics?_thisData.logistics.split('|'):'';
				_this.blur();
				$('.channelCode').val(_thisData.channelCode);
				$('.channelName').val(_thisData.channelName);
				$('.channelType').val(_thisData.channelType);
				$('.priority').val(_thisData.priority);
				$('.matchStrategy').val(_thisData.matchStrategy);
				$('.shipDate').val(_thisData.shipDate);
				$(".orderEnable input[value='"+_thisData.orderEnable+"']").prop('checked','checked');
				$(".fictitiousIsDeliver input[value='"+_thisData.fictitiousIsDeliver+"']").prop('checked','checked');
				$('.managementType').val(_thisData.managementType);
				for (var s=0;s<logisticsAttr.length;s++) {
					$(".logistics input[name='checkName']").each(function(k,v){
						if(v.value == logisticsAttr[s]){
							v.checked = true;
						}
					})
				}
				$('.butAdd_sure').attr('oid',_thisData.id);
				showData('elasticIndex');
			})
			//重置
			function Reset(){
				$('.channelCode').val('');
				$('.channelCode').prop('disabled',false);
				$('.channelName').val('');
				$('.channelType').val(1);
				$('.priority').val('');
				$('.managementType').val(1);
				$(".orderEnable input[value='1']").prop('checked','checked');
				$(".fictitiousIsDeliver input[value='1']").prop('checked','checked');
				$(".logistics input[name='checkName']").each(function(k,v){
					v.checked = false;
				});
				$('.shipDate').val('');
				$('.matchStrategy').val(0);
			}
			//确定
			$('.butAdd_sure').unbind('click').on('click',function(){
				var channelName = $('.channelName').val(),
					channelCode = $('.channelCode').val(),
					channelType = $('.channelType').val(),
					matchStrategy = $('.matchStrategy').val(),
					shipDate = $('.shipDate').val(),
					orderEnable = $(".orderEnable input[type='radio']:checked").val(),
					fictitiousIsDeliver = $(".fictitiousIsDeliver input[type='radio']:checked").val(),
					managementType = $('.managementType').val(),
					priority = $('.priority').val(),
					logistics = '',
					sfa=false,
					_this = $(this);
				if(!checkNotEmpty(channelName)){xcsoft.error('请输入渠道编号',1500);return;};
				if(!checkNotEmpty(channelCode)){xcsoft.error('请输入渠道名称',1500);return;};
				if(!checkNotEmpty(channelType)){xcsoft.error('请选择渠道类型',1500);return;};
				if(!checkNotEmpty(managementType)){xcsoft.error('请选择经营类型',1500);return;};
				if(!checkNotEmpty(priority)){xcsoft.error('请输入发货优先级',1500);return;};
				if(!checkNotEmpty(shipDate)){xcsoft.error('请输入发货周期',1500);return;};
				$(".logistics input[name='checkName']").each(function(k,v){
					if(v.checked){
						logistics+=v.value+'|'
						sfa=true;
					}
				})
				logistics = logistics.substr(0, logistics.length - 1);
				if(!sfa){xcsoft.error('请选择物流',1500);return;};
				
				var channelData = {};
				var channelConsuc;
				var oUrl = '/channel/addChannel';
				var btn_exmineClick = function(){
					if(_this.attr('oid') == '1'){
						channelData = {
							'channelCode':channelCode,
							'channelName':channelName,
							'channelType':channelType,
							'orderEnable':orderEnable,
							'managementType':managementType,
							'priority':priority,
							'logistics':logistics,
							'fictitiousIsDeliver':fictitiousIsDeliver,
							'shipDate':shipDate,
							'matchStrategy':matchStrategy
						}
						channelConsuc = function(data){
							if(data.msg == '添加成功'){
								modReload('添加成功');
							}else{
								xcsoft.error('添加失败',1000);
							}
						}
					}else{
						channelData = {
							'id':_this.attr('oid'),
							'channelName':channelName,
							'channelType':channelType,
							'orderEnable':orderEnable,
							'managementType':managementType,
							'priority':priority,
							'logistics':logistics,
							'fictitiousIsDeliver':fictitiousIsDeliver,
							'shipDate':shipDate,
							'matchStrategy':matchStrategy
						}
						oUrl = '/channel/modChannel';
						channelConsuc = function(data){
							if(data.msg == '修改成功'){
								modReload('修改成功');
							}else{
								xcsoft.error('修改失败',1000);
							}
						}
					}
					
					doPost(oUrl,channelData,channelConsuc);
				}
				examIndexUp('此操作',btn_exmineClick);
		        showData('examineIndex');
			})
			
			//删除
			tableDelete('butCheckbox_more','mainTable','');
			$(".button_del").unbind('click').on('click',function(){
				if($(".mainTable tbody").find("tr").length == 0)return;
				var falg = false,idList='';
				$(".mainTable tbody input[name='test']:checked").each(function(k,v) { 
		            idList += v.id+','; 
		            falg = true; 
		        }); 
		        if(!falg){xcsoft.error('请选择删除的数据',1000);return;}
		        idList = idList.substr(0, idList.length - 1);
		        var delData = {'idList':idList}
		        var btn_exmineClick = function(){
					var delConsuc = function(data){
						if(data.msg == '删除成功'){
							modReload('删除成功');
						}else{
							xcsoft.error('删除失败',1000);
						}
					}
			        doPost('/channel/delChannel',delData,delConsuc);
				}
				examIndexUp('删除',btn_exmineClick);
				showData('examineIndex');
			})
		}
		
		
		var kHtml = '',kAttr=['虚拟发货','顺丰','EMS','申通','圆通','中通','百世汇通','韵达','宅急送','天天','安能','京东','德邦','全峰','快捷','速尔快递','国通快递','万象','邮政包裹/平邮','联邦','苏宁快递','新邦','中铁物流','中铁快运','优速','跨越'];
		for(i in kAttr){
			kHtml+='<div style="width:120px;"><input type="checkbox" class="green" name="checkName" value="'+kAttr[i]+'" id="checked'+i+'" style="vertical-align: bottom;"><label class="checkbox-inline" for="checked'+i+'">'+kAttr[i]+'</label></div>'
		}
		$('#myTab2_kuaidi #content_tab').html(kHtml);
		
		butTable_more('butTable_more','content_tab');
	};
	return {
		init: function() {
			channelAddClick();
		}
	};
}();

/*售前服务单*/
var customerMain = function() {
	var customerClick = function() {
		$('#file4').on("change propertychange", function(){
			var	_this=$(this);
		});
		//查询用户
		JSONfindUser('to_do_user_id',1);
		channelList();
		datetimePicker();//时间选择
		dopostData(1);
		buttonRole_click();
		
		function buttonRole_click(){
			/*查询*/
			$('.butAdd_primary').on('click',function(){
				dopostData(1);
			})
			//&单击售后备注
			/*var intervalTimer = null;
			$('.customer_body table').unbind('dblclick').on('dblclick','tbody tr',function(event){
				clearTimeout(intervalTimer);
				var _this = $(this),
					_index = _this.index(),
					_oid = _this.attr('oid');
				if(event.target.attributes['class'].value == 'center td'){
					var findByConsuc = function(data){
						if(data.result){
							var _result = data.result,_ohtml='';
							$('#sample-table-2 tbody').html('');
							for(var s=0;s<_result.length;s++){
								var hmemo = _result[s].hmemo?_result[s].hmemo:'',
									qmemo = _result[s].qmemo?_result[s].qmemo:'';
								_ohtml+='<tr><td class="center">'+_result[s].modifyBy+'</td><td class="center">'+qmemo+'</td><td class="center">'+hmemo+'</td><td class="center">'+odateFormat(_result[s].createTime)+'</td></tr>'
							};
							$('#sample-table-2 tbody').html(_ohtml);
							$('#sample-table-2 tbody').show();
							$('.customer_table_false').hide();
						}else{
							$('#sample-table-2 tbody').hide();
							$('.customer_table_false').show();
						}
						$('.custmerIndex_tr').hide();
					};
					var findBydata = {
						'proSaleId':_oid
					};
					doPost('/preSale/findBySaleId',findBydata,findByConsuc);
					$('.customer_body table tbody tr').removeClass('success').eq(_index).addClass('success');
					$('.custmerIndex_tr').hide();
					showData('custmerIndex');	
				}
			})
			$('.customer_body table').unbind('click').on('click','tbody tr',function(event){
				 clearTimeout(intervalTimer); //取消上次延时未执行的方法
				 var _this = $(this),
					_index = _this.index(),
					_oid = _this.attr('oid');
	            intervalTimer = setTimeout(function () {
	                if(event.target.attributes['cus_index'].value == '1'){//售前备注
						addTitle('1',_oid);
					}else if(event.target.attributes['cus_index'].value == '2'){//售后备注
						addTitle('2',_oid);
					}
	            }, 300);
			})*/
			
			//点击tr&双击售后备注
			$('.customer_body table').unbind('dblclick').on('dblclick','tbody tr',function(event){
				var _this = $(this),
					_index = _this.index(),
					_oid = _this.attr('oid'),
					_odata = JSONparse(_this.attr('odata'));
				var doUser = _odata.doUser?_odata.doUser:'',
					_statusAttr = ['异常','已完成','进行中','待更进'],
					_emerLevelAttr = ['','1','2','3','4'],
					emerLevel = _odata.emerLevel?_odata.emerLevel:0;
				var _odataHtml = '<tr><td class="center">'+checkValue(_odata.channelOrder)+'</td><td class="center">'+checkValue(_odata.orderNo)+'</td><td class="center">'+checkValue(_odata.channelName)+'</td><td class="center">'+_emerLevelAttr[emerLevel]+'</td><td class="center">'+doUser+'</td><td class="center">'+_statusAttr[_odata.status]+'</td><td class="center">'+_odata.memo+'</td></tr>';
				$('#sample-table-3 tbody').html(_odataHtml);
				if(event.target.attributes['class'].value == 'center td'){
					
					
					var findByConsuc = function(data){
						if(data.result){
							var _result = data.result,_ohtml='';
							$('#sample-table-2 tbody').html('');
							for(var s=0;s<_result.length;s++){
								var hmemo = _result[s].hmemo?_result[s].hmemo:'',
									qmemo = _result[s].qmemo?_result[s].qmemo:'';
								_ohtml+='<tr><td class="center">'+_result[s].modifyBy+'</td><td class="center">'+qmemo+'</td><td class="center">'+hmemo+'</td><td class="center">'+odateFormat(_result[s].createTime)+'</td></tr>'
							};
							$('#sample-table-2 tbody').html(_ohtml);
							$('#sample-table-2 tbody').show();
							$('.customer_table_false').hide();
						}else{
							$('#sample-table-2 tbody').hide();
							$('.customer_table_false').show();
						}
						$('.custmerIndex_tr').hide();
					};
					var findBydata = {
						'proSaleId':_oid
					};
					doPost('/preSale/findBySaleId',findBydata,findByConsuc);
					$('.customer_body table tbody tr').removeClass('success').eq(_index).addClass('success');
					$('.custmerIndex_tr').hide();
					showData('custmerIndex');	
				}else if(event.target.attributes['class'].value == 'center'){
					
				}else if(event.target.attributes['cus_index'].value == '1'){//售前备注
					addTitle('1',_oid);
				}else if(event.target.attributes['cus_index'].value == '2'){//售后备注
					addTitle('2',_oid);
				}
			});
			
			function addTitle(typeDatt,_oid){
				var findByConsuc = function(data){
					var _ohtml='',
						userName = $.cookie("username");
					$('#sample-table-2 tbody').html('');
					if(data.result){
						var _result = data.result;
						for(var s=0;s<_result.length;s++){
							var hmemo = _result[s].hmemo?_result[s].hmemo:'',
								qmemo = _result[s].qmemo?_result[s].qmemo:'';
							_ohtml+='<tr><td class="center">'+_result[s].modifyBy+'</td><td class="center">'+qmemo+'</td><td class="center">'+hmemo+'</td><td class="center">'+odateFormat(_result[s].createTime)+'</td></tr>'
						};
						if(typeDatt == 1){
							_ohtml+='<tr class="custmerIndex_tr"><td class="center"  style="width:100px;">'+userName+'</td><td class="center"><textarea class="qMemo " name="" rows="" cols="" style="width: 100%;"></textarea></td><td class="center"></td><td class="center"></td></tr>'
						}else{
							_ohtml+='<tr class="custmerIndex_tr"><td class="center"  style="width:100px;">'+userName+'</td><td class="center"></td><td class="center"><textarea class="hMemo " name="" rows="" cols="" style="width: 100%;"></textarea></td><td class="center"></td></tr>'
						}
						$('#sample-table-2 tbody').html(_ohtml);
						$('#sample-table-2 tbody').show();
						$('.customer_table_false').hide();
						$('.custmerIndex_tr').show();
					}else{
						if(typeDatt == 1){
							_ohtml='<tr class="custmerIndex_tr"><td class="center"  style="width:100px;">'+userName+'</td><td class="center"><textarea class="qMemo" name="" rows="" cols="" style="width: 100%;"></textarea></td><td class="center"></td><td class="center"></td></tr>'
						}else{
							_ohtml='<tr class="custmerIndex_tr"><td class="center"  style="width:100px;">'+userName+'</td><td class="center"><td class="center"><textarea class="hMemo" name="" rows="" cols="" style="width: 100%;"></textarea></td></td><td class="center"></td></tr>'
						}
						$('#sample-table-2 tbody').html(_ohtml);
						$('#sample-table-2 tbody').show();
						$('.customer_table_false').hide();
						$('.custmerIndex_tr').show();
					}
				};
				var findBydata = {
					'proSaleId':_oid
				};
				doPost('/preSale/findBySaleId',findBydata,findByConsuc);
				showData('custmerIndex');
				$('.customer_body table tbody tr').removeClass('success');
				//更新备注确定
				$('.butSUK_custmerIndex').unbind('click').on('click',function(){
					var qMemo = $('.qMemo').val(),
						hMemo = $('.hMemo').val();
					if(typeDatt == 1){
						if(!checkNotEmpty(qMemo)){xcsoft.error('请输入备注',1500);return;};
					}else{
						if(!checkNotEmpty(hMemo)){xcsoft.error('请输入备注',1500);return;};
					}
					var btn_exmineClick = function(){
						var searchConsuc = function(data){
							if(data.msg == '添加成功'){
								modReload('添加成功');
							}else{
								xcsoft.error('添加失败',1000);
							}
						};
						var odata = {
							'proSaleId':_oid,
							'toDoUserId':$.cookie("username")
						};
						if(typeDatt == 1){
							odata.qMemo = $('.qMemo').val();
						}else{
							odata.hMemo = $('.hMemo').val();
						}
						doPost('/preSale/addPreLogo',odata,searchConsuc);
					}
					examIndexUp('此操作',btn_exmineClick);
					showData('examineIndex');
				});
				
				//订单完成
				$('.butSUK_custmerLeft').unbind('click').on('click',function(){
					modStatus(1,_oid);
				});
				//订单异常
				$('.butSUK_custmerRight').unbind('click').on('click',function(){
					modStatus(0,_oid);
				});
			};
			$('.cusDiv_close').unbind('click').on('click',function(){
				$('.customerAddIndex').hide();
				$('.custmerIndex').hide();
				$('.orderAddIndex').hide();
				$('.customer_body table tbody tr').removeClass('success');
			});
			//修改订单状态
			function modStatus(status,_oid){
				var btn_exmineClick = function(){
					var searchConsuc = function(data){
						if(data.msg == '修改成功'){
							modReload('修改成功');
						}else{
							xcsoft.error('修改失败',1000);
						}
					};
					var odata = {
						'id':_oid,
						'status':status
					};
					doPost('/preSale/modPreSale',odata,searchConsuc);
				}
				examIndexUp('修改订单状态',btn_exmineClick);
				showData('examineIndex');
			}
			//全选
			butTable_more('butTable_more','body_table');
			//分配服务单type="checkbox" name="checkName"
			$('.btn_distribution').unbind('click').on('click',function(){
				if($('#body_table tbody').find("tr").length == 0)return;
				var falg = false,idList='';
				$("#body_table tbody input[name='checkName']:checked").each(function(k,v) { 
		            idList += v.id+','; 
		            falg = true; 
		        }); 
		        if(!falg){xcsoft.error('请选择分配的服务单',1000);return;}
		        idList = idList.substr(0, idList.length - 1);
		        
				//查询用户
        		JSONfindUser('orderStatus',3);
        		
		        var findGroupConsuc = function(data){
					if(data.result){
						var _res = data.result,oHtml='<option value="">请选择组</option>';
						_res.forEach(function(v,k){
							oHtml+='<option value="'+v.id+'">'+v.groupName+'</option>'
						});
						$('.orderGroup').html(oHtml);
					}
				};
				doPost('/preSale/findGroup','',findGroupConsuc);
		        showData('orderAddIndex');
		        
		        $('.orderStatus').on("change propertychange", function(){
					$('.orderGroup').val('');
				});
		        $('.orderGroup').on("change propertychange", function(){
					$('.orderStatus').val('');
				});
		        
		        //分配服务单
		        $('.butOrder_nextTwo').unbind('click').on('click',function(){
					var btn_exmineClick = function(){
						var orderStatus = $('.orderStatus').val(),
							orderGroup = $('.orderGroup').val();
				        var searchConsuc = function(data){
							if(data.msg == '修改成功'){
								modReload('分配成功');
							}else{
								xcsoft.error('分配失败',1000);
							}
						};
						var odata = {
							'ids':idList,
							'toDoUserId':orderStatus,
							'toDoGroupId':orderGroup
						};
						doPost('/preSale/modPreSaleList',odata,searchConsuc);
					}
					examIndexUp('此操作',btn_exmineClick);
					showData('examineIndex');
		        })
			});
			
			
			//添加服务单
			$('.customer_Add').on('click',function(){
				Reset();
				showData('customerAddIndex');
			});
			
			//服务单  根据渠道订单号查询
			$('.buttonshop_search').unbind('click').on('click',function(){
				var channelOrderNo = $('.channelOrderNo').val() || '',
					omsOrderNo = $('.omsOrderNo').val() || '';
				if(channelOrderNo == '' && omsOrderNo == ''){
					xcsoft.error('请输入渠道订单号或OMS订单号',1500);
					return;
				}
				var searchConsuc = function(data){
					if(data.result){
						$('.orderNo').html(data.result.orderNo);
						$('.orderPhone').html(data.result.phone);
					}else{
						xcsoft.error('暂无该渠道订单号数据',1800);
					}
				};
				var odata = {
					'channelOrderNo':channelOrderNo,
					'orderNo':omsOrderNo
				};
				doPost('/preSale/findByChannelOrderNo',odata,searchConsuc);
			});
			
			//添加服务单确定
			$('.butSUK_nextTwo').unbind('click').on('click',function(){
				var channelOrderNo = $('.channelOrderNo').val(),
					orderNo = $('.omsOrderNo').val(),
					to_do_user_id = $('.to_do_user_id').val(),
					memo = $('.memo').val(),
					enclosure = $('.buttonchanSKU_newAdd').attr('oSrc') || '',
					order_no = $('.order_no').val(),
					serviceType = $('.serviceTypeLevel').val(),
					orderPhone = $('.orderPhone').html(),
					serviceTypeLevel = $('.serviceTypeLevel').val(),
					preType = $('.preType').val(),
					emerLevel = $('.emerAddLevel').val();
					
				if(!checkNotEmpty(memo)){xcsoft.error('请输入备注',1500);return;}
				var addPreSaleBrand = {
					'channelOrderNo':channelOrderNo,  //渠道订单号
					'orderNo':orderNo,  //OMS订单号
					'userPhone':orderPhone,    
					'memo':memo,   //备注
					'preType':preType,   //售前售后
					'enclosure':enclosure, //上传
					'emerLevel':emerLevel, //紧急状态
					'serviceType':serviceType,
					'serviceType':serviceTypeLevel, //类型
					'status':3,
					'toDoUserId':$.cookie("username")
				};
				console.log(addPreSaleBrand)
				var btn_exmineClick = function(){
					var addPreSaleConsuc = function(data){
						console.log(data)
						if(data.msg == '添加成功'){
							modReload('添加成功');
						}else{
							xcsoft.error('添加失败',1000);
						}
					}
					doPost('/preSale/addPreSale',addPreSaleBrand,addPreSaleConsuc);
				}
				examIndexUp('添加此服务单',btn_exmineClick);
				showData('examineIndex');
			});
		};
		
		
		//重置
		function Reset(){
			$('.channelOrderNo').val('');
			$('.omsOrderNo').val('');
			$('.orderNo').html('');
			$('.orderPhone').html('');
			$('.userPhone').val('');
			$('.memo').val('');
			$('.buttonchanSKU_newAdd').attr('oSrc','');
			$('.buttonchanSKU_newAdd').html('上传附件');
		}
		
		
		//数据
		function dopostData(currentPage){
			var status = $('.status').val(),
				channel_code = $('.channal_id').val(),
				to_do_user_id = $('.to_do_user_id').val(),
				stime = $('.stime').val(),
				etime = $('.etime').val(),
				channel_order_no = $('.channel_order_no').val(),
				order_no = $('.order_no').val(),
				emerLevel = $('.emerLevel').val();
			var searchBrand = {
				'status':status,    //0异常1已完成2进行中3待更进 
				'channel_code':channel_code,  //渠道编号
				'to_do_user_id':to_do_user_id,  //跟进人
				'stime':stime,    //开始时间
				'etime':etime,   //结束时间
				'channel_order_no':channel_order_no,   //渠道订单号
				'order_no':order_no,   //订单编号
				'emerLevel':emerLevel,   //客户联系方式
				'currentPage':currentPage
			};
			var searchConsuc = function(data){
				var _result = data.result,ohtml='';
				if(_result.reslutList.length != 0){
					for(var i=0;i<_result.reslutList.length;i++){
						var updateTime = _result.reslutList[i].updateTime?odateFormat(_result.reslutList[i].updateTime):'',
							createUser = _result.reslutList[i].createUser?_result.reslutList[i].createUser:'',
							doUser = _result.reslutList[i].doUser?_result.reslutList[i].doUser:'',
							statusAttr = ['异常','已完成','进行中','待更进'],
							emerLevelAttr = ['','1','2','3','4'],
							emerLevel = _result.reslutList[i].emerLevel?_result.reslutList[i].emerLevel:0;
						ohtml+='<tr style="cursor: pointer;" oid='+_result.reslutList[i].id+' odata='+JSONstringify(JSON.stringify(_result.reslutList[i]))+'><td class="center"><input type="checkbox" name="checkName" class="flat-grey foocheck" cus_index="" id='+_result.reslutList[i].id+'></td><td class="center td">'+checkValue(_result.reslutList[i].channelOrder)+'</td><td class="center td">'+checkValue(_result.reslutList[i].orderNo)+'</td><td class="center td">'+checkValue(_result.reslutList[i].channelName)+'</td><td class="center td">'+emerLevelAttr[emerLevel]+'</td><td class="center td">'+odateFormat(_result.reslutList[i].createTime)+'</td><td class="center td">'+updateTime+'</td><td class="center td">'+doUser+'</td><td class="center td">'+statusAttr[_result.reslutList[i].status]+'</td>'
						if(_result.reslutList[i].preType == 1){
							ohtml+='<td class="center" style="white-space: nowrap;"><a href="javascript:void(0);" class="btn btn-md btn-light-beige tooltips " cus_index="1">售前备注</a></td></tr>'
						}else{
							ohtml+='<td class="center"><a href="javascript:void(0);" class="btn btn-md btn-light-beige tooltips " style="margin: 0 5px;" cus_index="2">售后备注</a></tr>'
						}
					}
					$('#body_table tbody').html(ohtml);
					$('#body_table tbody').show();
					$('.userIndex_table_false').hide();
					runTooltips();
					OpageDisplay(_result.currentPage,_result.totalPage,'userPage');
				}else{
					$('#body_table tbody').hide();
					$('.userPage').hide();
					$('.userIndex_table_false').show();
				}
			}
			doPost('/preSale/findPreSaleByPro',searchBrand,searchConsuc);
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
		var sucUp = function(data){
			if(data.result){
				xcsoft.success('文件上传成功',1000);
				$('.buttonchanSKU_newAdd').attr('oSrc',data.result);
			}else{
				xcsoft.error('文件上传失败',1000);
				$('.buttonchanSKU_newAdd').html('上传附件');
			}
		}
		uploadBeforeFile('buttonchanSKU_newAdd',sucUp);
	};
	return {
		init: function(typeDate) {
			customerClick(typeDate);
		}
	};
}();



/*服务单日报表*/
var customerDayList = function() {
	var customerClick = function() {
		datetimePicker();//时间选择
		//分配服务单
        $('.butAdd_primary').unbind('click').on('click',function(){
        	var stime = $('.stime').val();
				console.log(stime)
			if(!checkNotEmpty(stime)){xcsoft.error('请选择时间',1500);return;}
			var btn_exmineClick = function(){
				window.location.href = '/orders/exportCustomerServiceDailyData?day='+stime;
				$('.examineIndex').hide();
			}
			examIndexUp('此操作',btn_exmineClick);
			showData('examineIndex');
        })
	};
	return {
		init: function(typeDate) {
			customerClick(typeDate);
		}
	};
}();


/*库存查看*/
var stockMain = function() {
	function lackStokIstation(){
		var skuCode	= getParameter('skuCode') || '';
		$('.spuCode').val(skuCode);
		manager_Name();
		ByLevelcategory_id(1);
		channelList();
		dopostData(1);
		$('.button_search').on('click',function(){
			dopostData(1);
		})
		stockClick();
		//查询用户
        JSONfindUser('manager_id',1);
		//数据
		function dopostData(currentPage){
			var spuCode = $('.spuCode').val(),
				channal_id = $('.channal_id').val(),
				product_name = $('.product_name').val(),
				category_id = $('.category_id').val()?$('.category_id').val().split('-')[0]:'',
				channel_sku_code = $('.channel_sku_code').val(),
				manager_id = $('.manager_id').val();
			var searchBrand = {
				'spuCode':spuCode || '', //商品编号
				'channal_code':channal_id, //销售渠道
				'product_name':product_name || '', //商品名称
				'categoryCode':category_id, //分类ID
				'channel_sku_code':channel_sku_code || '', //渠道商品编号
				'manager_id':manager_id || '', //产品经理ID
				'currentPage':currentPage
			};
			console.log(category_id)
			var searchConsuc = function(data){
				var _result = data.result,oHtml='';
				if(_result.reslutList.length != 0){
					for(var i=0;i<_result.reslutList.length;i++){
						var manager = _result.reslutList[i].manager||'',
							day3Sales = _result.reslutList[i].day3Sales || '',
							day5Sales = _result.reslutList[i].day5Sales || '',
							day10Sales = _result.reslutList[i].day10Sales || '',
							channelList = _result.reslutList[i].channelList||'';
						oHtml+='<tr spuCode="'+_result.reslutList[i].spuCode+'" style="cursor: pointer;"><td class="center">'+checkValue(_result.reslutList[i].spuCode)+'</td><td class="center">'+checkValue(_result.reslutList[i].productName)+'</td><td class="center">'+checkValue(_result.reslutList[i].stock)+'</td><td class="center">'+day3Sales+'</td><td class="center">'+day5Sales+'</td><td class="center">'+day10Sales+'</td><td class="center">'+manager+'</td><td class="center">'+checkValue(_result.reslutList[i].category)+'</td><td class="center">'+channelList+'</td></tr>'
					}
					$('.stock_table tbody').html(oHtml);
					$('.panel-body table tbody').show();
					$('.userPage').show();
					$('.userIndex_table_false').hide();
					OpageDisplay(_result.currentPage,_result.totalPage||'1','userPage');
				}else{
					$('.panel-body table tbody').hide();
					$('.userPage').hide();
					$('.userIndex_table_false').show();
				}
			}
			doPost('/items/searchStock',searchBrand,searchConsuc);
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
		function stockClick(){
			$('.ordre_container .stock_table').unbind('dblclick').on('dblclick','tbody tr',function(){
				var _this=$(this);
				var stockConsuc = function(data){
					if(data.result){
						var a_result = data.result,oHtml='';/*,stockCookie='<option value="">请选择调拨到的仓库</option>'*/
						for(var s=0;s<a_result.length;s++){
							oHtml+='<tr><td class="center">'+a_result[s].warehouseCode+'</td><td class="center">'+a_result[s].productName+'</td><td class="center">'+a_result[s].actualStock+'</td><td class="center">'+a_result[s].availableStock+'</td>'
							/*stockCookie+= '<option value="'+ a_result[s].warehouseId+'">'+a_result[s].warehouseCode+'</option>'
							$.cookie("stockTable", stockCookie);*/
						}
						$('#stock_DivTable tbody').html(oHtml);
					}
				}
				var stockdata={'spuCode':_this.attr('spuCode')}
				doPost('/items/stockDetailList',stockdata,stockConsuc);
				var _index = $(this).index();
				$('.ordre_container .stock_table tbody tr').removeClass('success').eq(_index).addClass('success');
				showData('lackIndex');
				
				//调货
				$('#stock_DivTable tbody .btn_huanhuo').unbind('click').on('click',function(){
					var o_this = $(this),
						_data = JSONparse(o_this.attr('odata'));
						_stockcookie = $.cookie("stockTable");
					$('.table_stock').html(_stockcookie);
					for(var t=0;t<$('.table_stock option').length;t++){
						if(_data.warehouseId == $('.table_stock option').eq(t).val()){
							$('.table_stock option').eq(t).hide();
						}
					};
					$('.table_stock').val('');
					showData('stockAddIndex');
					$('.butOrder_nextTwo').unbind('click').on('click',function(){
						var _num = $('.two_count').val(),
							toWarehouseId = $('.table_stock').val();
						if(!checkNotEmpty(toWarehouseId)){
							xcsoft.error('请选择调拨到的仓库',1500);return;
						}
						if(_num == ''){
							xcsoft.error('请输入商品数量',1500);return;
						}
						if(_num > _data.actualStock){
							xcsoft.error('商品数量超过实际',1500);return;
						}
						var allocationBrand = {
							'fromWarehouseId': _data.warehouseId, //调拨的仓库ID
							'toWarehouseId': toWarehouseId, //调拨到的仓库ID
							'skuCode': _data.skuCode, //商品编号
							'number':_num  //数量
						}	
						var stockallocation = function(data){
							if(data.msg == '调拨成功'){
								modReload('调拨成功');
							}else{
								xcsoft.error('调拨失败',1000);
							}
						}
						doPost('/items/allocationStock',allocationBrand,stockallocation);
						
					})
				})
				
				$('.cusDiv_close').unbind('click').on('click',function(){
					$('.stockAddIndex').hide();
				})
			})
			$('.sukDiv_close').unbind('click').on('click',function(){
				$('.lackIndex').hide();
				$('.ordre_container .stock_table tbody tr').removeClass('success');
			})
		}
	}
	return {
		init: function() {
			lackStokIstation();
		}
	};
}();


/*规则配置*/
var suleStokMian = function() {
	function lackStokIstation(){
		$('.roleName').val('');	
		$('.remark').val('');
		$('.roleDetail').val('');
		/*查询*/
		$('.but_search').unbind('click').on('click',function(){
			var roleName = outReplace($('.channel_order_no').val());
			if(!roleName){xcsoft.error('请输入规则名称',1500);return;}
			$('.remarkMod').prop('disabled',true);
			$('.roleDetailMod').prop('disabled',true);
			$('.btn_commit').attr('oData',roleName);
			var searchConsuc = function(data){
				if(data.result){
					$('.btn_commit').attr('oDataId',data.result.id);
					$('.remarkMod').val(data.result.remark);
					$('.roleDetailMod').val(data.result.roleDetail);
				}else{
					xcsoft.error(data.msg,1000);
				}
			};
			doPost('/ruleEngine/find/'+roleName,'',searchConsuc);
		});
		
		
		/*编辑*/
		$('.butAdd_warning').unbind('click').on('click',function(){
			var roleName = $('.roleDetailMod').val();
			if(!checkNotEmpty(roleName)){xcsoft.error('请输入规则名称后点击查询',1500);return;}
			$('.remarkMod').prop('disabled',false);
			$('.roleDetailMod').prop('disabled',false);
		});
		//编辑确定
		$('.btn_commit').unbind('click').on('click',function(){
			var roleName = $('.but_search').val(),
				remark = $('.remarkMod').val();
				roleDetail = $('.roleDetailMod').val();
			if(!checkNotEmpty(roleDetail)){xcsoft.error('请输入规则名称',1500);return;}
			if($('.roleDetailMod').prop('disabled')){xcsoft.error('请先点击编辑',1500);return;}
			var oData = {
				'id':$('.btn_commit').attr('oDataId'),
				'roleName':$('.btn_commit').attr('oData'),
				'remark':remark,
				'roleDetail':roleDetail
			};
			var btn_exmineClick = function(){
		        var searchConsuc = function(data){
					if(data.result){
						xcsoft.success('修改成功',1000);
						$('.main-content').find('.examineIndex').remove();
					}else{
						xcsoft.error('修改失败',1000);
						$('.main-content').find('.examineIndex').remove();
					}
					$('.channelCode').prop('disabled',true);
				};
				doPost('/ruleEngine/update',oData,searchConsuc);
			}
			examIndexUp('此操作',btn_exmineClick);
			showData('examineIndex');
			$('.cusDiv_close').unbind('click').on('click',function(){
				$('.custmerIndex').hide();
			});
		});
		
		//新增
		$('.butAdd_primary').unbind('click').on('click',function(){
			showData('custmerIndex');
			$('.btn_commitNew').unbind('click').on('click',function(){
				var roleName = $('.roleName').val(),	
				remark = $('.remark').val(),
				roleDetail = $('.roleDetail').val();
				if(!checkNotEmpty(roleName)){xcsoft.error('请输入规则名称',1500);return;}
				if(!checkNotEmpty(roleDetail)){xcsoft.error('请输入规则内容',1500);return;}
				var oData = {
					'roleName':roleName,
					'remark':remark,
					'roleDetail':roleDetail
				};
				var btn_exmineClick = function(){
			        var searchConsuc = function(data){
						if(data.msg == '添加成功'){
							modReload('添加成功');
						}else{
							xcsoft.error(data.msg,1000);
						}
					};
					doPost('/ruleEngine/add',oData,searchConsuc);
				}
				examIndexUp('此操作',btn_exmineClick);
				showData('examineIndex');
			});
			$('.cusDiv_close').unbind('click').on('click',function(){
				$('.custmerIndex').hide();
			});
			
		});
		
		//删除
		$('.butAdd_del').unbind('click').on('click',function(){
			var roleName = $('.roleDetailMod').val();
			if(!checkNotEmpty(roleName)){xcsoft.error('请输入规则名称后点击查询',1000);return;}
			var btn_exmineClick = function(){
		        var searchConsuc = function(data){
					if(data.result){
						modReload('删除成功');
					}else{
						xcsoft.error('删除失败',1000);
					}
				};
				doPost('/ruleEngine/del/'+$('.btn_commit').attr('oDataId'),'',searchConsuc);
			}
			examIndexUp('此操作',btn_exmineClick);
			showData('examineIndex');
		});
	}
	return {
		init: function() {
			lackStokIstation();
		}
	};
}();


