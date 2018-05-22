<template>
  <header id='head_top'>
    <div class="search">
      购物车
    </div>
    <section @click="editclick" class="edit">
      {{title}}
    </section>
  </header>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import Bus from '../../config/eventbus.min.js';
  export default {
    data(){
      return{
        title:'',
        ashop:this.ashopEmpty
      }
    },
    mounted(){
      this.$nextTick(function () {
       this.oshopEmpty();
       })
      Bus.addEventListener("changedit",this.one);
    },
    props: ['ashopEmpty'],
    computed: {

    },
    watch:{

    },
    methods: {
      editclick(){
        Bus.dispatch("changeditclick");
        if(this.ashopEmpty==2)return;
        this.title=='编辑'?this.title = '完成':this.title = '编辑';
      },
      oshopEmpty(){
        let _this = this;

        let time = setInterval(function () {
          if(_this.ashopEmpty==1){
            _this.title = '';
          }else{
            _this.ashopEmpty==2?_this.title = '':_this.title = '编辑';
            clearInterval(time)
          }
        },500)
      },
      one(a){
        if(a.target==2){
          this.title = '';
        }
      },
    },

  }

</script>

<style lang="scss" scoped>
  @import '../../style/mixin';

  #head_top{
    background-image: url('../../images/header-bg.png');
    background-repeat: no-repeat;
    background-size: 100% 2rem;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    @include wh(100%, 2rem);
    font-size:0;
    line-height:2rem;
  }
  .search{
    font-size: .8rem;
    color: #fff;
    text-align: center;
  }
  .edit{
    position: absolute;
    right:.8rem;
    top:0;
    font-size: .65rem;
    color: #fadec4;
  }

</style>
