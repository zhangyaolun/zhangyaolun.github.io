/*销售订单查询*/
var orderSale = function() {
	function orderSaleIstation(){
		datetimePicker();
		channelList();
		orderStatus_Name();
		orderClick();
		dopostData(1);
		$('.button_search').on('click',function(){
			dopostData(1);
		})
		//数据
		function dopostData(currentPage){
			var spuCode = $('.spuCode').val(),
				channal_code = $('.channal_id').val(),
				//channel_sku_code = $('.channel_sku_code').val(),
				orderNo = $('.orderNo').val(),
				status = $('.order_status').val(),
				//skuCode = $('.skuCode').val(),
				user_name = $('.user_name').val(),
				user_phone = $('.user_phone').val(),
				channel_sku_code = $('.channel_sku_code').val(),
				stime = $('.stime').val(),
				etime = $('.etime').val();
			var searchBrand = {
				'channelOrderNo':spuCode || '', //渠道订单编号
				'channelCode':channal_code, //销售渠道
				'orderNo':orderNo || '', //OMS订单号
				'orderStatus':parseInt(status), //订单状态
				'consignee':user_name || '', //收货人
				'phone':user_phone || '', //电话联系方式
				'stime':stime || '', //开始时间
				'etime':etime || '', //结束时间
				'currentPage':currentPage
			};
			if(!checkTime(stime,etime)){xcsoft.error('查询时间不能查过30天',1500);return;}
			var searchConsuc = function(data){
				var _result = data.result,oHtml='';
				if(_result.reslutList.length != 0){//danger
					for(var i=0;i<_result.reslutList.length;i++){
						var isReAttr = ['否','是'],
							orderRate =_result.reslutList[i].orderRate || '',
							payType = _result.reslutList[i].payType || '',
							orderTotal = _result.reslutList[i].orderTotal || '',
							dateFalg = _result.reslutList[i].overdue;
							
						if(_result.reslutList[i].orderStatus<1){
							oHtml+='<tr style="cursor: pointer;" class="danger" status="'+_result.reslutList[i].orderStatus+'" orderNo="'+_result.reslutList[i].orderNo+'" oid="'+_result.reslutList[i].id+'">'
						}else{
							oHtml+='<tr style="cursor: pointer;" status="'+_result.reslutList[i].orderStatus+'" oid="'+_result.reslutList[i].id+'" orderNo="'+_result.reslutList[i].orderNo+'">'
						}
						oHtml+='<td class="center">'+dateFalg+'</td><td class="center">'+checkValue(_result.reslutList[i].channelName)+'</td><td class="center">'+checkValue(_result.reslutList[i].channelOrderNo)+'</td><td class="center">'+checkValue(_result.reslutList[i].orderNo)+'</td><td class="center td">'+orderStatus_data(_result.reslutList[i].orderStatus)+'</td><td class="center">'+checkValue(_result.reslutList[i].consignee)+'</td><td class="center">'+checkValue(_result.reslutList[i].phone)+'</td><td class="center">'+checkValue(_result.reslutList[i].address)+'</td><td class="center">'+(_result.reslutList[i].productTotal/100).toFixed(2)+'</td><td class="center">'+orderRate+'</td><td class="center">'+isReAttr[_result.reslutList[i].isRe]+'</td><td class="center">'+payType+'</td><td class="center">'+(orderTotal/100).toFixed(2)+'</td><td class="center">'+odateFormat(_result.reslutList[i].createTime)+'</td></tr>'
						
					}
					$('.stock_table tbody').html(oHtml);
					$('.stock_table tbody').show();
					$('.userPage').show();
					$('.userIndex_table_false').hide();
					OpageDisplay(_result.currentPage,_result.totalPage,'userPage');
				}else{
					$('.stock_table tbody').hide();
					$('.userPage').hide();
					$('.userIndex_table_false').show();
				}
			}
			doPost('/orders/searchOrderByPro',searchBrand,searchConsuc);
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
	            onPageClicked: function (event, originalEvent, type, page) {
	               dopostData(page);
	            }
	        });
		}
		function orderClick(){
			$('.stock_table').unbind('dblclick').on('dblclick','tbody tr',function(event){
				var _this = $(this),
					oid = _this.attr('oid'),
					_index = _this.index(),
					orderNo = _this.attr('orderNo'),
					status = _this.attr('status');
				$('.ordre_container table tbody tr').removeClass('success').eq(_index).addClass('success');
				if(event.target.attributes['class'].value == 'center td'){
					if(status<1){
						var orderStatusHtml = {
							'0':'orderShopstock.html',   //缺货异常
							'-501':'orderAddress.html',   //收货地址异常
							'-502':'orderRate.html',        //费率异常
							'-503':'orderShopnum.html',   //商品编号对应异常
							'-505':'orderShopmoney.html'   //金额异常
						};
						window.location = orderStatusHtml[status]+'?orderNo='+orderNo;
					}else{
						tan_data(oid);
					}
				}else{
					tan_data(oid);
				}
				function tan_data(oid){
					var detailListConsuc = function(data){
						if(data.result){
							var listDetailAttr = [],
								listwoutAttr = [],
								listDetailHtml = '',
								listwoutHtml = '';
							if(data.result.listDetail){
								listDetailAttr=data.result.listDetail;
								for(var d=0;d<listDetailAttr.length;d++){
									var productName = listDetailAttr[d].productName||'',
									productManager = listDetailAttr[d].productManager||'';
									listDetailHtml+='<tr><td class="center">'+checkValue(listDetailAttr[d].channelSkuCode)+'</td><td class="center">'+checkValue(listDetailAttr[d].skuCode)+'</td><td class="center">'+productName+'</td><td class="center">'+productManager+'</td><td class="center">'+(listDetailAttr[d].price/100).toFixed(2)+'</td><td class="center">'+listDetailAttr[d].num+'</td><td class="center">'+(listDetailAttr[d].totalPrice/100).toFixed(2)+'</td></tr>'
								}
								$('#listDetail tbody').html(listDetailHtml);
								$('#listDetail tbody').show();
								$('.listDetail_table_false').hide();
							}else{
								$('#listDetail tbody').hide();
								$('.listDetail_table_false').show();
							}
							if(data.result.listwout){
								listwoutAttr=data.result.listwout;
								var shipmentDa = '';
								for(var s=0;s<listwoutAttr.length;s++){
									shipmentDa = listwoutAttr[s].shipmentDate?odateFormat(listwoutAttr[s].shipmentDate):'';
									listwoutHtml +='<tr><td class="center">'+checkValue(listwoutAttr[s].trackingNumber)+'</td><td class="center">'+checkValue(listwoutAttr[s].warehouseCode)+'</td><td class="center">'+shipmentDa+'</td><td class="center">'+checkValue(listwoutAttr[s].carrier)+'</td></tr>'
								}
								$('#listwout tbody').html(listwoutHtml);
								$('#listwout tbody').show();
								$('.listwout_table_false').hide();
							}else{
								$('#listwout tbody').hide();
								$('.listwout_table_false').show();
							}
							
						}
					}
					var detailListData = {'id':oid}
					doPost('/orders/detailListByOrderId',detailListData,detailListConsuc);
					var findByListConsuc = function(data){
						if(data.result){
							var _result = data.result,_ohtml='';
							$('#listTitle tbody').html('');
							for(var s=0;s<_result.length;s++){
								if(_result[s].logoList){
									for(var z=0;z<_result[s].logoList.length;z++){
										var hmemo = _result[s].logoList[z].hmemo?_result[s].logoList[z].hmemo:'',
											qmemo = _result[s].logoList[z].qmemo?_result[s].logoList[z].qmemo:'';
										_ohtml+='<tr><td class="center">'+qmemo+'</td><td class="center">'+hmemo+'</td></tr>'
									};
								}
							}
							$('#listTitle tbody').html(_ohtml);
							$('#listTitle tbody').show();
							$('.customer_table_false').hide();
						}else{
							$('#listTitle tbody').hide();
							$('.customer_table_false').show();
						}
					}
					var findByListData = {'orderNo':orderNo}
					doPost('/preSale/findByOrderNo',findByListData,findByListConsuc);
					showData('orderSalelIndex');
				}
			})
			$('.sukDiv_close').unbind("click").on('click',function(){
				$('.orderSalelIndex').hide();
				$('.ordre_container table tbody tr').removeClass('success');
			})
		}
	}
	return {
		init: function() {
			orderSaleIstation();
		}
	};
}();
/*销售子订单查询*/
var orderSaleSub = function() {
	function orderSaleIstation(){
		datetimePicker();
		channelList();
		orderStatus_Name();
		dopostData(1);
		$('.button_search').on('click',function(){
			dopostData(1);
		})
		//数据
		function dopostData(currentPage){
			var spuCode = $('.spuCode').val(),
				channal_code = $('.channal_id').val(),
				orderNo = $('.orderNo').val(),
				status = $('.order_status').val(),
				user_name = $('.user_name').val(),
				skuCode = $('.skuCode').val(),
				productName = $('.productName').val(),
				purchaseNo = $('.purchaseNo').val(),
				user_phone = $('.user_phone').val(),
				channel_sku_code = $('.channel_sku_code').val(),
				stime = $('.stime').val(),
				etime = $('.etime').val();
			var searchBrand = {
				'channelOrderNo':spuCode || '', //渠道订单编号
				'channelCode':channal_code, //销售渠道
				'productName':productName, //z商品名称
				'orderNo':orderNo || '', //OMS订单号
				'skuCode':skuCode || '', //SKU商品编号
				'purchaseNo':purchaseNo || '', //采购单号
				'orderStatus':parseInt(status), //订单状态
				'consignee':user_name || '', //收货人
				'phone':user_phone || '', //电话联系方式
				'stime':stime || '', //开始时间
				'etime':etime || '', //结束时间
				'currentPage':currentPage
			};
			if(!checkTime(stime,etime)){xcsoft.error('查询时间不能查过30天',1500);return;}
			var searchConsuc = function(data){
				console.log(data)
				var _result = data.result,oHtml='';
				if(_result.reslutList.length != 0){//danger
					for(var i=0;i<_result.reslutList.length;i++){
						var isReAttr = ['否','是'],
							TypeAttr = ['','实物订单','虚拟商品订单'],
							ordernum = _result.reslutList[i].num || '',
							orderreNum = (_result.reslutList[i].reNum !='' && (_result.reslutList[i].reNum<0))?Math.abs(_result.reslutList[i].reNum):'',
							orderRate =_result.reslutList[i].orderRate || '',
							itemCount =_result.reslutList[i].itemCount || '',
							isGift = _result.reslutList[i].isGift?'是':'否',
							is3c = _result.reslutList[i].is3c?'是':'否',
							reMoney = _result.reslutList[i].reMoney?'是':'否',
							shipment = _result.reslutList[i].shipmentTime?odateFormat(_result.reslutList[i].shipmentTime):'',
							odorderStatus = _result.reslutList[i].od_orderStatus?orderStatus_data(_result.reslutList[i].od_orderStatus):'',
							channelOrderCreateTime = _result.reslutList[i].channelOrderCreateTime?odateFormat(_result.reslutList[i].channelOrderCreateTime):'',
							orderTotal = _result.reslutList[i].orderTotal || '';
						if(_result.reslutList[i].od_orderStatus == '390' && !_result.reslutList[i].reMoney){
							oHtml+= '<tr><td class="center"><input type="checkbox" name="checkName" class="flat-grey foocheck" cus_index="" id='+_result.reslutList[i].detail_id+'></td>'
						}else{
							oHtml+= '<tr><td class="center"></td>'
						}	
						oHtml+='<td class="center">'+checkValue(_result.reslutList[i].channelName)+'</td><td class="center">'+checkValue(_result.reslutList[i].channelOrderNo)+'</td><td class="center but_sku" style="cursor: pointer;" oid="'+checkValue(_result.reslutList[i].skuCode)+'">'+checkValue(_result.reslutList[i].skuCode)+'</td><td class="center">'+checkValue(_result.reslutList[i].productName)+'</td><td class="center">'+checkValue(_result.reslutList[i].channelSkuCode)+'</td><td class="center">'+checkValue(_result.reslutList[i].orderNo)+'</td><td class="center td">'+orderStatus_data(_result.reslutList[i].o_orderStatus)+'</td><td class="center">'+checkValue(_result.reslutList[i].consignee)+'</td><td class="center">'+checkValue(_result.reslutList[i].phone)+'</td><td class="center">'+checkValue(_result.reslutList[i].province)+'</td><td class="center">'+checkValue(_result.reslutList[i].city)+'</td><td class="center">'+checkValue(_result.reslutList[i].area)+'</td><td class="center">'+checkValue(_result.reslutList[i].address)+'</td><td class="center">'+checkValue(_result.reslutList[i].orderDetailNo)+'</td><td class="center">'+checkValue(_result.reslutList[i].stockingCode)+'</td><td class="center">'+checkValue(_result.reslutList[i].purchaseNo)+'</td><td class="center">'+checkValue(_result.reslutList[i].productManager)+'</td><td class="center">'+odorderStatus+'</td><td class="center">'+TypeAttr[_result.reslutList[i].orderType]+'</td><td class="center">'+(_result.reslutList[i].price/100).toFixed(2)+'</td><td class="center">'+ordernum+'</td><td class="center">'+orderreNum+'</td><td class="center">'+orderRate+'</td><td class="center">'+(_result.reslutList[i].totalPrice/100).toFixed(2)+'</td><td class="center">'+checkValue(_result.reslutList[i].serialNumber)+'</td><td class="center">'+isGift+'</td><td class="center">'+reMoney+'</td><td class="center">'+checkValue(_result.reslutList[i].warehouseCode)+'</td><td class="center">'+checkValue(_result.reslutList[i].carrier)+'</td><td class="center">'+checkValue(_result.reslutList[i].trackingNumber)+'</td><td class="center">'+checkValue(_result.reslutList[i].weight)+'</td><td class="center">'+shipment+'</td><td class="center">'+itemCount+'</td><td class="center">'+is3c+'</td><td class="center">'+channelOrderCreateTime+'</td>'
						
						if(_result.reslutList[i].od_orderStatus == '390' && !_result.reslutList[i].reMoney){
							oHtml+= '<td class="center"><a href="javascript:;" class="btn btn-xs btn-blue tooltips buttonUser_detail" data-placement="top" data-original-title="已退款" oid="'+_result.reslutList[i].detail_id+'"><i class="fa">已退款</i></a></td></tr>'
						}else{
							oHtml+= '<td class="center"></td></tr>'
						}
					}
					$('.stock_table tbody').html(oHtml);
					$('.stock_table tbody').show();
					dataClick(_result.totalPage);
					$('.userPage').show();
					$('.userIndex_table_false').hide();
					OpageDisplay(_result.currentPage,_result.totalPage,'userPage');
				}else{
					$('.stock_table tbody').hide();
					$('.userPage').hide();
					$('.userIndex_table_false').show();
				}
			}
			doPost('/orders/searchDetailViewList',searchBrand,searchConsuc);
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
	            onPageClicked: function (event, originalEvent, type, page) {
	               dopostData(page);
	            }
	        });
		}
		
		function dataClick(totalPages){
			//全选
			butTable_more('butTable_more','body_table');
			//批量
			$('.btn_distribution').unbind('click').on('click',function(){
				if($('#body_table tbody').find("tr").length == 0)return;
				var falg = false,idList='',pros='';
				$("#body_table tbody input[name='checkName']:checked").each(function(k,v) { 
		            idList += v.id+','; 
		            pros += 1+','; 
		            console.log(v.id)
		            falg = true; 
		        }); 
		        if(!falg){xcsoft.error('请选择退款订单',1000);return;}
		        idList = idList.substring(0, idList.length - 1);
		        pros = pros.substring(0, pros.length - 1);
		        var modOrderBrand = {
					'ids':idList,
					'pros':pros,
					'modType':6
				}
				var btn_exmineClick = function(){
					var modOrderProConsuc = function(data){
						if(data.msg == '修改成功'){
							modReload('修改成功');
						}else{
							xcsoft.error('修改失败',1000);
						}
					}
					doPost('/orders/modOrderDetail',modOrderBrand,modOrderProConsuc);
				}
				examIndexUp('此操作',btn_exmineClick);
				showData('examineIndex');
				
			});
			//全部导出
			$('.btn_upAll').unbind('click').on('click',function(){
				if($('#body_table tbody').find("tr").length == 0)return;
				var btn_exmineClick = function(){
					var _status = $('.order_status').val();
					window.location.href = "/orders/aLLExcelDetailViewList?&channelOrderNo="+$('.spuCode').val()+"&stime="+$('.stime').val()+"&etime="+$('.etime').val()+"&channelCode="+$('.channal_id').val()+"&orderNo="+$('.orderNo').val()+"&orderStatus="+parseInt(_status)+"&consignee="+$('.user_name').val()+"&phone="+$('.user_phone').val()+"&skuCode="+$('.skuCode').val()+"&productName="+$('.productName').val()+"&currentPage=1&purchaseNo="+$('.purchaseNo').val();
					$('.examineIndex').hide();
				}
				examIndexUp('一次性导出不能超过5000条',btn_exmineClick,11);
				showData('examineIndex');
			});
			//跳转库存查看
			$('.but_sku').unbind('dblclick').on('dblclick',function(){
				var _this = $(this);
				window.location.href = "stockIstation.html?skuCode="+_this.attr('oid');
			})
			//修改
			$('.buttonUser_detail').unbind('click').on('click',function(){
				var _this = $(this);
				var modOrderBrand = {
					'ids':_this.attr('oid'),
					'pros':'1',
					'modType':6
				}
				console.log(_this.attr('oid'))
				var btn_exmineClick = function(){
					var modOrderProConsuc = function(data){
						if(data.msg == '修改成功'){
							modReload('修改成功');
						}else{
							xcsoft.error('修改失败',1000);
						}
					}
					doPost('/orders/modOrderDetail',modOrderBrand,modOrderProConsuc);
				}
				examIndexUp('此操作',btn_exmineClick);
				showData('examineIndex');
			})
		}
	}
	return {
		init: function() {
			orderSaleIstation();
		}
	};
}();
/*待审核订单列表*/
var orderAudited = function() {
	function orderGoodsIstation(){
		datetimePicker();
		channelList();
		orderStatus_Name();
		dopostData(1);
		orderClick();
		$('.button_search').on('click',function(){
			dopostData(1);
		})
		//数据
		function dopostData(currentPage){
			var spuCode = $('.spuCode').val(),
				channal_code = $('.channal_id').val(),
				//channel_sku_code = $('.channel_sku_code').val(),
				orderNo = $('.orderNo').val(),
				//skuCode = $('.skuCode').val(),
				user_name = $('.user_name').val(),
				user_phone = $('.user_phone').val(),
				channel_sku_code = $('.channel_sku_code').val(),
				stime = $('.stime').val(),
				etime = $('.etime').val();
			var searchBrand = {
				'channelOrderNo':spuCode || '', //渠道订单编号
				'channelCode':channal_code, //销售渠道
				'orderNo':orderNo || '', //OMS订单号
				'consignee':user_name || '', //收货人
				'phone':user_phone || '', //电话联系方式
				'stime':stime || '', //开始时间
				'etime':etime || '', //结束时间
				'currentPage':currentPage
			};
			if(!checkTime(stime,etime)){xcsoft.error('查询时间不能查过30天',1500);return;}
			var searchConsuc = function(data){
				var _result = data.result,oHtml='';
				if(_result.reslutList.length != 0){
					for(var i=0;i<_result.reslutList.length;i++){
						var isReAttr = ['否','是'],
							payType = _result.reslutList[i].payType || '',
							orderTotal = _result.reslutList[i].orderTotal || '';
						oHtml+='<tr class="orderGoods_tr"><td class="center check"><input type="checkbox" name="checkName" class="flat-grey foocheck" id="'+_result.reslutList[i].id+'"></label></td><td class="center">'+checkValue(_result.reslutList[i].channelName)+'</td><td class="center">'+checkValue(_result.reslutList[i].channelOrderNo)+'</td><td class="center">'+checkValue(_result.reslutList[i].orderNo)+'</td><td class="center">'+orderStatus_data(_result.reslutList[i].orderStatus)+'</td><td class="center">'+checkValue(_result.reslutList[i].consignee)+'</td><td class="center">'+checkValue(_result.reslutList[i].phone)+'</td><td class="center">'+checkValue(_result.reslutList[i].address)+'</td><td class="center">'+(_result.reslutList[i].productTotal/100).toFixed(2)+'</td><td class="center">'+isReAttr[_result.reslutList[i].isRe]+'</td><td class="center">'+payType+'</td><td class="center">'+(orderTotal/100).toFixed(2)+'</td><td class="center">'+odateFormat(_result.reslutList[i].channelOrderCreateTime)+'</td></tr>'
					}
					$('#content_tab').html(oHtml);
					$('#content_tab').show();
					$('.userPage').show();
					$('.userIndex_table_false').hide();
					OpageDisplay(_result.currentPage,_result.totalPage,'userPage');
				}else{
					$('#content_tab').hide();
					$('.userPage').hide();
					$('.userIndex_table_false').show();
				}
			}
			doPost('/orders/searchToExamineOrderByPro',searchBrand,searchConsuc);
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
		function orderClick(){
			//全选
			butTable_more('butTable_more','content_tab');
			//批量审核
			$('.button_examineSpu').on('click',function(){
				if($("#content_tab tr").length == 0)return;
				var exFalg = true,oid='';
				$("#content_tab input[name='checkName']").each(function(k,v) { 
		            if(v.checked){
		            	oid+=v.id+','
		            	exFalg = false;
		            }
		        }); 
		        if(exFalg){xcsoft.error('请选择商品',1500);return ;}
		        oid = oid.substring(0,oid.length - 1);
		        $('.btn_exmine').attr('oid',oid);
				showData('examineIndex');
				$('.sukDiv_close').unbind("click").on('click',function(){
					$('.examineIndex').hide();
				})
			})
			$('.btn_exmine').on('click',function(){
		        var oidd = $('.btn_exmine').attr('oid')
				var examineSpuConsuc = function(data){
					if(data.result.length == 0){
						xcsoft.success('审核成功',1500);
						setTimeout(function(){
							window.location.reload();
						},1000)
					}else{
						xcsoft.error('审核失败',1000);
					}
				}
				var examineSpu = {
					'orderIds':oidd
				}
				doPost('/orders/examineOrders',examineSpu,examineSpuConsuc);
			})
		}
	}
	return {
		init: function() {
			orderGoodsIstation();
		}
	};
}();


/*收货地址异常订单*/
var orderADDress = function() {
	function orderADDressIstation(){
		var orderNo	= getParameter('orderNo') || '';
		$('.orderNo').val(orderNo);
		datetimePicker();
		dopostData(1);
		$('.button_search').on('click',function(){
			dopostData(1);
		})
		var totalPage = 0,curPage=1;
		//数据
		function dopostData(currentPage){
			var spuCode = $('.spuCode').val(),
				orderNo = $('.orderNo').val(),
				user_name = $('.user_name').val(),
				user_phone = $('.user_phone').val(),
				stime = $('.stime').val(),
				etime = $('.etime').val();
			var searchBrand = {
				'channelOrderNo':spuCode || '', //渠道订单编号
				'orderNo':orderNo || '', //OMS订单号
				'consignee':user_name || '', //收货人
				'phone':user_phone || '', //电话联系方式
				'stime':stime || '', //开始时间
				'etime':etime || '', //结束时间
				'currentPage':currentPage
			};
			if(!checkTime(stime,etime)){xcsoft.error('查询时间不能查过30天',1500);return;}
			var searchConsuc = function(data){
				var _result = data.result,oHtml='';
				if(_result.reslutList.length != 0){
					for(var i=0;i<_result.reslutList.length;i++){
						var isReAttr = ['否','是'],
							orderTotal = _result.reslutList[i].orderTotal || '';
							oHtml+='<tr><td class="center">'+checkValue(_result.reslutList[i].channelName)+'</td><td class="center">'+checkValue(_result.reslutList[i].channelOrderNo)+'</td><td class="center">'+checkValue(_result.reslutList[i].orderNo)+'</td><td class="center">'+orderStatus_data(_result.reslutList[i].orderStatus)+'</td><td class="center">'+checkValue(_result.reslutList[i].consignee)+'</td><td class="center">'+checkValue(_result.reslutList[i].phone)+'</td><td class="center">'+checkValue(_result.reslutList[i].address)+'</td><td class="center">'+(orderTotal/100).toFixed(2)+'</td><td class="center">'+odateFormat(_result.reslutList[i].channelOrderCreateTime)+'</td><td class="center">'+isReAttr[_result.reslutList[i].isRe]+'</td><td class="center"><a href="javascript:;" odata="'+JSONstringify(JSON.stringify(_result.reslutList[i]))+'" class="btn btn-md btn-light-beige tooltips btnOrderAddress_Enable" duata-placement="top">编辑收货地址</a></td></tr>'
					}
					$('.stock_table tbody').html(oHtml);
					$('.stock_table tbody').show();
					$('.userPage').show();
					$('.userIndex_table_false').hide();
					orderClick();
					OpageDisplay(_result.currentPage,_result.totalPage,'userPage');
				}else{
					$('.stock_table tbody').hide();
					$('.userPage').hide();
					$('.userIndex_table_false').show();
				}
			}
			doPost('/orders/searchAddressExOrderByPro',searchBrand,searchConsuc);
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
	            shouldShowPage:true,
	            useBootstrapTooltip:true,
	           //点击事件
	            onPageClicked: function (event, originalEvent, type, page) {
	               dopostData(page);
	            }
	        });
		}
		function orderClick(){
			$('.btnOrderAddress_Enable').unbind('click').on('click',function(){
				$('#sample-table-2 tbody').html('');
				var _this = $(this),
					_thisData = JSONparse($(this).attr('odata'));
				$('#sample-table-2 tbody').html('<tr><td class="center">'+_thisData.channelName+'</td><td class="center">'+_thisData.channelOrderNo+'</td><td class="center">'+_thisData.orderNo+'</td><td class="center">'+odateFormat(_thisData.channelOrderCreateTime)+'</td></tr>');
				$('#index_tableTwo .two_consignee').val(_thisData.consignee || '');
				$('#index_tableTwo .two_address').val(_thisData.address || '');
				$('#index_tableTwo .two_province').val(_thisData.province || '');
				$('#index_tableTwo .two_city').val(_thisData.city || '');
				$('#index_tableTwo .two_area').val(_thisData.area || '');
				$('#index_tableTwo .two_phone').val(_thisData.phone || '');
		        $('.butSUK_nextTwo').attr('oid',_thisData.id);
		        showData('orderAddressIndex');
			});
			$('.sukDiv_close').unbind("click").on('click',function(){
				$('.orderAddressIndex').hide();
			});
			//确定修改地址信息
			$('.butSUK_nextTwo').unbind("click").on('click',function(){
				var oid = $(this).attr('oid');
				var indexAddreess_name = $('#index_tableTwo .two_consignee').val(),
					indexAddreess_map = $('#index_tableTwo .two_address').val(),
					two_province = $('#index_tableTwo .two_province').val(),
					two_city = $('#index_tableTwo .two_city').val(),
					two_area = $('#index_tableTwo .two_area').val(),
					indexAddreess_phone = $('#index_tableTwo .two_phone').val();
				var btn_exmineClick = function(){
					var searchConsuc = function(data){
						if(data.msg == '修改成功'){
							modReload('修改成功');
						}else{
							xcsoft.error('修改失败',1000);
						}
					}
					var odata = {
						'id':oid,
						'consignee':indexAddreess_name,
						'address':indexAddreess_map,
						'province':two_province,
						'city':two_city,
						'area':two_area,
						'phone':indexAddreess_phone
					}
					doPost('/orders/modOrder',odata,searchConsuc);
				}
				examIndexUp('修改此收货地址信息',btn_exmineClick);
		        showData('examineIndex');	
			});
		}
		//批量上传
		var lackIndexFun = function(data){
			var _result = data.result,oHtml='';
			if(_result){
				var _resultData = _result.split(',');
				for(var i=0;i<_resultData.length;i++){
					oHtml+='<tr><td class="center">'+_resultData[i]+'</td><td class="center">解析成功</td><tr>'
				}
				$('#upData tbody').html(oHtml);
				showData('lackIndex');
			}
			$('.lackIndex_close').unbind("click").on('click',function(){
				$('.lackIndex').hide();
			});
		}
		uploadFile('buttonchanSKU_newAdd','20',lackIndexFun);
	}
	return {
		init: function() {
			orderADDressIstation();
		}
	};
}();

