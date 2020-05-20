<template>
  <el-card class="list-table">
    <el-table
      ref="table"
      :data="tableData"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        :selectable='checkboxDisabled'
        width="55">
      </el-table-column>
      <el-table-column prop="id" label="广告ID" min-width="80"/>
      <el-table-column prop="bannerType" label="发布区分" min-width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.bannerType | bannerTypeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" min-width="120"/>
      <el-table-column prop="companyRegionList" label="地区区分" min-width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.companyRegionList | companyRegionListFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="redirectUrl" label="URL" min-width="130"/>
      <el-table-column label="公开时间" min-width="170">
        <template slot-scope="scope">
          <span>{{ scope.row.openBeginDtStr | timeFilter}}</span> ~
          <span>{{ scope.row.openEndDtStr | timeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="displayType" label="显示位置区分" min-width="140">
        <template slot-scope="scope">
          <span>{{ displayTypeTitle(scope.row.displayType) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="openFlg" label="公开状态" min-width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.openFlg | openFlgFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button class="ml10" size="mini" type="primary" @click="$emit('mod', {id: scope.row.id, publishFlg: scope.row.publishFlg})">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="$emit('fetch')" />
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination
  },
  props: {
    tableData: {
      type: Array,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    listQuery: {
      type: Object,
      required: true
    }
  },
  computed: {
    displayTypeOptions () {
      return this.$store.getters.pltadminBannerDisplayTypeList
    },
    displayTypeTitle () {
      return function (val) {
        let attr = this.displayTypeOptions.filter(v => {
          return v.displayType === val
        })
        return attr.length > 0 ? attr[0].displayName : val === 'minaHomeActivityAd' ? '小程序首页活动' : ''
      }
    }
  },
  filters: {
    bannerTypeFilter (val) {
      let Obj = {
        0: '平台',
        1: '商家'
      }
      return Obj[val]
    },
    companyRegionListFilter (val) {
      if (!val) return ''
      let companyRegion = ''
      val.forEach(v => {
        companyRegion += v.regionBlockName + ' '
      })
      return companyRegion
    },
    timeFilter (val) {
      return val ? val.substring(0, 4) + '/' + val.substring(4, 6) + '/' + val.substring(6, 8) : ''
    },
    openFlgFilter (val) {
      let Obj = {
        0: '公开',
        1: '不公开'
      }
      return Obj[val]
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.$emit('handleSelectionChange', val)
    },
    checkboxDisabled (row, index) {
      if (row.openFlg === 0) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.list-table{
  .ml10{margin: 2px 5px !important;display: inline-block}
  .pagination-container{
    padding: 0px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
