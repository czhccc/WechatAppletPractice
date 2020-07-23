// pages/cart/cart-list-item/MyCartListItem.js

const app = getApp() // 获取 app.js

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		goods: {
      type: Object,
      value: {}
    },
    index: {
      type: Number
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
		onCheckClick(e) {
      // 载购物车列表中查找该商品
			const goods = app.globalData.cartList.find(item => item.iid == this.properties.goods.iid)
			
			// 反转商品的选中状态
      goods.checked = !goods.checked
      
      // 获取当前商品的下标
      const index = e.currentTarget.dataset.index;

      // 回调函数
      app.changeGoodsState(index, goods) // changeGoodsState 定义在 cart.js 中
    }
  }
})
