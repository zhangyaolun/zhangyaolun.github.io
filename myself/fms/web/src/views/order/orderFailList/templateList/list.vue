<template>
    <el-card class="list-table">
        <el-table
                :data="tableData"
                ref="multipleTable"
        >
            <el-table-column fixed label="序号" type="index" width="50"/>
            <el-table-column align="center" label="订单号" prop="orderNo" width="180px"/>
            <el-table-column align="center" label="商品名称" min-width="100px" prop="productName"/>
            <el-table-column align="center" label="渠道名称" prop="channelName" width="160px"/>
            <el-table-column align="center" label="购买数量" min-width="100px" prop="itemCount"/>
            <el-table-column align="center" label="联系方式" min-width="100px" prop="phone"/>
            <el-table-column align="center" label="总价" min-width="100px" prop="orderTotal"/>
            <el-table-column :formatter="formatType" align="center" label="订单类型" prop="orderStatus" width="160px"/>
            <el-table-column align="center" label="创建时间" width="160px">
                <template slot-scope="scope">{{ scope.row.createTime | formatBackendTime}}</template>
            </el-table-column>
            <el-table-column align="center" label="失败日志" min-width="100px" prop="orderTotal"/>
            <el-table-column align="center" label="操作" prop="">
                <template slot-scope="scope">
                    <el-button @click="$emit('reissue', {...scope.row})" size="mini" type="text">补发</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination :limit.sync="listQuery.everyPage" :page.sync="listQuery.currentPage" :total="listQuery.total"
                    @pagination="$emit('query')" v-show="listQuery.total > 0"/>
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
            listQuery: {
                type: Object,
                required: true
            },
            channelOrderType: {
                type: Object,
                required: true
            }
        },
        methods: {
            formatType(row) {
                return this.channelOrderType[row.orderStatus]
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>
