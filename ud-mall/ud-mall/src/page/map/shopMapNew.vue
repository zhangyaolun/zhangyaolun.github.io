<template>
  <div>
    <header-top :head-title="headTitle">
    </header-top>
    <div class="mapNew-main">
      <div class="mapNew-style">
        <span>收货人:</span>
        <input type="text" autofocus="autofocus" v-model="name">
      </div>
      <div class="mapNew-style">
        <span>联系方式:</span>
        <input type="text" v-model="moblie">
      </div>
      <section @click="open();" class="mapNew-style clear">
        <span>所在地区:</span>
        <img src="../../images/zhankai.png" alt="" class="right">
        <em class="right" v-for="item in pCodeCode">{{item}}</em>
      </section>
      <div class="mapNew-style">
        <span>详细地址:</span>
        <input type="text" v-model="address">
      </div>
      <div class="mapNew-default clear">
        <div class="default-left left">
          <em>设为默认地址</em>
          <div>注:每次下单时会使用该地址</div>
        </div>
        <span :class="[ mapNew? 'selected' : 'checked']" class="right" @click="mapNewclick"></span>
      </div>
    </div>
    <success-tips :successText="successText" v-if="showTips==true" :type="type" v-on:closeTip="closeTip">
    </success-tips>
    <section class="shopmap-new" @click="shopmapNew();">保存并使用</section>
    <div class="al-map" v-if="pickerMap">
      <div class="al-map2 ">
        <div class="cancel "  @click="close">取消</div>
        <div class="confrim " @click="confrim">确定</div>
        <mt-picker
          ref="picker2"
          :slots="slots"
          @change="onValuesChange"
        >
        </mt-picker>

      </div>
    </div>
  </div>



</template>
<script>
  import headerTop from 'src/components/header/inside-head'
  import successTips from 'src/components/common/success-tips'
  import {checkText} from 'src/components/common/mixin'
  import {insertDeliveryAddress,findFirstLevelAddress,findSubs,updateDeliveryAddress,searchUserDeliveryAddress,findByCode} from 'src/service/getData'

 /* import provinces from 'src/page/user/school'*/
  //import Picker from 'better-picker'

  export default {

    data(){
      return{
        headTitle: "",
        mapNew:false,
        pickerMap:false,
        showTips:false,
        province:'',
        ocity:'',
        area:'',
        pCodeCode:[],
        zip:'',
        successText:'',
        type:0,
        name:'',
        moblie:'',
        address:'',
        maptitle2:[],
        provinceCode:[],
        ocityCode:[],
        areaCode:[],
        otypeMap:'',
        oid:'',
        accountId:'',
        cityClick:'北京市,市辖区,东城区',
        shopPlacList:[],
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot4'
          }, {
            flex: 1,
            values: [],
            className: 'slot2',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot4'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          }
        ],
        picker:'',
        allMapList:''
      }
    },
    created(){
      this.headTitle = this.$route.query.title;
      this.otypeMap = this.$route.query.typeMap;
      this.oid = this.$route.query.edit;
      if(this.oid){
          searchUserDeliveryAddress().then(res => {
              if(res){
                res.result.forEach((v,k)=>{
                  if(v.id == this.oid){
                    this.name = v.name;
                    this.moblie =v.moblie;
                    this.address =v.address;
                    this.mapNew =v.isDefault;
                    this.accountId =v.accountId;
                    this.province = v.province,
                      this.ocity = v.city,
                      this.area = v.area,
                      findByCode(v.area).then(res => {
                          if(res){
                            this.pCodeCode.push(res.result.name)
                            findByCode(v.city).then(res => {
                                if(res){
                                  this.pCodeCode.push(res.result.name)
                                  findByCode(v.province).then(res => {
                                      if(res){
                                        this.pCodeCode.push(res.result.name)
                                      }
                                  })
                                }
                            })
                          }
                      })
                  }
                })
              }
          })
      }
      findFirstLevelAddress().then(res => {
          console.log(res)
        if(res){
          res.result.forEach((v,k)=>{
            this.slots[0].values.push(v.name)
            this.provinceCode.push(v.code)
          })
        }
      })
    },

    mounted(){


    },

    filters:{

    },

    components:{
      headerTop,
      successTips
    },

    computed:{

    },

    methods:{
      mapNewclick(){
        this.mapNew = !this.mapNew;
      },
      onValuesChange(picker, values) {
        if( picker.getValues()[0] && picker.getValues()[1] && picker.getValues()[2]){
          this.cityClick=picker.getValues()[0]+','+picker.getValues()[1]+','+picker.getValues()[2]
        }
          let proCode = '',oCode;
          if(this.slots[0].values.length > 0){
            proCode = this.provinceCode[this.slots[0].values.indexOf(picker.getValues()[0])] || 110000;
            this.province = proCode;
            findSubs(proCode).then(res => {
              if(res){
                this.slots[2].values=[];
                this.ocityCode = [];
                res.result.forEach((v,k)=>{
                  this.slots[2].values.push(v.name);
                  this.ocityCode.push(v.code);
                })
              }
            })
            if(this.slots[2].values.length > 0){
              oCode = this.ocityCode[this.slots[2].values.indexOf(picker.getValues()[1])];
              this.ocity = oCode;
              findSubs(oCode).then(res => {
                if(res){
                  this.slots[4].values=[];
                  this.areaCode = [];
                  res.result.forEach((v,k)=>{
                    this.slots[4].values.push(v.name)
                    this.areaCode.push(v.code)
                  })

                }
              })
            }
          }
        this.area = this.areaCode[this.slots[4].values.indexOf(picker.getValues()[2])];
      },
      open(picker) {
        this.pickerMap = true;
      },
      close() {
        this.pickerMap = false;
      },
      confrim(){
        this.pCodeCode = this.cityClick.split(',').reverse()
        this.pickerMap = false;
      },
      closeTip(){
        this.showTips=false;
      },
      shopmapNew(){
          console.log(this.name , this.province, this.moblie  ,this.address , this.ocity , this.area)
         if(this.name && this.province && this.moblie && this.address && this.ocity && this.area){
           if(!checkText.methods.checkPhone(this.moblie)&&!checkText.methods.checkFixedPhone(this.moblie)){
             this.successText='联系方式输入有误';
             this.showTips=true;
           }else{
              if(this.oid){
                updateDeliveryAddress(this.oid,this.accountId,this.name,this.moblie,this.mapNew,this.province,this.ocity,this.area,this.address).then(res => {
                 if(res){
                   if(this.otypeMap == 2){
                     let path = {path: '/shopPlac',query: {title:'订单确认',userDeliveryId:this.oid,opCodeCode:this.pCodeCode,name:this.name,moblie:this.moblie}}
                     this.$router.push(path);
                   }else{
                     let path = {path: '/shopMap',query: {title:'地址管理'}}
                     this.$router.push(path);
                   }
                 }
                })
              }else{
                this.httpADD(this.name,this.moblie,this.mapNew,this.province,this.ocity,this.area,this.address,this.zip);
              }
           }
          }else{
            this.successText='请完善信息';
            this.showTips=true;
          }
      },
      httpADD(name,moblie,isDefault,province,city,area,address,zip){
        insertDeliveryAddress(name,moblie,isDefault,province,city,area,address,zip).then(res => {
            if(res){
              if(this.otypeMap == 2){
                let path = {path: '/shopPlac',query: {title:'订单确认',userDeliveryId:res.result.id,opCodeCode:this.pCodeCode}}
                this.$router.push(path);
              }else{
                let path = {path: '/shopMap',query: {title:'地址管理'}}
                this.$router.push(path);
              }
            }

        })
      }


    },
  }

