<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>
  </div>
</template>


<script>
import PanelGroup from './components/PanelGroup'



export default {
  name: 'dashboard-admin',
  components: {
    PanelGroup
  },
  data() {
    return {
      
    }
  },
  created(){
  	this.$store.dispatch('setLanguage', 'zh')
  },
  methods: {
    handleSetLineChartData(type) {
      
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
