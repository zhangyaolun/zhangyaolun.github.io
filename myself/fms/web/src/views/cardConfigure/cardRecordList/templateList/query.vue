<template>

    <el-card class="box-card">
        <el-form :model="info" class="formQuery" label-width="130px" ref="listQueryForm">

            <el-form-item label="自定义批次号：" prop="brandNameCn">
                <el-input clearable placeholder="请输入自定义批次号" v-model="info.brandNameCn"/>
            </el-form-item>

            <el-form-item class="block" label="有效期间：" prop="time">
                <el-date-picker
                        :default-time="['00:00:00', '23:59:59']"
                        align="left"
                        end-placeholder="结束日期"
                        format="yyyy-MM-dd HH:mm:ss"
                        range-separator="至"
                        start-placeholder="开始日期"
                        type="datetimerange"
                        v-model="info.time"
                        value-format="timestamp">
                </el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-button @click="reset('listQueryForm')" plain size='small'>重置</el-button>
                <el-button @click="queryList" plain size='small' type="primary">查询</el-button>
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

