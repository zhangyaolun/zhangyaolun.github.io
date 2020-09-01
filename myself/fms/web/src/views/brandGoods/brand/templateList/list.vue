<template>
    <el-card class="list-table">
        <el-table
                :data="tableData"
                ref="multipleTable"
        >
            <el-table-column fixed label="序号" type="index" width="50"/>
            <el-table-column align="center" label="品牌名称" prop="brandNameCn"/>
            <el-table-column align="center" label="品牌图片" prop="name">
                <template slot-scope="scope">
                    <img-show :src="scope.row.logo" :srcList="scope.row.logo"></img-show>
                </template>
            </el-table-column>
            <el-table-column align="center" label="创建日期">
                <template slot-scope="scope">
                    {{ scope.row.createTime | formatBackendTime}}
                </template>
            </el-table-column>
        </el-table>
        <pagination :limit.sync="listQuery.everyPage" :page.sync="listQuery.currentPage" :total="listQuery.total"
                    @pagination="$emit('query')" v-show="listQuery.total > 0"/>
    </el-card>
</template>

<script>
    import Pagination from '@/components/Pagination'
    import ImgShow from '@/components/Image/imgShow'

    export default {
        components: {
            Pagination,
            ImgShow
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
