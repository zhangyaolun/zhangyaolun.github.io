<template>
    <el-card class="list-table">
        <el-table
                :data="tableData"
                ref="multipleTable"
        >
            <el-table-column fixed label="序号" type="index" width="50"/>
            <el-table-column align="center" label="渠道名称" prop="brandNameCn"/>
            <el-table-column align="center" label="APP_ID" prop="brandNameCn"/>
            <el-table-column align="center" label="APP_KEY" prop="brandNameCn"/>
            <el-table-column align="center" label="状态" prop="brandNameCn"/>
        </el-table>
        <pagination :limit.sync="listQuery.everyPage" :page.sync="listQuery.currentPage" :total="listQuery.total"
                    @pagination="$emit('query')" v-show="listQuery.total > 0"/>
    </el-card>
</template>

<script>
    import Pagination from '@/components/Pagination'

    export default {
        components: {
            Pagination,
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
        }
    }
</script>
<style lang="scss" scoped>

</style>
