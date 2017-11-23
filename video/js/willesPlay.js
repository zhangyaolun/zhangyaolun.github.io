$(function() {
	var playVideo = $("#playVideo");
	var playPause = $('.playPause'); //播放和暂停
	var duration = $('.timebar .duration'); //总时间
	var progress = $(".progress");
	var line = $(".progress .line");
	playPause.on('click', function() {
		playControl();
	});
	$('.playContent').on('click', function() {
		playControl();
	})
	playVideo.on('loadedmetadata', function() {
		$('.timebar .duration').html(formatSeconds(playVideo[0].duration));
	});
	
	playVideo.on('timeupdate', function() {
		$('.timebar .currentTime').html(formatSeconds(playVideo[0].currentTime));
		line.css('width', 100 * playVideo[0].currentTime / playVideo[0].duration + '%');
	});
	playVideo.on('ended', function() {
		$('.playTip').removeClass('glyphicon-pause').addClass('glyphicon-play').fadeIn();
		playPause.toggleClass('playIcon');
		line.css('width', '0%');
		$('.timebar .currentTime').html('0:00:00');
	});
	
	
	//全屏
	$('.fullScreen').on('click', function() {
		if ($(this).hasClass('cancleScreen')) {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.mozExitFullScreen) {
				document.mozExitFullScreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
			$(this).removeClass('cancleScreen');
			$('#willesPlay .playControll').css({
				'bottom': -48
			}).removeClass('fullControll');
		} else {
			if (playVideo[0].requestFullscreen) {
				playVideo[0].requestFullscreen();
			} else if (playVideo[0].mozRequestFullScreen) {
				playVideo[0].mozRequestFullScreen();
			} else if (playVideo[0].webkitRequestFullscreen) {
				playVideo[0].webkitRequestFullscreen();
			} else if (playVideo[0].msRequestFullscreen) {
				playVideo[0].msRequestFullscreen();
			}
			$(this).addClass('cancleScreen');
			$('#willesPlay .playControll').css({
				'left': 0,
				'bottom': 0
			}).addClass('fullControll');
		}
		return false;
	});
	$('.timebar .progress').on('click',function(e) {
		e = e || window.event;
		var maxduration = playVideo[0].duration; //Video 
		var positions = e.pageX - progress.offset().left; //Click pos
		var percentage = 100 * positions / $('.timebar .progress').width();
		
		//Check within range
		if (percentage > 100) {
			percentage = 100;
		}
		if (percentage < 0) {
			percentage = 0;
		}
		//Update progress bar and video currenttime
		line.css('width', percentage + '%');
		console.log(maxduration * percentage / 100)
		$ ('video').prop ('currentTime', maxduration * percentage / 100);
		console.log(playVideo[0].currentTime )
	});

	function playControl() {
			playPause.toggleClass('playIcon');
			if (playVideo[0].paused) {
				playVideo[0].currentTime = 10;
				playVideo[0].play();
				$('.playTip').removeClass('glyphicon-play').addClass('glyphicon-pause').fadeOut();
				
			} else {
				playVideo[0].pause();
				$('.playTip').removeClass('glyphicon-pause').addClass('glyphicon-play').fadeIn();
			}
		}
});

//秒转时间
function formatSeconds(value) {
	value = parseInt(value);
	var time;
	if (value > -1) {
		hour = Math.floor(value / 3600);
		min = Math.floor(value / 60) % 60;
		sec = value % 60;
		day = parseInt(hour / 24);
		if (day > 0) {
			hour = hour - 24 * day;
			time = day + "day " + hour + ":";
		} else time = hour + ":";
		if (min < 10) {
			time += "0";
		}
		time += min + ":";
		if (sec < 10) {
			time += "0";
		}
		time += sec;
	}
	return time;
}