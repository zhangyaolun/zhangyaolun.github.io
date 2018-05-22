 <template>
    <div class="alet_container">
	    <section class="tip_text_container">
            <div class="tip_icon" :class="{'icon-success':issuccess,'icon-false':isfalse}">
                <span></span>
                <span></span>
            </div>
            <p class="tip_text">{{successText}}</p>
        </section>
    </div>
</template>

<script>
    export default {
    	data(){
            return{
                positionY: 0,
                timer: null,
                closed:false,
                issuccess:true,
                isfalse:false
            }
        },
        created(){
          setTimeout(() => {
            this.closeTip();
          }, 1500);
        },
        mounted(){
          if(this.type == 0){
            this.issuccess=false;
            this.isfalse=true
          }
        },
        props: ['successText','type'],
        methods: {
            closeTip(){
                this.$emit('closeTip')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
	@keyframes tipMove{
       0%   { transform: scale(1) }
       35%  { transform: scale(.8) }
       70%  { transform: scale(1.1) }
       100% { transform: scale(1) }
    }
    .alet_container{
    	position: fixed;
    	top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
    }
    .tip_text_container{
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -6rem;
        margin-left: -3.5rem;
        width: 7rem;
        animation: tipMove .4s ;
        background-color: rgba(0,0,0,.7);
        border: 1px;
        padding-top: 1rem;
        padding-bottom: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border: 1px;
        border-radius: 0.25rem;
        .tip_icon{
            @include wh(1.65rem, 1.65rem);
            background-size:1.65rem 1.65rem;
        }
        .icon-success{
          background-image: url('../../images/success-icon.png');
        }
        .icon-false{
          background-image: url('../../images/login-false.png');
        }
        .tip_text{
            @include sc(.75rem, #333);
            line-height: .9rem;
            text-align: center;
            margin-top: .75rem;
            padding: 0 .4rem;
            color: #fff;
        }
        .confrim{
            @include sc(.8rem, #fff);
            font-weight: bold;
            margin-top: .8rem;
            background-color: #4cd964;
            width: 100%;
            text-align: center;
            line-height: 1.8rem;
            border: 1px;
            border-bottom-left-radius: 0.25rem;
            border-bottom-right-radius: 0.25rem;
        }
    }

</style>
