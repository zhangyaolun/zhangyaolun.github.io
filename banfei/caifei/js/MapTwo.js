document.getElementsByTagName("body")[0].setAttribute("style","display:block");
var o = {
	init:function(){
		FastClick.attach(document.body);
		if(!getParameter('mayself')){
			var mayself = getParameter('index').split('|');
			o.shopMap(0,0,mayself);
		}else{
			var mayself = getParameter('mayself').split('|'),
				hisself = getParameter('type').split('|');		
			o.shopMap(mayself,hisself,0);
		}
	},
	shopMap:function(mayself,hisself,mapIndex){
		var center;
		var oAttr = [],xyAttr=[],moreAttr=[];
		if(mayself == 0){//mayself=0,首页进
			mayself = mapIndex;
			center = new qq.maps.LatLng(mayself[1],mayself[0]);	
			ajaxDate();
			for(var i = 0;i < oAttr.length; i++){
				for(var j = 0;j < oAttr[i].length; j++){
					moreAttr.push(oAttr[i][j]);
				}
			}
			console.log(moreAttr)
			var latlngs = [ 
		        /*new qq.maps.LatLng(mayself[1],mayself[0])*/
		    ];
		    for(var s = 0;s < moreAttr.length; s++){
				latlngs.push(new qq.maps.LatLng(moreAttr[s].latitude,moreAttr[s].longitude));
			}
		}else{
			
			center = new qq.maps.LatLng(mayself[1],mayself[0]);	
			var latlngs = [ 
		        /*new qq.maps.LatLng(mayself[1],mayself[0]), */
		        new qq.maps.LatLng(hisself[0],hisself[1])
		    ]; 
		}
		
	    var map = new qq.maps.Map(document.getElementById("container"), {  
	        center: center,  
	        zoom: 15,
	        /*zoomControl:false,
			disableDoubleClickZoom: true,*/
			disableDefaultUI: true
	    });  
	    var infoWin = new qq.maps.InfoWindow({  
	        map: map  
	    });  
	    if(hisself != 0){
	    	/*公交服务*/
	    	var map, transfer_plans, start_marker, end_marker, station_markers = [],
	        transfer_lines = [],
	        walk_lines = [];
	        var transferService = new qq.maps.TransferService({
	            location: "上海",
	            complete: function(result) {
	            	console.log(result)
	                result = result.detail;
	                var start = result.start,
	                end = result.end;
	                var anchor = new qq.maps.Point(6, 6),
	                size = new qq.maps.Size(24, 36),
	                start_icon = new qq.maps.MarkerImage('../img/busmarker.png', size),
	                end_icon = new qq.maps.MarkerImage('../img/busmarker.png', size, new qq.maps.Point(24, 0), anchor);
	
	                start_marker && start_marker.setMap(null);
	                end_marker && end_marker.setMap(null);
	                start_marker = new qq.maps.Marker({
	                    icon: start_icon,
	                    position: start.latLng,
	                    map: map,
	                    zIndex: 1
	                });
	                end_marker = new qq.maps.Marker({
	                    icon: end_icon,
	                    position: end.latLng,
	                    map: map,
	                    zIndex: 1
	                });
	
	                transfer_plans = result.plans;
	                var plans_desc = [];
	                for (var i = 0; i < transfer_plans.length; i++) {
	                    //plan desc.  
	                    var p_attributes = ['type="' + i + '"', 'style="margin-top:-4px;cursor:pointer"'].join(' ');
	                    plans_desc.push('<p ' + p_attributes + '><b>方案' + (i + 1) + '.</b>');
	                    var actions = transfer_plans[i].actions;
	                    for (var j = 0; j < actions.length; j++) {
	                        var action = actions[j],
	                        img_position;
	                        action.type == qq.maps.TransferActionType.BUS && (img_position = '-38px 0px');
	                        action.type == qq.maps.TransferActionType.SUBWAY && (img_position = '-57px 0px');
	                        action.type == qq.maps.TransferActionType.WALK && (img_position = '-76px 0px');
	
	                        var action_img = '<span style="margin-bottom: -4px;' + 'display:inline-block;background:url(../img/busicon.png) ' + 'no-repeat ' + img_position + ';width:19px;height:19px"></span>&nbsp;&nbsp;';
	                        plans_desc.push(action_img + action.instructions);
	                    }
	                }
	                //方案文本描述
	                document.getElementById('plans').innerHTML = plans_desc.join('<br><br>');
	                $('#plans p').eq(0).css('background','#eee');
					wayClick();
	                //渲染到地图上
	                renderPlan(0);
	            }
	        });
	        /*驾车服务*/
	        var drivingService = new qq.maps.DrivingService({
	            //设置回调函数
	            complete: function(result) {
	                if (result.type == qq.maps.ServiceResultType.MULTI_DESTINATION) {
	                    alert("起终点不唯一");
	                }
	            },
	            //设置检索失败回调函数
	            error: function(data) {
	                alert(data);
	            },
	            //设置驾车换乘的区域范围
	            location: "上海",
	            //展现结果的地图实例
	            map: map,
	            //展现结果
	            panel: document.getElementById('infoDiv')
	
	        });
	        /*公交策略切换*/
	        $('select#policyGong').change(function(){
	        	 calcPlan();
	        })
	        /*驾车策略切换*/
	        $('select#policyJia').change(function(){
	        	 jiaSearch();
	        })
	        calcPlan();
	        /*公交，驾车*/
	        $('select#oSelection').change(function(){
	        	 if($(this).val() == '驾车'){
		            clearOverlay(station_markers);
		            clearOverlay(transfer_lines);
		            clearOverlay(walk_lines);
		            start_marker.setMap(null);
	                end_marker.setMap(null);
	        	 	$('#policyJia').show();
	        	 	$('#policyGong').hide();
	        	 	$('#infoDiv').show();
	        	 	$('#plans').hide();
	        	 	jiaSearch();
	        	 }else{
	        	 	drivingService.clear();
	        	 	$('#policyGong').show();
	        	 	$('#policyJia').hide();
	        	 	$('#infoDiv').hide();
	        	 	$('#plans').show();
	        	 	calcPlan();
	        	 }
	        })
	        
	        
	        /*公交方案初始化*/	
	    	function calcPlan() {
	            var start_name = [mayself[0],mayself[1]];
	            var end_name = [hisself[1],hisself[0]];
	            var policyGong = document.getElementById("policyGong").value;
	            console.log(start_name)
	            console.log(end_name)
	            console.log(policyGong)
	            transferService.search(new qq.maps.LatLng(start_name[1], start_name[0]), new qq.maps.LatLng(end_name[1], end_name[0]));	
	            switch (policyGong) {
                case "较快捷":
                    transferService.setPolicy(qq.maps.TransferActionType.LEAST_TIME);
                    break;
                case "少换乘":
                    transferService.setPolicy(qq.maps.TransferActionType.LEAST_TRANSFER);
                    break;
                case "少步行":
                    transferService.setPolicy(qq.maps.TransferActionType.LEAST_WALKING);
                    console.log(1);
                    break;
                case "不坐地铁":
                    transferService.setPolicy(qq.maps.TransferActionType.NO_SUBWAY);
                    break;
                }
	        }
	        
	        /*驾车*/
	        function jiaSearch() {
	            var start = [mayself[0],mayself[1]];
	            var end = [hisself[1],hisself[0]];
	            var policy = document.getElementById("policyJia").value;
	            //设置驾车方案
	            drivingService.setPolicy(qq.maps.DrivingPolicy[policy]);
	            //设置驾驶路线的起点和终点
	            drivingService.search(new qq.maps.LatLng(start[1], start[0]),new qq.maps.LatLng(end[1], end[0]));
	        }
	        
	    }else{
	    	var label = new qq.maps.Label({
		        position: center,
		        map: map,
		        content: '我的位置',
		        style:{border:'0'},
		        
		    });
            var marker = new qq.maps.Marker({
                //设置Marker的位置坐标
                position: center,
                //设置Marker被添加到Map上时的动画效果为落下
                animation: qq.maps.MarkerAnimation.DOWN,
                //设置Marker被添加到Map上时的动画效果为反复弹跳
                //animation:qq.maps.MarkerAnimation.BOUNCE
                //设置Marker被添加到Map上时的动画效果为从天而降
                //animation:qq.maps.MarkerAnimation.DROP
                //设置Marker被添加到Map上时的动画效果为升起
                //animation:qq.maps.MarkerAnimation.UP
                //设置显示Marker的地图
                map: map,
                //设置Marker可拖动
                draggable: false,
                //自定义Marker图标为大头针样式
                icon: new qq.maps.MarkerImage(
                    "http://md-pay.oss-cn-hangzhou.aliyuncs.com/zuobiao.png"),
                //设置Marker的可见性，为true时可见,false时不可见
                visible: true,
            });

	    	for(var i = 0;i < latlngs.length; i++) { 
		    	var a = moreAttr[i].shortName +'&nbsp;&nbsp;<span style="color:#ff6585;font-weight:600">' + (moreAttr[i].discountRate*10).toFixed(1)+'折</span>';
		    	
				var label = new qq.maps.Label({
			        position: latlngs[i],
			        map: map,
			        content: a,
			        style:{color:"#333",border:'0'},
			    });
			}
	    	for(var i = 0;i < latlngs.length; i++) { 
		        (function(n){ 
		            var marker = new qq.maps.Marker({ 
		                position: latlngs[n], 
		                map: map ,
		            }); 
		            if(hisself != 0)oOpen();
		            qq.maps.event.addListener(marker, 'click', function(event) { 
		            	if(event.latLng.lat == mayself[1])return;
		                 oOpen(event.latLng.lat);
		            }); 
		            function oOpen(lato){
		            	infoWin.open(); 
		            	if(hisself != 0){
							infoWin.setContent('<div style="text-align:left;white-space:'+ 
		                'nowrap;color:#333;font-size:14px;">' + 
		                hisself[4] +'<div style="font-size:12px;color:#666;">地址：'+hisself[3]+'<div style="font-size:12px;color:#666;">电话：'+hisself[6]+'</div></div> </div>'); 
						}else{
							for(var i = 0;i < latlngs.length; i++) { 
								if(latlngs[i].lat == lato){
									infoWin.setContent('<div style="text-align:left;white-space:'+ 
		                'nowrap;color:#333;font-size:14px;">地址：' + 
		                moreAttr[i].address +'<div>电话：'+moreAttr[i].telephone+'<a style="margin-left:10px;color:#ff6585;text-decoration:underline;" href="details.html?result='+JSON.stringify(moreAttr[i]).replace(/"([^"]*)"/g, "'$1'")+ '&mayself=' +mayself[0]+'|'+mayself[1]+'">去看看</a></div></div>');
								}
							}
						}
		                infoWin.setPosition(latlngs[n]); 
		            }
		        })(i); 
		    } 
	    }
	   
		 
	   
	    function ajaxDate(){
	    	var currPage=1;
		    var data = {
				'x':mayself[0],
				'y':mayself[1],
				'radius':100,
				'currPage':currPage,
				'pageSize':10,
				'order':'',
				'type':''
			}
			
			$.ajax({
		        url : '/shop/geo/withInRadius',
		        data :data,
		        type : 'POST',
		        async : false,
		        success : function(data){
		        	if(data.httpCode == 200){
			           oAttr.push(data.result.result);
			           currPage++;
			           var num = data.result.totalPages;
			           for(var i=currPage;i<=num;i++){
				           	var data = {
								'x':mayself[0],
								'y':mayself[1],
								'radius':100,
								'currPage':i,
								'pageSize':10,
								'order':'',
								'type':''
							}
						    $.ajax({
					       		url : '/shop/geo/withInRadius',
						        data :data,
						        type : 'POST',
						        async : false,
						        success : function(data){
						        	if(data.httpCode == 200){
							           oAttr.push(data.result.result);
						        	}
						        }
						    });       		
						}
		        	}
		        }
		    });
	    }
		
    	  //清除地图上的marker
        function clearOverlay(overlays) {
            var overlay;
            while (overlay = overlays.pop()) {
                overlay.setMap(null);
            }
        }
        /*点击公交路线*/
		function wayClick() {
			$('#plans').on('click','p',function(){
				var _this = $(this);
				$('#plans p').css({'background':'#fff','display':'none'}).eq(_this.index()).css({'background':'#eee','display':'block'});
				renderPlan(_this.attr('type'));
			$('#wayImg').removeClass('one');
			    $('#wayImg').css({'top':'40%'});
			    $('#wayImg').attr('src','../img/timg_2.png');
				$('#wayImg').css({'top':'70%'});
				$('#plans').css({'height':'30%','top':'70%'});
			})
        }
		/*点击显示更多*/
		$('#wayImg').on('click',function(){
			if($('#policyJia').css('display') == 'block'){
				if(!$('#wayImg').hasClass('one')){
					$('#wayImg').addClass('one');
					$('#wayImg').css({'top':'40%'});
			    	$('#wayImg').attr('src','../img/timg_1.png');
					$('#infoDiv').css({'height':'60%','display':'block','top':'40%'});
				}else{
					$('#wayImg').removeClass('one');
					 $('#wayImg').css({'top':'40%'});
			    	$('#wayImg').attr('src','../img/timg_2.png');
					$('#wayImg').css({'top':'70%'});
					$('#infoDiv').css({'height':'30%','top':'70%'});
				}
			}else{
				if(!$('#wayImg').hasClass('one')){
					$('#wayImg').addClass('one');
					$('#plans p').css({'display':'block'});
					$('#wayImg').css({'top':'40%'});
			    	$('#wayImg').attr('src','../img/timg_1.png');
					$('#plans').css({'height':'60%','display':'block','top':'40%'});
				}else{
					$('#wayImg').removeClass('one');
					 $('#wayImg').css({'top':'40%'});
			    	$('#wayImg').attr('src','../img/timg_2.png');
					$('#wayImg').css({'top':'70%'});
					$('#plans').css({'height':'30%','top':'70%'});
				}
			}
		})
    	/*公交方案展示*/
    	function renderPlan(index) {
            var plan = transfer_plans[index],
            lines = plan.lines,
            walks = plan.walks,
            stations = plan.stations;
            map.fitBounds(plan.bounds);

            //clear overlays;
            clearOverlay(station_markers);
            clearOverlay(transfer_lines);
            clearOverlay(walk_lines);
            var anchor = new qq.maps.Point(6, 6),
            size = new qq.maps.Size(24, 36),
            bus_icon = new qq.maps.MarkerImage('../img/busmarker.png', size, new qq.maps.Point(48, 0), anchor),
            subway_icon = new qq.maps.MarkerImage('../img/busmarker.png', size, new qq.maps.Point(72, 0), anchor);
            //draw station marker
            for (var j = 0; j < stations.length; j++) {
                var station = stations[j];
                if (station.type == qq.maps.PoiType.SUBWAY_STATION) {
                    var station_icon = subway_icon;
                } else {
                    var station_icon = bus_icon;
                }
                var station_marker = new qq.maps.Marker({
                    icon: station_icon,
                    position: station.latLng,
                    map: map,
                    zIndex: 0
                });
                station_markers.push(station_marker);
            }

            //draw bus line
            for (var j = 0; j < lines.length; j++) {
                var line = lines[j];
                var polyline = new qq.maps.Polyline({
                    path: line.path,
                    strokeColor: '#3893F9',
                    strokeWeight: 6,
                    map: map
                });
                transfer_lines.push(polyline);
            }

            //draw walk line
            for (var j = 0; j < walks.length; j++) {
                var walk = walks[j];
                var polyline = new qq.maps.Polyline({
                    path: walk.path,
                    strokeColor: '#3FD2A3',
                    strokeWeight: 6,
                    map: map
                });
                walk_lines.push(polyline);
            }
        }
		
	},
	wayGongjiao:function(mayself,hisself,mapIndex){//公交
		
	},
	wayJiache:function(){
		
	}
}
o.init();