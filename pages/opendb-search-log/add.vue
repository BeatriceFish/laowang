<template>
  <view class="uni-container">
    <uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
      <uni-forms-item name="brand" label="品牌">
        <uni-data-checkbox v-model="formData.brand" :localdata="formOptions.brand_localdata"></uni-data-checkbox>
      </uni-forms-item>
	  <uni-forms-item name="device_uuid" label="型号">
        <uni-easyinput placeholder="设备型号" v-model="formData.device_uuid"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="color" label="颜色">
        <uni-easyinput placeholder="颜色" v-model="formData.color"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="ram" label="内存">
        <uni-easyinput placeholder="内存" v-model="formData.ram"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="price" label="价格">
        <uni-easyinput placeholder="价格" v-model="formData.price"></uni-easyinput>
      </uni-forms-item>
      
      <view class="uni-button-group">
        <button type="primary" class="uni-button" @click="submit">提交</button>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { validator } from '../../js_sdk/validator/opendb-search-log.js';

  const db = uniCloud.database();
  const dbCollectionName = 'opendb-search-log';

  function getValidator(fields) {
    let result = {}
    for (let key in validator) {
      if (fields.indexOf(key) > -1) {
        result[key] = validator[key]
      }
    }
    return result
  }

  

  export default {
    data() {
      let formData = {
        "brand": 0,
        "color": "",
        "ram": "",
        "price": "",
        "device_uuid": ""
      }
      return {
        formData,
        formOptions: {
          "brand_localdata": [
            {
              "text": "苹果",
              "value": 0
            },
            {
              "text": "华为",
              "value": 1
            },
            {
              "text": "荣耀",
              "value": 2
            },
            {
              "text": "小米",
              "value": 3
            },
            {
              "text": "红米",
              "value": 4
            },
            {
              "text": "OPPO",
              "value": 5
            },
            {
              "text": "VIVO",
              "value": 6
            },
            {
              "text": "iQOO",
              "value": 7
            },
            {
              "text": "Realme",
              "value": 8
            },
            {
              "text": "其他",
              "value": 9
            }
          ]
        },
        rules: {
          ...getValidator(Object.keys(formData))
        }
      }
    },
    onReady() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      
      /**
       * 验证表单并提交
       */
      submit() {
        uni.showLoading({
          mask: true
        })
        this.$refs.form.validate().then((res) => {
          return this.submitForm(res)
        }).catch(() => {
        }).finally(() => {
          uni.hideLoading()
        })
      },

      /**
       * 提交表单
       */
      submitForm(value) {
        // 使用 clientDB 提交数据
        return db.collection(dbCollectionName).add(value).then((res) => {
          uni.showToast({
            icon: 'none',
            title: '新增成功'
          })
          this.getOpenerEventChannel().emit('refreshData')
          setTimeout(() => uni.navigateBack(), 500)
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        })
      }
    }
  }
</script>

<style>
  .uni-container {
    padding: 15px;
  }

  .uni-input-border,
  .uni-textarea-border {
    width: 100%;
    font-size: 14px;
    color: #666;
    border: 1px #e5e5e5 solid;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .uni-input-border {
    padding: 0 10px;
    height: 35px;

  }

  .uni-textarea-border {
    padding: 10px;
    height: 80px;
  }

  .uni-button-group {
    margin-top: 50px;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    justify-content: center;
  }

  .uni-button {
    width: 184px;
  }
</style>
