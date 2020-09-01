<template>
    <el-card class="list-table">
        <el-table
                :data="tableData"
                ref="multipleTable"
        >
            <el-table-column fixed label="序号" type="index" width="50"/>
            <el-table-column align="center" label="商品编号" prop="barCode"/>
            <el-table-column align="center" label="商品名称" prop="productName"/>
            <el-table-column align="center" label="售价" prop="price"/>
            <el-table-column align="center" label="库存" prop="qty"/>
            <el-table-column align="center" label="锁定库存" prop="qty"/>
            <el-table-column :formatter="formatType" align="center" label="状态" prop="productNature"/>
            <el-table-column align="center" label="创建时间">
                <template slot-scope="scope">
                    {{ scope.row.createTime | formatBackendTime}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" prop="">
                <template slot-scope="scope">
                    <el-button @click="$emit('mod', {...scope.row})" size="mini" type="text">编辑</el-button>
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
            goodsStatus: {
                type: Object,
                required: true
            }
        },
        methods: {
            formatType(row) {
                return this.goodsStatus[row.productNature]
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>
