/**
 * Created by Administrator on 2016/10/3.
 */
(function($){
    $(function(){

    	/*模式切换*/
        var turnoff=$("#turnOff"),
            cont=$(".box_sun"),
            flag=0;
        turnoff.click(function(){
            if( flag==0){
                turnoff.html("普通模式");
                cont.css({background:"url(img/3.jpg) no-repeat -520px -360px"});
                flag=1
            }else{
                turnoff.html("护眼模式");
                cont.css({background: "url(img/bg.png)"});
                flag=0;
            }
        });
        
    
        /*主体内容*/
        var back=$('#back'),
            btn=$("#btn"),
            btn2=$("#btn2"),
            uls=$(".list"),
            li_1=$(".list .list1"),
            Head=$(".head"),
            Left = $(".left"),
            Right = $(".right"),
            n= 0,
            score=$("#score"),
            level=1;

        var music = null;
        /*进入游戏*/
        btn.click(function(){
            $(".m_btn").css({display: "block"})
            //添加音效
            music = document.createElement("audio");
            music.src = "music.mp3";
            music.autoplay = true;//自动播放
            document.body.appendChild(music);

            btn.remove();
            li_1.remove();
            Left.css({display:"block"});
            Right.css({display:"block"});
            Head.css({display:"none"});
            btn2.css({display:"block"});

            app();
            function app(){
                level+=1;
                /*随机添加图片.更换颜色*/
                for (var i=0;i<level*level;i++) {
                    uls.append($("<li><img src='img/1.png'></li>"));
                    $(".list li").eq(i).css({width:(100/level)+'%',float:"left",backgroundColor:'rgb('+rand(50,255)+','+rand(50,255)+','+rand(50,255)+')',display:"block"});
                    $(".list li img").css({display:"block",width:100+"%"});
                }
                /*产生随机坐标*/
                var x=rand(1,level*level-1);
                var imgs1=$(".list img");
                /*随机更改图片*/
                imgs1[x].src='img/2.png';
                var li=$("li");
                 li[x].onclick=function(){
                   for (var i=0;i<level*level;i++) {
                        li[i].remove(this);
                    }
                     /*定义分数*/
                    n+=1;
                    score.html(n);
                    if (level>10) {
                        level=10;
                    }
                    app();
                }
                
            }
            
            /*进度条30秒*/
	    	var ss = 1,
	    		con = true;
	    		time = null;

	    		time=setInterval(function(){
		    		ss++;
		    		$(".progress-bar").css({width:ss+"px"});
			    	if(ss == 150){

                        //添加音效
                        music.remove();

			    		clearInterval(time);
			    		$("#back").css({display:"block"});
                        /*时间结束等级评价*/
                        var n = score.html();
                        if (n<8) {
                            $(".dvt_fraction .p2").html("等级: 睁眼瞎");
                            $(".dvt_fraction").css({display:"block"});
                        }else if (n>=20) {
                            $(".dvt_fraction .p2").html("等级: 超神");
                            $(".dvt_fraction").css({display:"block"});
                        }else if (n>=12) {
                            $(".dvt_fraction .p2").html("等级: 火眼金睛");
                            $(".dvt_fraction").css({display:"block"});
                        }else{
                            $(".dvt_fraction .p2").html("等级: 高度近视");
                            $(".dvt_fraction").css({display:"block"});
                        }
			    	}
		    	},200)

	    	/*暂停*/
			$("#btn2").click(function(){
				if(con){
					clearInterval(time);
					con = false;	
					$("#btn2").html("继续游戏");
					$(".dvt_tan").css({display:"block"});
                    music.remove();

				}else{

                    //添加音效

					time=setInterval(function(){
		    		ss++;
		    		$(".progress-bar").css({width:ss+"px"});
			    	if(ss == 150){
			    		clearInterval(time);
			    		$("#back").css({display:"block"});

                        music.remove();

                        /*游戏结束等级评价*/
                        var n = score.html();
                        if (n<8) {
                            $(".dvt_fraction .p2").html("等级: 睁眼瞎");
                            $(".dvt_fraction").css({display:"block"});
                        }else if (n>=20) {
                            $(".dvt_fraction .p2").html("等级: 超神");
                            $(".dvt_fraction").css({display:"block"});
                        }else if (n>=12) {
                            $(".dvt_fraction .p2").html("等级: 火眼金睛");
                            $(".dvt_fraction").css({display:"block"});
                        }else{
                            $(".dvt_fraction .p2").html("等级: 高度近视");
                            $(".dvt_fraction").css({display:"block"});
                        }
			    	}
		    	},200)
		    	  $("#btn2").html("暂停");
		    	  $(".dvt").css({display:"none"});
                    music = document.createElement("audio");
                    music.src = "music.mp3";
                    music.autoplay = true;//自动播放
                    document.body.appendChild(music);
					con = true;		
				}	
			})
        });

        /*背景音乐按钮*/
        var  co=true;
        $(".m_btn").click(function(){
            if(co){
                music.remove();
                co = false;
            }else{
                music = document.createElement("audio");
                music.src = "music.mp3";
                music.autoplay = true;//自动播放
                document.body.appendChild(music);
                co = true;
            }
        })

        // 随机函数
        function rand(min,max){
            return Math.round(Math.random()*(max-min)+min);
        }
       
    })
  
 

})(jQuery);