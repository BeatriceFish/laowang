"use strict";
const common_vendor = require("../../common/vendor.js");
const js_sdk_validator_opendbSearchLog = require("../../js_sdk/validator/opendb-search-log.js");
common_vendor.Ds.database();
const _sfc_main = {
  data() {
    return {
      queryWhere: "",
      collectionList: "opendb-search-log",
      loadMore: {
        contentdown: "",
        contentrefresh: "",
        contentnomore: ""
      },
      options: {
        // 将scheme enum 属性静态数据中的value转成text
        ...js_sdk_validator_opendbSearchLog.enumConverter
      }
    };
  },
  onLoad(e) {
    this._id = e.id;
  },
  onReady() {
    if (this._id) {
      this.queryWhere = '_id=="' + this._id + '"';
    }
  },
  methods: {
    handleUpdate() {
      common_vendor.index.navigateTo({
        url: "./edit?id=" + this._id,
        events: {
          // 监听修改页面成功修改数据后, 刷新当前页面数据
          refreshData: () => {
            this.$refs.udb.loadData({
              clear: true
            });
          }
        }
      });
    },
    handleDelete() {
      this.$refs.udb.remove(this._id, {
        success: (res) => {
          common_vendor.index.navigateTo({
            url: "./list"
          });
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  (_easycom_uni_load_more2 + _easycom_unicloud_db2)();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_unicloud_db = () => "../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (_easycom_uni_load_more + _easycom_unicloud_db)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.w(({
      data,
      loading,
      error,
      options
    }, s0, i0) => {
      return common_vendor.e({
        a: error
      }, error ? {
        b: common_vendor.t(error.message)
      } : loading ? {
        d: "48767642-1-" + i0 + ",48767642-0",
        e: common_vendor.p({
          contentText: $data.loadMore,
          status: "loading"
        })
      } : data ? {
        g: common_vendor.t(options.brand_valuetotext[data.brand]),
        h: common_vendor.t(data.device_uuid),
        i: common_vendor.t(data.color),
        j: common_vendor.t(data.ram),
        k: common_vendor.t(data.price)
      } : {}, {
        c: loading,
        f: data,
        l: i0,
        m: s0
      });
    }, {
      name: "d",
      path: "a",
      vueId: "48767642-0"
    }),
    b: common_vendor.sr("udb", "48767642-0"),
    c: common_vendor.p({
      options: $data.options,
      collection: $data.collectionList,
      field: "brand,color,ram,price,device_uuid",
      where: $data.queryWhere,
      getone: true,
      manual: true
    }),
    d: _ctx.username == "cyberworkshop"
  }, _ctx.username == "cyberworkshop" ? {
    e: common_vendor.o((...args) => $options.handleUpdate && $options.handleUpdate(...args)),
    f: common_vendor.o((...args) => $options.handleDelete && $options.handleDelete(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/money/Documents/HBuilderProjects/老王爱回收/pages/opendb-search-log/detail.vue"]]);
wx.createPage(MiniProgramPage);
