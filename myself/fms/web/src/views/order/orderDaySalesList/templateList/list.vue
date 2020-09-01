<template>
    <el-card class="list-table">
        <el-table
                :data="tableData"
                ref="multipleTable"
        >
            <el-table-column fixed="left" label="序号" type="index" width="50"/>
            <el-table-column label="订单数量" prop="orderNo" width="350"/>
            <el-table-column align="center" label="商品数量" prop="productName" width="350"/>
            <el-table-column align="center" label="金额" prop="skuCode" width="350"/>
            <el-table-column align="center" label="渠道名称" prop="channelName" width="350"/>
            <el-table-column align="center" label="创建时间" width="350">
                <template slot-scope="scope">{{ scope.row.createTime | formatBackendTime}}</template>
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
            }
        },
        methods: {}
    }
</script>
<style lang="scss" scoped>

</style>
