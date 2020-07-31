// pages/profile/childCopms/head/MyHead.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {

	},

	/**
	 * 组件的初始数据
	 */
	data: {
		userInfo: {} // 用户授权后获取的用户信息
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		// 获取用户信息
		getUserInfo(res) {
			if(res.detail.userInfo) { // 如果有userInfo，则表示用户是允许授权
				const userInfo = res.detail.userInfo
				this.setData({
					userInfo
				})
			}
		}
	},
	
	/**
	 * 在组件在视图层布局完成后执行
	 */
	ready() {
		wx.getUserInfo({ // 如果用户已经授权过，则下次自动登录
			success: res => {
				const userInfo = res.userInfo
				this.setData({
					userInfo
				})
				console.log('用户已授权过，缓存中存在相关信息，自动登录')
			},
			fail: () => {
				console.log('用户未曾授权，无法自动登录')
			}
		})
	}
})
