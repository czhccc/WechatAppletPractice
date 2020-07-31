// pages/cart/cart.js

const app = getApp() // 获取 app.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [], // 购物车列表
    isSelectAll: true, // 是否全部选中
    totalPrice: 0, // 总价格
    totalCounter: 0 // 总商品数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化页面，加载购物车列表中的数据
    const cartList = app.globalData.cartList

    this.setData({
      cartList,
      isSelectAll: cartList.length ? true : false // 如果购物车为空，则进入购物车页面时不应该为全选中状态
    })

    // 设置app.js的回调函数
    app.addCartCallback = () => {
      this.setData({
        cartList: app.globalData.cartList
      })

      this.changeData()
    }

    // 修改某个商品的回调
    app.changeGoodsState = (index, goods) => {
      // 修改某一项的选中状态
      this.setData({
        [`cartList[${index}]`]: goods
      })

      // 修改全部选中的状态
      const selectAll = !this.data.cartList.find(item => !item.checked)
      this.setData({
        isSelectAll: selectAll
      })
      this.changeData()
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 设置导航栏中的数量
    wx.setNavigationBarTitle({
      title: `购物车(${this.data.cartList.length})`,
    })

    this.changeData()
  },

  /* ----------------- 事件监听函数 ----------------- */
  // 全选
  selectAll() {
    // 判断是否是全部选中
    if (this.data.isSelectAll) { // 如果目前已经全部选中，则全都变为不选中状态
      this.data.cartList.forEach(item => {
        item.checked = false
      })
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: false
      })
    } else { // 如果有一些商品没有选中
      this.data.cartList.forEach(item => { // 将所有商品变为选中状态
        item.checked = true
      })
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: true
      })
    }

    this.changeData()
  },

  // 计算并修改保存总价格和商品数量
  changeData() {
    // 获取所有选中数据
    let totalPrice = 0;
    let counter = 0;
    for (let item of this.data.cartList) { // 遍历购物车列表
      if (item.checked) {
        counter++
        totalPrice += item.price * item.count
      }
    }

    this.setData({
      totalCounter: counter,
      totalPrice: totalPrice
    })
  },

  // 去结算
  buy() {
    wx.showToast({
      title: `已购买${this.data.totalCounter}件商品`,
      icon: 'success',
      duration: 1500
    })
  }

})