<template>
  <div class="hello">
    <div v-jspang="color">
      456
    </div>
  </div>
</template>

<script>
  import store from '../store/index'
  import { Alert,XButton } from 'vux';

  export default {
    data () {
      return {
        color:'blue',
      }
    },
    components: {
      Alert,
      XButton
    },
    created(){
      console.log(this.$store.state.count)
    }
  }
</script>

<style lang="scss" scoped="" type="text/css">
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
</style>
