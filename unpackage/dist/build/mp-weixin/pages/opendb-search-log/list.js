"use strict";const n=require("../../common/vendor.js");n.Ds.database();const e={data:()=>({list:[{brand:"苹果",brandNo:0},{brand:"华为",brandNo:1},{brand:"荣耀",brandNo:2},{brand:"小米",brandNo:3},{brand:"红米",brandNo:4},{brand:"OPPO",brandNo:5},{brand:"VIVO",brandNo:6},{brand:"IQOO",brandNo:7},{brand:"Realme",brandNo:8},{brand:"其他",brandNo:9}],brand:"0",username:"",collectionList:"opendb-search-log",loadMore:{contentdown:"",contentrefresh:"",contentnomore:""}}),onLoad(){},onShow(){this.username=n.index.getStorageSync("username")||""},onPullDownRefresh(){this.$refs.udb.loadData({clear:!0},(()=>{n.index.stopPullDownRefresh()}))},onReachBottom(){this.$refs.udb.loadMore()},methods:{handleBrandClick(n){this.brand=n},handleItemClick(e){n.index.navigateTo({url:"./detail?id="+e})},fabClick(){n.index.navigateTo({url:"./add",events:{refreshData:()=>{this.$refs.udb.loadData({clear:!0})}}})}}};if(!Array){(n.resolveComponent("u-scroll-list")+n.resolveComponent("uni-list-item")+n.resolveComponent("uni-list")+n.resolveComponent("uni-load-more")+n.resolveComponent("unicloud-db")+n.resolveComponent("uni-fab"))()}Math||((()=>"../../uni_modules/uview-plus/components/u-scroll-list/u-scroll-list.js")+(()=>"../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js")+(()=>"../../uni_modules/uni-list/components/uni-list/uni-list.js")+(()=>"../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js")+(()=>"../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js")+(()=>"../../uni_modules/uni-fab/components/uni-fab/uni-fab.js"))();const o=n._export_sfc(e,[["render",function(e,o,a,r,d,i){return n.e({a:n.f(d.list,((e,o,a)=>({a:n.t(e.brand),b:n.n(d.brand==e.brandNo?"active":""),c:n.o((n=>i.handleBrandClick(e.brandNo)),o),d:o}))),b:n.p({indicator:!1}),c:n.w((({data:e,pagination:o,loading:a,hasMore:r,error:t},s,l)=>n.e({a:t},t?{b:n.t(t.message)}:e?{d:n.f(e,((e,o,a)=>n.e({a:e.brand==d.brand},e.brand==d.brand?{b:n.t(e.device_uuid),c:n.t(e.price),d:n.o((n=>i.handleItemClick(e._id)),o),e:"a4f3c145-3-"+l+"-"+a+",a4f3c145-2-"+l,f:n.p({showArrow:!0,clickable:!0})}:{},{g:o}))),e:"a4f3c145-2-"+l+",a4f3c145-1"}:{},{c:e,f:"a4f3c145-4-"+l+",a4f3c145-1",g:n.p({status:a?"loading":r?"more":"noMore"}),h:l,i:s})),{name:"d",path:"c",vueId:"a4f3c145-1"}),d:n.sr("udb","a4f3c145-1"),e:n.p({collection:d.collectionList,field:"brand,device_uuid,price"}),f:"cyberworkshop"==d.username},"cyberworkshop"==d.username?{g:n.sr("fab","a4f3c145-5"),h:n.o(i.fabClick),i:n.p({horizontal:"right",vertical:"bottom","pop-menu":!1})}:{})}],["__scopeId","data-v-a4f3c145"]]);wx.createPage(o);