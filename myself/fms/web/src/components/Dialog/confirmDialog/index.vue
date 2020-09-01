<template>
    <el-dialog
            :before-close="() => $emit('update:innerVisible', false)"
            :visible.sync="innerVisible"
            append-to-body
            center
            width="20%">
        <div class="template-dialog_inner_title">确定此操作 ？</div>
        <div class="dialog-footer" slot="footer">
            <el-button @click="$emit('update:innerVisible', false)">取 消</el-button>
            <el-button @click="$emit('update:innerVisible', false), $emit('comfirm')" type="primary">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: 'confirmDialog',
        props: {
            innerVisible: {
                type: Boolean,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