</script>
<style lang="scss" scoped>

  @import '../../style/mixin';
  em{
    font-style: normal;
  }
  @keyframes tipMove{
    0%   { transform: translateY(100%)}
    100% { transform: translateY(0) }
  }
  .al-map{
    background-color: rgba(0,0,0,0.7);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    .al-map2{
      position: absolute;
      bottom:0;
      left: 0;
      width: 100%;
      height:10rem;
      background: #fff;
      animation: tipMove .4s ;
    }
    .confrim{
      @include sc(.9rem, #e74a71);
      background-color: #ffffff;
      width: 48%;
      box-sizing: border-box;
      display: inline-block;
      text-align: center;
      margin:.5rem 0;
    }
    .cancel{
      @include sc(.9rem, #4187e8);
      background-color: #ffffff;
      box-sizing: border-box;
      border-right: 1px solid #ccc;
      display: inline-block;
      width: 50%;
      text-align: center;
    }
  }
  input{
    outline: none;
    width:15rem;
    height:2rem;
  }
  .mapNew-main{
    width:100%;
    height:33.3rem;
    background: #fff;
    padding-top: 2rem;
    font-size: .7rem;
    color: #333;
    .mapNew-style{
      padding-left: .5rem;
      height:2.4rem;
      width:100%;
      line-height:2.4rem;
      border-bottom: 1px solid #e5e5e5;
      img{
        width: .6rem;
        height: 1rem;
        padding: .7rem .5rem 0 0;
      }
    }
    .mapNew-default{
      padding-left: .5rem;
      height:2.5rem;
      margin-top: .3rem;
      line-height:1rem;
      border-bottom: 1px solid #e5e5e5;
     .default-left{
       div{
         color: #808080;
         font-size: .5rem;
       }
     }
      span{
        display: inline-block;
        width: 2.3rem;
        height: 1.3rem;
        background-size:2.3rem 1.3rem;
        margin:.4rem .5rem 0 0;
      }
    }
  }
  .checked{
    background: url("../../images/mapNew1.png") no-repeat ;
  }
  .selected{
    background: url("../../images/mapNew2.png") no-repeat ;
  }
  .shopmap-new{
    position: absolute;
    bottom:.5rem;
    left:15%;
    width:70%;
    height: 2rem;
    line-height:2rem;
    background: #de463a;
    color: #fff;
    text-align: center;
    font-size: .8rem;
    border-radius:5px;
  }
  .picker{
    height:50rem;
  }
</style>
