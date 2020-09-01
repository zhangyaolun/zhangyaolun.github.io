<template>

    <el-card class="box-card">
        <el-form :model="info" class="formQuery" label-width="130px" ref="listQueryForm">
            <el-form-item label="渠道名称：" prop="brandNameCn">
                <el-input clearable placeholder="请输入渠道名称" v-model="info.brandNameCn"/>
            </el-form-item>
            <el-form-item label="APP_ID：" prop="brandNameCn">
                <el-input clearable placeholder="请输入APP_ID" v-model="info.brandNameCn"/>
            </el-form-item>
            <el-form-item>
                <el-button @click="reset('listQueryForm')" plain size='small'>重置</el-button>
                <el-button @click="queryList" plain size='small' type="primary">查询</el-button>
                <el-button @click="() => $emit('add')" plain size='small' type="success">新增</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
    export default {
        props: {
            info: {
                type: Object,
                required: true
            }
        },
        data() {
            return {}
        },
        methods: {
            reset(formName) {
                this.$refs[formName].resetFields()
                this.$emit('query', 'rest')
            },
            queryList() {
                this.$emit('query')
            }
        }
    }
</script>

