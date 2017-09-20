FastClick.attach(document.body);
var data = JSON.parse(getParameter('result').replace(/'/g, '"'));
console.log(data)
$('.order_title img').attr("src",data.pic);			
$('.title_top span').html(data.shopName);	
$('.title_det').html(getParameter('num'));	
$('.title_top .over').css('width',getParameter('num')*12/100+'rem');					
$('.title_price').html((data.discountRate*10).toFixed(0)+'折');			
$('.pay').html((getParameter('totalMoney')/100).toFixed(2));			
$('.total').html((getParameter('payMoney')/100).toFixed(2));		

var check = 0;//该变量是记录当前选择的评分
/*over()是鼠标移过事件的处理方法*/		
function over(param){
	if(param == 1){
		$("#star1").attr("src","../img/star_red.png");
		$("#message").html("很差");
	}else if(param == 2){
		$("#star1").attr("src","../img/star_red.png");
		$("#star2").attr("src","../img/star_red.png");
		$("#message").html("比较差");
	}else if(param == 3){
		$("#star1").attr("src","../img/star_red.png");
		$("#star2").attr("src","../img/star_red.png");
		$("#star3").attr("src","../img/star_red.png");
		$("#message").html("一般");
	}else if(param == 4){
		$("#star1").attr("src","../img/star_red.png");
		$("#star2").attr("src","../img/star_red.png");
		$("#star3").attr("src","../img/star_red.png");
		$("#star4").attr("src","../img/star_red.png");
		$("#message").html("比较好");
	}else if(param == 5){
		$("#star1").attr("src","../img/star_red.png");
		$("#star2").attr("src","../img/star_red.png");
		$("#star3").attr("src","../img/star_red.png");
		$("#star4").attr("src","../img/star_red.png");
		$("#star5").attr("src","../img/star_red.png");
		$("#message").html("很好");
	}
}
/*out 方法是鼠标移除事件的处理方法，当鼠标移出时，恢复到我的打分情况*/
function out(){
	if(check == 1){//打分是1，设置第一颗星星亮，其他星星暗，其他情况以此类推
		$("#star1").attr("src","../img/star_red.png");
		$("#star2").attr("src","../img/star.png");
		$("#star3").attr("src","../img/star.png");
		$("#star4").attr("src","../img/star.png");
		$("#star5").attr("src","../img/star.png");
		$("#message").html("很差");
	}else if(check == 2){
		$("#star1").attr("src","../img/star_red.png");
		$("#star2").attr("src","../img/star_red.png");
		$("#star3").attr("src","../img/star.png");
		$("#star4").attr("src","../img/star.png");
		$("#star5").attr("src","../img/star.png");
		$("#message").html("比较差");
	}else if(check == 3){
		$("#star1").attr("src","../img/star_red.png");
		$("#star2").attr("src","../img/star_red.png");
		$("#star3").attr("src","../img/star_red.png");
		$("#star4").attr("src","../img/star.png");
		$("#star5").attr("src","../img/star.png");
		$("#message").html("一般");
	}else if(check == 4){
		$("#star1").attr("src","../img/star_red.png");
		$("#star2").attr("src","../img/star_red.png");
		$("#star3").attr("src","../img/star_red.png");
		$("#star4").attr("src","../img/star_red.png");
		$("#star5").attr("src","../img/star.png");
		$("#message").html("比较好");
	}else if(check == 5){
		$("#star1").attr("src","../img/star_red.png");
		$("#star2").attr("src","../img/star_red.png");
		$("#star3").attr("src","../img/star_red.png");
		$("#star4").attr("src","../img/star_red.png");
		$("#star5").attr("src","../img/star_red.png");
		$("#message").html("很好");
	}else if(check == 0){
		$("#star1").attr("src","../img/star.png");
		$("#star2").attr("src","../img/star.png");
		$("#star3").attr("src","../img/star.png");
		$("#star4").attr("src","../img/star.png");
		$("#star5").attr("src","../img/star.png");
		$("#message").html("");
	}
}
/*click()点击事件处理，记录打分*/
function click(param){
	check = param;//记录当前打分
	out();//设置星星数
}
var imgAttr = [];
/*提交发表评论*/
$('.pay_fixed').on('click',function(){
	if($('.pay_title textarea').val() == ''){
		alert('请您填写评论内容');
		return;
	}
	var suc = function(data){
		alert('发表评论成功。');
		window.location.href = 'index.html';
	}
	var data = {
		'openid':sessionStorage.getItem('openId'),
		'orderPayId':getParameter('orderPayId'),
		'userShopId':getParameter('userShopId'),
		'score':check,
		'content':$('.pay_title textarea').val(),
		'commentImages':imgAttr.join(',') || ''
	}
	doPost('/comment/submit',data,suc);
})

$('.oneImage').on('click',function(){
	alert('11111');
	$('#file4').click();
})

function filesize(target) {  
    var filesize = (target.files[0].size / 1024).toFixed(2);  
    var prefix=$(target).val().substring($(target).val().lastIndexOf(".")+1,$(target).val().length);
    if(filesize >5120){  
        alert("您上传的文件大于5M");
        target.value =""; 
		return false;   
    }else if(prefix!='png'&&prefix!='jpg'&&prefix!='jpeg'){
    	alert("只能上传jpg，png，jpeg");
	    return false;
    }
}
var suc=function(url){
	console.log(url)
	imgAttr.push(url);
    $(".paytitle_image span").append('<img src="'+url+'" class="left"/>');
    if($(".paytitle_image span img").length >= 3){
		$(".oneImage").hide();
	}
    $(".ci_upload").unbind().bind("change",function(){
      uploadImage($(this));
    })
}

$(".ci_upload").change(function(){
    uploadImage($(this));
  })

function uploadImage(input){
    register_currentId=$(input).attr("id");
    register_currentFileType=$(input).val().substring($(input).val().lastIndexOf("."),$(input).val().length);
    ajaxFileUpload($(input),suc);
}


function ajaxFileUpload(target,callback) {
  var prefix=$(target).val().substring($(target).val().lastIndexOf(".")+1,$(target).val().length);
  var pid=$(target).attr("id");
	if(prefix!='png'&&prefix!='jpg'&&prefix!='jpeg'){
	  //alert("只能上传jpg，png，jpeg");
	  return;
	}
	  $.ajaxFileUpload({
	    url : '/upload/image', //用于文件上传的服务器端请求地址
	    secureuri : false, //一般设置为false
	    fileElementId : pid, //文件上传空间的id属性  <input type="file" id="file" name="file" />
	    type : 'post',
	    dataType : 'json', //返回值类型 一般设置为json
	    success : function(data) //服务器成功响应处理函数
	    {   console.log(data)
		  if(data.httpCode==200){
		     callback(data.result);
		  }else{
	      	alert(data.message);
	      }
	    },
	    error : function(data)//服务器响应失败处理函数
	    {
	      alert("上传失败");
	    }
	  })
	  return false;
}