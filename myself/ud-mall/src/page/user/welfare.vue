<template>
  <div>
    <header-top :head-title="headTitle">
    </header-top>
    <div class="register">
      <div class="one" v-if="isforget">
        <div class="one-top">{{oneName}}, 您正在申请福利卡额度,</div>
        <div class="one-tishi">请确保您的福利卡余额足够</div>
        <div class="one-cont">
          <span>申请金额<input type="text" placeholder="请输入金额" class="phone"></span>
        </div>
        <div class="forget one-cont" >
          <span>验证码<input type="text" placeholder="请输入验证码" class="yanzheng"></span>
          <div class="forget-code"><img v-bind:src="codeImg" alt=""></div>
        </div>
      </div>
      <div class="one two" v-if="isTwo">
        <div class="imgtwo"><img v-bind:src="twoImg" alt=""></div>
        <div class="one-top">{{TwoPhone}}用户</div>
        <div class="one-tishi">您正在进行<span>福利卡绑定</span>操作</div>
        <div class="one-cont" v-for="item in twoList">
          <span class="clear">{{item.title}}
            <router-link :class="[item.isschool?'block':'hide']" :to="{path: '/schoolGroup',query: {title:'校区选择'}}" class="right schoolTitle">{{schoolTitle}}</router-link><input  :class="[item.isschool?'hide':'block']"  v-bind:type="item.type" v-bind:placeholder="item.holder" class="phone right">
          </span>
        </div>
        <div class="forget one-cont" >
          <span>验证码<input type="text" placeholder="请输入验证码" class="yanzheng"></span>
          <div class="forget-code"><img v-bind:src="codeImg" alt=""></div>
        </div>
      </div>
      <section @click="gotoSkip()" class="algin-one">提交</section>
    </div>
  </div>

</template>
<script>
  import headerTop from 'src/components/header/inside-head'
  import code from '../../images/code.png'
  import codeImg from '../../images/code-img.png';

  export default {

    data(){
      return{
        headTitle: "",
        isforget:false,
        isTwo:false,
        codeImg:code,
        twoImg:codeImg,
        schoolTitle:'请选择所属校区',
        Num:'',
        oneName:'上海宝山区张三',
        TwoPhone:'15800888666',
        twoList:[
          {
            title:'福利卡号',
            holder:'请输入福利卡号',
            type:'number',
            isschool:false
          },
          {
            title:'福利卡密',
            holder:'请输入福利卡密',
            type:'password',
            isschool:false
          },
          {
            title:'所属校区',
            holder:'请选择所属校区',
            type:'password',
            isschool:true
          },
          {
            title:'真实姓名',
            holder:'请输入真实姓名',
            type:'text',
            isschool:false
          },
          {
            title:'联系方式',
            holder:'请输入联系方式',
            type:'number',
            isschool:false
          }
        ]

      }
    },
    created(){
      this.headTitle = this.$route.query.title;
      this.Num = this.$route.query.welfarenum;
      if(this.$route.query.welfarenum == '1'){
          this.isforget = true;
      }else{
        this.isTwo = true;
      }
    },
    mounted(){

    },

    filters:{
      codeFilters:function (value) {
        return '￥'+parseFloat(value).toFixed(2);
      }
    },

    components:{
      headerTop
    },

    computed:{

    },

    methods:{
      gotoSkip(path){
        if(this.Num == '1'){
            console.log('申请提交')
        }else{
          console.log('绑定提交')
        }
        /*this.$router.push(path);*/
      }
    },
  }

</script>
<style lang="scss" scoped>
  @import '../../style/mixin';
  @import '../shop/conment';
  .block{
    width:75%;
    color: #b3b3b3;
  }
  .hide{
    width:0;
  }
  .register{
    padding-top: 2rem;
    margin-left:5%;
    .one{
      margin-top:1.2rem;
      font-size: .8rem;
      .one-top,.one-tishi{
        width:95%;
        text-align: center;
        line-height:1.6rem;
        color: #808080;
      }
      .one-tishi{
        margin-bottom: .8rem;
      }
      .one-cont{
        width:95%;
        height:2rem;
        background: #fff;
        border:1px solid #e5e5e5;
        margin:.5rem 0;
        padding-left: .5rem;
        span{
          display: inline-block;
          width:100%;
          height:2rem;
          color: #4c4c4c;
          line-height:2rem;
        }
      }
      .phone{
        width:80%;
        padding-right: .5rem;
        height:1.8rem;
        text-align:right;
      }
      .forget{
        margin-bottom:2rem;
        position: relative;
        span{
          display: inline-block;
          width:100%;
          height:2rem;
          .yanzheng{
            margin-left:.7rem;
            width:60%;
            height:1.8rem;
          }
        }
        .forget-code{
          position: absolute;
          right:0;
          top:0;
          height:1.1rem;
          margin:.45rem .5rem 0 0;
          border-left: 1px solid #e5e5e5;
          img{
            width:2rem;
            height:1.2rem;
            margin-left:.5rem;
          }
        }
      }
    }
    .two{
      margin-top:0rem;
      .schoolTitle{
        text-align: right;
        margin-right: .5rem;
        font-size: .75rem;
      }
      .imgtwo{
        width:95%;
        text-align: center;
        img{
          width: 2.25rem;
          height: 2.25rem;
          margin:1rem 0 .7rem 0;
        }

      }
      .one-tishi{
        span{
          color: #fe2772;
        }
      }
    }
    input{
      outline: none;
      color: #b3b3b3;
      padding-left: .5rem;
      font-size: .75rem;
      box-sizing: border-box;
    }
    ::-webkit-input-placeholder {
      color: #b3b3b3;
    }
    :-moz-placeholder {
      color: #b3b3b3;
    }
    ::-moz-placeholder {
      color: #b3b3b3;
    }
    :-ms-input-placeholder {
      color: #b3b3b3;
    }

  }

</style>
