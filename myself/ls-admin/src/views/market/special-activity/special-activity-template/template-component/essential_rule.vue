<template>
  <el-card class="box-card action-add-info">
    <div slot="header" class="clearfix">基本信息</div>
    <el-form ref="ruleForm" :model="info" :rules="rules" label-width="200px">
      <el-form-item label="活动ID：" prop="id" v-show="info.pageType !== 'create'">
        <el-input class="name-input" v-model="info.id" disabled/>
      </el-form-item>
      <el-form-item label="活动名称：" prop="title">
        <el-input class="name-input" v-model="info.title" placeholder="请输入活动名称"/>
        <span class="promptingDefalut">例：门店扫码获得礼券</span>
      </el-form-item>
      <el-form-item label="活动时间：" prop="beginTime">
        <el-col class="useDate">
          <el-date-picker v-model="info.beginTime" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" type="datetime" placeholder="选择开始时间" @change="changeStartTime"/>
        </el-col>
        <el-col class="line useDateLine">-</el-col>
        <el-col class="useDate">
          <el-date-picker v-model="info.endTime" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" type="datetime"  placeholder="选择结束时间" @change="changeEndTime"/>
        </el-col>
      </el-form-item>
      <el-form-item label="公开时间：" prop="displayDateFrom" v-show="info.activityUnicom === 3">
        <el-col class="useDate">
          <el-date-picker v-model="info.displayDateFrom" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" type="datetime" placeholder="选择开始时间" @change="changeDisplayDateFrom"/>
        </el-col>
        <el-col class="line useDateLine">-</el-col>
        <el-col class="useDate">
          <el-date-picker v-model="info.displayDateTo" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" type="datetime" placeholder="选择结束时间" @change="changeDisplayDateTo"/>
        </el-col>
      </el-form-item>
      <el-form-item label="活动类型：" prop="activityUnicom">
        <el-radio-group v-model="info.activityUnicom" @change="activityUnicomChange">
          <el-radio
            v-for="item in activityUnicomOptions"
            :key="item.value"
            :label="item.value" :disabled="item.value === 1 || item.value === 2">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="会员范围：" prop="userType">
        <el-radio-group v-model="info.userType">
          <el-radio
            v-for="item in userTypeOptions"
            :key="item.value"
            :label="item.value" >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="屏蔽常规活动：" prop="prohibitFlg">
        <el-radio-group v-model="info.prohibitFlg">
          <el-radio
            v-for="item in prohibitFlgOptions"
            :key="item.value"
            :label="item.value" >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="赠送范围：" prop="activityType">
        <el-radio-group v-model="info.activityType">
          <el-radio
            v-for="item in activityTypeOptions"
            :key="item.value"
            :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="礼券赠送种类：" prop="couponSendType">
        <el-radio-group v-model="info.couponSendType">
          <el-radio
            v-for="item in couponSendTypeOptions"
            :key="item.value"
            :label="item.value" >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
