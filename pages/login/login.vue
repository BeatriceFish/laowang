<template>
	<view class="content">
		<view class="" v-if="!token">
			<input v-model="username" placeholder="用户名" />
			<input v-model="password" placeholder="密码" />
			<div class="buttonBox">
				<button @click="register()">注册</button>
				<button @click="login()">登录</button>
				
			</div>
			<!-- <text>{{token}}</text> -->
		</view>
		<view class="" v-else-if="token">
			已登录
			<button @click="logout()">退出</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				username: "",
				password: "",
				token: ""
			}
		},
		onLoad() {
			if(uni.getStorageSync('uni_id_token')){
				this.token = uni.getStorageSync('uni_id_token')
				
			}
		},
		methods: {
			req(action,params){
				return new Promise((resolve,reject)=>{
					uniCloud.callFunction({
						name:'user-center',
						data:{
							action,
							params
						},
						success:res=>{
							resolve(res.result);
						},
						fail:res=>{
							reject(res.result);
						}
					})
				})
			},
			register(){
				this.req("register",{username:this.username,password:this.password}).then(res=>{
					
					uni.setStorageSync('uni_id_token',res.token);
					
					uni.setStorageSync('uni_id_token_expired',res.tokenExpired);
					this.token = res.token;
				}).catch(err => {
					console.log(err)
				})
			},
			login(){
				this.req("login",{username:this.username,password:this.password}).then(res=>{
					console.log(res.userInfo.username);
					uni.setStorageSync('uni_id_token',res.token);
					uni.setStorageSync('username',res.username);
					uni.setStorageSync('uni_id_token_expired',res.tokenExpired);
					this.token = res.token;
				})
			},
			logout(){
				this.req("logout",{}).then(res=>{
					console.log(res);
					this.token = "";
					uni.setStorageSync('uni_id_token','');
					uni.setStorageSync('username','');
					uni.setStorageSync('uni_id_token_expired','');
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.buttonBox{
		display: flex;
		justify-content: space-around;
		/* background-color: pink; */
		width: 80%;
		margin-top: 20upx;
	}
</style>

