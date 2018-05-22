<template>
	<div>
		<transition name="router-fade" mode="out-in">
        <router-view></router-view>
    	</transition>
    </div>
</template>
<script>
    import Bus from './config/eventbus.min.js';
    import {removeStore} from './config/mUtils'
  	export default {
      mounted(){
        Bus.addEventListener("gotoLogin",this.login);

      },
      methods: {
        login(){
          removeStore('login-phone');
          this.$router.push({path:'/login'});
        }
      }
  	}

</script>

<style lang="scss">
  @import './style/common';
	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}
</style>
