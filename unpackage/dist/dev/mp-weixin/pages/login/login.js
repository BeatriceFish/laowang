"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "Hello",
      username: "",
      password: "",
      token: ""
    };
  },
  onLoad() {
    if (common_vendor.index.getStorageSync("uni_id_token")) {
      this.token = common_vendor.index.getStorageSync("uni_id_token");
    }
  },
  methods: {
    req(action, params) {
      return new Promise((resolve, reject) => {
        common_vendor.Ds.callFunction({
          name: "user-center",
          data: {
            action,
            params
          },
          success: (res) => {
            resolve(res.result);
          },
          fail: (res) => {
            reject(res.result);
          }
        });
      });
    },
    register() {
      this.req("register", { username: this.username, password: this.password }).then((res) => {
        common_vendor.index.setStorageSync("uni_id_token", res.token);
        common_vendor.index.setStorageSync("uni_id_token_expired", res.tokenExpired);
        this.token = res.token;
      }).catch((err) => {
        console.log(err);
      });
    },
    login() {
      this.req("login", { username: this.username, password: this.password }).then((res) => {
        console.log(res.userInfo.username);
        common_vendor.index.setStorageSync("uni_id_token", res.token);
        common_vendor.index.setStorageSync("username", res.username);
        common_vendor.index.setStorageSync("uni_id_token_expired", res.tokenExpired);
        this.token = res.token;
      });
    },
    logout() {
      this.req("logout", {}).then((res) => {
        console.log(res);
        this.token = "";
        common_vendor.index.setStorageSync("uni_id_token", "");
        common_vendor.index.setStorageSync("username", "");
        common_vendor.index.setStorageSync("uni_id_token_expired", "");
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.token
  }, !$data.token ? {
    b: $data.username,
    c: common_vendor.o(($event) => $data.username = $event.detail.value),
    d: $data.password,
    e: common_vendor.o(($event) => $data.password = $event.detail.value),
    f: common_vendor.o(($event) => $options.register()),
    g: common_vendor.o(($event) => $options.login())
  } : $data.token ? {
    i: common_vendor.o(($event) => $options.logout())
  } : {}, {
    h: $data.token
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/money/Documents/HBuilderProjects/老王爱回收/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
