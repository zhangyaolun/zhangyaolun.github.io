
Component({
  options: {
    multipleSlots: true 
  },
  properties: {
    num: {           
      type: Number,     
      value: 0     
    }
  },
  methods:{
    bindcode: function (e) {
      this.triggerEvent('myevent', 22221) //myevent自定义名称事件，父组件中使用
    }
  }
  
})