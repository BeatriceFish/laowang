<template>
	<view class="container">
		<u-tabs :list="list" @click="click" keyName="name" @change="handleBrandClick"></u-tabs>
		<view id="headinga">
			<!-- <view class="fixed">
	  		<cu-custom :isBack="true" bgColor=" text-white">
	  			<block slot="backText">返回</block>
	  			<block slot="content">垂直导航			{{list_data_left.length}}</block>
	  		</cu-custom>
	  	</view> -->
			<view
				style="width: 100%;height: 400rpx;background-color: pink;display: flex;justify-content: center;align-items: center;color: #fff;font-size: 80rpx;">
				当前高度：{{my_hua_dong_num}}
			</view>
		</view>
		<view style="background-color: #fff;display: flex;">
			<view style="width: 20%;background-color: pink;">
				<swiper :duration="500" :vertical="true" :display-multiple-items="navCount" :style="'height:'+hh+'px'"
					:current-item-id="navScroll">
					<swiper-item v-for="item,index in navList" :key="index" class="" :item-id="item.navId">
						<view v-if="item.label.indexOf('nav') == -1" class="" :style="navNow==item.navId?'background-color:red;':'background-color: #9bf;'"
							style="width: 100%;height: 100rpx;margin-top: 20rpx;height: 80rpx;line-height: 80rpx;display: flex;align-items: center;justify-content: center;color: #fff;"
							@click="onNav(item,item.navId)">
							<!-- {{navNow}}-{{item.navId}} -->
							{{item.label}}
						</view>
					</swiper-item>

				</swiper>
			</view>


			<scroll-view :scroll-y="true" :scroll-with-animation="true" :enable-back-to-top="true"
				:style="'height:'+hh+'px'" :scroll-into-view="scrollintoview" @scroll="myonPageScroll">
				<view v-for="(item,index) in list_data_right" :key="index" :id="item.navId" :data-nav-id="item.navId"
					:data-nav-scroll-id="item.navScrollId" class="trip main-item"
					style="margin-bottom: 10rpx; border-radius: 0rpx;border: 0rpx solid red;padding: 20rpx 30rpx 0 30rpx;">
					<view style="width: 100%;;display: flex;flex-wrap: wrap;justify-content: space-between;">
						<view style="width: 100%;height: 50rpx;;display: flex;align-items: center;">{{item.data.name}}
							
						</view>
						<view style="width: 100%;height: 50rpx;;display: flex;align-items: center;" v-for="(item1,index) in item.data.colors">
							<view style="display: flex;justify-content: space-between;">
								<view class="">{{item1.color}}</view>
								<view class="">{{item1.price}}</view>
							</view>
						</view>
						<!-- <view class="" v-for="(item1,i) in item.colors" :key="i">
							{{item1}}11
						</view> -->
						<!-- <view
							style="width: 30%;height: 170rpx;background-color: #f2f2f2;margin-top: 20rpx;overflow: hidden;border-radius: 25rpx;position: relative;"
							v-for="(item_find,index_find) in item.colors" :key="index_find">
							<view style="width: 170rpx;height: 170rpx;background-color: pink;">
								<image v-if="index%3==0" src="../../static/icon_img/bing.png"
									style="width: 170rpx;height: 170rpx;"></image>
								<image v-if="index%3==1" src="../../static/icon_img/mangguo.png"
									style="width: 170rpx;height: 170rpx;"></image>
								<image v-if="index%3==2" src="../../static/icon_img/xigua.png"
									style="width: 170rpx;height: 170rpx;"></image>
							</view>
						</view> -->

						<view style="width: 170rpx;height: 0rpx;margin-bottom: 20rpx;"></view>
						<view style="width: 170rpx;height: 0rpx;margin-bottom: 20rpx;"></view>
						<!-- 自定义页面布局end -->
						<!-- 自定义页面布局end -->
						<!-- 自定义页面布局end -->
					</view>

				</view>
			</scroll-view>
			<!--  -->


		</view>
		<!-- <unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}" :collection="collectionList" field="brand,color,ram,price,device_uuid">
      <view v-if="error">{{error.message}}</view>
      <view v-else-if="data">
        <uni-list>
			<template v-for="(item, index) in data"  :key="index">
			  <uni-list-item v-if="item.brand == brand" showArrow :clickable="true" @click="handleItemClick(item._id)">
				<template v-slot:body >
					<div >
						<text>
						  {{item.device_uuid}} -- 
						</text>
						<text>
						  {{item.price}}
						</text>
					</div>
				  
				</template>
			  </uni-list-item>
		  </template>
        </uni-list>
		
      </view>
      <uni-load-more :status="loading?'loading':(hasMore ? 'more' : 'noMore')"></uni-load-more>
    </unicloud-db>
    <uni-fab v-if="username == 'cyberworkshop'" ref="fab" horizontal="right" vertical="bottom" :pop-menu="false" @fabClick="fabClick" /> -->
	</view>
</template>

