<template>
  <section>
    <el-popover
      ref="popover"
      placement="bottom"
      width="246"
      v-model="visible" v-if="!show">
      <div class="colorList">
        <span :class="i" v-for="(i, k) in colorList" :key="k" @click="colorClick(i)">
        </span>
      </div>
<!--      <div style="text-align: right; margin: 0">-->
<!--        <el-button size="mini" type="text" @click="visible = false">取消</el-button>-->
<!--        <el-button type="primary" size="mini" @click="visible = false">确定</el-button>-->
<!--      </div>-->
    </el-popover>
    <el-button v-popover:popover class="colorListSelect" :class="backgroundColor"></el-button>
  </section>
</template>

<script>
export default {
  props: ['backgroundColor', 'show'],
  data () {
    return {
      visible: false,
      colorList: ['Color010', 'Color020', 'Color030', 'Color040', 'Color050', 'Color060', 'Color070', 'Color080', 'Color090', 'Color100']
    }
  },
  methods: {
    colorClick (i) {
      this.visible = false
      this.$emit('update:backgroundColor', i)
    }
  }
}
</script>

<style lang="scss" scoped>
  .colorList span{display: inline-block;width: 40px;height: 40px;border-radius: 2px;margin: 0 5px 0 0;position: relative}
  .Color010{background: #63B359;}
  .Color020{background: #2c9f67;}
  .Color030{background: #509fc9;}
  .Color040{background: #5885cf;}
  .Color050{background: #9062c0;}
  .colorList .Color050{margin: 0 0 0 0;}
  .Color060{background: #d09a45;}
  .Color070{background: #e4b138;}
  .Color080{background: #ee903c;}
  .Color090{background: #dd6549;}
  .Color100{background: #cc463d;}
  .colorList .Color100{margin: 0 0 0 0;}
  .colorListSelect{width: 40px;height: 40px;border-radius: 2px;}
</style>
