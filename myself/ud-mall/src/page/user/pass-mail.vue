<template>
  <div>
      <header-top :headpassTitle="headTitle" v-on:updateInfo="updateInfo">
    </header-top>
    <div class="pass" v-if="ispass">
      <input type="password" placeholder="原登录密码" class="password1" v-model="oldPwd" :value="oldPwd">
      <input type="password" placeholder="新登录密码" class="password2" v-model="newPwd" :value="newPwd">
    </div>
    <div class="pass" v-if="isemail">
      <input type="text" placeholder="请输入邮箱" v-model="userEmail" :value="userEmail" class="email">
    </div>
    <div class="pass" v-if="isname">
      <input type="text" placeholder="请输入昵称" v-model="nickName" :value="nickName" class="name">
    </div>
    <div class="pass" v-if="ismobile">
      <input type="text" placeholder="请输入手机" v-model="mobile" :value="mobile" class="name">
    </div>
  </div>

</template>
<script>
  import headerTop from 'src/components/header/pass-mail-head'
  import {updateUserInfo,updatePwd} from 'src/service/getData'
  import { Toast } from 'mint-ui';
  import {checkText} from 'src/components/common/mixin'

  export default {

    data(){
      return{
        headTitle: "",
        ispass:false,
        isemail:false,
        isname:false,
        ismobile:false,
        start:1950,
        end:2030,
        nickName:'',
        userEmail:'',
        mobile:'',
        oldPwd:'',
        newPwd:'',
        uid:'',
      }
    },
    created(){
      this.headTitle = this.$route.query.title;
      if(this.headTitle == '修改密码'){
        this.ispass = true;
      }else if(this.headTitle == '修改邮箱'){
        this.isemail = true;
        this.userEmail= this.$route.query.email;
      }else if(this.headTitle == '修改昵称'){
        this.isname = true;
        this.nickName = this.$route.query.nickName;
      }else if(this.headTitle == '修改手机'){
        this.ismobile = true;
        this.mobile = this.$route.query.mobile;
      }
      this.uid = this.$route.query.uid;


    },
    mixins: [checkText],
    mounted(){

    },

    filters:{

    },

    components:{
      headerTop
    },

    computed:{

    },

    methods:{
      updateInfo(){
        if(this.isname){
          if(this.isEmpty(this.nickName)){
            Toast("请填写昵称");
            return;
          }
          updateUserInfo({uid:this.uid,name:this.nickName}).then(res => {
            if(res){
              this.$router.push({path:'/personal'});
            }

          });
        }else if(this.isemail){
          if(this.isEmpty(this.userEmail)){
            Toast("请填写邮箱");
            return;
          }
          if(!this.testEmail(this.userEmail)){
            Toast("邮箱格式不正确");
            return;
          }
          updateUserInfo({uid:this.uid,email:this.userEmail}).then(res => {
            if(res){
              this.$router.push({path: '/personal'});
            }
          });
        }else if(this.ismobile){
          if(this.isEmpty(this.mobile)){
            Toast("请填写手机");
            return;
          }
          if(!this.checkPhone(this.mobile)){
            Toast("手机格式不正确");
            return;
          }
          updateUserInfo({uid:this.uid,mobile:this.mobile}).then(res => {
            if(res){
              this.$router.push({path: '/personal'});
            }
          });
        }else if(this.ispass){
          if(this.isEmpty(this.oldPwd)){
            Toast("请输入原密码");
            return;
          }
          if(this.isEmpty(this.newPwd)){
            Toast("请输入新密码");
            return;
          }
          if(this.newPwd.length<6){
            Toast("密码长度不能小于6位");
            return;
          }

          updatePwd(this.oldPwd,this.newPwd).then(res => {
            if(res){
              this.$router.push({path: '/personal'});
              Toast('修改成功');
            }
          });
        }
      }
    },
  }

</script>
<style lang="scss" scoped>
  @import '../../style/mixin';

  .pass{
    padding-top:2rem;
  }
  input{
    outline: none;
    width:100%;
    height:2rem;
    line-height: 2rem;
    font-size: .7rem;
    padding-left:.5rem;
    color: #b2b2b2;
    background: rgba(0,0,0,0);
    border-bottom: 1px solid #e5e5e5;
    color: #4c4c4c;
  }
  ::-webkit-input-placeholder {
    color: #b2b2b2;
  }
  :-moz-placeholder {
    color: #b2b2b2;
  }
  ::-moz-placeholder {
    color: #b2b2b2;
  }
  :-ms-input-placeholder {
    color: #b2b2b2;
  }

</style>
