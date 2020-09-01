<template>
  <div class="test-viewport">
    about
    <div class="ignore">
      {{name}}
    </div>
  </div>

</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'Home',
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    mounted() {
      this.$store.dispatch('app/setName', 333)
      console.log(this.$store.state)
    }
  }
</script>
<style lang="scss" scoped>
  .test-viewport {
    width: 100px;
    height: 100px;
    font-size: 40px;
    text-align: center;
    line-height: 100px;
    background: #13b5b1;
    .ignore{
      color: red;
      width: 50px;
    }
  }
</style>
