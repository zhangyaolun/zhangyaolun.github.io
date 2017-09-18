var o = {
	init:function(){
		FastClick.attach(document.body);
		if(!getParameter('mayself')){
			var mayself = getParameter('index').split('|');
			o.shopMap(0,0,mayself);
		}else{
			console.log('888')
			var mayself = getParameter('mayself').split('|'),
				hisself = getParameter('type').split('|');
				
			o.shopMap(mayself,hisself,0);
		}
		
	},
	shopMap:function(mayself,hisself,mapIndex){
		var center;
		var oAttr = [],xyAttr=[],moreAttr=[];
		if(mayself == 0){
			mayself = mapIndex;
			center = new qq.maps.LatLng(mayself[1],mayself[0]);	
			ajaxDate();
			
			for(var i = 0;i < oAttr.length; i++){
				for(var j = 0;j < oAttr[i].length; j++){
					moreAttr.push(oAttr[i][j]);
				}
			}
			var latlngs = [ 
		        new qq.maps.LatLng(mayself[1],mayself[0])
		    ];
		    for(var s = 0;s < moreAttr.length; s++){
				latlngs.push(new qq.maps.LatLng(moreAttr[s].latitude,moreAttr[s].longitude));
			}
		}else{
			
			center = new qq.maps.LatLng(mayself[1],mayself[0]);	
			console.log(center)
				console.log(hisself)
			var latlngs = [ 
		        new qq.maps.LatLng(mayself[1],mayself[0]), 
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
	    }else{
	    	var label = new qq.maps.Label({
		        position: center,
		        map: map,
		        content: '我的位置',
		        style:{border:'0'},
		        
		    });
	    	 for(var i = 1;i < latlngs.length; i++) { 
		    	if(moreAttr[i]){
		    		var a = moreAttr[i-1].shopName +'&nbsp;&nbsp;<span style="color:#ff6585;font-weight:600">' + (moreAttr[i-1].discountRate*100).toFixed(0)+'折</span>';
		    		
		    	}
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
	            	console.log(event.latLng.lat)
	                 oOpen(event.latLng.lat);
	            }); 
	            function oOpen(lato){
	            	infoWin.open(); 
	            	if(hisself != 0){
						infoWin.setContent('<div style="text-align:left;white-space:'+ 
	                'nowrap;color:#333;font-size:14px;">' + 
	                hisself[4] +'<div style="font-size:12px;color:#666;">地址：'+hisself[3]+'<div style="font-size:12px;color:#666;">电话：'+hisself[6]+'</div></div> </div>'); 
					}else{
						console.log(latlngs[5].lat)
						for(var i = 1;i < latlngs.length; i++) { 
							if(latlngs[i].lat == lato){
								infoWin.setContent('<div style="text-align:left;white-space:'+ 
	                'nowrap;color:#333;font-size:14px;">地址：' + 
	                moreAttr[i-1].address +'<div>电话：'+moreAttr[i-1].mobile+'<a style="margin-left:10px;color:#ff6585;text-decoration:underline;" href="details.html?result='+JSON.stringify(moreAttr[i-1]).replace(/"([^"]*)"/g, "'$1'")+ '&mayself=' +mayself[0]+'|'+mayself[1]+'">去看看</a></div></div>');
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
				'radius':3,
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
			           for(var i=currPage;i<=3;i++){
				           	var data = {
								'x':mayself[0],
								'y':mayself[1],
								'radius':3,
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
	    
	},
	ajaxDate:function(){
		
	}
}
o.init();