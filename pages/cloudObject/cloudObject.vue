<template>
	<view class="content">
		
	</view>
</template>

<script>
	//判断当前环境是否支持云对象。云对象详情：https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
	let canUse = true,cloudObjectDemo;
	if (uniCloud.importObject) {
		cloudObjectDemo = uniCloud.importObject('cloud-object-demo');
	} else {
		canUse = false
	}
	export default {
		data() {
			return {
				canUse
			}
		},
		methods: {
			add() {
				uni.showLoading({
					title: '处理中...'
				})
				cloudObjectDemo.add({
					name: 'DCloud',
					subType: 'uniCloud',
					createTime: Date.now()
				}).then((res) => {
					console.log(res)
					uni.hideLoading()
					uni.showModal({
						content: `成功添加一条数据，文档id为：${res.id}`,
						showCancel: false
					})
				}).catch((err) => {
					console.error(err)
					uni.hideLoading()
					uni.showModal({
						content: `添加数据失败，错误信息为：${err.message}`,
						showCancel: false
					})
				})
			},
			remove() {
				uni.showLoading({
					title: '处理中...'
				})
				cloudObjectDemo.remove().then((res) => {
					console.log(res)
					uni.hideLoading()
					uni.showModal({
						content: res.msg,
						showCancel: false
					})
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `删除失败，错误信息为：${err.message}`,
						showCancel: false
					})
					console.error(err)
				})
			},
			update() {
				uni.showLoading({
					title: '处理中...'
				})
				cloudObjectDemo.update({
					name: 'DCloud',
					subType: 'html 5+',
					createTime: Date.now()
				}).then((res) => {
					uni.hideLoading()
					uni.showModal({
						content: res.msg,
						showCancel: false
					})
					console.log(res)
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `更新操作执行失败，错误信息为：${err.message}`,
						showCancel: false
					})
					console.error(err)
				})
			},
			get() {
				uni.showLoading({
					title: '处理中...'
				})
				cloudObjectDemo.get().then((res) => {
					uni.hideLoading()
					uni.showModal({
						content: `查询成功，获取数据列表为：${JSON.stringify(res)}`,
						showCancel: false
					})
					console.log(res)
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `查询失败，错误信息为：${err.message}`,
						showCancel: false
					})
					console.error(err)
				})
			},
			useCommon() {
				cloudObjectDemo.useCommon().then((res) => {
					uni.hideLoading()
					uni.showModal({
						content: '云对象使用公共模块返回结果：' + JSON.stringify(res),
						showCancel: false
					})
					console.log(res)
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `云对象使用公共模块执行失败，错误信息为：${err.message}`,
						showCancel: false
					})
					console.error(err)
				})
			},
			toRedisPage() {
				uni.navigateTo({
					url: '/pages/cloudFunction/redis/redis'
				})
			}
		}
	}
</script>

<style>
	view {
		display: flex;
		flex-direction: column;
	}

	.content {
		padding-bottom: 30px;
	}

	.title {
		font-weight: bold;
		align-items: center;
		padding: 20px 0px;
		font-size: 20px;
	}

	.tips {
		color: #999999;
		font-size: 14px;
		padding: 20px 30px;
	}

	.btn-list {
		padding: 0px 30px;
	}

	.btn-list button {
		margin-bottom: 20px;
	}

	.upload-preview {
		width: 100%;
	}

	#tip {
		width: 750rpx;
		align-items: center;
	}
	button{
		width: 100%;
	}
</style>
