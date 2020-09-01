<template>
    <section>
        <el-upload
                :action="uploadUrl()"
                :before-upload="beforeAvatarUpload"
                :class="{hideUpload: bundle.imageBigList.length >= limit}"
                :file-list="bundle.imageBigList"
                :headers="headers"
                :limit="limit" :on-success="bigFileSuccess"
                list-type="picture-card">
            <i class="el-icon-plus" slot="default"></i>
            <div slot="file" slot-scope="{file}">
                <img
                        :src="file.url"
                        alt="" class="el-upload-list__item-thumbnail"
                >
                <span class="el-upload-list__item-actions">
                  <span
                          @click="handlePictureCardPreview(file)"
                          class="el-upload-list__item-preview"
                  >
                    <i class="el-icon-view"></i>
                  </span>
                  <span
                          @click="handleRemove(file)"
                          class="el-upload-list__item-delete"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
            </div>
        </el-upload>

        <el-dialog
                :visible.sync="dialogVisible"
                append-to-body
                center
                width="40%"
        >
            <img :src="dialogImageUrl" alt="" width="100%">
        </el-dialog>

    </section>
</template>

<script>
    export default {
        props: {
            bundle: {
                type: Object,
                required: true
            },
            limit: {
                type: Number,
                default: 1
            },
            size: {
                type: Number,
                default: 2
            }
        },
        computed: {
            headers() {
                return {
                    //'Authentication-Admin-Web-Token': getToken()
                }
            }
        },
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false
            }
        },
        methods: {
            bigFileSuccess(res) {
                console.log(res)
                let {fileDomain, result} = res
                this.bundle.imageBigList.push({url: `${fileDomain}${result}`})
                this.$store.dispatch('app/setLoading', false)
            },
            uploadUrl: function () {
                return `${window.location.origin}/qtoolsOms/upload/img`
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url
                this.dialogVisible = true
            },
            handleRemove(file) {
                this.bundle.imageBigList = this.bundle.imageBigList.filter(v => {
                    return v.url !== file.url
                })
            },
            beforeAvatarUpload(file) {
                this.$store.dispatch('app/setLoading', true)
                let _type = file.type.toLowerCase()
                let isJPG = /^image\/(jpg|png|jpeg)$/.test(_type)
                const isLt2M = file.size / 1024 / 1024 <= this.size

                if (!isJPG) {
                    this.$store.dispatch('app/setLoading', false)
                    this.$message.error('上传图片仅支持JPG/PNG格式')
                }
                if (!isLt2M) {
                    this.$store.dispatch('app/setLoading', false)
                    this.$message.error('上传图片大小不能超过 2MB!')
                }
                // const isSize = new Promise((resolve, reject) => {
                //   let width = 400
                //   let height = 400
                //   let _URL = window.URL || window.webkitURL
                //   let img = new Image()
                //   img.onload = function () {
                //     let valid = +img.width === width && +img.height === height
                //     valid ? resolve() : reject()
                //   }
                //   img.src = _URL.createObjectURL(file)
                // }).then(() => {
                //   return file
                // }, () => {
                //   this.$store.dispatch('assemble/setLoadingData', false)
                //   this.$message.error('上传的图片尺寸为400*400')
                //   return Promise.reject()
                // })
                return isJPG && isLt2M
            }
        }
    }
</script>

<style lang="scss">
    .el-upload-list__item {
        transition: none !important;
    }

    .hideUpload .el-upload--picture-card {
        display: none !important;
    }
</style>
