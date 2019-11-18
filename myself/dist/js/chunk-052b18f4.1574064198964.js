(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-052b18f4"],{"137c":function(t,e,o){"use strict";var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",[t.imageList?o("el-upload",{class:{hideUpload:t.imageList.length>=1},attrs:{action:t.uploadUrl(),"list-type":"picture-card",limit:1,"file-list":t.imageList,"on-remove":t.handleRemove,"on-success":t.bigFileSuccess}},[o("i",{staticClass:"el-icon-plus",attrs:{slot:"default"},slot:"default"})]):t._e()],1)},a=[],n={props:{listName:{type:String,required:!0},list:{type:Array,required:!0},bundle:{type:Object,required:!0}},data:function(){return{imageList:this.list||[]}},methods:{bigFileSuccess:function(t,e){var o=this;this.imageList.push({url:t.result}),setTimeout((function(){o.$emit("loading",!1)}),600)},uploadUrl:function(){return"/api/upload/file"},handleRemove:function(t){if(this.imageList=this.imageList.filter((function(e){return e.url!=t.url})),"bookPicList"==this.listName)this.$set(this.bundle,"bookPicList",[]);else{var e=this.listName.substr(this.listName.length-1,1);this.$set(this.bundle.bookCat[e],"bookCatList",[])}}}},s=n,l=(o("c72b"),o("2877")),r=Object(l["a"])(s,i,a,!1,null,null,null);e["a"]=r.exports},"6b00":function(t,e,o){"use strict";var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-card",{staticClass:"box-card action-add-info"},[o("el-form",{ref:"ruleForm",attrs:{model:t.info,rules:t.rules,"label-width":"150px"}},[o("el-form-item",{attrs:{label:"课程名称：",prop:"bookName"}},[o("el-input",{staticClass:"name-input",attrs:{maxlength:"30",placeholder:"请输入课程名称",disabled:"detail"==t.info.pageType},model:{value:t.info.bookName,callback:function(e){t.$set(t.info,"bookName",e)},expression:"info.bookName"}}),t._v(" "),o("span",{staticClass:"placeholder"},[t._v("课程名称文字长度不能超过30个字（包含30个）")])],1),t._v(" "),o("el-form-item",{staticClass:"form-desc-item",staticStyle:{width:"600px"},attrs:{label:"课程简介：",prop:"bookDetail"}},[o("el-input",{attrs:{type:"textarea",autosize:{minRows:6,maxRows:40},disabled:"detail"==t.info.pageType},model:{value:t.info.bookDetail,callback:function(e){t.$set(t.info,"bookDetail",e)},expression:"info.bookDetail"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"课程封面图：",prop:"bookPic"}},["create"==t.info.pageType||"mod"==t.info.pageType?o("upload-img",{attrs:{list:t.info.bookPicList,listName:"bookPicList",bundle:t.info},on:{"update:list":function(e){return t.$set(t.info,"bookPicList",e)},"update:bundle":function(e){t.info=e}}}):t._e(),t._v(" "),"detail"==t.info.pageType?o("section",[o("img",{staticClass:"uploadImg",attrs:{src:t.info.bookPic,alt:""}})]):t._e(),t._v(" "),o("span",{staticStyle:{color:"#909399","font-size":"12px"}},[t._v("仅支持JPG/PNG格式，图片要求小于等于2MB")])],1)],1)],1)},a=[],n=o("137c"),s={props:{info:{type:Object,required:!0},load:{type:Boolean,required:!0}},components:{uploadImg:n["a"]},watch:{"info.bookPicList":{handler:function(t){t.length>0?this.$set(this.info,"bookPic",t[0].url):this.$set(this.info,"bookPic","")},immediate:!0,deep:!0}},data:function(){return{rules:{bookName:[{required:!0,message:"请输入课程名称",trigger:"blur"}]}}},methods:{loading:function(t){this.$emit("update:load",t)}}},l=s,r=(o("fb4f"),o("2877")),c=Object(r["a"])(l,i,a,!1,null,"7912c5d4",null);e["a"]=c.exports},"6f08":function(t,e,o){},"709b":function(t,e,o){},a0ae:function(t,e,o){"use strict";var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-card",{staticClass:"box-card action-add-info"},[t.info?o("el-form",{ref:"ruleForm",attrs:{model:t.info,rules:t.rules,"label-width":"150px"}},t._l(t.info.bookCat,(function(e,i){return o("section",{key:i,staticStyle:{"margin-bottom":"30px","border-bottom":"1px dashed #e6ebf5"}},[t.info.bookCat.length>1&&"detail"!=t.info.pageType?o("el-button",{attrs:{type:"danger",plain:"",size:"small"},on:{click:function(e){return t.$emit("coursePlayDel",i)}}},[t._v("删除")]):t._e(),t._v(" "),o("el-form-item",{attrs:{label:"小节名称："}},[o("el-input",{staticClass:"name-input",attrs:{maxlength:"30",placeholder:"请输入小节名称",disabled:"detail"==t.info.pageType},model:{value:e.cat,callback:function(o){t.$set(e,"cat",o)},expression:"items.cat"}}),t._v(" "),o("span",{staticClass:"placeholder"},[t._v("小节名称文字长度不能超过30个字（包含30个）")])],1),t._v(" "),o("el-form-item",{attrs:{label:"小节视频："}},["create"==t.info.pageType||"mod"==t.info.pageType?o("upload-img",{attrs:{list:e.bookCatList,listName:"bookCatList"+i,bundle:t.info},on:{"update:list":function(o){return t.$set(e,"bookCatList",o)},"update:bundle":function(e){t.info=e}}}):t._e(),t._v(" "),"detail"==t.info.pageType?o("section",[o("img",{staticClass:"uploadImg",attrs:{src:e.pics,alt:""}})]):t._e()],1)],1)})),0):t._e(),t._v(" "),o("el-button",{attrs:{type:"primary",plain:"",size:"medium",disabled:"detail"==t.info.pageType},on:{click:function(e){return t.$emit("coursePlayAdd")}}},[t._v("添加")])],1)},a=[],n=(o("ac6a"),o("137c")),s={props:{info:{type:Object,required:!0},load:{type:Boolean,required:!0}},components:{uploadImg:n["a"]},watch:{"info.bookCat":{handler:function(t){"string"!==typeof t&&t.forEach((function(t,e){t.bookCatList&&t.bookCatList.length>0?t.bookCatList[0].url.toLowerCase().indexOf(".png")||t.bookCatList[0].url.toLowerCase().indexOf(".jpg")||t.bookCatList[0].url.toLowerCase().indexOf(".jpeg")?t.pic=t.bookCatList[0].url:t.url=t.bookCatList[0].url:(t.pic="",t.url="")}))},immediate:!0,deep:!0}},data:function(){return{rules:{cat:[{required:!0,message:"请输入课程名称",trigger:"blur"}]}}},methods:{loading:function(t){this.$emit("update:load",t)}}},l=s,r=(o("a319"),o("2877")),c=Object(r["a"])(l,i,a,!1,null,"e5b08ebc",null);e["a"]=c.exports},a319:function(t,e,o){"use strict";var i=o("6f08"),a=o.n(i);a.a},bd79:function(t,e,o){},c118:function(t,e,o){"use strict";var i=o("709b"),a=o.n(i);a.a},c72b:function(t,e,o){"use strict";var i=o("d1cf"),a=o.n(i);a.a},cabd:function(t,e,o){"use strict";o.d(e,"c",(function(){return a})),o.d(e,"b",(function(){return n})),o.d(e,"a",(function(){return s})),o.d(e,"d",(function(){return l}));var i=o("b775");function a(t){return Object(i["a"])({url:"/api/book/searchBookByBookName",method:"get",params:t})}function n(){return Object(i["a"])({url:"/api/book/searchBook",method:"post"})}function s(t){return Object(i["a"])({url:"/api/book/insertBook",method:"post",data:t})}function l(t){return Object(i["a"])({url:"/api/book/searchBookById",method:"get",params:t})}},d17d:function(t,e,o){"use strict";o.r(e);var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"assemble-create-wrapper"},[o("action-info",{attrs:{info:t.info,load:t.loading},on:{"update:info":function(e){t.info=e},"update:load":function(e){t.loading=e}}}),t._v(" "),o("template-play",{attrs:{info:t.info,load:t.loading},on:{"update:info":function(e){t.info=e},"update:load":function(e){t.loading=e}}}),t._v(" "),o("action-btn")],1)},a=[],n=(o("ac6a"),o("6b00")),s=o("a0ae"),l=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"action-btn"},[o("el-button",{on:{click:t.submitFalse}},[t._v("返回")])],1)},r=[],c=(o("28a5"),{data:function(){return{routerPath:""}},mounted:function(){this.routerPath=window.location.href.split("#")[1]},methods:{submitFalse:function(){this.$store.dispatch("tagsView/delVisitedView",{path:this.routerPath}),this.$router.push({path:"/courseList"})}}}),u=c,d=(o("c118"),o("2877")),f=Object(d["a"])(u,l,r,!1,null,"e296e690",null),p=f.exports,b=o("cabd"),m={components:{actionInfo:n["a"],templatePlay:s["a"],actionBtn:p},data:function(){return{loading:!0,info:{pageType:"detail",bookName:"",bookDetail:"",bookPic:"",bookPicList:[],bookCat:[{cat:"",pic:"",url:"",bookCatList:[],pics:""}]},bookId:""}},mounted:function(){this.bookId=this.$route.params.id,this.fetch()},methods:{fetch:function(){var t=this;Object(b["d"])({bookId:this.bookId}).then((function(e){t.info=Object.assign(t.info,e.result),t.info.bookPicList=[],t.$set(t.info,"bookPicList",[{url:t.info.bookPic}]),t.info.bookCat&&(t.info.bookCat=JSON.parse(t.info.bookCat),t.info.bookCat.forEach((function(t){t.pics=t.pic?t.pic:t.url?t.url:"",t.bookCatList=[{url:t.pics}]}))),t.loading=!1})).catch((function(e){t.loading=!1,t.$message.error(e.message)}))}}},h=m,k=Object(d["a"])(h,i,a,!1,null,null,null);e["default"]=k.exports},d1cf:function(t,e,o){},fb4f:function(t,e,o){"use strict";var i=o("bd79"),a=o.n(i);a.a}}]);