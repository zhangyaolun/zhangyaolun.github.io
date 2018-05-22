<template>
    <div @click="send">
    	{{main_title}}
    </div>
</template>

<script>
  
  export default {
  	data(){
      return {
        main_title:'折后价',
      }
    },
    methods:{
    	send:function(){
           // 发送给父的方法 
           this.$emit('child-get','hellow kitty')
    	}
    }
  }
 </script>