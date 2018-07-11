 <template>
    <div class="alet_container" @click.stop="cancel" >
	    <section class="tip_text_container">
        <div class="cateList">
          <section  ref="cateL" :class="[{'active':getActive(cate.categoryCode,index)},'cateItem']" v-for="(cate,index) in cateList" @click.stop="changeFCate(cate.categoryCode,index)">
            <span>{{cate.categoryName}}</span>
          </section>
        </div>
        <div class="cateRight" >
          <div ref="cateRs"  v-for="(cateS,x) in cateList[selectedIndex].list" @click.stop="changeSCate(cateS,x)">
            <div :class="[{'cate-active': getSActive(cateS.categoryCode,x)},'cateSTitle']">{{cateS.categoryName}}</div>
            <div ref="cateR"  :class="[{'active': getTActive(cateT.categoryCode,i)},'cateItem']"  v-for="(cateT,i) in cateS.list" @click.stop="changeTCate(cateT,cateS)">
              <span>{{cateT.categoryName}}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
    export default {
    	data(){
            return{
              selectedIndex:0,
              selectedSIndex:0,
              selectedTIndex:0,
            }
        },
        mounted(){
          this.$refs.cateL[this.selectedIndex].scrollIntoView()
          this.$refs.cateRs[this.selectedSIndex].scrollIntoView()
        },
        props: ['cateList','selectedFCate','selectedSCate','selectedTCate'],
        methods: {
          changeSecCategory(obj){
            this.$emit('getTCate',obj);
          },
          changeTrdCategory(obj){
            this.$emit('getProData',obj);
          },
          cancel(){
            this.$emit('cancel');
          },
          getActive(code,index){
            if(this.selectedFCate==code){
              this.selectedIndex=index;
              return true;
            }
            return false;
          },
          getSActive(code,index){
            if(this.selectedSCate==code){
              this.selectedSIndex=index;
              return true;
            }
            return false;
          },
          getTActive(code,index){
            if(this.selectedTCate==code){
              this.selectedTIndex=index;
              return true;
            }
            return false;
          },
          changeFCate(code,index){
            this.selectedIndex=index;
            this.$emit('changeFcate',code);
          },
          changeSCate(obj,index){
            this.selectedSIndex=index;
            this.$emit('changeScate',obj);
          },
          changeTCate(obj,obja){
            this.$emit('getProData',obj,this.selectedFCate,obja.categoryCode);
          }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
	@keyframes tipMove{
       0%   { transform: translateY(-5%)}
       100% { transform: translateY(0) }
    }
    body{
      position: fixed;
      width: 100%;
    }
    .alet_container{
      background-color: rgba(0,0,0,0.5);
    	position: fixed;
    	top: 4rem;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 111;
    }
    .tip_text_container{
        width: 100%;
        height:14rem;
        background: #ffffff;
        animation: tipMove .4s ;
        border: 1px;
        font-size:0;
        z-index:999;
        .cateList{
          position: relative;
          display: inline-block;
          vertical-align: middle;
          width: 25%;
          height:100%;
          overflow-y:auto;
          .cateItem{
            height: 2rem;
            width: 100%;
            color: #4c4c4c;
            font-size: .6rem;
            text-align: center;
            line-height: 2rem;
            border-bottom: 1px solid #e5e5e5;
            border-right: 1px solid #e5e5e5;
          }
          .active{
            border-right: 1px solid #f7f7f7;
            background: #f7f7f7;
          }
        }
        .cateRight{
          position: relative;
          display: inline-block;
          vertical-align: middle;
          width: 75%;
          height: 100%;
          background: #f7f7f7;
          overflow-y:auto;
          .cateSTitle{
            background-color: #f9e3e9;
            color: #ea4473;
            font-weight: bold;
            font-size: .6rem;
            height:1.2rem;
            margin: .45rem .45rem auto .45rem;
            line-height: 1.2rem;
            padding-left: .5rem;
          }
          .cate-active{
            background-color: #ea4473;
            color: #ffffff;
          }
          .cateItem{
            display: inline-block;
            width: 33.3333%;
            height:2rem;
            text-align: center;
            align-items: center;
            overflow:hidden;
            span{
              display: block;
              border-radius: 2px;
              border:1px solid #d9d9d9;
              height: 1.2rem;
              line-height: 1.2rem;
              width: 80%;
              margin: .4rem auto;
              color: #b2b2b2;
              font-size: .5rem;
            }

          }
          .active{
            span{
              color: #ea4473;
            }
          }
        }
    }

</style>
