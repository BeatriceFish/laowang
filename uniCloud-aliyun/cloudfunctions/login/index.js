'use strict';
const uniIDs = require('uni-id')
exports.main = async (event, context) => {

	let res = {};
	let params = event.params ? event.params : {};

	const uniID = uniIDs.createInstance({
		context: context
	})

	const noNeedTokens = ['login', 'register', 'logout'];

	if (noNeedTokens.indexOf(event.action) == -1) {
		if (!event.uniIdToken) {
			res = {
				code: 403,
				message: "未携带token"
			}
			return res;
		} else {
			let check_user = await uniID.checkToken(event.uniIdToken, {});
			if (check_user.code === 0) {
				params.uid = check_user.uid;
			} else {
				res = check_user;
				return res;
			}
		}
	}

	switch (event.action) {
		case 'register': {
			const {
				username,
				password
			} = params;
			res = await uniID.register({
				username,
				password
			})
			break;
		}
		case 'login': {
			const {
				username,
				password
			} = params;
			res = await uniID.login({
				username,
				password,
				queryField: ['username', 'email', 'mobile']
			})
			break;
		}
		case 'logout': {
			res = await uniID.logout(event.uniIdToken);
			break;
		}
		default: {
			res = {
				code: 402,
				message: "请求非法"
			}
			break;
		}
	}

	//返回数据给客户端
	return res;
};

