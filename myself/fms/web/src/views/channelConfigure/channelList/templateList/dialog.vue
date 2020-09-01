<template>
    <el-dialog :before-close="() => $emit('update:visible',false)" :title="title" :visible.sync="visible" @close="close()"
               class="template-dialog">
        <el-form :model="info" :rules="rules" label-width="130px" ref="form">

            <el-form-item label="渠道名称：" prop="brandNameCn">
                <el-input autocomplete="off" clearable placeholder="请输入渠道名称" v-model="info.brandNameCn"/>
            </el-form-item>

            <el-form-item label="APP_ID：" prop="brandNameCn">
                <el-input autocomplete="off" clearable placeholder="请输入APP_ID" v-model="info.brandNameCn"/>
            </el-form-item>

            <el-form-item label="APP_KEY：" prop="brandNameCn">
                <el-input autocomplete="off" clearable placeholder="请输入APP_KEY" v-model="info.brandNameCn"/>
            </el-form-item>

        </el-form>

        <confirm-dialog :innerVisible.sync="innerVisible"
                        @comfirm="()=>{ $emit('update:visible', false); $emit('comfirm') }"></confirm-dialog>

        <div class="dialog-footer" slot="footer">
            <el-button @click="close()">取 消</el-button>
            <el-button @click="comfirm()" type="primary">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import confirmDialog from "@/components/Dialog/confirmDialog/index"

    export default {
        components: {
            confirmDialog
        },
        props: {
            visible: {
                type: Boolean,
                required: true
            },
            info: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                innerVisible: false,
                rules: {
                    brandNameCn: [
                        {required: true, message: '请输入品牌名称', trigger: 'blur'},
                    ],
                    // sysObj: [
                    //   { validator: validateSysObj, trigger: 'change' },
                    // ],
                }
            }
        },
        computed: {
            title() {
                return {
                    'create': '新增商品',
                    'edit': '编辑商品',
                }[this.info.type]
            }
        },
        methods: {
            close() {
                this.$refs['form'].clearValidate()
                this.$emit('update:visible', false)
            },
            comfirm() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.innerVisible = true
                    } else {
                        return false
                    }
                })
            }
        }
    }
</script>

