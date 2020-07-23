// components/goods-item/MyGoodsItem.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		goodsItem: {
			type: Object,
			value: {}
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {

	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		itemClick(e) {
			// 获取iid
			const iid = this.data.goodsItem.iid

			// 跳转到对应的detail页面
			wx.navigateTo({
				url: '/pages/detail/detail?iid=' + iid
			})
		}
	}
})