/*修改费率*/
var orderRate = function() {
	function orderRateIstation(){
		var orderNo	= getParameter('orderNo') || '';
		$('.orderNo').val(orderNo);
		datetimePicker();
		dopostData(1);
		$('.button_search').on('click',function(){
			dopostData(1);
		})
		//数据
		function dopostData(currentPage){
			var spuCode = $('.spuCode').val(),
				orderNo = $('.orderNo').val(),
				user_name = $('.user_name').val(),
				user_phone = $('.user_phone').val(),
				stime = $('.stime').val(),
				etime = $('.etime').val();
			var searchBrand = {
				'channelOrderNo':spuCode || '', //渠道订单编号
				'orderNo':orderNo || '', //OMS订单号
				'consignee':user_name || '', //收货人
				'phone':user_phone || '', //电话联系方式
				'stime':stime || '', //开始时间
				'etime':etime || '', //结束时间
				'currentPage':currentPage
			};
			if(!checkTime(stime,etime)){xcsoft.error('查询时间不能查过30天',1500);return;}
			var searchConsuc = function(data){
				var _result = data.result,oHtml='';
				if(_result.reslutList.length != 0){
					for(var i=0;i<_result.reslutList.length;i++){
						var isReAttr = ['否','是'],
							orderTotal = _result.reslutList[i].orderTotal || '';
							oHtml+='<tr oid="'+_result.reslutList[i].id+'"><td class="center">'+checkValue(_result.reslutList[i].channelName)+'</td><td class="center">'+checkValue(_result.reslutList[i].channelOrderNo)+'</td><td class="center">'+checkValue(_result.reslutList[i].orderNo)+'</td><td class="center">'+orderStatus_data(_result.reslutList[i].orderStatus)+'</td><td class="center">'+checkValue(_result.reslutList[i].consignee)+'</td><td class="center">'+checkValue(_result.reslutList[i].phone)+'</td><td class="center">'+checkValue(_result.reslutList[i].address)+'</td><td class="center">'+(orderTotal/100).toFixed(2)+'</td><td class="center">'+odateFormat(_result.reslutList[i].channelOrderCreateTime)+'</td><td class="center">'+isReAttr[_result.reslutList[i].isRe]+'</td><td class="center"><a href="javascript:;" odata="'+JSONstringify(JSON.stringify(_result.reslutList[i]))+'" class="btn btn-md btn-light-beige tooltips btnOrderAddress_Enable" duata-placement="top">修改费率</a></td></tr>'
					}
					$('.stock_table tbody').html(oHtml);
					$('.stock_table tbody').show();
					$('.userPage').show();
					$('.userIndex_table_false').hide();
					orderClick();
					OpageDisplay(_result.currentPage,_result.totalPage,'userPage');
				}else{
					$('.stock_table tbody').hide();
					$('.userPage').hide();
					$('.userIndex_table_false').show();
				}
			}
			doPost('/orders/searchRateExOrderByPro',searchBrand,searchConsuc);
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
		function orderClick(){
			$('.btnOrderAddress_Enable').unbind('click').on('click',function(){
				$('#sample-table-2 tbody').html('');
				$('#listDetail tbody').html('');
				
				var _this = $(this),
					_thisData = JSONparse($(this).attr('odata')),
					orderRate = _thisData.orderRate?(_thisData.orderRate*100).toFixed(0):'',
					orderTotal = _thisData.orderTotal || '';
				$('#sample-table-2 tbody').html('<tr><td class="center">'+_thisData.channelName+'</td><td class="center">'+_thisData.channelOrderNo+'</td><td class="center">'+_thisData.orderNo+'</td><td class="center">'+(orderTotal/100).toFixed(2)+'</td><td class="center">'+odateFormat(_thisData.channelOrderCreateTime)+'</td><td class="center"><input type="number" oid="'+_thisData.id+'" style="width:100px;display: inline-block;" placeholder="请输入费率" class="form-control indexAddreess_name"><span style="margin-left: 2%;">%</span></td></tr>');
				$('#sample-table-2 tbody .indexAddreess_name').val(orderRate);
				$('#listDetail tbody').html('');
		        var detailListConsuc = function(data){
					if(data.result){
						var listDetailAttr = [],
							listwoutAttr = [],
							listDetailHtml = '',
							listwoutHtml = '';
						if(data.result.listDetail){
							listDetailAttr=data.result.listDetail;
							for(var d=0;d<listDetailAttr.length;d++){
								var productName = listDetailAttr[d].productName ||'',
									skuCode = listDetailAttr[d].skuCode ||'',
									taxRate = listDetailAttr[d].taxRate?(listDetailAttr[d].taxRate*100).toFixed(0):'',
									productManager = listDetailAttr[d].productManager||'';
								$('#listDetail tbody').append('<tr><td class="center">'+checkValue(listDetailAttr[d].channelSkuCode)+'</td><td class="center">'+skuCode+'</td><td class="center">'+productName+'</td><td class="center">'+productManager+'</td><td class="center">'+(listDetailAttr[d].price/100).toFixed(2)+'</td><td class="center"><input type="number" id="'+listDetailAttr[d].id+'" style="width:100px;display: inline-block;" placeholder="请输入费率" class="form-control indexAddreess_rate"><span style="margin-left: 2%;">%</span></td></tr>')
								$('#listDetail tbody tr').eq(d).find('.indexAddreess_rate').val(taxRate);
							}
							$('#listDetail tbody').show();
							$('.listDetail_table_false').hide();
						}else{
							$('#listDetail tbody').hide();
							$('.listDetail_table_false').show();
						}
					}
				}
				var detailListData = {'id':_thisData.id}
				doPost('/orders/detailListByOrderId',detailListData,detailListConsuc);
		        showData('orderAddressIndex');
			});
			$('.sukDiv_close').unbind("click").on('click',function(){
				$('.orderAddressIndex').hide();
			});
			//确定修改费率
			$('.butSUK_nextTwo').unbind("click").on('click',function(){
				if(!checkNotEmpty($('.indexAddreess_name').val())){xcsoft.error('请输入费率',1000);return;}
				var sfa=true,sHtml='',sId='';
				$('#listDetail tbody .indexAddreess_rate').each(function(k,v){
					if(!checkNotEmpty(v.value)){
						sfa=false;
					}else{
						sHtml +=(v.value/100).toFixed(2)+','
						sId +=v.id+','
					}
				})
				if(!sfa){xcsoft.error('请输入费率',1500);return;};
				sHtml = sHtml.substr(0, sHtml.length - 1); 
				sId = sId.substr(0, sId.length - 1); 
				var oData = {
					'modType':1,
					'ids':sId,
					'pros':sHtml
				},
				oFalg = true;
				
				var btn_exmineClick = function(){
					var oDataConsuc = function(data){
						if(data.msg != '修改成功'){
							oFalg = false;
						}
					}
					doPost('/orders/modOrderDetail',oData,oDataConsuc);
					var aData = {
						'id':$('.indexAddreess_name').attr('oid'),
						'orderRate':($('.indexAddreess_name').val()/100).toFixed(2)
					}
					aDataConsuc = function(data){
						if(data.msg != '修改成功'){
							oFalg = false;
						}
					}
					doPost('/orders/modOrder',aData,aDataConsuc);
					if(oFalg){
						modReload('修改成功');
					}else{
						xcsoft.error('修改失败',1000);
					}
				}
				examIndexUp('修改此订单费率',btn_exmineClick);
		        showData('examineIndex');
			});
		}
		//批量上传
		uploadFile('buttonchanSKU_newAdd','21');
	}
	return {
		init: function() {
			orderRateIstation();
		}
	};
}();

/*商品编号对应异常*/
var orderShopNum = function() {
	function orderRateIstation(){
		var orderNo	= getParameter('orderNo') || '';
		$('.orderNo').val(orderNo);
		datetimePicker();
		dopostData(1);
		$('.button_search').on('click',function(){
			dopostData(1);
		})
		//数据
		function dopostData(currentPage){
			var spuCode = $('.spuCode').val(),
				orderNo = $('.orderNo').val(),
				user_name = $('.user_name').val(),
				user_phone = $('.user_phone').val(),
				stime = $('.stime').val(),
				etime = $('.etime').val();
			var searchBrand = {
				'channelOrderNo':spuCode || '', //渠道订单编号
				'orderNo':orderNo || '', //OMS订单号
				'consignee':user_name || '', //收货人
				'phone':user_phone || '', //电话联系方式
				'stime':stime || '', //开始时间
				'etime':etime || '', //结束时间
				'currentPage':currentPage
			};
			if(!checkTime(stime,etime)){xcsoft.error('查询时间不能查过30天',1500);return;}
			var searchConsuc = function(data){
				var _result = data.result,oHtml='';
				if(_result.reslutList.length != 0){
					for(var i=0;i<_result.reslutList.length;i++){
						var isReAttr = ['否','是'],
							orderTotal = _result.reslutList[i].orderTotal || '';
							oHtml+='<tr oid="'+_result.reslutList[i].id+'"><td class="center">'+checkValue(_result.reslutList[i].channelName)+'</td><td class="center">'+checkValue(_result.reslutList[i].channelOrderNo)+'</td><td class="center">'+checkValue(_result.reslutList[i].orderNo)+'</td><td class="center">'+orderStatus_data(_result.reslutList[i].orderStatus)+'</td><td class="center">'+checkValue(_result.reslutList[i].consignee)+'</td><td class="center">'+checkValue(_result.reslutList[i].phone)+'</td><td class="center">'+checkValue(_result.reslutList[i].address)+'</td><td class="center">'+checkValue((orderTotal/100).toFixed(2))+'</td><td class="center">'+odateFormat(_result.reslutList[i].channelOrderCreateTime)+'</td><td class="center">'+isReAttr[_result.reslutList[i].isRe]+'</td><td class="center"><a href="javascript:;" odata="'+JSONstringify(JSON.stringify(_result.reslutList[i]))+'" class="btn btn-md btn-light-beige tooltips btnOrderAddress_Enable" duata-placement="top">修改商品渠道编号</a></td></tr>'
					}
					$('.stock_table tbody').html(oHtml);
					$('.stock_table tbody').show();
					$('.userPage').show();
					$('.userIndex_table_false').hide();
					orderClick();
					OpageDisplay(_result.currentPage,_result.totalPage,'userPage');
				}else{
					$('.stock_table tbody').hide();
					$('.userPage').hide();
					$('.userIndex_table_false').show();
				}
			}
			doPost('/orders/searchSkuExOrderByPro',searchBrand,searchConsuc);
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
		function orderClick(){
			$('.btnOrderAddress_Enable').unbind('click').on('click',function(){
				showData('orderAddressIndex');
				$('#sample-table-2 tbody').html('');
				var _this = $(this),
					_thisData = JSONparse($(this).attr('odata')),
					orderRate = _thisData.orderRate || '',
					consignee = _thisData.consignee || '点击输入收货人姓名',
					address = _thisData.address || '点击输入收货地址',
					phone = _thisData.phone || '点击输入联系电话';
				$('#sample-table-2 tbody').html('<tr><td class="center">'+_thisData.channelName+'</td><td class="center">'+_thisData.channelOrderNo+'</td><td class="center">'+_thisData.orderNo+'</td><td class="center">'+(orderRate/100).toFixed(2)+'</td><td class="center">'+odateFormat(_thisData.channelOrderCreateTime)+'</td></tr>');
				$('.indexAddreess_name').editable({
		            validate: function (value) {
		                if (!$.trim(value)) {return '不能为空';}
		            }
		        });
		        var detailListConsuc = function(data){
					if(data.result){
						var listDetailAttr = [],
							listwoutAttr = [],
							listDetailHtml = '',
							listwoutHtml = '';
						if(data.result.listDetail){
							listDetailAttr=data.result.listDetail;
							for(var d=0;d<listDetailAttr.length;d++){
								var productName = listDetailAttr[d].productName ||'',
									skuCode = listDetailAttr[d].skuCode?listDetailAttr[d].skuCode:'点击输入商品SKU编号',
									productManager = listDetailAttr[d].productManager||'';
								listDetailHtml+='<tr><td class="center">'+checkValue(listDetailAttr[d].channelSkuCode)+'</td><td class="center"><span class="indexAddreess_skuCode" data-type="text" id="'+listDetailAttr[d].id+'" data-title="商品SKU编号">'+skuCode+'</span></td><td class="center">'+productName+'</td><td class="center">'+productManager+'</td><td class="center">'+(listDetailAttr[d].price/100).toFixed(2)+'</td></tr>'
							}
							$('#listDetail tbody').html(listDetailHtml);
							$('.indexAddreess_skuCode').editable({
					            validate: function (value) {
					                if (!$.trim(value)) {return '不能为空';}
					            }
					        });
							$('#listDetail tbody').show();
							$('.listDetail_table_false').hide();
						}else{
							$('#listDetail tbody').hide();
							$('.listDetail_table_false').show();
						}
					}
				}
				var detailListData = {'id':_thisData.id}
				doPost('/orders/detailListByOrderId',detailListData,detailListConsuc);
		        showData('orderAddressIndex');
			});
			$('.sukDiv_close').unbind("click").on('click',function(){
				$('.orderAddressIndex').hide();
			});
			$('.butSUK_nextTwo').unbind("click").on('click',function(){
				var sfa=true,sHtml='',sId='';
				$('#listDetail tbody .indexAddreess_skuCode').each(function(k,v){
					if(v.innerHTML == '点击输入费率'){
						sfa=false;
					}else{
						sHtml +=v.innerHTML+','
						sId +=v.id+','
					}
				})
				if(!sfa){xcsoft.error('请点击输入费率',1500);return;};
				sHtml = sHtml.substr(0, sHtml.length - 1); 
				sId = sId.substr(0, sId.length - 1); 
				var oData = {
					'modType':2,
					'ids':sId,
					'pros':sHtml
				};
				var btn_exmineClick = function(){
					var oDataConsuc = function(data){
						if(data.msg == '修改成功'){
							modReload('修改成功');
						}else{
							xcsoft.error('修改失败',1000);
						}
					}
					doPost('/orders/modOrderDetail',oData,oDataConsuc);
				}
				examIndexUp('修改此订单',btn_exmineClick);
		        showData('examineIndex');
			});
		}
		//批量上传
		uploadFile('buttonchanSKU_newAdd','22');
	}
	return {
		init: function() {
			orderRateIstation();
		}
	};
}();

/*缺货异常订单列表*/
var orderShopstock = function() {
	function orderRateIstation(){
		sendBusiness(2);
		channelList();
		var orderNo	= getParameter('orderNo') || '';
		$('.orderNo').val(orderNo);
		datetimePicker();
		//查询用户
        JSONfindUser('manager_id',1);
        searchBrand(2,'brand_id');
		dopostData(1);
		$('.button_search').on('click',function(){
			dopostData(1);
		})
		
		//数据
		function dopostData(currentPage){
			var spuCode = $('.spuCode').val(),
				orderNo = $('.orderNo').val(),
				user_name = $('.user_name').val(),
				manager_id = $('.manager_id').val(),
				channelCode = $('.channal_id').val(),
				skuCode = $('.skuCode').val(),
				sort = $('.sort').val(),
				sendBusiness = $('.sendBusiness').val(),
				brand_id = $('.brand_id').val()?$('.brand_id').val().split('|')[0]:'';
				user_phone = $('.user_phone').val(),
				stime = $('.stime').val(),
				etime = $('.etime').val();
			var searchBrand = {
				'channelOrderNo':spuCode || '', //渠道订单编号
				'channelCode':channelCode || '', //渠道
				'orderNo':orderNo || '', //OMS订单号
				'consignee':user_name || '', //收货人
				'phone':user_phone || '', //电话联系方式
				'stime':stime || '', //开始时间
				'etime':etime || '', //结束时间
				'productManagerId':manager_id || '', //产品经理
				'brandId':brand_id || '', //品牌
				'orderField':sort || '', //排序
				'supplierId':sendBusiness || '', //供应商
				'skuCode':skuCode || '', //sku
				'currentPage':currentPage
			};
			if(!checkTime(stime,etime)){xcsoft.error('查询时间不能查过30天',1500);return;}
			var searchConsuc = function(data){
				console.log(data)
				var _result = data.result,oHtml='';
				if(_result.reslutList.length != 0){
					for(var i=0;i<_result.reslutList.length;i++){
						var isReAttr = ['否','是'],
						    oo_num = _result.reslutList[i].num || ''
							orderTotal = _result.reslutList[i].orderTotal || '';
							
						oHtml+='<tr style="cursor: pointer;"><td class="center td"><input type="checkbox" name="checkName" class="flat-grey foocheck" id="'+_result.reslutList[i].detail_id+'"></td><td class="center td">'+checkValue(_result.reslutList[i].skuCode)+'</td><td class="center td">'+checkValue(_result.reslutList[i].productName)+'</td><td class="center td">'+checkValue(_result.reslutList[i].channelName)+'</td><td class="center">'+checkValue(_result.reslutList[i].channelOrderNo)+'</td><td class="center">'+checkValue(_result.reslutList[i].orderNo)+'</td><td class="center">'+orderStatus_data(_result.reslutList[i].o_orderStatus)+'</td><td class="center">'+checkValue(_result.reslutList[i].consignee)+'</td><td class="center">'+checkValue(_result.reslutList[i].address)+'</td><td class="center">'+checkValue((_result.reslutList[i].totalPrice/100).toFixed(2))+'</td><td class="center">'+odateFormat(_result.reslutList[i].requestForShipmentTime)+'</td><td class="center">'+oo_num+'</td><td class="center">'+isReAttr[_result.reslutList[i].isRe]+'</td></tr>'
							
					}
					$('.stock_table tbody').html(oHtml);
					$('.stock_table tbody').show();
					$('.userPage').show();
					$('.userIndex_table_false').hide();
					orderClick();
					OpageDisplay(_result.currentPage,_result.totalPage,'userPage');
				}else{
					$('.stock_table tbody').hide();
					$('.userPage').hide();
					$('.userIndex_table_false').show();
				}
			}
			doPost('/orders/searchStockExOrderByPro',searchBrand,searchConsuc);
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
		function orderClick(){
			//全选
			butTable_more('butTable_more','content_tab');
			//订单导出
			$('.btn_exmine').unbind('click').on('click',function(){
				var oid=oidFun();
				if(oid){
					var btn_exmineClick = function(){
						window.location.href = "/orders/exportExcelByStockEx?id="+oid.split('|')[0];
						$('.examineIndex').hide();
					}
					examIndexUp('此操作',btn_exmineClick);
					showData('examineIndex');
				}
			})
			//全部导出
			$('.btn_upAll').unbind('click').on('click',function(){
				var btn_exmineClick = function(){
					var brand_ida = $('.brand_id').val()?$('.brand_id').val().split('|')[0]:'';
					window.location.href = "/orders/allExcelByStockEx?channelOrderNo="+$('.spuCode').val()+"&orderNo="+$('.orderNo').val()+"&stime="+$('.stime').val()+"&etime="+$('.etime').val()+"&channelCode="+$('.channal_id').val()+"&consignee="+$('.user_name').val()+"&phone="+$('.user_phone').val()+"&skuCode="+$('.skuCode').val()+"&brandId="+brand_ida+"&supplierId="+$('.sendBusiness').val()+"&productManagerId="+$('.manager_id').val()+"&orderField="+$('.sort').val()+"&currentPage=1&purchaseNo="+$('.purchaseNo').val();
					$('.examineIndex').hide();
				}
				examIndexUp('一次性导出不能超过10000条',btn_exmineClick,11);
				showData('examineIndex');
			})
			//换货
			$('.btn_exchange').unbind('click').on('click',function(){
				if($('#content_tab tr').length == 0)return;
				var oid=oidFun();
				if(oid){
					$('.btn_exmine').attr('oid',oid);
					var modSkuBrands = {
						'modType':7,
						'ids':oid.split('|')[0],
						'pros':oid.split('|')[1],
					}
					var btn_exchanges = function(){
						var modSkuProConsucs = function(data){
							if(data.msg == '修改成功'){
								modReload('换货成功');
							}else{
								xcsoft.error('换货失败',1000);
							}
						}
						doPost('/orders/modOrderDetail',modSkuBrands,modSkuProConsucs);
					}
					examIndexUp('批量换货后订单将变成商品对应异常订单',btn_exchanges,11);
					showData('examineIndex');
				}
			})
			$('.sukTab_close').unbind("click").on('click',function(){
				$('.orderTableIndex').hide();
				$('.stock_table tbody tr').removeClass('success');
			});
			//批量代发      
			$('.button_examineSpu').unbind('click').on('click',function(){
				if($('#content_tab tr').length == 0)return;
				var oid=oidFun();
				if(oid){
					$('.btn_exmine').attr('oid',oid);
					var modSkuBrand = {
						'modType':3,
						'ids':oid.split('|')[0],
						'pros':oid.split('|')[1],
					}
					var btn_exmineClick = function(){
						var modSkuProConsuc = function(data){
							if(data.msg == '修改成功'){
								modReload('订单代发成功');
							}else{
								xcsoft.error('订单代发失败',1000);
							}
						}
						doPost('/orders/modOrderDetail',modSkuBrand,modSkuProConsuc);
					}
					examIndexUp('此操作',btn_exmineClick);
					showData('examineIndex');
				}
			})
			
			function oidFun(){
				var sid = '',pros = '1',pro = '',exFalg = true;
				$("#content_tab tr input[name='checkName']").each(function(k,v) { 
		            if(v.checked){
		            	sid+=v.id+',';
		            	pro+=pros+',';
		            	exFalg = false;
		            }
		        }); 
		        if(exFalg){xcsoft.error('请选择订单',1500);return ;}
		        sid = sid.substring(0,sid.length - 1);
		        pro = pro.substring(0,pro.length - 1);
		        return sid+'|'+pro;
			}
		}
	}
	return {
		init: function() {
			orderRateIstation();
		}
	};
}();

/*金额异常*/
var orderMoney = function() {
	function orderRateIstation(){
		var orderNo	= getParameter('orderNo') || '';
		$('.orderNo').val(orderNo);
		datetimePicker();
		dopostData(1);
		$('.button_search').on('click',function(){
			dopostData(1);
		})
		//数据
		function dopostData(currentPage){
			var spuCode = $('.spuCode').val(),
				orderNo = $('.orderNo').val(),
				user_name = $('.user_name').val(),
				user_phone = $('.user_phone').val(),
				stime = $('.stime').val(),
				etime = $('.etime').val();
			var searchBrand = {
				'channelOrderNo':spuCode || '', //渠道订单编号
				'orderNo':orderNo || '', //OMS订单号
				'consignee':user_name || '', //收货人
				'phone':user_phone || '', //电话联系方式
				'stime':stime || '', //开始时间
				'etime':etime || '', //结束时间
				'currentPage':currentPage
			};
			if(!checkTime(stime,etime)){xcsoft.error('查询时间不能查过30天',1500);return;}
			var searchConsuc = function(data){
				var _result = data.result,oHtml='';
				if(_result.reslutList.length != 0){
					for(var i=0;i<_result.reslutList.length;i++){
						var isReAttr = ['否','是'],
							orderTotal = _result.reslutList[i].orderTotal || '';
							oHtml+='<tr oid="'+_result.reslutList[i].id+'"><td class="center">'+checkValue(_result.reslutList[i].channelName)+'</td><td class="center">'+checkValue(_result.reslutList[i].channelOrderNo)+'</td><td class="center">'+checkValue(_result.reslutList[i].orderNo)+'</td><td class="center">'+orderStatus_data(_result.reslutList[i].orderStatus)+'</td><td class="center">'+checkValue(_result.reslutList[i].consignee)+'</td><td class="center">'+checkValue(_result.reslutList[i].phone)+'</td><td class="center">'+checkValue(_result.reslutList[i].address)+'</td><td class="center">'+(orderTotal/100).toFixed(2)+'</td><td class="center">'+odateFormat(_result.reslutList[i].channelOrderCreateTime)+'</td><td class="center">'+isReAttr[_result.reslutList[i].isRe]+'</td><td class="center"><a href="javascript:;" odata="'+JSONstringify(JSON.stringify(_result.reslutList[i]))+'" class="btn btn-md btn-light-beige tooltips btnOrderAddress_Enable" duata-placement="top">修改订单金额</a></td></tr>'
					}
					$('.stock_table tbody').html(oHtml);
					$('.stock_table tbody').show();
					$('.userPage').show();
					$('.userIndex_table_false').hide();
					orderClick();
					OpageDisplay(_result.currentPage,_result.totalPage,'userPage');
				}else{
					$('.stock_table tbody').hide();
					$('.userPage').hide();
					$('.userIndex_table_false').show();
				}
			}
			doPost('/orders/searchMoneyExOrderByPro',searchBrand,searchConsuc);
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
		function orderClick(){
			$('.btnOrderAddress_Enable').unbind('click').on('click',function(){
				showData('orderAddressIndex');
				$('#sample-table-2 tbody').html('');
				var _this = $(this),
					_thisData = JSONparse($(this).attr('odata')),
					orderTotal = _thisData.orderTotal?(_thisData.orderTotal/100).toFixed(2):'点击输入订单总价',
					consignee = _thisData.consignee || '点击输入收货人姓名',
					address = _thisData.address || '点击输入收货地址',
					phone = _thisData.phone || '点击输入联系电话';
				$('#sample-table-2 tbody').html('<tr><td class="center">'+_thisData.channelName+'</td><td class="center">'+_thisData.channelOrderNo+'</td><td class="center">'+_thisData.orderNo+'</td><td class="center"><span class="indexAddreess_name" oid="'+_thisData.id+'" data-type="text" data-title="订单总价">'+orderTotal+'</span></td><td class="center"></td><td class="center">'+odateFormat(_thisData.channelOrderCreateTime)+'</td></tr>');
				$('.indexAddreess_name').editable({
		            validate: function (value) {
		                if (!$.trim(value)) {return '不能为空';}
		            }
		        });
		        showData('orderAddressIndex');
			});
			$('.sukDiv_close').unbind("click").on('click',function(){
				$('.orderAddressIndex').hide();
			});
			$('.butSUK_nextTwo').unbind("click").on('click',function(){
				var indexAddreess_name = $('.indexAddreess_name').html();
				if(indexAddreess_name == '点击输入订单总价'){xcsoft.error('请点击输入订单总价',1000);return;}
				var btn_exmineClick = function(){
					var searchConsuc = function(data){
						if(data.msg == '修改成功'){
							modReload('修改成功');
						}else{
							xcsoft.error('修改失败',1000);
						}
					}
					var odata = {
						'id':$('.indexAddreess_name').attr('oid'),
						'orderTotal':(indexAddreess_name*100).toFixed(0)
					}
					doPost('/orders/modOrder',odata,searchConsuc);
				}
				examIndexUp('删除',btn_exmineClick);
		        showData('examineIndex');
			});
		}
	}
	return {
		init: function() {
			orderRateIstation();
		}
	};
}();

/*异常运单列表*/
var orderShopWay = function() {
	function orderShopWayIstation(){
		datetimePicker();
		channelList();
		dopostData(1);
		$('.button_search').on('click',function(){
			dopostData(1);
		})
		oDFOrder();
		//数据
		function dopostData(currentPage){
			var spuCode = $('.channelOrderNo').val(),
				orderNo = $('.orderNo').val(),
				channelCode = $('.channal_id').val(),
				consignee = $('.consignee').val(),
				phone = $('.phone').val(),
				stime = $('.stime').val(),
				etime = $('.etime').val();
			var searchBrand = {
				'channelOrderNo':spuCode || '', //渠道订单编号
				'orderNo':orderNo || '', //OMS订单号
				'channelCode':channelCode || '', //渠道编号
				'consignee':consignee || '', //收货人
				'phone':phone || '', //电话联系方式
				'stime':stime || '', //开始时间
				'etime':etime || '', //结束时间
				'currentPage':currentPage
			};
			if(!checkTime(stime,etime)){xcsoft.error('查询时间不能查过30天',1500);return;}
			$('.btn_exmine').attr('currentPage',currentPage);
			var searchConsuc = function(data){
				var _result = data.result,oHtml='';
				if(_result.reslutList.length != 0){
					for(var i=0;i<_result.reslutList.length;i++){
						var isReAttr = ['否','是'],
							orderRate = _result.reslutList[i].orderRate || '',
							carrier = _result.reslutList[i].carrier || '',
							tracking_number = _result.reslutList[i].tracking_number || '',
							warehouseCode = _result.reslutList[i].warehouseCode || '',
							isRe = _result.reslutList[i].isRe || 0;
						oHtml+='<tr class="orderGoods_tr" style="cursor: pointer;" oData="'+JSONstringify(JSON.stringify(_result.reslutList[i]))+'"><td class="center">'+checkValue(_result.reslutList[i].channel_name)+'</td><td class="center">'+checkValue(_result.reslutList[i].channel_order_no)+'</td><td class="center">'+checkValue(_result.reslutList[i].order_no)+'</td><td class="center">'+tracking_number+'</td><td class="center">'+checkValue(_result.reslutList[i].consignee)+'</td><td class="center">'+checkValue(_result.reslutList[i].phone)+'</td><td class="center">'+checkValue(_result.reslutList[i].address)+'</td><td class="center">'+carrier+'</td><td class="center">'+orderRate+'</td><td class="center">'+isReAttr[isRe]+'</td><td class="center">'+warehouseCode+'</td><td class="center">'+odateFormat(_result.reslutList[i].create_time)+'</td></tr>'
					}
					$('#content_tab').html(oHtml);
					$('#content_tab').show();
					$('.userPage').show();
					$('.userIndex_table_false').hide();
					if(!$('#content_tab').attr('oPage')){
						OpageDisplay(_result.currentPage,_result.totalPage,'userPage');
					}
					$('#content_tab').attr('oPage','1');
				}else{
					$('#content_tab').hide();
					$('.userPage').hide();
					$('.userIndex_table_false').show();
				}
			}
			doPost('/orders/searchWareHouseOutExList',searchBrand,searchConsuc);
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
		//订单导出
		function oDFOrder(){
			$('.button_examineSpu').unbind('click').on('click',function(){
				if($('#content_tab tr').length == 0)return;
				showData('examineIndex');
				$('.examineIndex_close').unbind('click').on('click',function(){
					$('.examineIndex').hide();
				})
			})
			$('.btn_exmine').unbind('click').on('click',function(){
				window.location.href = "/orders/orders/searchWareHouseOutExList?channelOrderNo="+$('.channelOrderNo').val()+"&orderNo="+$('.orderNo').val()+"&phone="+$('.phone').val()+"&stime="+$('.stime').val()+"&etime="+$('.etime').val()+"&channelCode="+$('.channal_id').val()+"&consignee="+$('.consignee').val()+"&currentPage="+$('.btn_exmine').attr('currentPage');
				modReload('导出成功');
			})
		}
	}
	return {
		init: function() {
			orderShopWayIstation();
		}
	};
}();

/*订单代发*/
var orderAgent = function() {
	function orderGoodsIstation(){
		datetimePicker();
		dopostData(1);
		$('.button_search').on('click',function(){
			dopostData(1);
		})
		orderClick();
		oDFOrder();
		//数据
		function dopostData(currentPage){
			var spuCode = $('.channelOrderNo').val(),
				orderNo = $('.orderNo').val(),
				phone = $('.phone').val(),
				purchaseNo = $('.purchaseNo').val(),
				stime = $('.stime').val(),
				etime = $('.etime').val();
			if(!checkTime(stime,etime)){xcsoft.error('查询时间不能查过30天',1500);return;}
			var searchBrand = {
				'channelOrderNo':spuCode || '', //渠道订单编号
				'orderNo':orderNo || '', //OMS订单号
				'phone':phone || '', //电话联系方式
				'stime':stime || '', //开始时间
				'etime':etime || '', //结束时间
				'purchaseNo':purchaseNo || '', //采购单编号
				'currentPage':currentPage
			};
			
			$('.btn_exmine').attr('currentPage',currentPage);
			var searchConsuc = function(data){
				var _result = data.result,oHtml='';
				if(_result.reslutList.length != 0){
					for(var i=0;i<_result.reslutList.length;i++){
						var isReAttr = ['否','是'],
							cagoudan = _result.reslutList[i].cagoudan || '',
							carrier = _result.reslutList[i].carrier || '',
							_num = _result.reslutList[i].num || '',
							tracking_number = _result.reslutList[i].tracking_number || '',
							purchaseno = _result.reslutList[i].purchaseNo || '',
							stocking_code = _result.reslutList[i].stocking_code || '',
							_price = ((_result.reslutList[i].price)/100).toFixed(2),
							request_for_shipment_time = _result.reslutList[i].request_for_shipment_time?odateFormat(_result.reslutList[i].request_for_shipment_time):'',
							isthhuo = _result.reslutList[i].isthhuo || 0;
						oHtml+='<tr class="orderGoods_tr" oData="'+JSONstringify(JSON.stringify(_result.reslutList[i]))+'"><td class="center td"><input type="checkbox" name="checkName" class="flat-grey foocheck" id="'+_result.reslutList[i].id+'|'+_result.reslutList[i].sku_code+'|'+_result.reslutList[i].product_name+'|'+_price+'|'+_num+'|'+_result.reslutList[i].channel_sku_code+'|'+_result.reslutList[i].channel_code+'"></td><td class="center">'+checkValue(_result.reslutList[i].channel_name)+'</td><td class="center">'+checkValue(_result.reslutList[i].channel_order_no)+'</td><td class="center">'+checkValue(_result.reslutList[i].channel_sku_code)+'</td><td class="center">'+checkValue(_result.reslutList[i].sku_code)+'</td><td class="center">'+checkValue(_result.reslutList[i].product_name)+'</td><td class="center">'+checkValue(_result.reslutList[i].order_no)+'</td><td class="center">'+checkValue(_result.reslutList[i].order_detail_no)+'</td><td class="center">'+orderStatus_data(_result.reslutList[i].order_status)+'</td><td class="center">'+checkValue(_result.reslutList[i].address)+'</td><td class="center">'+odateFormat(_result.reslutList[i].create_time)+'</td><td class="center">'+_price+'</td><td class="center">'+_num+'</td><td class="center">'+_result.reslutList[i].isheji+'</td><td class="center">'+stocking_code+'</td><td class="center">'+purchaseno+'</td><td class="center">'+isReAttr[isthhuo]+'</td><td class="center">'+tracking_number+'</td><td class="center">'+carrier+'</td>'
						if(purchaseno){
							oHtml+= '<td class="center"><a href="javascript:;" class="btn btn-xs btn-blue tooltips buttonUser_Record" data-placement="top" data-original-title="已退款" oid="'+_result.reslutList[i].id+'"><i class="fa">取消采购单号</i></a></td></tr>'
						}else{
							oHtml+= '<td class="center"></td></tr>'
						}
					}
					$('#content_tab').html(oHtml);
					$('#content_tab').show();
					$('.userPage').show();
					$('.userIndex_table_false').hide();
					if(!$('#content_tab').attr('oPage')){
						OpageDisplay(_result.currentPage,_result.totalPage,'userPage');
					}
					$('#content_tab').attr('oPage','1');
				}else{
					$('#content_tab').hide();
					$('.userPage').hide();
					$('.userIndex_table_false').show();
				}
			}
			doPost('/orders/searchDFOrderByPro',searchBrand,searchConsuc);
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
		function orderClick(){
			//取消采购单
			$('.buttonUser_Record').unbind('click').on('click',function(){
				if($('#content_tab tr').length == 0)return;
				var _thisRecord = $(this),
				    Data_Record = {'orderDetailId':_thisRecord.attr('oid')}
		        var btn_Record = function(){
			        var suc_Record = function(data){
			        	if(data.msg == '取消代发采购单成功'){
			        		modReload(data.msg);
			        	}else{
			        		xcsoft.error(data.msg,1500);
			        	}
					}
			        doPost('/orders/cancelReplaceDeliveryRecord',Data_Record,suc_Record);
				}
				examIndexUp('此操作',btn_Record);
		        showData('examineIndex');
			})
			
		}
		//订单导出
		function oDFOrder(){
			//全选
			butTable_more('butTable_more','content_tab');
			//订单导出
			$('.button_examineSpu').unbind('click').on('click',function(){
				if($('#content_tab tr').length == 0)return;
				var exFalg = true,oid='';
				$("#content_tab tr input[name='checkName']").each(function(k,v) { 
		            if(v.checked){
		            	oid+=v.id.split('|')[0]+','
		            	exFalg = false;
		            }
		        }); 
		        if(exFalg){xcsoft.error('请选择导出的订单',1500);return ;}
		        oid = oid.substring(0,oid.length - 1);
		        $('.btn_exmine').attr('oid',oid);
				showData('emineIndex');
				$('.examineIndex_close').unbind('click').on('click',function(){
					$('.emineIndex').hide();
				})
				$('.btn_exmine').unbind('click').on('click',function(){
					window.location.href = "/orders/exportExcelByDFOrder?ids="+$('.btn_exmine').attr('oid')+"&phone="+$('.phone').val()+"&stime="+$('.stime').val()+"&etime="+$('.etime').val()+"&spuCode="+$('.channelOrderNo').val()+"&orderNo="+$('.orderNo').val()+"&currentPage="+$('.btn_exmine').attr('currentPage')+"&purchaseNo="+$('.purchaseNo').val();
					modReload('导出成功');
				})
			})
			//全部导出
			$('.button_upAll').unbind('click').on('click',function(){
				var btn_exmineClick = function(){
			       window.location.href = "/orders/allExcelByDFOrder?&phone="+$('.phone').val()+"&stime="+$('.stime').val()+"&etime="+$('.etime').val()+"&channelOrderNo="+$('.channelOrderNo').val()+"&orderNo="+$('.orderNo').val()+"&currentPage=1&purchaseNo="+$('.purchaseNo').val();
					$('.examineIndex').hide();
				}
				examIndexUp('一次性导出不能超过10000条',btn_exmineClick,11);
				showData('examineIndex');
			})
			//生成采购单
			$('.button_purchase').unbind('click').on('click',function(){
				if($('#content_tab tr').length == 0)return;
				var exFalg = true,oidata='';
				$("#content_tab tr input[name='checkName']").each(function(k,v) { 
		            if(v.checked){
		            	oidata+=v.id+','
		            	exFalg = false;
		            }
		        }); 
		        if(exFalg){xcsoft.error('请选择生成采购单的订单',1500);return ;}
		        oidata = oidata.substring(0,oidata.length - 1);
		        var _goodslAttr = oidata.split(','),
		        	_gHtml = '',
		        	channal_html='<option value="">请选择供应商</option>',
		        	_itemAttr=[],
		        	_ids = '';
		        var searchConsuc = function(data){
					if(data.result){
						for(var r=0;r<data.result.length;r++){
							channal_html+='<option value="'+data.result[r].id+'">'+data.result[r].name+'</option>'
						}
						for(var g=0;g<_goodslAttr.length;g++){
							_itemAttr = _goodslAttr[g].split('|');
							console.log(_goodslAttr[g])
				        	_gHtml+='<tr><td class="center">'+_itemAttr[1]+'</td><td class="center">'+_itemAttr[2] +'</td><td class="center">'+_itemAttr[3]+'</td><td class="center">'+_itemAttr[4]+'</td><td class="center"><div class="goodsl_input"><input id="'+_itemAttr[1]+'|'+g+'" type="text" style="width: 100px;" placeholder="请输入采购价" autocomplete="off" name="pprice" class="form-control form_control" onblur="this.value<=0?this.value=\'\':this.value=this.value"><ul class="goodsl_ul"></ul></div></td><td class="center"><select id="'+g+'" class="col_width channal_id" style="width: 150px;">'+channal_html+'</select></td><td class="center grossInte" style="width: 80px;"></td><td class="center grossInteRate" style="width: 80px;"></td></tr>'
				        	_ids +=_itemAttr[0]+',' 
				        }
						_ids = _ids.substring(0,_ids.length - 1);
						$('#products_thbody').html(_gHtml);
						productsClick(oidata,_ids);
					}
				}
				doPost('/brand/searchSupplier','',searchConsuc);
		        
		        showData('goodslIndex');
		        
		        $('.sukDiv_close').unbind('click').on('click',function(){
		        	$('.goodslIndex').hide();
		        })
		        
		        
		        
		        
		        function productsClick(oidata,_ids){
		        	var _oidata = oidata.split(',');
		        	//采购价
		        	$("#products_thbody input[name='pprice']").unbind('focus').on('focus',function(){
		        		$("#products_thbody tr .goodsl_ul").hide();
		        		var _ppriceAttr = $(this).attr('id').split('|');
		        		var searchLast = {'skuCode':_ppriceAttr[0]};
		        		if($("#products_thbody tr").eq(_ppriceAttr[1]).find('.goodsl_ul li').length > 0){
		        			$("#products_thbody tr").eq(_ppriceAttr[1]).find('.goodsl_ul').show();
		        		}else{
		        			var searchC = function(data){
			        			if(data.result){
			        				var _dresult = data.result,tHtml='';
			        				for(var t=0;t<_dresult.length;t++){
			        					tHtml+='<li>'+(_dresult[t].pprice/100).toFixed(2)+'</li>'
			        				}
			        				$("#products_thbody tr").eq(_ppriceAttr[1]).find('.goodsl_ul').html(tHtml);
			        				$("#products_thbody tr").eq(_ppriceAttr[1]).find('.goodsl_ul').show();
			        			}
							}
							doPost('/grossInterest/searchLast3',searchLast,searchC);
		        		}
		        		$("#products_thbody tr").eq(_ppriceAttr[1]).find('.goodsl_ul li').on('click',function(){
        					$("#products_thbody tr").eq(_ppriceAttr[1]).find('.goodsl_input input').val($(this).html());
        					$("#products_thbody tr").eq(_ppriceAttr[1]).find('.goodsl_ul').hide();
        				});
        				
        				$("#products_thbody input[name='pprice']").unbind('blur').on('blur',function(){
			        		setTimeout(function(){
			        			$("#products_thbody tr .goodsl_ul").hide();
			        		},200)
			        		var _oselect = $("#products_thbody tr").eq(_ppriceAttr[1]).find('select').val(),
			        			_oval = $("#products_thbody tr").eq(_ppriceAttr[1]).find('.goodsl_input input').val();
			        		if(_oselect == '' || _oval == ''){
			        			$("#products_thbody tr").eq(_ppriceAttr[1]).find('.grossInte').html('');
		        				$("#products_thbody tr").eq(_ppriceAttr[1]).find('.grossInteRate').html('');
			        			return ;
			        		}
			        		calculDun(_oidata,_ppriceAttr[1],_oval);
			        	})
		        	
		        	})
		        	//供应商
		        	$("#products_thbody select").on("change propertychange",function(){
		        		var _g = $(this).attr('id'),
		        			_val = $("#products_thbody tr").eq(_g).find('.goodsl_input input').val();
		        		if(!checkValue(_val)){
		        			xcsoft.error('请先输入采购价',1000);
		        			$("#products_thbody select").eq(_g).val('');
		        			return;
		        		}
		        		calculDun(_oidata,_g,_val);
		        	})
		        	
		        	function calculDun(_oidata,_g,_val){
		        		var _calculation = _oidata[_g].split('|');
						var calculation = {
							'skuCode':_calculation[1],
							'channelSkuCode':_calculation[5],
							'channelCode':_calculation[6],
							'price':(parseInt(_calculation[3])*100).toFixed(0),
							'pprice':(_val*100).toFixed(0),
							'num':_calculation[4]
						};
		        		var searchcalculation = function(data){
		        			if(data.result){
		        				$("#products_thbody tr").eq(_g).find('.grossInte').html((parseInt(data.result.grossInte)/100).toFixed(2));
		        				$("#products_thbody tr").eq(_g).find('.grossInteRate').html(data.result.grossInteRate*100+'%');
		        			}
						}
						doPost('/grossInterest/calculation',calculation,searchcalculation);
		        	}
		        }
		        
		        
		        $(".btn_products").unbind('click').on("click",function(){
		        	var exFalgts = true,exFalgtse = true,_pprice='',_supplierId='';
					$("#products_thbody input[name='pprice']").each(function(k,v) { 
			            if(v.value == ''){
			            	exFalgts = false;
			            }
			            _pprice+= (parseInt(v.value)/100).toFixed(0) +','
			        }); 
			        $("#products_thbody select").each(function(k,v) { 
			            if(v.value == ''){
			            	exFalgtse = false;
			            }
			           _supplierId+= v.value +','
			        });
			        if(!exFalgts){xcsoft.error('采购价不能为空',1500);return ;}
			        if(!exFalgtse){xcsoft.error('请选择供应商',1500);return ;}
			        _pprice = _pprice.substring(0,_pprice.length - 1);
			        _supplierId = _supplierId.substring(0,_supplierId.length - 1);
			        
			        var btn_purchase = function(){
						var Data_purchase = {
							'orderDetailIds':_ids,
							'pprice':_pprice,
							'supplierId':_supplierId
						}
				        var suc_purchase = function(data){
				        	if($('.main-content').find('.examineIndex').length > 0){
								$('.main-content').find('.examineIndex').remove();
							}
			        		xcsoft.success('生成代发采购单成功',1500);
			        		$('#upData tbody').html('<tr><td class="center">'+data.msg+'</td></tr>')
			        		showData('lackIndex');
						}
				        doPost('/orders/insertReplaceDeliveryRecord',Data_purchase,suc_purchase);
					}
					examIndexUp('此操作',btn_purchase);
			        showData('examineIndex');
			        $('.lackIndex_close').unbind('click').on('click',function(){
			        	$('.lackIndex').hide();
			        })
		        })
			})
			//取消代发
			$('.button_cancel').unbind('click').on('click',function(){
				if($('#content_tab tr').length == 0)return;
				var exFalg = true,oid='',pros='';
				$("#content_tab tr input[name='checkName']").each(function(k,v) { 
		            if(v.checked){
		            	oid+=v.id.split('|')[0]+','
		            	pros+=1+','
		            	exFalg = false;
		            }
		        }); 
		        if(exFalg){xcsoft.error('请选择取消的订单',1500);return ;}
		        oid = oid.substring(0,oid.length - 1);
		        pros = pros.substring(0,pros.length - 1);
				showData('button_cancelIndex');
				$('.button_cancelIndex_close').unbind('click').on('click',function(){
					$('.button_cancelIndex').hide();
				})
				$('.btn_button_cancel').unbind('click').on('click',function(){
					var cancelConsuc = function(data){
						if(data.msg == '修改成功'){
							modReload('取消订单代发成功');
						}else{
							xcsoft.error('取消订单代发',1000);
						}
					}
					var odata_cancel = {
						'ids':oid,
						'modType':5,
						'pros':pros
					}
					doPost('/orders/modOrderDetail',odata_cancel,cancelConsuc);
				})
			})
		}
		//代发订单物流匹配上传
		var back = function(url){
			if(url.msg == '文件上传成功' || url.msg == '文件上传解析修改成功'){
				wrapperLoading();
			}else{
				xcsoft.error('文件上传失败',1000);
			}
		}
		uploadFile('buttonchanSKU_newAdd','23',back);
	}
	return {
		init: function() {
			orderGoodsIstation();
		}
	};
}();

/*外包仓库订单列表*/
var orderOutsource = function() {
	function orderGoodsIstation(){
		datetimePicker();
		dopostData(1);
		$('.button_search').on('click',function(){
			dopostData(1);
		})
		//数据
		function dopostData(currentPage){
			var spuCode = $('.channelOrderNo').val(),
				orderNo = $('.orderNo').val(),
				phone = $('.phone').val(),
				stime = $('.stime').val(),
				etime = $('.etime').val();
			if(!checkTime(stime,etime)){xcsoft.error('查询时间不能查过30天',1500);return;}
			var searchBrand = {
				'channelOrderNo':spuCode || '', //渠道订单编号
				'orderNo':orderNo || '', //OMS订单号
				'phone':phone || '', //电话联系方式
				'stime':stime || '', //开始时间
				'etime':etime || '', //结束时间
				'currentPage':currentPage
			};
			$('.btn_exmine').attr('currentPage',currentPage);
			var searchConsuc = function(data){
				console.log(data)
				var _result = data.result,oHtml='';
				if(_result.reslutList.length != 0){
					for(var i=0;i<_result.reslutList.length;i++){
						var isReAttr = ['否','是'],
							carrier = _result.reslutList[i].carrier || '',
							isRe = _result.reslutList[i].isRe || 0,
							tracking_number = _result.reslutList[i].trackingNumber || '',
							request_for_shipment_time = _result.reslutList[i].createTime?odateFormat(_result.reslutList[i].createTime):'',
							od_orderStatus = _result.reslutList[i].od_orderStatus?orderStatus_data(_result.reslutList[i].od_orderStatus):'';
						oHtml+='<tr class="orderGoods_tr" style="cursor: pointer;"><td class="center">'+checkValue(_result.reslutList[i].channelCode)+'</td><td class="center">'+checkValue(_result.reslutList[i].channelOrderNo)+'</td><td class="center">'+checkValue(_result.reslutList[i].orderNo)+'</td><td class="center">'+checkValue(_result.reslutList[i].orderDetailNo)+'</td><td class="center">'+od_orderStatus+'</td><td class="center">'+checkValue(_result.reslutList[i].address)+'</td><td class="center">'+request_for_shipment_time+'</td><td class="center">'+isReAttr[isRe]+'</td><td class="center">'+tracking_number+'</td><td class="center">'+carrier+'</td><td class="center"><a oData="'+JSONstringify(JSON.stringify(_result.reslutList[i]))+'" href="javascript:;" class="btn btn-md btn-light-beige tooltips btnOrderAddress_Enable" duata-placement="top"><i class="fa">修改</i></a></td></tr>'
					}
					$('#content_tab').html(oHtml);
					$('#content_tab').show();
					$('.userPage').show();
					$('.userIndex_table_false').hide();
					if(!$('#content_tab').attr('oPage')){
						OpageDisplay(_result.currentPage,_result.totalPage,'userPage');
					}
					$('#content_tab').attr('oPage','1');
				}else{
					$('#content_tab').hide();
					$('.userPage').hide();
					$('.userIndex_table_false').show();
				}
			}
			doPost('/orders/searchH03',searchBrand,searchConsuc);
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
		$('.btnOrderAddress_Enable').unbind('click').on('click',function(){
			var order_this = $(this),
				order_ioData = JSONparse(order_this.attr('oData'));
			$('.trackingNumber').val(order_ioData.trackingNumber),
			$('.carrier').val(order_ioData.carrier);
			$('.Express_confirm').hide();
			$('.Express_modify').hide();
			if(order_ioData.wa_id){
				$('.Express_modify').show();
			}else{
				$('.Express_confirm').show();
			}
			showData('ExpressDetailIndex');	
			/*发货确认*/
			$('.Express_confirm').unbind('click').on('click',function(){
				updateH03Fun(order_ioData.detail_id,1)
			})
			/*修改发货信息*/
			$('.Express_modify').unbind('click').on('click',function(){
				updateH03Fun(order_ioData.detail_id,2)
			})
			
			function updateH03Fun(detail_id,typeIn){
				var  trackingNumber = $('.trackingNumber').val(),
			         carrier = $('.carrier').val(),
			         typeData = 'confirm';
				if(!checkNotEmpty(trackingNumber)){xcsoft.error('请输入快递单号',1500);return;};
				if(!checkNotEmpty(carrier)){xcsoft.error('请输入快递公司',1500);return;};
				order_ioData.trackingNumber = trackingNumber;
				order_ioData.carrier = carrier;
				typeIn==1?typeData='confirm':typeData='modify';
				var o_data = {
					'id':detail_id,
					'trackingNumber':trackingNumber,
					'carrier':carrier,
					'type':typeData
				}
				var btn_exmineClick = function(){
					var channelConsuc = function(data){
						if(data.msg == '修改成功' || data.msg == '确认发货成功'){
							modReload(data.msg);
						}else{
							xcsoft.error(data.msg,1000);
							$('.examineIndex').hide();
						}
					}
					doPost('/orders/updateH03',o_data,channelConsuc);
				}
				examIndexUp('此操作',btn_exmineClick);
				showData('examineIndex');
			}
		})
		
		$('.ExpressDetail_close').unbind('click').on('click',function(){
			$('.ExpressDetailIndex').hide();
		})
	}
	return {
		init: function() {
			orderGoodsIstation();
		}
	};
}();


/*采购单查询*/
var orderPurchase = function() {
	function orderGoodsIstation(){
		var searchConsuc = function(data){
			if(data.result){
				var channal_html='<option value="">请选择供应商</option>';
				for(var r=0;r<data.result.length;r++){
					channal_html+='<option value="'+data.result[r].sapCode+'">'+data.result[r].name+'</option>'
				}
				$('.sendBusiness').html(channal_html);
			}
		}
		doPost('/brand/searchSupplier','',searchConsuc);
		datetimePicker();//时间选择
		$('.button_search').on('click',function(){
			dopostData(1);
			stockClick();
		})
		//数据
		function dopostData(currentPage){
			var thinkCode = $('.thinkCode').val(),
				skuCode = $('.skuCode').val(),
				itemName = $('.itemName').val(),
				sort = $('.sort').val(),
				stime = $('.stime').val(),
				etime = $('.etime').val(),
				sendBusiness = $('.sendBusiness').val();
			var searchBrand = {
				'stockingCode':thinkCode || '', //采购单号
				'itemCode':skuCode || '', //商品编号
				'itemName':itemName || '', //商品名
				'suppliersCode':sendBusiness || '', //供应商ID
				'sort':sort || '', //排序
				'stime':stime || '', //开始时间
				'etime':etime || '' //结束时间
			};
			var searchConsuc = function(data){
				var oHtml='';
				if(data.result){
					var _result = data.result;
					if(_result.length != 0){
						for(var i=0;i<_result.length;i++){
							var itemCount = _result[i].itemCount || '';
							oHtml+='<tr style="cursor: pointer;" oid="'+_result[i].id+'"><td class="center">'+checkValue(_result[i].name)+'</td><td class="center">'+checkValue(_result[i].stockingCode)+'</td><td class="center">'+checkValue(_result[i].suppliersName)+'</td><td class="center">'+(_result[i].priceTotal/100).toFixed(2)+'</td><td class="center">'+itemCount+'</td><td class="center">'+odateFormat(_result[i].createTime)+'</td></tr>'
						}
						$('#content_tab').html(oHtml);
						$('#content_tab').show();
						$('.userIndex_table_false').hide();
					}else{
						$('#content_tab').hide();
						$('.userIndex_table_false').show();	
					}
				}else{
					$('#content_tab').hide();
					$('.userIndex_table_false').show();	
				}
			}
			doPost('/orders/searchThinkList',searchBrand,searchConsuc);
		}
		
		function stockClick(){
			$('.stock_table').unbind('dblclick').on('dblclick','tbody tr',function(){
				var _this=$(this);
				var stockConsuc = function(data){
					if(data.result){
						var a_result = data.result,oHtml='';
						for(var s=0;s<a_result.length;s++){
							oHtml+='<tr><td class="center">'+a_result[s].itemCode+'</td><td class="center">'+checkValue(a_result[s].itemName)+'</td><td class="center">'+a_result[s].warehouse+'</td><td class="center">'+(a_result[s].pprice/100).toFixed(2)+'</td><td class="center">'+a_result[s].amout+'</td><td class="center">'+(a_result[s].totalPrice/100).toFixed(2)+'</td><td class="center">'+a_result[s].rinventory+'</td><td class="center">'+a_result[s].currentInventory+'</td><td class="center">'+a_result[s].transitInventory+'</td><td class="center">'+a_result[s].availableInventory+'</td></tr>'
						}
						$('#stock_DivTable tbody').html(oHtml);
					}
				}
				var stockdata={'id':_this.attr('oid')}
				doPost('/orders/searchThinkDetailList',stockdata,stockConsuc);
				var _index = $(this).index();
				$('.ordre_container .stock_table tbody tr').removeClass('success').eq(_index).addClass('success');
				showData('lackIndex');
				
			})
			$('.sukDiv_close').unbind('click').on('click',function(){
				$('.lackIndex').hide();
				$('.stock_table tbody tr').removeClass('success');
			})
		}
	}
	return {
		init: function() {
			orderGoodsIstation();
		}
	};
}();



/*发票管理*/
var orderInvoice = function() {
	function orderGoodsIstation(){
		datetimePicker();
		//全选
		butTable_more('butTable_more','content_tab');
	}
	return {
		init: function() {
			orderGoodsIstation();
		}
	};
}();

/*退换货查询*/
var orderGoods = function() {
	function orderGoodsIstation(){
		var orderNo	= getParameter('id') || '';
		$('.orderNo').val(orderNo);
		datetimePicker();
		channelList();
		orderStatus_Name('11');
		dopostData(1);
		orderClick();
		$('.button_search').on('click',function(){
			dopostData(1);
		})
		//数据
		function dopostData(currentPage){
			var spuCode = $('.spuCode').val(),
				channal_code = $('.channal_id').val(),
				orderNo = $('.orderNo').val(),
				status = $('.order_status').val(),
				user_name = $('.user_name').val(),
				user_phone = $('.user_phone').val(),
				channel_sku_code = $('.channel_sku_code').val(),
				stime = $('.stime').val(),
				etime = $('.etime').val();
			if(!checkTime(stime,etime)){xcsoft.error('查询时间不能查过30天',1500);return;}
			var searchBrand = {
				'channelOrderNo':spuCode || '', //渠道订单编号
				'channelCode':channal_code, //销售渠道
				'orderNo':orderNo || '', //OMS订单号
				'status':parseInt(status), //订单状态
				'consignee':user_name || '', //收货人
				'phone':user_phone || '', //电话联系方式
				'stime':stime || '', //开始时间
				'etime':etime || '', //结束时间
				'currentPage':currentPage
			};
			var searchConsuc = function(data){
				var _result = data.result,oHtml='';
				if(_result.reslutList.length != 0){
					for(var i=0;i<_result.reslutList.length;i++){
						oHtml+='<tr class="orderGoods_tr" style="cursor: pointer;" oData="'+JSONstringify(JSON.stringify(_result.reslutList[i]))+'"><td class="center">'+checkValue(_result.reslutList[i].channel_order_no)+'</td><td class="center">'+checkValue(_result.reslutList[i].order_no)+'</td><td class="center">'+orderStatus_data(_result.reslutList[i].order_status)+'</td><td class="center">'+checkValue(_result.reslutList[i].consignee)+'</td><td class="center">'+checkValue(_result.reslutList[i].phone)+'</td><td class="center">'+checkValue(_result.reslutList[i].address)+'</td><td class="center">'+checkValue((_result.reslutList[i].total_price/100).toFixed(2))+'</td><td class="center">'+_result.reslutList[i].tax_rate+'</td><td class="center">'+checkValue(_result.reslutList[i].channel_name)+'</td></tr>'
					}
					$('#content_tab').html(oHtml);
					$('#content_tab').show();
					$('.userPage').show();
					$('.userIndex_table_false').hide();
					OpageDisplay(_result.currentPage,_result.totalPage,'userPage');
				}else{
					$('#content_tab').hide();
					$('.userPage').hide();
					$('.userIndex_table_false').show();
				}
			}
			doPost('/orders/searchFHHOrder',searchBrand,searchConsuc);
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
		function orderClick(){
			$('.orderGoods_body').unbind('dblclick').on('dblclick','.orderGoods_tr',function(event){
				var _this = $(this),
					_index = _this.index(),
					_data = JSONparse(_this.attr('oData'));
				$('.orderReturn_button button').hide();
				if(_data.order_status == 0 || _data.order_status == 110 || _data.order_status == 210 || _data.order_status == 220 || _data.order_status == 230|| _data.order_status == 540){
					$('.orderReturn_button .button_three').show();
				}
				if(_data.order_status == 1 || _data.order_status == 10 || _data.order_status == 390 || _data.order_status == 490){
					$('.orderReturn_button button').eq(7).show();
				}
				if(_data.order_status == 310){$('.orderReturn_button button').eq(1).show();}
				if(_data.order_status == 320){$('.orderReturn_button button').eq(4).show();}
				if(_data.order_status == 410){$('.orderReturn_button button').eq(3).show();}
				if(_data.order_status == 420){$('.orderReturn_button button').eq(5).show();}
				if(_data.order_status == 230){$('.orderReturn_button button').eq(6).show();}
				$('.orderReturn_button').attr('oid',_data.id);
				$('.orderReturn_button').attr('order_no',_data.order_no);
				if(event.target.attributes['class'].value == 'center'){
					$('.orderGoods_body .orderGoods_tr').removeClass('success').eq(_index).addClass('success');
					var channel_sku_code = _data.channel_sku_code || '',
						sku_code = _data.sku_code || '',
						product_name = _data.product_name || '',
						product_manager = _data.product_manager || '',
						thNo = _data.thNo || '';
					$('#products_thbody').html('<tr><td class="center">'+channel_sku_code+'</td><td class="center">'+sku_code+'</td><td class="center">'+product_name+'</td><td class="center">'+product_manager+'</td><td class="center">'+checkValue(((_data.price)/100).toFixed(2))+'</td><td class="center dataNum">'+ _data.num +'</td><td class="center">'+_data.isheji+'</td><td class="center">'+thNo+'</td></tr>');
					var searchConsuc = function(data){
						if(data.result){
							
						}else{
							$('.searchOutByOrderNo_table_false').show();
						}
					}
					var odata = {
						'orderId':_data.id
					}
					doPost('/orders/searchOutByOrderNo',odata,searchConsuc);
					showData('goodslIndex');	
				}
				
			});
			//状态修改，审核，换货，取消
			$('.orderReturn_button button').unbind('click').on('click',function(){
				var order_this = $(this),
					order_index = order_this.attr('tabindex');
					//1,退货申请  2,退货通过  3,退换货申请   4,退换货通过   5,取消 
					examine_title(order_index,order_this.html());
			})
			
			function examine_title(order_index,title){
				var button_oid = $('.orderReturn_button').attr('oid');
				$('.examineIndex .examineIndex_title').html('确定 '+title+' 此商品？');
				$('.examineIndex .examineIndex_number input').val('');
				order_index == 1 || order_index == 3?$('.examineIndex .examineIndex_number label').show():$('.examineIndex .examineIndex_number label').hide();
				showData('examineIndex');
				//确定
				$('.btn_exmine').unbind("click").on('click',function(){
					var odata = {},ourl ='/orders/modFHHOrder';
					if(order_index == 1){
						odata = {
							'id':button_oid,
							'orderStatus':'310'
						};
						var _num = $('#products_thbody .dataNum').html(),
							_numVal = $('.examineIndex .examineIndex_number input').val();
						if(!checkNotEmpty(_numVal)){xcsoft.error('请输入申请商品数量',1500);return;}	
						if(parseInt(_numVal)  > parseInt(_num)){
							xcsoft.error('输入数量不能超过此订单商品数量',1500);
							return;
						}
						odata.reNum = '-'+_numVal;
					}else if(order_index == 2){
						odata = {
							'id':button_oid,
							'orderStatus':'320'
						};
					}else if(order_index == 3){
						odata = {
							'id':button_oid,
							'orderStatus':'410'
						};
						var th_num = $('#products_thbody .dataNum').html(),
							th_numVal = $('.examineIndex .examineIndex_number input').val();
						if(!checkNotEmpty(th_numVal)){xcsoft.error('请输入申请商品数量',1500);return;}	
						if(parseInt(th_numVal)  > parseInt(th_num)){
							xcsoft.error('输入数量不能超过此订单商品数量',1500);
							return;
						}
						odata.reNum = '-'+th_numVal;
					}else if(order_index == 4){
						odata = {
							'id':button_oid,
							'orderStatus':'420'
						};
					}else if(order_index == 6){
						odata = {
							'id':button_oid,
							'orderStatus':'390'
						};
					}else if(order_index == 7){
						odata = {
							'id':button_oid,
							'orderStatus':'490'
						};
					}else if(order_index == 5){
						odata = {
							'id':button_oid,
							'stat':false
						};
					}else if(order_index == 8){
						odata = {
							'id':button_oid
						};
						ourl = '/orders/addLostAndDamage';
					}
					var searchConsuc = function(data){
						if(data.msg.indexOf('失败')>0){
							xcsoft.error(data.msg,1500);
						}else{
							modReload(data.msg);
						}
					}
					doPost(ourl,odata,searchConsuc);
				});
				//关闭
				$('.examineIndex_close').unbind("click").on('click',function(){
					$('.examineIndex').hide();
				});
			}
			$('.sukDiv_close').unbind("click").on('click',function(){
				$('.goodslIndex').hide();
				$('.orderGoods_body .orderGoods_tr').removeClass('success');
			});
		}
		
	}
	return {
		init: function() {
			orderGoodsIstation();
		}
	};
}();

/*逾期订单查询*/
var orderOverdue = function() {
	function orderGoodsIstation(){
		datetimePicker();
		channelList();
		orderStatus_Name();
		dopostData(1);
		$('.button_search').on('click',function(){
			dopostData(1);
		})
		orderClick();
		//数据
		function dopostData(currentPage){
			var spuCode = $('.spuCode').val(),
				channal_code = $('.channal_id').val(),
				//channel_sku_code = $('.channel_sku_code').val(),
				orderNo = $('.orderNo').val(),
				//skuCode = $('.skuCode').val(),
				user_name = $('.user_name').val(),
				user_phone = $('.user_phone').val(),
				stime = $('.stime').val(),
				etime = $('.etime').val();
			var searchBrand = {
				'channelOrderNo':spuCode || '', //渠道订单编号
				'channelCode':channal_code, //销售渠道、
				'orderNo':orderNo || '', //OMS订单号、
				'consignee':user_name || '', //收货人
				'phone':user_phone || '', //电话联系方式
				'stime':stime || '', //开始时间
				'etime':etime || '', //结束时间
				'currentPage':currentPage
			};
			if(!checkTime(stime,etime)){xcsoft.error('查询时间不能查过30天',1500);return;}
			var searchConsuc = function(data){
				var _result = data.result,oHtml='';
				if(_result.reslutList.length != 0){
					for(var i=0;i<_result.reslutList.length;i++){
						var isReAttr = ['否','是'],
							payType = _result.reslutList[i].payType || '',
							orderTotal = _result.reslutList[i].orderTotal || '';
						oHtml+='<tr class="orderGoods_tr" id="'+_result.reslutList[i].id+'" style="cursor: pointer;"><td class="center">'+checkValue(_result.reslutList[i].channelName)+'</td><td class="center">'+checkValue(_result.reslutList[i].channelOrderNo)+'</td><td class="center">'+checkValue(_result.reslutList[i].orderNo)+'</td><td class="center">'+checkValue(_result.reslutList[i].consignee)+'</td><td class="center">'+checkValue(_result.reslutList[i].phone)+'</td><td class="center">'+checkValue(_result.reslutList[i].address)+'</td><td class="center">'+checkValue((_result.reslutList[i].productTotal/100).toFixed(2))+'</td><td class="center">'+isReAttr[_result.reslutList[i].isRe]+'</td><td class="center">'+payType+'</td><td class="center">'+checkValue((orderTotal/100).toFixed(2))+'</td><td class="center">'+odateFormat(_result.reslutList[i].channelOrderCreateTime)+'</td></tr>'
					}
					$('#content_tab').html(oHtml);
					$('#content_tab').show();
					$('.userPage').show();
					$('.userIndex_table_false').hide();
					OpageDisplay(_result.currentPage,_result.totalPage,'userPage');
				}else{
					$('#content_tab').hide();
					$('.userPage').hide();
					$('.userIndex_table_false').show();
				}
			}
			doPost('/orders/searchOverdueOrderByPro',searchBrand,searchConsuc);
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
		function orderClick(){
			$('#content_tab').unbind('dblclick').on('dblclick','.orderGoods_tr',function(event){
				var _this = $(this),
					oid = _this.attr('id'),
					_index = _this.index();
				$('.ordre_container table tbody tr').removeClass('success').eq(_index).addClass('success');
				tan_data(oid);
				function tan_data(oid){
					var detailListConsuc = function(data){
						if(data.result){
							var listDetailAttr = [],
								listwoutAttr = [],
								listDetailHtml = '',
								listwoutHtml = '';
							if(data.result.listDetail){
								listDetailAttr=data.result.listDetail;
								for(var d=0;d<listDetailAttr.length;d++){
									var productName = listDetailAttr[d].productName||'',
									productManager = listDetailAttr[d].productManager||'';
									listDetailHtml+='<tr><td class="center">'+checkValue(listDetailAttr[d].channelSkuCode)+'</td><td class="center">'+checkValue(listDetailAttr[d].skuCode)+'</td><td class="center">'+productName+'</td><td class="center">'+productManager+'</td><td class="center">'+(listDetailAttr[d].price/100).toFixed(2)+'</td><td class="center">'+listDetailAttr[d].num+'</td><td class="center">'+(listDetailAttr[d].totalPrice/100).toFixed(2)+'</td><td class="center"></td></tr>'
								}
								$('#listDetail tbody').html(listDetailHtml);
								$('#listDetail tbody').show();
								$('.listDetail_table_false').hide();
							}else{
								$('#listDetail tbody').hide();
								$('.listDetail_table_false').show();
							}
							if(data.result.listwout){
								listwoutAttr=data.result.listwout;
								for(var s=0;s<listwoutAttr.length;s++){
									listwoutHtml +='<tr><td class="center">'+checkValue(listwoutAttr[s].trackingNumber)+'</td><td class="center">'+checkValue(listwoutAttr[s].warehouseCode)+'</td><td class="center">'+odateFormat(listwoutAttr[s].shipmentDate)+'</td><td class="center">'+checkValue(listwoutAttr[s].carrier)+'</td></tr>'
								}
								$('#listwout tbody').html(listwoutHtml);
								$('#listwout tbody').show();
								$('.listwout_table_false').hide();
							}else{
								$('#listwout tbody').hide();
								$('.listwout_table_false').show();
							}
							
						}
					}
					var detailListData = {'id':oid}
					doPost('/orders/detailListByOrderId',detailListData,detailListConsuc);
					showData('orderSalelIndex');
				}
			})
			$('.sukDiv_close').unbind("click").on('click',function(){
				$('.orderSalelIndex').hide();
				$('.ordre_container table tbody tr').removeClass('success');
			})
		}
	}
	return {
		init: function() {
			orderGoodsIstation();
		}
	};
}();

/*超管模式*/
var orderSuper = function() {
	function orderSaleIstation(){
		datetimePicker();
		channelList();
		orderStatus_Name();
		orderClick();
		dopostData(1);
		
		$('.button_search').on('click',function(){
			dopostData(1);
		})
		//数据
		function dopostData(currentPage){
			var spuCode = $('.input_div .spuCode').val(),
				channal_code = $('.input_div .channal_id').val(),
				//channel_sku_code = $('.input_div .channel_sku_code').val(),
				orderNo = $('.input_div .orderNo').val(),
				status = $('.input_div .order_status').val(),
				//skuCode = $('.input_div .skuCode').val(),
				user_name = $('.input_div .user_name').val(),
				user_phone = $('.input_div .user_phone').val(),
				stime = $('.input_div .stime').val(),
				etime = $('.input_div .etime').val();
			var searchBrand = {
				'channelOrderNo':spuCode || '', //渠道订单编号
				'channelCode':channal_code, //销售渠道
				'orderNo':orderNo || '', //OMS订单号
				'orderStatus':parseInt(status), //订单状态
				'consignee':user_name || '', //收货人
				'phone':user_phone || '', //电话联系方式
				'stime':stime || '', //开始时间
				'etime':etime || '', //结束时间
				'currentPage':currentPage
			};
			if(!checkTime(stime,etime)){xcsoft.error('查询时间不能查过30天',1500);return;}
			var searchConsuc = function(data){
				console.log(data)
				var _result = data.result,oHtml='';
				if(_result.reslutList.length != 0){//danger
					for(var i=0;i<_result.reslutList.length;i++){
						var isReAttr = ['否','是'],
							orderRate =_result.reslutList[i].orderRate || '',
							payType = _result.reslutList[i].payType || '',
							orderTotal = _result.reslutList[i].orderTotal || '';
						if(_result.reslutList[i].orderStatus<1){
							oHtml+='<tr style="cursor: pointer;" class="danger" status="'+_result.reslutList[i].orderStatus+'" orderNo="'+_result.reslutList[i].orderNo+'" oid="'+_result.reslutList[i].id+'"><td class="center">'+checkValue(_result.reslutList[i].channelName)+'</td><td class="center">'+checkValue(_result.reslutList[i].channelOrderNo)+'</td><td class="center">'+checkValue(_result.reslutList[i].orderNo)+'</td><td class="center td">'+orderStatus_data(_result.reslutList[i].orderStatus)+'</td><td class="center">'+checkValue(_result.reslutList[i].consignee)+'</td><td class="center">'+checkValue(_result.reslutList[i].phone)+'</td><td class="center">'+checkValue(_result.reslutList[i].address)+'</td><td class="center">'+(_result.reslutList[i].productTotal/100).toFixed(2)+'</td><td class="center">'+orderRate+'</td><td class="center">'+isReAttr[_result.reslutList[i].isRe]+'</td><td class="center">'+payType+'</td><td class="center">'+(orderTotal/100).toFixed(2)+'</td><td class="center">'+odateFormat(_result.reslutList[i].channelOrderCreateTime)+'</td><td class="center"><a href="javascript:;" class="btn btn-xs btn-blue tooltips buttonRole_title" data-placement="top" data-original-title="编辑" odata="'+JSONstringify(JSON.stringify(_result.reslutList[i]))+'"><i class="fa fa-edit buttonRole_title" odata="'+JSONstringify(JSON.stringify(_result.reslutList[i]))+'"></i></a></td></tr>'
						}else{
							oHtml+='<tr style="cursor: pointer;" status="'+_result.reslutList[i].orderStatus+'" oid="'+_result.reslutList[i].id+'" orderNo="'+_result.reslutList[i].orderNo+'"><td class="center">'+checkValue(_result.reslutList[i].channelName)+'</td><td class="center">'+checkValue(_result.reslutList[i].channelOrderNo)+'</td><td class="center">'+checkValue(_result.reslutList[i].orderNo)+'</td><td class="center td">'+orderStatus_data(_result.reslutList[i].orderStatus)+'</td><td class="center">'+checkValue(_result.reslutList[i].consignee)+'</td><td class="center">'+checkValue(_result.reslutList[i].phone)+'</td><td class="center">'+checkValue(_result.reslutList[i].address)+'</td><td class="center">'+(_result.reslutList[i].productTotal/100).toFixed(2)+'</td><td class="center">'+orderRate+'</td><td class="center">'+isReAttr[_result.reslutList[i].isRe]+'</td><td class="center">'+payType+'</td><td class="center">'+(orderTotal/100).toFixed(2)+'</td><td class="center">'+odateFormat(_result.reslutList[i].channelOrderCreateTime)+'</td><td class="center oTitle"><a href="javascript:;" class="btn btn-xs btn-blue tooltips buttonRole_title" data-placement="top" data-original-title="编辑" odata="'+JSONstringify(JSON.stringify(_result.reslutList[i]))+'"><i class="fa fa-edit buttonRole_title" odata="'+JSONstringify(JSON.stringify(_result.reslutList[i]))+'"></i></a></td></tr>'
						}
					}
					$('.stock_table tbody').html(oHtml);
					runTooltips();
					titleClick();
					$('.stock_table tbody').show();
					$('.userPage').show();
					$('.userIndex_table_false').hide();
					OpageDisplay(_result.currentPage,_result.totalPage,'userPage');
				}else{
					$('.stock_table tbody').hide();
					$('.userPage').hide();
					$('.userIndex_table_false').show();
				}
			}
			doPost('/orders/searchOrderByPro',searchBrand,searchConsuc);
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
	            onPageClicked: function (event, originalEvent, type, page) {
	               dopostData(page);
	            }
	        });
		}
		function orderClick(){
			/*点击tr查询详细*/
			$('.stock_table').unbind('dblclick').on('dblclick','tbody tr',function(event){
				var _this = $(this),
					oid = _this.attr('oid'),
					_index = _this.index(),
					orderNo = _this.attr('orderNo'),
					status = _this.attr('status');
				$('#listDetail2').hide();
				$('.ordre_container table tbody tr').removeClass('success').eq(_index).addClass('success');
				if(event.target.attributes['class'].value == 'center td'){
					if(status<1){
						var orderStatusHtml = {
							'0':'orderShopstock.html',   //缺货异常
							'-501':'orderAddress.html',   //收货地址异常
							'-502':'orderRate.html',        //费率异常
							'-503':'orderShopnum.html',   //商品编号对应异常
							'-505':'orderShopmoney.html'   //金额异常
						};
						window.location = orderStatusHtml[status]+'?orderNo='+orderNo;
					}else{
						tan_data(oid,orderNo);
					}
				}else if(event.target.attributes['class'].value == 'center oTitle' || event.target.attributes['class'].value == 'fa fa-edit buttonRole_title' || event.target.attributes['class'].value == 'btn btn-xs btn-blue tooltips buttonRole_title'){
					
				}else{
					tan_data(oid,orderNo);
				}
				function tan_data(oid,orderNo){
					var detailListConsuc = function(data){
						if(data.result){
							var listDetailAttr = [],
								listwoutAttr = [],
								listDetailHtml = '',
								listwoutHtml = '';
							if(data.result.listDetail){
								listDetailAttr=data.result.listDetail;
								for(var d=0;d<listDetailAttr.length;d++){
									var productName = listDetailAttr[d].productName||'',
									productManager = listDetailAttr[d].productManager||'';
									listDetailHtml+='<tr><td class="center">'+checkValue(listDetailAttr[d].channelSkuCode)+'</td><td class="center">'+checkValue(listDetailAttr[d].skuCode)+'</td><td class="center">'+productName+'</td><td class="center">'+productManager+'</td><td class="center">'+checkValue((listDetailAttr[d].price/100).toFixed(2))+'</td><td class="center">'+listDetailAttr[d].num+'</td><td class="center">'+checkValue((listDetailAttr[d].totalPrice/100).toFixed(2))+'</td><td class="center oTitle"><a href="javascript:;" class="btn btn-xs btn-blue tooltips buttonDetail_title" data-placement="top" data-original-title="编辑" odata="'+JSONstringify(JSON.stringify(listDetailAttr[d]))+'"><i class="fa fa-edit buttonDetail_title" odata="'+JSONstringify(JSON.stringify(listDetailAttr[d]))+'"></i></a></td></tr>'
								}
								$('#listDetail tbody').html(listDetailHtml);
								runTooltips();
								titleClick();
								$('#listDetail tbody').show();
								$('.listDetail_table_false').hide();
							}else{
								$('#listDetail tbody').hide();
								$('.listDetail_table_false').show();
							}
							if(data.result.listwout){
								listwoutAttr=data.result.listwout;
								var shipmentDa = '';
								for(var s=0;s<listwoutAttr.length;s++){
									shipmentDa = listwoutAttr[s].shipmentDate?odateFormat(listwoutAttr[s].shipmentDate):'';
									listwoutHtml +='<tr><td class="center">'+checkValue(listwoutAttr[s].trackingNumber)+'</td><td class="center">'+checkValue(listwoutAttr[s].warehouseCode)+'</td><td class="center">'+shipmentDa+'</td><td class="center">'+checkValue(listwoutAttr[s].carrier)+'</td><td class="center oTitle"><a href="javascript:;" class="btn btn-xs btn-blue tooltips buttonDetail_listwout" data-placement="top" data-original-title="编辑" odata="'+JSONstringify(JSON.stringify(listwoutAttr[s]))+'"><i class="fa fa-edit buttonDetail_listwout" odata="'+JSONstringify(JSON.stringify(listwoutAttr[s]))+'"></i></a></td></tr>'
								}
								$('#listwout tbody').html(listwoutHtml);
								runTooltips();
								titleClick();
								$('#listwout tbody').show();
								$('.listwout_table_false').hide();
								
							}else{
								$('#listwout tbody').hide();
								$('.listwout_table_false').show();
							}
						}
					}
					var detailListData = {'id':oid}
					doPost('/orders/detailListByOrderId',detailListData,detailListConsuc);
					var findByListConsuc = function(data){
						if(data.result){
							var _result = data.result,_ohtml='';
							$('#listTitle tbody').html('');
							for(var s=0;s<_result.length;s++){
								if(_result[s].logoList){
									for(var z=0;z<_result[s].logoList.length;z++){
										var hmemo = _result[s].logoList[z].hmemo?_result[s].logoList[z].hmemo:'',
											qmemo = _result[s].logoList[z].qmemo?_result[s].logoList[z].qmemo:'';
										_ohtml+='<tr><td class="center">'+qmemo+'</td><td class="center">'+hmemo+'</td></tr>'
									};
								}
							}
							$('#listTitle tbody').html(_ohtml);
							$('#listTitle tbody').show();
							$('.customer_table_false').hide();
						}else{
							$('#listTitle tbody').hide();
							$('.customer_table_false').show();
						}
					}
					var findByListData = {'orderNo':orderNo}
					doPost('/preSale/findByOrderNo',findByListData,findByListConsuc);
					showData('orderSalelIndex');
				}
				
				//订单明细添加
				$('.json_add').unbind("click").on('click',function(){
					console.log($('#listDetail2').css('display'))
					if($('#listDetail2').css('display') != 'none') return;
					$('#listDetail2').show();
				});
				$('.json_add_btn').unbind("click").on('click',function(){
					var json_add_sku = $('#listDetail2 .json_add_sku').val(),
						json_add_num = $('#listDetail2 .json_add_num').val();
					if(!checkNotEmpty(json_add_sku)){xcsoft.error('请输入商品SKU编号',1500);return;};
					if(!checkNotEmpty(json_add_num)){xcsoft.error('请输入数量',1500);return;};
					var channelData = {
						'orderId':oid,
						'skuCode':json_add_sku,
						'num':json_add_num
					};
					var btn_exmineClick = function(){
						var channelConsuc = function(data){
							modReload('添加成功');
						}
						doPost('/orders/addSAOrderDetail',channelData,channelConsuc);
					}
					examIndexUp('此操作',btn_exmineClick);
					showData('examineIndex');
				});
			})
			$('.sukDiv_close').unbind("click").on('click',function(){
				$('.orderSalelIndex').hide();
				$('.ordre_container table tbody tr').removeClass('success');
			});
		}
		
		/*编辑点击*/
		function titleClick(){
			//主订单修改
			$('.buttonRole_title').unbind("click").on('click',function(){
				var _this = $(this),
					oData = JSONparse(_this.attr('odata'));
				_this.blur();
				$('.modElasticIndex .modAddress').val(oData.address || '');
				$('.modElasticIndex .modPhone').val(oData.phone || '');
				$('.modElasticIndex .modconsignee').val(oData.consignee || '');
				$('.modElasticIndex .two_province').val(oData.province || '');
				$('.modElasticIndex .two_city').val(oData.city || '');
				$('.modElasticIndex .two_area').val(oData.area || '');
				$('.modElasticIndex .modproductTotal').val((oData.productTotal/100).toFixed(2));
				$('.modElasticIndex .modorderTotal').val(oData.orderTotal?(oData.orderTotal/100).toFixed(2):'');
				$('.modElasticIndex .modorderRate').val(oData.orderRate || '');
				showData('modElasticIndex');
				$('.butAdd_sure').unbind("click").on('click',function(){
					var address = $('.modElasticIndex .modAddress').val(),
						consignee = $('.modElasticIndex .modconsignee').val(),
						phone = $('.modElasticIndex .modPhone').val(),
						productTotal = $('.modElasticIndex .modproductTotal').val(),
						orderRate = $('.modElasticIndex .modorderRate').val(),
						province = $('.modElasticIndex .two_province').val(),
						city = $('.modElasticIndex .two_city').val(),
						area = $('.modElasticIndex .two_area').val(),
						orderTotal = $('.modElasticIndex .modorderTotal').val();
					if(!checkNotEmpty(address)){xcsoft.error('请输入收货地址',1500);return;};
					if(!checkNotEmpty(consignee)){xcsoft.error('请输入收货人',1500);return;};
					if(!checkNotEmpty(phone)){xcsoft.error('请输入联系电话',1500);return;};
					if(!checkNotEmpty(productTotal)){xcsoft.error('请输入商品总价',1500);return;};
					if(!checkNotEmpty(orderRate)){xcsoft.error('请输入折扣，如：0.5',1500);return;};
					if(!checkNotEmpty(orderTotal)){xcsoft.error('请输入订单价格',1500);return;};
					if(!checkNotEmpty(province)){xcsoft.error('请输入省',1500);return;};
					if(!checkNotEmpty(city)){xcsoft.error('请输入市',1500);return;};
					if(!checkNotEmpty(area)){xcsoft.error('请输入区',1500);return;};
					var channelData = {
						'address':address,
						'consignee':consignee,
						'phone':phone,
						'province':province,
						'city':city,
						'area':area,
						'productTotal':(productTotal*100).toFixed(0),
						'orderRate':orderRate,
						'orderTotal':(orderTotal*100).toFixed(0),
						'id':oData.id
					};
					var btn_exmineClick = function(){
						var channelConsuc = function(data){
							if(data.msg == '修改成功'){
								modReload('修改成功');
							}else{
								xcsoft.error('修改失败',1000);
							}
						}
						doPost('/orders/modSAOrder',channelData,channelConsuc);
					}
					examIndexUp('此操作',btn_exmineClick);
					showData('examineIndex');
				});
			});
			
			//详情修改buttonDetail_title
			$('.buttonDetail_title').unbind("click").on('click',function(){
				var _this = $(this),
					oData = JSONparse(_this.attr('odata'));
				_this.blur();
				$('.modDetailIndex .modDSkuCode').val(oData.skuCode);
				$('.modDetailIndex .modDproductName').val(oData.productName);
				$('.modDetailIndex .modDprice').val((oData.price/100).toFixed(2));
				$('.modDetailIndex .modDreNum').val(oData.num);
				showData('modDetailIndex');
				$('.modDetail_sure').unbind("click").on('click',function(){
					var skuCode = $('.modDetailIndex .modDSkuCode').val(),
						productName = $('.modDetailIndex .modDproductName').val(),
						price = $('.modDetailIndex .modDprice').val(),
						num = $('.modDetailIndex .modDreNum').val();
					if(!checkNotEmpty(skuCode)){xcsoft.error('请输入商品SKU编号',1500);return;};
					if(!checkNotEmpty(productName)){xcsoft.error('请输入商品名称',1500);return;};
					if(!checkNotEmpty(price)){xcsoft.error('请输入商品单价',1500);return;};
					if(!checkNotEmpty(num)){xcsoft.error('请输入数量',1500);return;};
					var channelData = {
						'skuCode':skuCode,
						'productName':productName,
						'price':(price*100).toFixed(0),
						'num':num,
						'id':oData.id
					};
					var btn_exmineClick = function(data){
						var channelConsuc = function(data){
							if(data.msg == '修改成功'){
								modReload('修改成功');
							}else{
								xcsoft.error('修改失败',1000);
							}
						}
						doPost('/orders/modSAOrderDetail',channelData,channelConsuc);
					}
					examIndexUp('此操作',btn_exmineClick);
					showData('examineIndex');
				});
			});
			
			
			//物流修改
			$('.buttonDetail_listwout').unbind("click").on('click',function(){
				var _this = $(this),
					owData = JSONparse(_this.attr('odata')),wHtml='<option value="">请选择</option>';
				_this.blur();
				var stockConsuc = function(data){
					var _data= data.result;
					for(var d=0;d<_data.length;d++){
						wHtml += '<option value="'+_data[d].warehouseCode+'">'+_data[d].warehouseCode+'</option>'
					}
					$('.warehouseCode').html(wHtml);
				}
				doPost('/items/findAllWarehouse','',stockConsuc);
				var shipmentDaw = owData.shipmentDate?odateFormat(owData.shipmentDate):'';
				$('.ExpressDetailIndex .trackingNumber').val(owData.trackingNumber);
				$('.ExpressDetailIndex .warehouseCode').val(owData.warehouseCode);
				$('.ExpressDetailIndex .shipmentTime').val(shipmentDaw);
				$('.ExpressDetailIndex .carrier').val(owData.carrier);
				$('.shipmentTime').datetimepicker({  
					minView: "month",
					language:"zh-CN",
				    todayBtn : "linked",  
				    format: 'yyyy-mm-dd',
				    autoclose : true,  
				    todayHighlight : true
				})
				showData('ExpressDetailIndex');
				$('.Express_sure').unbind("click").on('click',function(){
					var trackingNumber = $('.ExpressDetailIndex .trackingNumber').val(),
						warehouseCode = $('.ExpressDetailIndex .warehouseCode').val(),
						shipmentDateString = $('.ExpressDetailIndex .shipmentTime').val(),
						carrier = $('.ExpressDetailIndex .carrier').val();
					if(!checkNotEmpty(trackingNumber)){xcsoft.error('请输入快递单号',1500);return;};
					if(!checkNotEmpty(warehouseCode)){xcsoft.error('请选择仓库编码',1500);return;};
					if(!checkNotEmpty(shipmentDateString)){xcsoft.error('请选择出库时间',1500);return;};
					if(!checkNotEmpty(carrier)){xcsoft.error('请输入快递公司',1500);return;};
					var wData = {
						'carrier':carrier,
						'trackingNumber':trackingNumber,
						'warehouseCode':warehouseCode,
						'shipmentDateString':shipmentDateString,
						'id':owData.id
					};
					var btn_exmineClick = function(){
						var wlConsuc = function(data){
							if(data.msg == '修改成功'){
								modReload('修改成功');
							}else{
								xcsoft.error('修改失败',1000);
							}
						}
						doPost('/orders/updateExpressDetail',wData,wlConsuc);
					}
					examIndexUp('此操作',btn_exmineClick);
					showData('examineIndex');
				});
			});
			$('.roleDiv_close').unbind("click").on('click',function(){
				$('.modElasticIndex').hide();
				$('.ordre_container table tbody tr').removeClass('success');
			});
			$('.ExpressDetail_close').unbind("click").on('click',function(){
				$('.ExpressDetailIndex').hide();
			});
			$('.modDetail_close').unbind("click").on('click',function(){
				$('.modDetailIndex').hide();
			});
		}
	}
	return {
		init: function() {
			orderSaleIstation();
		}
	};
}();

/*短信模板*/
var smsIstationMain = function() {
	var channelSkuClick = function() {
		channelList();
		$('.channelCode').html($('.channal_id').html());
		$('.channelCode option').eq(0).html('请选择渠道');
		$('.buttonchanSKU_search').unbind('click').on('click',function(){
			dopostData();
		})
		dopostData();
		function dopostData(){
			var channal_id = $('.channal_id').val();
			var searchBrand = {
				'channelCode':channal_id
			};
			var searchConsuc = function(data){
				var _result = data.result,ohtml='',productAttr = ['','拣货时发送','发货时发送'];
				if(_result.length != 0){
					for(var i=0;i<_result.length;i++){
						var channelLi = _result[i].channelCode || '',
							messageCo = _result[i].messageCode || '';
						ohtml+='<tr><td class="center">'+messageCo+'</td><td class="center">'+_result[i].messageContent+'</td><td class="center">'+channelLi+'</td><td class="center">'+_result[i].spuCode+'</td><td class="center">'+productAttr[_result[i].type]+'</td><td class="center"><a href="javascript:;" class="btn btn-xs btn-primary tooltips buttonChannel_title" duata-placement="top" oData="'+JSONstringify(JSON.stringify(_result[i]))+'">修改</a><a href="javascript:;" class="btn btn-xs btn-danger tooltips buttonChannel_del" duata-placement="top" oId="'+_result[i].id+'" >删除</a></td></tr>'
						}
					$('#content_channel').html(ohtml);
					$('#content_channel').show();
					$('.userIndex_table_false').hide();
					runTooltips();
				}else{
					$('#content_channel').hide();
					$('.userIndex_table_false').show();
				}
				buttonRole_click();
			}
			doPost('/msgTemplate/find',searchBrand,searchConsuc);
		}
	function buttonRole_click(){
		//新增
		$('.button_add_sms').unbind('click').on('click',function(){
			$('.butSUK_nextTwo').attr('oId','');
			$('.channelCode').val('');
			$('.messageCode').val('');
			$('.messageContent').val('');
			$('.spuCode').val('');
			$(".buttonChannel_input input[value=1]").attr("checked",'checked');
			showData('channelIndex');
		});
		
		//修改
		$('.buttonChannel_title').unbind('click').on('click',function(){
			var mod_this = $(this),
			    mod_oData = JSONparse(mod_this.attr('oData'));
			$('.messageCode').val(mod_oData.messageCode);
			$('.messageContent').val(mod_oData.messageContent);
			$('.spuCode').val(mod_oData.spuCode || '');
			$('.channelCode').val(mod_oData.channelCode);
			$(".buttonChannel_input input[value="+mod_oData.type+"]").attr("checked",'checked');
			$('.butSUK_nextTwo').attr('oId',mod_oData.id);
			showData('channelIndex');
		});
		
		//参数点击
		$('.button_parameter button').unbind('click').on('click',function(){	
			var _thisHtml = $(this).html(),
				mod_index = $(this).index(),
				mod_attr = ['{param3}','{param2}','{param1}'],
				messageHtml = $('.messageContent').val();
			if($('.messageContent').val().length>=100){xcsoft.error('模板内容不超过100个字',1500);return;}
			$(".messageContent").insertContent(mod_attr[mod_index]);
		});
		
		//关闭
		$('.sukDiv_close').unbind('click').on('click',function(){	
			$('.channelIndex').hide();
		});
		
		//删除
		$('.buttonChannel_del').unbind('click').on('click',function(){	
			var del_this = $(this).attr('oId');
			var del_exmineClick = function(){
				var delConsuc = function(data){
					if(data.result){
						modReload('删除成功');
					}else{
						xcsoft.error('删除失败',1000);
					}
				}
				doPost('/msgTemplate/del/'+del_this,'',delConsuc);
			}
			examIndexUp('确定删除此短信模板',del_exmineClick);
			showData('examineIndex');
		});
		
		//确定
		$('.butSUK_nextTwo').unbind('click').on('click',function(){
			var btn_this = $(this),
				btn_oId = btn_this.attr('oId'),
				add_url = '/msgTemplate/add',
				channelProductAttribute_falg = true;
			var messageCode = $('.messageCode').val(),
				messageContent = $('.messageContent').val(),
				spuCode = $('.spuCode').val(),
				channelCode = $('.channelCode').val(),
				type = $(".buttonChannel_input input[type='radio']:checked").val();
				
			if(!checkNotEmpty(channelCode)){xcsoft.error('请输入渠道编号',1500);return;};
			if(!checkNotEmpty(messageContent)){xcsoft.error('请输入模板内容',1500);return;};
			if($('.messageContent').val().length>=100){xcsoft.error('模板内容不超过100个字',1500);return;}
			var modSkuBrand = {}
			if(btn_oId){//编辑
				modSkuBrand = {
					'id':btn_oId,
					'messageCode':messageCode,
					'messageContent':messageContent,
					'spuCode':spuCode,
					'channelCode':channelCode,
					'type':type
				}
				add_url = '/msgTemplate/update';
			}else{
				modSkuBrand = {
					'messageCode':messageCode,
					'messageContent':messageContent,
					'spuCode':spuCode,
					'channelCode':channelCode,
					'type':type
				}
			}
	        var btn_exmineClick = function(){
				var modSkuProConsuc = function(data){
					if(btn_oId){//编辑
						data.result?modReload('修改成功'):xcsoft.error('修改失败',1000);
					}else{
						data.result?modReload('添加成功'):xcsoft.error('添加失败',1000);
					}
				}
				doPost(add_url,modSkuBrand,modSkuProConsuc);
			}
			examIndexUp('此操作',btn_exmineClick);
			showData('examineIndex');
		})
	}
	};
	return {
		init: function() {
			channelSkuClick();
		}
	};
}();