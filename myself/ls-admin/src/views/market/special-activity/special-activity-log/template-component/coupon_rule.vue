<template>
  <div class="bundle-bind-form">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{title}}</span>
      </div>
        <el-table :data="couponList">
          <el-table-column label="赠送礼券ID" width="150" prop="couponId">
          </el-table-column>
          <el-table-column label="赠送礼券名称" width="220" prop="couponName">
          </el-table-column>
          <el-table-column label="领取库存" width="140" prop="inventoryQty">
          </el-table-column>
          <el-table-column label="剩余库存" width="80">
            <template slot-scope="scope">
              <span>{{scope.row.inventoryQty - scope.row.salesedQty}}</span>
            </template>
          </el-table-column>
          <el-table-column label="新增库存" width="140" prop="additionalQty">
          </el-table-column>
          <el-table-column label="可领取时间" width="480">
            <template slot-scope="scope">
              <div class="useDate">
                <span>{{scope.row.beginTime | formatBackendTime}}</span>
              </div>
              <div class="line useDateLine">-</div>
              <div class="useDate">
                <span>{{scope.row.endTime | formatBackendTime}}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ['title', 'couponList']
}
</script>

<style lang="scss" scoped>
.bundle-bind-form {
  margin: 20px;
  .useDate{
    width: 140px;
    display: inline-block;
    text-align: center;
  }
  .useDateLine{
    width: 20px;
    display: inline-block;
    text-align: center;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 200px;
  }
}
</style>
