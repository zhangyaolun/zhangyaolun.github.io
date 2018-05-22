<template>
  <div>
    <div class="stringMap" v-if="gendercheckbox">
      <div class="stringMap-main">
        <div class="stringMap-top">
          <div class="gender" >
            <input type="radio" value="男" id="man" name="one" @change="handleFileChange" v-model="inputVlue"><label for="man" class="man">男</label>
            <input type="radio" value="女" id="woman" name="one" @change="handleFileChange"  v-model="inputVlue"><label for="woman">女</label>
          </div>
        </div>
        <div class="stringMap-bot clear">
          <section class="left cancel" @click="cancel">取消</section>
          <section @click="gotoSkip()" class="popupsting">{{sectionTit}}</section>
        </div>
      </div>

    </div>
  </div>

</template>
<script>
  import {mapState, mapActions} from 'vuex'

  export default {

    data(){
      return{
        gendercheckbox:true,
        sectionTit:'确定',
        inputVlue:'男',
        check:true,
      }
    },
    created(){
      this.gendercheckbox = true;
    },
    props: ['sexValue'],
    mounted(){
      this.inputVlue=this.sexValue;
    },

    components:{

    },

    computed:{

    },

    methods:{
      gotoSkip(){
        this.$emit('inputRadioVlaue',this.inputVlue)
      },
      cancel(){
        this.$emit('closeMail')
      },
      handleFileChange(e){
          this.inputVlue = e.target.value;
      }
    },
  }

</script>
<style lang="scss" scoped>
  @import '../../style/mixin';
  .inputName{
    outline: none;
    width:80%;
    height:2rem;
    color: #808080;
    padding-left:.3rem;
    background: rgba(0,0,0,0);
    border:1px solid  #e5e5e5;
  }
  .gender{
    font-size: .8rem;
    color: #333;
    input{
      margin-right: .5rem;
      outline: none;
    }
    .man{
      margin-right: 3rem;
    }
  }
  ::-webkit-input-placeholder {
      color: #808080;
    }
  :-moz-placeholder {
    color: #808080;
  }
  ::-moz-placeholder {
    color: #808080;
  }
  :-ms-input-placeholder {
    color: #808080;
  }

  .stringMap{
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    width:100%;
    height:100%;
    z-index: 9999;
    background: rgba(0,0,0,.6);
    .stringMap-main{
      width:86%;
      height:6.8rem;
      position: absolute;
      top:10rem;
      left:7%;
      background: #fff;
      border-radius: 8px;
      font-size: .75rem;
      text-align: center;
      .stringMap-top{
        height:4.8rem;
        line-height: 4.8rem;
        color: #4c4c4c;
        border:1px solid #e5e5e5;
        border-top-left-radius:8px;
        border-top-right-radius:8px;
      }
      .stringMap-bot{
        width:100%;
        height:2rem;
        line-height:2rem;
        .cancel{
          width:50%;
          height:2rem;
          display: inline-block;
          color: #808080;
        }
        .popupsting{
          display: inline-block;
          color: #fff;
          width:50%;
          height:2.1rem;
          display: inline-block;
          background: #de453a;
          font-style: normal;
          border-bottom-right-radius:6px;
        }
      }
    }
  }
</style>
<!--
,
{
path: '/personal',
component: personal,
children:[
{
path:'/personal/passMailGroup',
component:passMailGroup,
}
]
}
,
{
path: '/passMail',
component: passMail,
}
,
{
path: '/shopPopup',
component: shopPopup,
}-->
<!--
const personal = r => require.ensure([], () => r(require('../page/user/personal')), 'personal')
const passMail = r => require.ensure([], () => r(require('../page/user/pass-mail')), 'passMail')
const shopPopup = r => require.ensure([], () => r(require('../page/map/popup')), 'shopPopup')
const passMailGroup = r => require.ensure([], () => r(require('../page/user/passMail-group')), 'passMailGroup')-->