<script>
	const db = uniCloud.database()
	export default {
		data() {
			return {
				indexList: ["A", "B", "C"],
				itemArr: [
					['列表A1', '列表A2', '列表A3'],
					['列表B1', '列表B2', '列表B3'],
					['列表C1', '列表C2', '列表C3']
				],
				list: [{
						name: '苹果',
						brandNo: 0
					},
					{
						name: '华为',
						brandNo: 1
					},
					{
						name: '荣耀',
						brandNo: 2
					},
					{
						name: '小米',
						brandNo: 3
					},
					{
						name: '红米',
						brandNo: 4
					}
				],
				brand: '0',
				username: '',
				collectionList: "opendb-search-log",
				loadMore: {
					contentdown: '',
					contentrefresh: '',
					contentnomore: ''
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
				scrollintoview: '',


				mainList: [],
				navList: [{},{}],

				navCount: 0,
				navNow: 0,
				vue_all_list: [],

				my_hua_dong_num: 0,


				navScroll: ''
			}
		},
		onLoad() {
			uniCloud.callFunction({
				name: 'getType'
			}).then(res => {
				console.log(res.result.data)
				this.list = res.result.data
				this.list_data_left_api('iphone15')
			})

			uni.showLoading({
				title: '加载中...',
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
			this._onReadyApi()
			uni.hideLoading()
		},
		onShow() {
			// this.username = uni.getStorageSync('username') || '';
			uniCloud.callFunction({
				name: 'getType'
			}).then(res => {
				console.log(res.result.data)
				this.list = res.result.data
				this.list_data_left_api('iphone15')
				this.handleBrandClick({name: '苹果',brandNo: 0})
			})
			
			uni.showLoading({
				title: '加载中...',
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
		onPullDownRefresh() {
			this.$refs.udb.loadData({
				clear: true
			}, () => {
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			this.$refs.udb.loadMore()
		},
		methods: {
			handleBrandClick(item) {
				this.brand = item.brandNo
				uniCloud.callFunction({
					name: 'selectType',
					data: {
						name: item.name
					}
				}).then(res => {
					this.list_data_left = res.result.data
					console.log(res.result.data)
					if (res.result.data.length) {
						this.list_data_left_api(item.name)
						this.getSkuByProduct(res.result.data[0].product)
					}
				})
			},
			getSkuByProduct(type) {
				uniCloud.callFunction({
					name: 'getSkuByProduct',
					data: {
						type: type
					}
				}).then(res => {
					console.log(res,'=====240')
					if(res.result.data.length){
						// this.list_data_right.push({
						// 	id: res.result.data[0].name,
						// 	navId: res.result.data[0].name,
						// 	navScrollId: res.result.data[0].name,
						// 	data: {
						// 		id: res.result.data[0].name,
						// 		start: res.result.data[0].name,
						// 		name: res.result.data[0].product + res.result.data[0].memory + res.result.data[0].color,
						// 	}
						// })
						this.list_data_right = res.result.data.map((item,i) => {
							return {
								id: res.result.data[i].name,
								navId: res.result.data[i].name,
								navScrollId: res.result.data[i].name,
								data: {
									id: res.result.data[i].name,
									start: res.result.data[i].name,
									name: res.result.data[i].product + res.result.data[i].memory,
									colors:res.result.data[i].colors?res.result.data[i].colors:[]
								}
							}
						})
					}
					
					
					
					console.log(this.list_data_right)
				})
			},
			handleItemClick(id) {
				uni.navigateTo({
					url: './detail?id=' + id
				})
			},
			fabClick() {
				// 打开新增页面
				uni.navigateTo({
					url: './add',
					events: {
						// 监听新增数据成功后, 刷新当前页面数据
						refreshData: () => {
							this.$refs.udb.loadData({
								clear: true
							})
						}
					}
				})
			},




			myonPageScroll(e) { //nvue暂不支持滚动监听，可用bindingx代替
				console.log('___________________________________________________start');
				// console.log('00000000000000000000000000000000');
				// console.log(e);
				this.my_hua_dong_num = Math.round(e.detail.scrollTop).toString()
				// console.log(this.vue_all_list);

				var num = e.currentTarget.offsetTop + e.detail.scrollTop
				// var num = e.detail.scrollTop

				console.log("滚动距离为：" + num);
				// console.log("滚动距离为：" + num);

				var ww = this.vue_all_list.find(
					v => v.top >= num
				)

				console.log('+++++++++++++++')
				console.log(this.vue_all_list)
				console.log('_________ww____________________')
				console.log(ww)
				console.log('+++++++++++++++')
				// console.log(ww)

				if (e.detail.scrollTop <= 70) {

					// console.log(this.navList[0].navId)
					// return
					this.navNow = this.navList[0].navId
				} else {
					this.navNow = ww.id
				}

				if (ww.dataset.navScrollId) {
					this.navScroll = ww.dataset.navScrollId
				} else {
					this.navScroll = this.navNow
				}
				// console.log(ww.dataset.navScrollId)
				// this.navScroll = ww.dataset.qq


				console.log('navNow_____________=' + this.navNow)
				console.log('navScroll_____________=' + this.navScroll)

				// this.navScroll = 
				// console.log(ww.id)

				// console.log('+++++++++++++++')
				// ww.dataset

				// this.scrollStates.mainItems.find(
				// v => v.top >= top)
				console.log('___________________________________________________end');

			},
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				return false //支付宝小程序暂时不支持双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.list.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.list[i].id);
						view.fields({
							size: true
						}, data => {
							this.list[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.list[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (this.list[i].id - 1) * 50
						this.tabCur = this.list[i].id
						console.log(scrollTop)
						return false
					}
				}
			},


			list_data_left_api(type) {
				var that = this
				//mainList
				var mainList = []
				var navList = []
				// navList
				var list_data_left = []
				var navScrollId = ''

				let prevNav = ''

				var i = 0
				this.getSkuByProduct(type)
				// debugger
				for (i; i < 10; i++) {
					const mainId = 'main-' + i
					const navId = 'nav-' + i
					const tId = (10000 + i).toString()

					if (!prevNav) {
						prevNav = navId
					}

					mainList.push({
						id: mainId,
						navId: navId,
						navScrollId: prevNav,
						data: {
							id: tId,
							start: '呵呵',
							name: tId,
						}
					})
					// console.log(this.list_data_left[i].name)
					navList.push({
						navId: navId,
						mainId: mainId,
						label: this.list_data_left[i]?.name?this.list_data_left[i]?.name:navId
					})

					prevNav = navId

					// list_data_left.push({
					// 	id:(10000+i).toString(),
					// 	start:'呵呵',
					// 	name:(10000+i).toString(),
					// })
				}

				this.mainList = mainList
				this.navList = navList
				

				// this.list_data_left = list_data_left

				console.log(this.navList, 'navList===================')
				console.log(this.mainList)
				if (this.navList.length) {
					this.navNow = this.navList[0].navId
				}



				// uni.createSelectorQuery().selectAll('.main-item').fields({
				// 	// id:true,
				// 	id:true
				// 	// dataset:true,
				// 	// rect:true,

				// }).exec(res=>{
				// 	console.log('---------------------------')
				// 	console.log('------------------33---------')
				// 	console.log('---------------------------')
				// 	console.log('---------------------------')
				// 	console.log('---------------------------')
				// 	console.log(res)
				// })

				// return 


				setTimeout(function() {
					wx.createSelectorQuery().selectAll('.main-item').fields({
						// id:true,
						id: true,
						dataset: true,
						rect: true,
					}).exec(res => {
						console.log('---------------------------')
						console.log('---------------------------')

						console.log('---------------------------')
						console.log('---------------------------')
						console.log(res[0])

						that.vue_all_list = res[0]

						console.log(that.vue_all_list)
						console.log('---------------------------vue_all_list_end')
					})
					// uni.createSelectorQuery().selectAll('.mmmm').fields({
					// 		// id:true,
					// 		size:true
					// 		// dataset:true,
					// 		// rect:true,
					// 	}).exec(res=>{
					// 		console.log('---------------------------')
					// 		console.log('---------------------------')
					// 		console.log('---------------------------')
					// 		console.log('---------------------------')
					// 		console.log('---------------------------')
					// 		console.log(res)
					// 	})
				}, 300)


				this._onReadyApi()

			},

			list_data_right_api() {
				var list_data_right = []

				var i = 0
				for (i; i < 100; i++) {
					list_data_right.push({
						id: (10000 + i).toString(),
						start: '呵呵'
					})
				}

				this.list_data_right = list_data_right

				console.log(this.list_data_right)

			},
			onNav(e, kk) {
				console.log('________________onNav___' + kk)
				console.log('________________onNav___' + kk)
				var value = e.navId
				console.log(e)

				if (e) {
					this.scrollintoview = value
					
					this.navNow = kk
					
					this.getSkuByProduct(e.label)
				}

			},
			_onReadyApi() {
				console.log('--------------------------------')

				var windowHeight = uni.getSystemInfoSync().windowHeight
				console.log(windowHeight)
				var that = this
				uni.createSelectorQuery().select('#headinga').boundingClientRect((res) => {
					console.log('+++++++++++++++')
					console.log('+++++++++++++++')


					that.hh = windowHeight - res.height

					that.navCount = Math.round(that.hh / 50)
					// console.log()
					console.log(that.navCount + '+++++++++++++++' + that.hh)
					// this.editorCtx = res.context
				}).exec()



			}
		}
	}
</script>

<style scoped lang="scss">
	.brandItem {
		display: block;
		margin-right: 20upx;
		font-size: 35upx;
		width: 125upx;
		// letter-spacing: 20upx;

		text-align: center;
	}

	.active {
		border-bottom: 1upx solid red;
	}




	// ============

	.fixed {
		position: fixed;
		z-index: 99;
	}

	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		background-color: #f1f1f1;
		flex: 1;
	}
</style>