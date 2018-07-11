<template>
  <div>
    <header-top :headTitle="headTitle">
    </header-top>
    <div class="personal-main">
      <div class="personal-top clear">
        <img :src="getImgPath(headIcon,headImg)" alt="" class="headImg left">
        <div class="right headright">
          <vue-core-image-upload
            class="uploadItem"
            inputOfFile="headPic"
            :crop="false"
            @imageuploaded="imageuploaded"
            :data="imgData"
            :max-file-size="5242880"
            text="修改头像"
            url="/api/user/userInfo/uploadHeadPic" >
          </vue-core-image-upload>
      <!--    <input type="file" id="file-input" @change="handleFileChange">-->
          <img v-bind:src="headerkai" alt="" class="headerkai">
        </div>
      </div>
      <ul class="personal-cont">
        <li v-for="(title,index) in personalList" class="clear">
          <div class="personal-li clear left" @click="personalClick(index)">
            <span class="left">{{title}}</span>
            <div class="right">
              <em v-if="index==0">{{userInfo.name}}</em>
              <em v-if="index==1">{{sex}}</em>
              <em v-if="index==2">{{userInfo.email}}</em>
              <em v-if="index==3">{{birthdayFormatStr}}</em>
              <em v-if="index==4">{{userInfo.mobile}}</em>
              <img v-bind:src="headerkai" alt="" class="contkai">
            </div>
          </div>
        </li>
      </ul>
    </div>
    <section class="shopmap-new" @click='logout'>退出登录</section>
    <success-tips :successText="successText" v-if="showTips==true" v-on:closeTip="closeTip">
    </success-tips>

    <mt-datetime-picker
      ref="picker2"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      v-model="birthday"
      :startDate="startDate1"
      :endDate="endDate1"
      @confirm="handleChange">
    </mt-datetime-picker>
    <pass-mail v-on:inputRadioVlaue="RadioVlaue"v-if="openMail==true"  v-on:closeMail="closeMail" :sexValue="sex"></pass-mail>
  </div>

