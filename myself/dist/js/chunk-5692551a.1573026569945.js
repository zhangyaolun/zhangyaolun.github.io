(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5692551a"],{"1ee8":function(e,t,i){"use strict";var s=i("d3c9"),n=i.n(s);n.a},"2cae":function(e,t,i){},"2ee6":function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"assemble-container"},[i("user-action",{on:{createClick:e.createClick}}),e._v(" "),i("user-list",{attrs:{"table-data":e.list},on:{resetPass:e.resetPass,resetProhibit:e.resetProhibit}}),e._v(" "),i("user-dialog",{ref:"userDialog",attrs:{userDialogVisible:e.userDialogVisible,info:e.userInfo},on:{"update:userDialogVisible":function(t){e.userDialogVisible=t},"update:user-dialog-visible":function(t){e.userDialogVisible=t},comfirm:e.comfirm}})],1)},n=[],r=(i("7f7f"),function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-card",{staticClass:"coupon-list-table"},[i("el-table",{ref:"multipleTable",attrs:{stripe:"",data:e.tableData}},[i("el-table-column",{attrs:{prop:"name",label:"员工姓名","min-width":"120"}}),e._v(" "),i("el-table-column",{attrs:{prop:"userName",label:"帐号","min-width":"120"}}),e._v(" "),i("el-table-column",{attrs:{prop:"userCode",label:"员工工号","min-width":"120"}}),e._v(" "),i("el-table-column",{attrs:{prop:"",label:"操作","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{type:"danger",plain:"",size:"mini"},on:{click:function(i){return e.$emit("resetPass",t.row)}}},[e._v("重置密码")]),e._v(" "),i("el-button",{attrs:{type:"danger",plain:"",size:"mini"},on:{click:function(i){return e.$emit("resetProhibit",t.row)}}},[e._v("禁用")])]}}])})],1)],1)}),a=[],o={props:{tableData:{type:Array,required:!0}}},l=o,u=(i("74d4"),i("2877")),c=Object(u["a"])(l,r,a,!1,null,"075f8c9a",null),f=c.exports,m=i("ee0f"),d=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-dialog",{staticClass:"user-dialog",attrs:{title:e.title,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t},close:function(t){return e.close("userInfoForm")}}},[i("el-form",{ref:"userInfoForm",attrs:{model:e.info,rules:e.rules,"label-width":"100px"}},[i("el-form-item",{attrs:{label:"员工姓名"}},[i("el-input",{attrs:{autocomplete:"off"},model:{value:e.info.name,callback:function(t){e.$set(e.info,"name",t)},expression:"info.name"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"员工账号"}},[i("el-input",{attrs:{autocomplete:"off"},model:{value:e.info.userName,callback:function(t){e.$set(e.info,"userName",t)},expression:"info.userName"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"密码"}},[i("el-input",{attrs:{autocomplete:"off",type:"password"},model:{value:e.info.password,callback:function(t){e.$set(e.info,"password",t)},expression:"info.password"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"员工编号"}},[i("el-input",{attrs:{autocomplete:"off"},model:{value:e.info.userCode,callback:function(t){e.$set(e.info,"userCode",t)},expression:"info.userCode"}})],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){return e.cancle("userInfoForm")}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.comfirm("userInfoForm")}}},[e._v("确 定")])],1)],1)},b=[],p={props:{info:{type:Object,required:!0},userDialogVisible:{type:Boolean,required:!0}},watch:{userDialogVisible:function(e){var t=this;this.dialogFormVisible=e,this.$nextTick((function(){t.$refs.userInfoForm.clearValidate()}))}},data:function(){return{dialogFormVisible:!1,title:"新增管理员",rules:{name:[{required:!0,message:"请输入员工姓名",trigger:"blur"}],userName:[{required:!0,message:"请输入员工账号",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}],userCode:[{required:!0,message:"请输入员工编号",trigger:"blur"}]}}},methods:{close:function(e){this.$refs[e].clearValidate(),this.$emit("update:userDialogVisible",!1)},cancle:function(e){this.$refs[e].resetFields(),this.$emit("update:userDialogVisible",!1),this.$emit("cancle")},comfirm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return!1;t.$emit("comfirm",t.info)}))}}},h=p,v=(i("b871"),Object(u["a"])(h,d,b,!1,null,null,null)),g=v.exports,$={components:{userList:f,userAction:m["default"],userDialog:g},data:function(){return{userDialogVisible:!1,loading:!1,userInfo:{name:"",userName:"",password:"",userCode:""}}},created:function(){this.fetchCouponList()},methods:{fetchCouponList:function(){this.loading=!1,this.list=[{userCode:1,name:"管理员",userName:"admin"},{userCode:2,name:"英语初级考试",userName:"小学英语初级考试"}]},resetPass:function(e){var t=this,i=e.name;this.$confirm("确认重置【 ".concat(i," 】的密码吗？")).then((function(e){t.$message.success("重置成功！")})).catch((function(e){}))},resetProhibit:function(e){var t=this,i=e.name;this.$confirm("确认禁用【 ".concat(i," 】的账户吗？")).then((function(e){t.$message.success("禁用成功！")})).catch((function(e){}))},createClick:function(){this.userDialogVisible=!0},comfirm:function(){var e=this;this.$confirm("确认提交吗？").then((function(t){e.$message.success("新增成功！")})).catch((function(e){}))}}},_=$,w=(i("fee2"),Object(u["a"])(_,s,n,!1,null,"b47727f8",null));t["default"]=w.exports},"74d4":function(e,t,i){"use strict";var s=i("bcbf"),n=i.n(s);n.a},8042:function(e,t,i){"use strict";var s=i("b006"),n=i.n(s);t["default"]=n.a},a9ed:function(e,t,i){},b006:function(e,t){},b871:function(e,t,i){"use strict";var s=i("2cae"),n=i.n(s);n.a},bcbf:function(e,t,i){},ca4e:function(e,t,i){"use strict";var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"coupon-list-action"},[i("el-row",[i("el-button",{staticClass:"right mr15",attrs:{type:"primary"},on:{click:function(t){return e.$emit("createClick")}}},[e._v("新增")])],1)],1)},n=[];i.d(t,"a",(function(){return s})),i.d(t,"b",(function(){return n}))},d3c9:function(e,t,i){},ee0f:function(e,t,i){"use strict";var s=i("ca4e"),n=i("8042"),r=(i("1ee8"),i("2877")),a=Object(r["a"])(n["default"],s["a"],s["b"],!1,null,"80208000",null);t["default"]=a.exports},fee2:function(e,t,i){"use strict";var s=i("a9ed"),n=i.n(s);n.a}}]);