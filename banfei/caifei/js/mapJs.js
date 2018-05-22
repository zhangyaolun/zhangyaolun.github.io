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
	        zoomControl:false,
			disableDoubleClickZoom: true,
			disableDefaultUI: true
	    });  
	    var infoWin = new qq.maps.InfoWindow({  
	        map: map  
	    });  
	    if(hisself != 0){
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
                icon: new qq.maps.MarkerImage("http://md-pay.oss-cn-hangzhou.aliyuncs.com/zuobiao.png"),
                //设置Marker的可见性，为true时可见,false时不可见
                visible: true,
            });
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
	    
	}
}
o.init();