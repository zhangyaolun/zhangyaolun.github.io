 <template>
    <div class="alet_container" @click="cancel">
	    <section class="tip_text_container">
            <div class="tip_text">{{alertText}}</div>
            <div class="confrim" @click="confrim">确定</div>
            <div class="cancel" @click="cancel">取消</div>
        </section>
    </div>
</template>

<script>
    export default {
    	data(){
            return{
                positionY: 0,
                timer: null,
            }
        },
        mounted(){

        },
        props: ['alertText'],
        methods: {
            confrim(){
              this.$emit('confrimTip')
            },
            cancel(){
              this.$emit('cancelTip')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
	@keyframes tipMove{
       0%   { transform: translateY(100%)}
       100% { transform: translateY(0) }
    }
    .alet_container{
      background-color: rgba(0,0,0,0.7);
    	position: fixed;
    	top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 200;
    }
    .tip_text_container{
        position: absolute;
        bottom:0;
        left: 50%;
        margin-left: -45%;
        width: 90%;
        animation: tipMove .4s ;
        border: 1px;
        padding-top: .6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border: 1px;
        border-radius: 0.25rem;
        .tip_icon{
            @include wh(3rem, 3rem);
            border: 0.15rem solid #f8cb86;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            span:nth-of-type(1){
                @include wh(.12rem, 1.5rem);
                background-color: #f8cb86;
            }
            span:nth-of-type(2){
                @include wh(.2rem, .2rem);
                border: 1px;
                border-radius: 50%;
                margin-top: .2rem;
                background-color: #f8cb86;
            }
        }
        .tip_text{
            @include sc(.6rem, #808080);
            width: 100%;
            height:1.8rem;
            line-height: 1.8rem;
            text-align: center;
            background-color: #ffffff;
            border-top-left-radius: 0.25rem;
            border-top-right-radius: 0.25rem;
        }
        .confrim{
         @include sc(.9rem, #e74a71);
           background-color: #ffffff;
           width: 100%;
           text-align: center;
           height:2.2rem;
           line-height: 2.2rem;
           border-top: 1px solid #e5e5e5;
           border-bottom-left-radius: 0.25rem;
           border-bottom-right-radius: 0.25rem;
         }
        .cancel{
          @include sc(.9rem, #4187e8);
          background-color: #ffffff;
          width: 100%;
          text-align: center;
          margin-top: .3rem;
          margin-bottom: .5rem;
          height:2rem;
          line-height: 2rem;
          border-top: 1px solid #e5e5e5;
          border-radius: 0.25rem;
        }
    }

</style>
