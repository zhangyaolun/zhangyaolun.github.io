<template>
    <el-card class="list-table">
        <el-table
                :data="tableData"
                ref="multipleTable"
        >
            <el-table-column fixed label="序号" type="index" width="50"/>
            <el-table-column align="center" label="商品编号" prop="brandNameCn"/>
            <el-table-column align="center" label="商品名称" prop="brandNameCn"/>
            <el-table-column align="center" label="批次号" prop="brandNameCn"/>
            <el-table-column align="center" label="数量" prop="brandNameCn"/>
            <el-table-column align="center" label="到期时间">
                <template slot-scope="scope">
                    {{ scope.row.createTime | formatBackendTime}}
                </template>
            </el-table-column>
            <el-table-column :formatter="formatType" align="center" label="状态" prop="orderStatus"/>
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
            cardType: {
                type: Object,
                required: true
            }
        },
        methods: {
            formatType(row) {
                return this.cardType[row.orderStatus]
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>
