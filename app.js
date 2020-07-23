//app.js
App({
  onLaunch: function () {
    
  },
  globalData: {
    cartList: [] // 购物车列表
  },

   // 商品加入到购物车
  addToCart(obj) {
    // 判断商品是否已经添加进购物车
    const oldInfo = this.globalData.cartList.find((item) => item.iid === obj.iid)
    if (oldInfo) { // 如果商品已存在，则数量+1
      oldInfo.count += 1
    } else { // 如果商品不存在，则将商品加入购物车
      obj.count = 1
      obj.checked = true
      this.globalData.cartList.push(obj)
    }

    // 购物车回调
    if (this.addCartCallback) {
      this.addCartCallback() // 见 pages/cart/cart.js 的 app.addCartCallback
    }
  }
})