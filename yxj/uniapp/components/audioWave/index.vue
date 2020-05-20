<template>
	<view id='container'>
		<view class="line"></view>
		<view class="line"></view>
		<view class="line"></view>
		<view class="line"></view>
	  </view>
</template>

<script></script>

<style lang="less" scoped>
#container{
  position:absolute;
  left: 0;
  bottom: 40upx;
  right: 0;
  margin: 0 auto;
  height: 40upx;
  width: 55upx;
}

#container .line{
  width: 10upx;
  height: .5upx;
  bottom: 0upx;
  position:absolute;
  background:#fff;
  animation: bodong 1s infinite cubic-bezier(0.35, 0.34, 0.43, 0.44);
}

#container .line:first-child{
  left:0upx;
  animation-delay:.1s;
}

#container .line:nth-child(2){
  left: 15upx;
  animation-delay:.3s;

}
#container .line:nth-child(3){
  left:30upx;
  animation-delay:.5s;
}
#container .line:nth-child(4){
  left:45upx;
  animation-delay:.7s;
}

@keyframes bodong{
  0%{height:4upx; background:bule;}
  25%{height:30upx; background:bule;}
  50%{height:50upx; background:bule;}
  75%{height:30upx; background:bule;}
  100%{height:4upx; background:bule;}
}
</style>
