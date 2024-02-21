"use strict";
const common_vendor = require("../../common/vendor.js");
const js_sdk_validator_opendbSearchLog = require("../../js_sdk/validator/opendb-search-log.js");
const db = common_vendor.Ds.database();
const dbCollectionName = "opendb-search-log";
function getValidator(fields) {
  let result = {};
  for (let key in js_sdk_validator_opendbSearchLog.validator) {
    if (fields.indexOf(key) > -1) {
      result[key] = js_sdk_validator_opendbSearchLog.validator[key];
    }
  }
  return result;
}
const _sfc_main = {
  data() {
    let formData = {
      "brand": 0,
      "color": "",
      "ram": "",
      "price": "",
      "device_uuid": ""
    };
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
    };
  },
  onLoad(e) {
    if (e.id) {
      const id = e.id;
      this.formDataId = id;
      this.getDetail(id);
    }
  },
  onReady() {
    this.$refs.form.setRules(this.rules);
  },
  methods: {
    /**
     * 验证表单并提交
     */
    submit() {
      common_vendor.index.showLoading({
        mask: true
      });
      this.$refs.form.validate().then((res) => {
        return this.submitForm(res);
      }).catch(() => {
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    },
    /**
     * 提交表单
     */
    submitForm(value) {
      return db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
        common_vendor.index.showToast({
          icon: "none",
          title: "修改成功"
        });
        this.getOpenerEventChannel().emit("refreshData");
        setTimeout(() => common_vendor.index.navigateBack(), 500);
      }).catch((err) => {
        common_vendor.index.showModal({
          content: err.message || "请求服务失败",
          showCancel: false
        });
      });
    },
    /**
     * 获取表单数据
     * @param {Object} id
     */
    getDetail(id) {
      common_vendor.index.showLoading({
        mask: true
      });
      db.collection(dbCollectionName).doc(id).field("brand,color,ram,price,device_uuid").get().then((res) => {
        const data = res.result.data[0];
        if (data) {
          this.formData = data;
        }
      }).catch((err) => {
        common_vendor.index.showModal({
          content: err.message || "请求服务失败",
          showCancel: false
        });
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_data_checkbox2 + _easycom_uni_forms_item2 + _easycom_uni_easyinput2 + _easycom_uni_forms2)();
}
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_data_checkbox + _easycom_uni_forms_item + _easycom_uni_easyinput + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.formData.brand = $event),
    b: common_vendor.p({
      localdata: $data.formOptions.brand_localdata,
      modelValue: $data.formData.brand
    }),
    c: common_vendor.p({
      name: "brand",
      label: "品牌"
    }),
    d: common_vendor.o(($event) => $data.formData.device_uuid = $event),
    e: common_vendor.p({
      placeholder: "设备型号",
      modelValue: $data.formData.device_uuid
    }),
    f: common_vendor.p({
      name: "device_uuid",
      label: "型号"
    }),
    g: common_vendor.o(($event) => $data.formData.color = $event),
    h: common_vendor.p({
      placeholder: "颜色",
      modelValue: $data.formData.color
    }),
    i: common_vendor.p({
      name: "color",
      label: "颜色"
    }),
    j: common_vendor.o(($event) => $data.formData.ram = $event),
    k: common_vendor.p({
      placeholder: "内存",
      modelValue: $data.formData.ram
    }),
    l: common_vendor.p({
      name: "ram",
      label: "内存"
    }),
    m: common_vendor.o(($event) => $data.formData.price = $event),
    n: common_vendor.p({
      placeholder: "价格",
      modelValue: $data.formData.price
    }),
    o: common_vendor.p({
      name: "price",
      label: "价格"
    }),
    p: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    q: common_vendor.sr("form", "231769bb-0"),
    r: common_vendor.p({
      model: $data.formData,
      ["validate-trigger"]: "submit",
      ["err-show-type"]: "toast"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/money/Documents/HBuilderProjects/老王爱回收/pages/opendb-search-log/edit.vue"]]);
wx.createPage(MiniProgramPage);
