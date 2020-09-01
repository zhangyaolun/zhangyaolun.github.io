<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="scss">
    @import '@/styles/template.scss';

    .el-table {
        .el-table__header-wrapper {
            table {
                width: 100%;

                thead {
                    th {
                        color: #444;
                    }
                }
            }
        }

        .el-table__fixed-body-wrapper {
            top: 44px !important;
        }

        /*.el-table__body-wrapper {*/
        /*  border-left: 1px solid #eee;*/
        /*  border-right: 1px solid #eee;*/
        /*}*/
    }

    .el-card.is-always-shadow {
        box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
    }

    .pagination-container {
        overflow-x: auto;
        padding: 0px !important;
        text-align: right;
    }

    span.placeholder {
        margin-left: 10px;
        color: #909399;
        font-size: 12px;
    }

    .template-dialog_inner_title {
        width: 100%;
        text-align: center;
        font-size: 17px;
    }

</style>
