// pages/home/childComps/recommend/myRecommend.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		list: {
			type: Array,
			value: []
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		isLoad: false // 判断图片是否加载完成
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		imageLoad() {
			if(!this.data.isLoad) {
				this.triggerEvent('imageLoad')
				this.data.isLoad = true
			}
		}
	}
})
