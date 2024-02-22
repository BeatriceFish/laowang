"use strict";
const common_vendor = require("../../common/vendor.js");
common_vendor.Ds.database();
const _sfc_main = {
  data() {
    return {
      indexList: ["A", "B", "C"],
      itemArr: [
        ["列表A1", "列表A2", "列表A3"],
        ["列表B1", "列表B2", "列表B3"],
        ["列表C1", "列表C2", "列表C3"]
      ],
      list: [
        {
          name: "苹果",
          brandNo: 0
        },
        {
          name: "华为",
          brandNo: 1
        },
        {
          name: "荣耀",
          brandNo: 2
        },
        {
          name: "小米",
          brandNo: 3
        },
        {
          name: "红米",
          brandNo: 4
        }
      ],
      brand: "0",
      username: "",
      collectionList: "opendb-search-log",
      loadMore: {
        contentdown: "",
        contentrefresh: "",
        contentnomore: ""
      },
      list_data_right: [],
      list_data_left: [],
      list: [],
      tabCur: 0,
      mainCur: 0,
      verticalNavTop: 0,
      load: true,
      heightleft: 100,
      hh: 0,
      scrolltop: 0,
      scrollintoview: "",
      mainList: [],
      navList: [{}, {}],
      navCount: 0,
      navNow: 0,
      vue_all_list: [],
      my_hua_dong_num: 0,
      navScroll: ""
    };
  },
  onLoad() {
    common_vendor.Ds.callFunction({
      name: "getType"
    }).then((res) => {
      console.log(res.result.data);
      this.list = res.result.data;
      this.list_data_left_api("iphone15");
    });
    common_vendor.index.showLoading({
      title: "加载中...",
      mask: true
    });
    let list = [{}];
    for (let i = 0; i < 26; i++) {
      list[i] = {};
      list[i].name = String.fromCharCode(65 + i);
      list[i].id = i;
    }
    this.list = list;
    this.listCur = list[0];
  },
  onReady() {
    this._onReadyApi();
    common_vendor.index.hideLoading();
  },
  onShow() {
    this.username = common_vendor.index.getStorageSync("username") || "";
  },
  onPullDownRefresh() {
    this.$refs.udb.loadData({
      clear: true
    }, () => {
      common_vendor.index.stopPullDownRefresh();
    });
  },
  onReachBottom() {
    this.$refs.udb.loadMore();
  },
  methods: {
    handleBrandClick(item) {
      this.brand = item.brandNo;
      common_vendor.Ds.callFunction({
        name: "selectType",
        data: {
          name: item.name
        }
      }).then((res) => {
        this.list_data_left = res.result.data;
        console.log(res.result.data);
        if (res.result.data.length) {
          this.list_data_left_api(res.result.data[0].product);
          this.getSkuByProduct(res.result.data[0].product);
        }
      });
    },
    getSkuByProduct(product) {
      common_vendor.Ds.callFunction({
        name: "getSkuByProduct",
        data: {
          product
        }
      }).then((res) => {
        console.log(res);
        if (res.result.data.length) {
          this.list_data_right = res.result.data.map((item, i) => {
            return {
              id: res.result.data[i].name,
              navId: res.result.data[i].name,
              navScrollId: res.result.data[i].name,
              data: {
                id: res.result.data[i].name,
                start: res.result.data[i].name,
                name: res.result.data[i].product + res.result.data[i].memory + res.result.data[i].color
              }
            };
          });
        }
        console.log(this.list_data_right);
      });
    },
    handleItemClick(id) {
      common_vendor.index.navigateTo({
        url: "./detail?id=" + id
      });
    },
    fabClick() {
      common_vendor.index.navigateTo({
        url: "./add",
        events: {
          // 监听新增数据成功后, 刷新当前页面数据
          refreshData: () => {
            this.$refs.udb.loadData({
              clear: true
            });
          }
        }
      });
    },
    myonPageScroll(e) {
      console.log("___________________________________________________start");
      this.my_hua_dong_num = Math.round(e.detail.scrollTop).toString();
      var num = e.currentTarget.offsetTop + e.detail.scrollTop;
      console.log("滚动距离为：" + num);
      var ww = this.vue_all_list.find(
        (v) => v.top >= num
      );
      console.log("+++++++++++++++");
      console.log(this.vue_all_list);
      console.log("_________ww____________________");
      console.log(ww);
      console.log("+++++++++++++++");
      if (e.detail.scrollTop <= 70) {
        this.navNow = this.navList[0].navId;
      } else {
        this.navNow = ww.id;
      }
      if (ww.dataset.navScrollId) {
        this.navScroll = ww.dataset.navScrollId;
      } else {
        this.navScroll = this.navNow;
      }
      console.log("navNow_____________=" + this.navNow);
      console.log("navScroll_____________=" + this.navScroll);
      console.log("___________________________________________________end");
    },
    TabSelect(e) {
      this.tabCur = e.currentTarget.dataset.id;
      this.mainCur = e.currentTarget.dataset.id;
      this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50;
    },
    VerticalMain(e) {
      let tabHeight = 0;
      if (this.load) {
        for (let i = 0; i < this.list.length; i++) {
          let view = common_vendor.index.createSelectorQuery().select("#main-" + this.list[i].id);
          view.fields({
            size: true
          }, (data) => {
            this.list[i].top = tabHeight;
            tabHeight = tabHeight + data.height;
            this.list[i].bottom = tabHeight;
          }).exec();
        }
        this.load = false;
      }
      let scrollTop = e.detail.scrollTop + 10;
      for (let i = 0; i < this.list.length; i++) {
        if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
          this.verticalNavTop = (this.list[i].id - 1) * 50;
          this.tabCur = this.list[i].id;
          console.log(scrollTop);
          return false;
        }
      }
    },
    list_data_left_api(product) {
      var _a, _b;
      var that = this;
      var mainList = [];
      var navList = [];
      let prevNav = "";
      var i = 0;
      this.getSkuByProduct(product);
      for (i; i < 10; i++) {
        const mainId = "main-" + i;
        const navId = "nav-" + i;
        const tId = (1e4 + i).toString();
        if (!prevNav) {
          prevNav = navId;
        }
        mainList.push({
          id: mainId,
          navId,
          navScrollId: prevNav,
          data: {
            id: tId,
            start: "呵呵",
            name: tId
          }
        });
        navList.push({
          navId,
          mainId,
          label: ((_a = this.list_data_left[i]) == null ? void 0 : _a.name) ? (_b = this.list_data_left[i]) == null ? void 0 : _b.name : navId
        });
        prevNav = navId;
      }
      this.mainList = mainList;
      this.navList = navList;
      console.log(this.navList, "navList===================");
      console.log(this.mainList);
      if (this.navList.length) {
        this.navNow = this.navList[0].navId;
      }
      setTimeout(function() {
        common_vendor.wx$1.createSelectorQuery().selectAll(".main-item").fields({
          // id:true,
          id: true,
          dataset: true,
          rect: true
        }).exec((res) => {
          console.log("---------------------------");
          console.log("---------------------------");
          console.log("---------------------------");
          console.log("---------------------------");
          console.log(res[0]);
          that.vue_all_list = res[0];
          console.log(that.vue_all_list);
          console.log("---------------------------vue_all_list_end");
        });
      }, 300);
      this._onReadyApi();
    },
    list_data_right_api() {
      var list_data_right = [];
      var i = 0;
      for (i; i < 100; i++) {
        list_data_right.push({
          id: (1e4 + i).toString(),
          start: "呵呵"
        });
      }
      this.list_data_right = list_data_right;
      console.log(this.list_data_right);
    },
    onNav(e, kk) {
      console.log("________________onNav___" + kk);
      console.log("________________onNav___" + kk);
      var value = e.navId;
      console.log(e);
      if (e) {
        this.scrollintoview = value;
        this.navNow = kk;
        this.getSkuByProduct(e.label);
      }
    },
    _onReadyApi() {
      console.log("--------------------------------");
      var windowHeight = common_vendor.index.getSystemInfoSync().windowHeight;
      console.log(windowHeight);
      var that = this;
      common_vendor.index.createSelectorQuery().select("#headinga").boundingClientRect((res) => {
        console.log("+++++++++++++++");
        console.log("+++++++++++++++");
        that.hh = windowHeight - res.height;
        that.navCount = Math.round(that.hh / 50);
        console.log(that.navCount + "+++++++++++++++" + that.hh);
      }).exec();
    }
  }
};
if (!Array) {
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  _easycom_u_tabs2();
}
const _easycom_u_tabs = () => "../../uni_modules/uview-plus/components/u-tabs/u-tabs.js";
if (!Math) {
  _easycom_u_tabs();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(_ctx.click),
    b: common_vendor.o($options.handleBrandClick),
    c: common_vendor.p({
      list: $data.list,
      keyName: "name"
    }),
    d: common_vendor.t($data.my_hua_dong_num),
    e: common_vendor.f($data.navList, (item, index, i0) => {
      return common_vendor.e({
        a: item.label.indexOf("nav") == -1
      }, item.label.indexOf("nav") == -1 ? {
        b: common_vendor.t(item.label),
        c: common_vendor.s($data.navNow == item.navId ? "background-color:red;" : "background-color: #9bf;"),
        d: common_vendor.o(($event) => $options.onNav(item, item.navId), index)
      } : {}, {
        e: index,
        f: item.navId
      });
    }),
    f: $data.navCount,
    g: common_vendor.s("height:" + $data.hh + "px"),
    h: $data.navScroll,
    i: common_vendor.f($data.list_data_right, (item, index, i0) => {
      return {
        a: common_vendor.t(item.data.name),
        b: index,
        c: item.navId,
        d: item.navId,
        e: item.navScrollId
      };
    }),
    j: common_vendor.s("height:" + $data.hh + "px"),
    k: $data.scrollintoview,
    l: common_vendor.o((...args) => $options.myonPageScroll && $options.myonPageScroll(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-78448418"], ["__file", "C:/Users/money/Documents/HBuilderProjects/老王爱回收/pages/opendb-search-log/list.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
