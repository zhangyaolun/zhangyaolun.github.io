<template>
    <div class="block">
        <el-image
                :preview-src-list="imgList"
                :src="imgSrc"
        >
            <div class="image-slot" slot="error">
                <i class="el-icon-picture-outline"></i>
            </div>
        </el-image>
    </div>
</template>

<script>
    export default {
        name: 'ImgShow',
        props: ['src', 'srcList'],
        computed: {
            imgSrc() {
                return this.src ? this.urlPath(this.src) : ''
            },
            imgList() {
                if (typeof this.srcList === 'string') {
                    return [this.urlPath(this.srcList)]
                } else if (typeof this.srcList === 'object' && this.srcList) {
                    let attr = []
                    this.srcList.map(v => attr.push(this.urlPath(v)))
                    return attr
                }
                return []
            }
        },
        methods: {
            urlPath(url) {
                return `https://qtltestfiles.oss-cn-shanghai.aliyuncs.com/${url}`
            }
        }
    }
</script>

<style scoped>
    .block {
        width: 80px;
        min-height: 80px;
        text-align: center;
        background: #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
    }

</style>
