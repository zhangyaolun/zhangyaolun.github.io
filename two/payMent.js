window.addEventListener("load",function(){FastClick.attach(document.body);},false);
var imgAttr = [];
/*提交发表评论*/
$('.pay_fixed').on('click',function(){
	if($('.pay_title textarea').val() == ''){
		alert('请您填写评论内容');
		return;
	}
	
})

/*$('.paytitle_image .oneImage').click(function(){
	$('#file4').click();
})*/

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