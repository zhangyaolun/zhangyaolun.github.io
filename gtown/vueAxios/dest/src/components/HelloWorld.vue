<template>
  <div class="hello">
    <x-button type="warn" @click.native="buttons()">跳转</x-button>
    <x-button type="warn" @click.native="button()">Delete</x-button>
    <div class="vux-circle-demo">
      <div style='width:100px;height:100px;'>
        <x-circle
          :percent="percent"
          :stroke-width="6"
          :trail-width="6"
          :stroke-color="['#36D1DC', '#5B86E5']"
          trail-color="#ececec">
          <span style="color:#36D1DC">{{ percent }}%</span>
        </x-circle>
      </div>
      <img src="../img/aa.png" alt="">
    </div>

    <spinner type="lines" size="40px"></spinner>

    <x-button @click.native="showPosition()" type="primary">Top</x-button>
    <toast v-model="showPositionValue" type="text" :time="800" is-show-mask text="Hello World" position="bottom" ></toast>

  </div>
</template>


<script>
  import { mapGetters } from 'vuex'
  import { allParentMenu,loginByUsername } from '../service/getData'
  import { Alert,XButton,XCircle,numberComma,querystring,trim,Spinner,Toast } from 'vux';

  export default {
    data () {
      return {
        color:'green',
        percent: 90,
        showPositionValue:false,
        userInfo:{
          username: 'admin',
          password: '123456',
          rememberMe:'true'
        }

      }
    },
    computed: {
      ...mapGetters([
        'count',
      ])
    },
    components: {
      Alert,
      Toast,
      XButton,
      XCircle,
      Spinner
    },
    created(){
      console.log(this.$store)
      console.log(querystring.parse(window.location.href.split('?')[1]).n)
      console.log(numberComma(2132.234))
      let aa = ' 123 ';
      console.log(aa.length)
      let bb = trim(aa);
      console.log(bb.length)
      // setInterval(()=>{
      //   this.percent++;
      // },300)
      loginByUsername(this.userInfo).then(response => {
        console.log(response)
      }).catch(error => {
        reject(error)
      })
      allParentMenu().then(response => {
        console.log(response)
      }).catch(error => {
        reject(error)
      })
    },
    methods:{
      showPosition () {
        this.showPositionValue = true
      },
      buttons(){
        let path = {path: '/Hell'};
        this.$router.push(path);
      },
      button(){
        //store.dispatch('increments')
        console.log(this.$store)
        console.log(this.$store.state.a.num)
        console.log(this.$store.state.b.count)
        //console.log(this.$store.getters.count)
      }
    }
  }
</script>

<style lang="less" scoped="" type="text/css">
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.vux-circle-demo {
  padding-top: 40px;
  text-align: center;
}
.vux-circle-demo > div {
  margin: 0 auto;
}
</style>
