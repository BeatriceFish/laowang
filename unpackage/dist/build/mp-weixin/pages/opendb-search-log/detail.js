"use strict";const e=require("../../common/vendor.js"),o=require("../../js_sdk/validator/opendb-search-log.js");e.Ds.database();const n={data:()=>({queryWhere:"",collectionList:"opendb-search-log",loadMore:{contentdown:"",contentrefresh:"",contentnomore:""},options:{...o.enumConverter},username:""}),onLoad(e){this._id=e.id},onShow(){this.username=e.index.getStorageSync("username")||""},onReady(){this._id&&(this.queryWhere='_id=="'+this._id+'"')},methods:{handleUpdate(){e.index.navigateTo({url:"./edit?id="+this._id,events:{refreshData:()=>{this.$refs.udb.loadData({clear:!0})}}})},handleDelete(){this.$refs.udb.remove(this._id,{success:o=>{e.index.navigateTo({url:"./list"})}})}}};if(!Array){(e.resolveComponent("uni-load-more")+e.resolveComponent("unicloud-db"))()}Math||((()=>"../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js")+(()=>"../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js"))();const t=e._export_sfc(n,[["render",function(o,n,t,d,r,a){return e.e({a:e.w((({data:o,loading:n,error:t,options:d},a,i)=>e.e({a:t},t?{b:e.t(t.message)}:n?{d:"48767642-1-"+i+",48767642-0",e:e.p({contentText:r.loadMore,status:"loading"})}:o?{g:e.t(d.brand_valuetotext[o.brand]),h:e.t(o.device_uuid),i:e.t(o.price)}:{},{c:n,f:o,j:i,k:a})),{name:"d",path:"a",vueId:"48767642-0"}),b:e.sr("udb","48767642-0"),c:e.p({options:r.options,collection:r.collectionList,field:"brand,device_uuid,price",where:r.queryWhere,getone:!0,manual:!0}),d:"cyberworkshop"==r.username},"cyberworkshop"==r.username?{e:e.o(((...e)=>a.handleUpdate&&a.handleUpdate(...e))),f:e.o(((...e)=>a.handleDelete&&a.handleDelete(...e)))}:{})}]]);wx.createPage(t);