<!--      <el-form-item label="赠送积分数：" prop="point">-->
<!--        <el-input class="name-input" v-model="info.point" maxlength="8" @input="provingNum('point')"/>-->
<!--        <span class="promptingDefalut">请输入1-99999999范围的正整数</span>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="领取积分人数限制：" prop="pointLimitNum">-->
<!--        <el-input class="name-input" v-model="info.pointLimitNum" maxlength="8" @input="provingNum('pointLimitNum')"/>-->
<!--        <span class="promptingDefalut">1-99999999范围，例：设定50时，领取人数不超过50，不设定则代表不限制人数</span>-->
<!--      </el-form-item>-->
      <el-form-item label="活动KEY：" prop="activityKey">
        <el-input class="name-input" v-model="info.activityKey" />
      </el-form-item>
      <el-form-item label="公开状态：" prop="publishFlg">
        <el-radio-group v-model="info.publishFlg" :disabled="+info.publishFlgOld === 0">
          <el-radio
            v-for="item in publishFlgOptions"
            :key="item.value"
            :label="item.value" >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <section v-show="info.activityUnicom === 3">
        <el-form-item label="活动券显示位置(px)：" prop="couponShowOffset">
          <el-input class="name-input" v-model="info.couponShowOffset" @input="provingNum('couponShowOffset')"/>
        </el-form-item>
        <el-form-item label="活动图片：" prop="imagePathList">
          <upload-img :imageName="'imagePathList'"></upload-img>
          <span class="promptingDefalut">为保证图片清晰度，请上传尺寸=宽度702px以上*高度248px以上，大小在2MB以下，格式=JPG,JPEG,PNG的图片文件</span>
        </el-form-item>
        <el-form-item label="活动详情背景图：" prop="backgroundImage">
          <upload-img :imageName="'backgroundImage'"></upload-img>
          <span class="promptingDefalut">为保证图片清晰度，请上传尺寸=宽度800px*高度不限，大小在2MB以下，格式=JPG,JPEG,PNG的图片文件</span>
        </el-form-item>
        <el-form-item label="券类型：" prop="couponType">
          <el-radio-group v-model="info.couponType" :disabled="+info.publishFlgOld === 0">
            <el-radio
              v-for="item in couponTypeOptions"
              :key="item.value"
              :label="item.value" >{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否推送服务通知：" prop="pushFlg">
          <el-radio-group v-model="info.pushFlg">
            <el-radio
              v-for="item in pushFlgOptions"
              :key="item.value"
              :label="item.value" >{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="优惠券背景图(背景图状态)：" prop="couponImageList">
          <section v-show="info.couponType === 'SINGLE'">
            <section class="inlineBlock couponBackgroundImage" v-for="(item, index) in info.couponImage" :key="item.name">
              <span class="placeholder">{{item.name}}</span>
              <upload-backgroundstatus :imageName="'couponImage'" :index="index"></upload-backgroundstatus>
            </section>
          </section>
          <section v-show="info.couponType === 'MANY'">
            <section class="inlineBlock couponBackgroundImage" v-for="(item, index) in info.couponImageMore" :key="item.name">
              <span class="placeholder">{{item.name}}</span>
              <upload-backgroundstatus :imageName="'couponImageMore'" :index="index"></upload-backgroundstatus>
            </section>
          </section>
        </el-form-item>
      </section>
    </el-form>
  </el-card>
</template>

<script>
import uploadImg from "./uploadImg"
import uploadBackgroundstatus from "./upload_backgroundStatus"
export default {
  components: {
    uploadImg,
    uploadBackgroundstatus
  },
  computed: {
    info () {
      return this.$store.getters.specialActivityInfo
    }
  },
  data () {
    let valdisplayBeginEndTime = (rule, value, callback) => {
      if (this.info.beginTime && this.info.endTime) {
        callback()
      } else {
        callback(new Error('请选择时间'))
      }
    }
    let valdisplayDisplayDateFromTo = (rule, value, callback) => {
      if (this.info.activityUnicom === 3) {
        if (this.info.displayDateFrom && this.info.displayDateTo) {
          callback()
        } else {
          callback(new Error('请选择时间'))
        }
      } else {
        callback()
      }
    }
    let valdisplayBackgroundImage = (rule, value, callback) => {
      if (this.info.activityUnicom === 3) {
        if (this.info.backgroundImage) {
          callback()
        } else {
          callback(new Error('请上传活动详情背景图'))
        }
      } else {
        callback()
      }
    }
    return {
      activityUnicomOptions: [
        { label: '外部投放', value: 0 },
        // { label: '联通', value: 1 },
        // { label: '合作对接', value: 2 },
        { label: '内部活动', value: 3 }
      ],
      activityTypeOptions: [
        // { label: '全赠送', value: 0 },
        { label: '只送礼券', value: 1 }
        // { label: '只送积分', value: 2 }
      ],
      couponSendTypeOptions: [
        { label: '全发送', value: 0 },
        { label: '随机一种', value: 1 }
      ],
      userTypeOptions: [
        { label: '全会员', value: 0 },
        { label: '新会员', value: 1 },
        { label: '老会员', value: 2 }
      ],
      prohibitFlgOptions: [
        { label: '不屏蔽', value: 0 },
        { label: '屏蔽所有', value: 1 }
      ],
      publishFlgOptions: [
        { label: '公开', value: 0 },
        { label: '不公开', value: 1 }
      ],
      couponTypeOptions: [
        { label: '单张', value: 'SINGLE' },
        { label: '多张', value: 'MANY' }
      ],
      pushFlgOptions: [
        { label: '不推送', value: 0 },
        { label: '推送', value: 1 }
      ],

      rules: {
        'title': [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        'beginTime': [{ required: true, validator: valdisplayBeginEndTime, trigger: 'blur' }],
        'displayDateFrom': [{ required: true, validator: valdisplayDisplayDateFromTo, trigger: 'blur' }],
        'activityUnicom': [{ required: true }],
        'userType': [{ required: true }],
        'prohibitFlg': [{ required: true }],
        'activityType': [{ required: true }],
        'couponSendType': [{ required: true }],
        'publishFlg': [{ required: true }],
        'couponShowOffset': [{ required: true, message: '请输入活动券显示位置', trigger: 'blur' }],
        'backgroundImage': [{ required: true, validator: valdisplayBackgroundImage, trigger: 'blur' }],
      }
    }
  },
  methods: {
    changeStartTime (value) {
      if (this.info.endTime) {
        if (+value >= +this.info.endTime) {
          this.$set(this.info, 'beginTime', '')
          this.$message.error('活动开始时间要小于活动结束时间')
          return
        }
      }
      if (this.info.changeDisplayDateFrom && +this.info.activityUnicom === 3) {
        if (+value < +this.info.changeDisplayDateFrom) {
          this.$set(this.info, 'beginTime', '')
          this.$message.error('活动开始时间要大于等于公开开始时间')
          return
        }
      }
      if (this.info.couponList.length > 0) {
        if (this.info.couponList[0].beginTime && +value > +this.info.couponList[0].beginTime) {
          this.$set(this.info, 'beginTime', '')
          this.$message.error('活动开始时间要小于最早可领取时间')
        }
      }
    },
    changeEndTime (value) {
      if (this.info.beginTime) {
        if (+value <= +this.info.beginTime) {
          this.$set(this.info, 'endTime', '')
          this.$message.error('活动结束时间要大于活动开始时间')
          return
        }
      }
      if (this.info.displayDateTo && +this.info.activityUnicom === 3) {
        if (+value > +this.info.displayDateTo) {
          this.$set(this.info, 'endTime', '')
          this.$message.error('活动结束时间要小于等于公开结束时间')
          return
        }
      }
      if (this.info.couponList.length > 0) {
        let index = this.info.couponList.length
        if (this.info.couponList[index - 1].endTime && +value < +this.info.couponList[index - 1].endTime) {
          this.$set(this.info, 'endTime', '')
          this.$message.error('活动结束时间要大于等于最晚可领取时间')
        }
      }
    },
    changeDisplayDateFrom (value) {
      if (this.info.displayDateTo) {
        if (+value >= +this.info.displayDateTo) {
          this.$set(this.info, 'displayDateFrom', '')
          this.$message.error('公开开始时间要小于公开结束时间')
          return
        }
      }
      if (this.info.beginTime) {
        if (+value > +this.info.beginTime) {
          this.$set(this.info, 'displayDateFrom', '')
          this.$message.error('公开开始时间要小于活动开始时间')
        }
      }
    },
    changeDisplayDateTo (value) {
      if (this.info.displayDateFrom) {
        if (+value <= +this.info.displayDateFrom) {
          this.$set(this.info, 'displayDateTo', '')
          this.$message.error('公开结束时间要大于公开开始时间')
          return
        }
      }
      if (this.info.endTime) {
        if (+value < +this.info.endTime) {
          this.$set(this.info, 'displayDateTo', '')
          this.$message.error('公开结束时间要大于等于活动结束时间')
        }
      }
    },
    provingNum (name) {
      let _val = this.info[name].replace(/[^0-9]/g, '')
      this.$set(this.info, name, _val !== '' ? parseInt(_val) : '')
    },
    activityUnicomChange (val) {
      if (+val === 0) {
        this.info.displayDateFrom = ''
        this.info.displayDateTo = ''
      }
    }
  }
}

</script>
<style lang="scss" scoped>
  .action-add-info{
    .el-form-item{
      margin-bottom: 18px !important;
    }
    margin: 20px;
    .useDate{
      width: 220px;
      display: inline-block;
    }
    .useDateLine{
      width: 40px;
      display: inline-block;
      text-align: center;
    }
    .uploadImg{
      border: 1px solid #c0ccda;
      border-radius: 6px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 148px;
      height: 148px;
      margin: 0 8px 8px 0;
      display: inline-block;
    }
    .max-nums-input, .name-input{
      width: 30%;
      margin-right: 10px;
    }
    .couponBackgroundImage{
      width: 25%;
      text-align: center;
    }
    .placeholder{
      display: block;
      color: #909399;
      font-size: 13px;
      height: 20px;
      margin-bottom: 20px;
    }
  }
</style>
