<template>
	<div class="me-wrap">
		<div class="me">
			<img class="me-bg" src="../../assets/images/me/usePic.png">
			<div class="me-header">
				<div class="user-ava">
					<img :src="userInfo.headUrl" v-if="userInfo.headUrl != ''">
					<img src="../../assets/images/default_head.png" alt="" v-else>
				</div>
				<div class="me-info">
					<p class="name">
						第三方的回复
						<span class="ft17" v-text="userInfo.nickName"></span>
						<span class="ft17" v-text="userInfo.title"></span>
					</p>
					<p class="hospital">
						<span class="ft13" v-text="userInfo.hospital"></span>&nbsp&nbsp&nbsp&nbsp
						<!-- <span class="ft13" v-text="userInfo.department"></span> -->
					</p>
					<router-link class="link" to="/Setting">
						<i class="icon icon-edit"></i>
					</router-link>
					
				</div>
			</div>
		</div>
		<div class="">
      <cellx is-link @onclick="link(1)">
        <div class="cells flex align-items-center" slot="left" >
          <!-- <i class="focus"></i> -->
          <p>关注的直播间</p>
        </div>
      </cellx>
      <cellx is-link @onclick="link(2)">
        <div class="cells flex align-items-center" slot="left" >
          <!--<img src="../../assets/images/icon_wo_kgdht.png">-->
          <!-- <i class="watch"></i> -->
          <p>看过的话题</p>
        </div>
      </cellx>
			<cellx is-link @onclick="link(0)">
				<div class="cells flex align-items-center" slot="left" >
					<!--<img src="../../assets/images/icon_wo_zbj.png">-->
          <!-- <i class="all"></i> -->
					<p>全部直播间</p>
				</div>
			</cellx>
			<cellx is-link @onclick="link(3)">
				<div class="cells flex align-items-center" slot="left" >
					<!--<img src="../../assets/images/icon_wo_zbj.png">-->
          <!-- <i class="all"></i> -->
					<p>我的收藏</p>
				</div>
			</cellx>
		</div>
	</div>
</template>
<style lang="less" scoped>
	.me-wrap {
		background-color: #f2f2f2;
		height: 95%;
		height: calc(~'100% - 53px');
	}
	.me{
		width: 100%;
		height: 0.9rem;
		position: relative;
		margin-bottom: 0.1rem;
	}
	.me-bg{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	.me-header{
		width: 100%;
		position: absolute;
		padding:0.18rem 0 0 0.2rem;
		box-sizing: border-box;
		img{
			width: 100%;
			height: 0.55rem;
			border-radius: 50%;
		}
	}
	.cells{
    margin-left:10px;
		img{
			width: 28px;
			height: 28px;
		}
		p{
			font-size: 16px;
			// margin-left: 15px;

		}
	}
	.me-info{
		width: 78%;
		float: right;
		color: #fff;
		position: relative;
    p{
			text-align: left;
			margin-top: 5px;
			width: 78%;
			white-space: nowrap;  
			text-overflow: ellipsis;
			overflow: hidden;
      span{
        margin: 5px 1px;
      }
    }
		.name{
			font-size: 0.17rem;
		}
		.hospital{
			width: 78%;
			white-space: nowrap;  
			text-overflow: ellipsis;
			overflow: hidden;
			font-size: 0.13rem;
		}
		.link{
			display: inline-block;
			position: absolute;
			top: 0;
			right: 0;
			width: 20%;
			height: 0.72rem;
		}
		i{
    	position: absolute;
    	right: 0.4rem;
    	bottom: 0.4rem;
    	width: 0.15rem;
    	height: 0.15rem;
    }
	}
  .focus{
    display:inline-block;
    background: url(../../assets/images/icon_wo_gzdzbj.png) no-repeat;
    width:20px;
    height:20px;
    background-size:90%;
    vertical-align: middle;
  }
  .watch{
    display:inline-block;
    background: url(../../assets/images/icon_wo_kgdht.png) no-repeat;
    width:20px;
    height:20px;
    background-size:100%;
    vertical-align: middle;
    margin-top:5px;
  }
  .all{
    display:inline-block;
    background: url(../../assets/images/icon_wo_zbj.png) no-repeat;
    width:20px;
    height:20px;
    background-size:90%;
    vertical-align: middle;
  }
  .user-ava{
  	width: 15.5%;
		height: 0.55rem;
		float: left;
    display: block;
    position: relative;
    
  }
</style>
<script>
import { mapMutations ,mapGetters,mapActions} from 'vuex'
import { api } from '../../utils/api.js'
import cellx from '../common/cell-x'
	export default {
		name:'Me',
		components:{
			cellx
		},
        /*beforeRouteEnter(){
		  //alert(1)
        },*/
		created () {
			this.GETUSERINFO()
			.then((msg)=>{
				if (msg) {this.toast(msg)}
				this.hideLoad()
			})
			.catch(e=>{
				console.log(e)
			})
		},
		data () {
			return {
			}
		},
		computed: {
			...mapGetters(['uid','userInfo'])
		},
		methods: {
			...mapMutations([
				'showLoad','hideLoad'
			]),
			...mapActions(['GETUSERINFO']),
			link (n) {
				n = Number(n)
				// alert(n)
				switch(n){
					case 0:
					this.showLoad()
					this.$router.push({path:'/StudioList'})
					break;
					case 1:
					this.showLoad()
					this.$router.push({path:'/StudioList',query:{type:1}})
					break;
					case 2:
					this.showLoad()
					this.$router.push({path:'/WatchedSubjects'})
					break;
					case 3:
					this.showLoad()
					this.$router.push({path:'/CourseCollection'})
					break;
				}
			}
		}
	}
</script>
