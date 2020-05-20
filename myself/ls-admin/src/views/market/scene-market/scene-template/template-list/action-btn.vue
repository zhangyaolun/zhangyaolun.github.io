<template>
  <div class="list-action">
    <el-row>
      <el-dropdown class="avatar-container right mr15" trigger="click">
        <div class="avatar-wrapper">
          <el-button type="primary" size="medium">
            新建营销
            <i class="el-icon-caret-bottom" />
          </el-button>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item>
            <router-link to="/backend/sceneMarket/secneCreate">客群营销</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/backend/sceneMarket/timingCreate">定时营销</router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
.list-action{

  margin-bottom: 20px;
  margin-top: 10px;
  .right{
    float: right;
  }
  .mr15{
    margin-right: 15px;
  }
}
</style>