</template>
<script>
  import headerTop from 'src/components/header/inside-head'
  import headImg from '../../images/touxiang.png'
  import zhankai from '../../images/zhankai2.png'
  import successTips from 'src/components/common/success-tips'
  import passMail from 'src/page/user/passMail-group'
  import {getUserInfo,updateUserInfo,logout} from 'src/service/getData'
  import {checkText} from 'src/components/common/mixin'
  import {getImgPath} from 'src/components/common/mixin'
  import {removeStore} from '../../config/mUtils'
  import VueCoreImageUpload  from 'vue-core-image-upload';

  export default {

    data(){
      return{
        startDate1:new Date(1900,0,1),
        endDate1:new Date(),
        headTitle: "",
        headImg:headImg,
        headerkai:zhankai,
        picker:2010,
        successText:'设置成功',
        showTips:false,
        openMail:false,
        personalList:['昵称','性别','邮箱','生日','手机号','修改密码','我的收货地址'],
        userInfo:'',
        birthday:'',
        birthdayFormatStr:'',
        sex:'',
        imgData:{
          src:'',
        },
        sexList:[{
          flex: 1,
          values: ['男', '女'],
        }],
        headIcon:'',
      }
    },

    created(){
      this.headTitle = this.$route.query.title;
    },
    mounted(){
      this.getUserData();
    },
    mixins: [getImgPath],
    filters:{
      codeFilters:function (value) {
        return parseFloat(value)+'S';
      }
    },

    components:{
      headerTop,
      successTips,
      passMail,
      VueCoreImageUpload
    },

    computed:{

    },

    methods:{
      personalClick(index){
        if(index == '6'){
         let path = {path: '/shopMap',query: {title:'地址管理'}};
         this.$router.push(path);
        }else if(index == '2'){
          let path = {path: '/passMail',query: {title:'修改邮箱',email:this.userInfo.email,uid:this.userInfo.id}};
          this.$router.push(path);
        }else if(index == '5'){
          let path = {path: '/passMail',query: {title:'修改密码'}};
          this.$router.push(path);
        }else if(index == '0'){
          let path = {path: '/passMail',query: {title:'修改昵称',nickName:this.userInfo.name,uid:this.userInfo.id}};
          this.$router.push(path);
        }else if(index == '1'){
          this.openMail = true;
        }else if(index == '3'){
          this.$refs.picker2.open();
        }else if(index=='4'){
          let path = {path: '/passMail',query: {title:'修改手机',mobile:this.userInfo.mobile,uid:this.userInfo.id}};
          this.$router.push(path);
        }
      },
      handleFileChange (e) {
        if (typeof e.target === 'undefined') this.file = e[0];
        else this.file = e.target.files[0];
        this.imgPreview(this.file);
      },
    imgPreview (file) {
      let self = this;
      if (!file || !window.FileReader) return;
      if (/^image/.test(file.type)) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
          self.headImg = this.result;
        }
        self.showTips=true;
      }
    },
    closeTip(){
      this.showTips=false;
    },
    RadioVlaue(value){
      this.openMail=false;
      var isMale=value=='男'?'1':'0';
      updateUserInfo({uid:this.userInfo.id,sex:isMale}).then(res => {
        this.sex=value;
      });
    },
    closeMail(){
      this.openMail=false;
    },
    handleChange(value) {
      updateUserInfo({uid:this.userInfo.id,birthday:new Date(value).Format("yyyy-MM-dd")}).then(res => {
        this.birthday=value;
        this.birthdayFormatStr=value.Format("yyyy-MM-dd")
      });
    },
      getUserData(){
        getUserInfo().then(res => {
          this.userInfo=res.result;
          this.headIcon=this.userInfo.userImage;
          this.birthday=new Date(this.userInfo.birthday);
          this.birthdayFormatStr=new Date(this.userInfo.birthday).Format("yyyy-MM-dd");
          this.sex=this.userInfo.sex==1?'男':'女';
        });
      },
      onValuesChange(picker, values){

      },
      imageuploaded(res){
        if(res){
          this.headIcon=res.result;
        }
      },
      logout(){
        logout().then(res => {
            if(res){
              removeStore('login-phone');
              let path = {path: '/login'};
              this.$router.push(path);
            }
        })
      }

    },
  }

</script>
<style lang="scss" scoped>
  @import '../../style/mixin';;
  @import '../shop/conment';
  #file-input{
    position: absolute;
    right:-6rem;
    top:3.2rem;
    display: none;
  }
  .personal-main{
    padding-top: 2rem;
    width:100%;
    .personal-top{
      background: #fff;
      padding:.5rem ;
      box-sizing: border-box;
      font-size: .7rem;
      color: #808080;
      line-height: 3rem;
      .headImg{
        width:3rem;
        height:3rem;
        border-radius: 50%;
      }
      .headerkai{
        width:.6rem;
        height:1rem;
        vertical-align: top;
        margin-top: .95rem;
      }
      span{
        color: #808080;
      }
    }
    .personal-cont{
      padding-top:.5rem;
      li{
        background: #fff;
        width:100%;
        height:2.2rem;
        padding:0 .5rem;
        .personal-li{
          width:100%;
          line-height:2.2rem;
          font-size: .75rem;
          color: #333;
          height:2.2rem;
          border-bottom: 1px solid #e5e5e5;
          em{
            font-size: .7rem;
            color: #808080;
          }
          .contkai{
            width:.6rem;
            height:1rem;
            vertical-align: top;
            margin-top: .6rem;
          }
          /*div{
            min-width:5rem;
            background: #ccc;
          }*/
        }
      }
    }
  }
  .uploadItem{
    display: inline-block;
  }
  .shopmap-new{
    background: #f23030;
  }
  .headright{
    width: 50%;
    text-align: right;
  }

</style>
