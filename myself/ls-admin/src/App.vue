<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
.el-table {
  .el-table__header-wrapper{
    table{
      width: 100%;
      thead{
        th{
          color: rgb(102, 102, 102);
          background: rgb(238, 238, 238);
        }
      }
    }
  }
  .el-table__body-wrapper{
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
  }
}
.pagination-container{
  padding: 0px !important;
  display: flex;
  justify-content: flex-end;
}
span.placeholder{
  color: #909399;
  font-size: 12px;
}
</style>
