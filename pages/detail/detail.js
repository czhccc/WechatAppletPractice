// pages/detail/detail.js

import {getDetail, getRecommends, GoodsBaseInfo, ShopInfo, ParamInfo } from '../../service/detail.js'

const app = getApp() // 获取 app.js

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		iid: '',
		swiperImage: {}, // 轮播图图片
		baseInfo: {}, // 商品描述文字
    shopInfo: {}, // 店铺信息
    detailInfo: {}, // 商品详细图片
    paramInfo: {}, // 商品尺寸信息
    commentInfo: {}, // 用户评价
    recommends: {} // 商品推荐数据
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// 获取传入的iid
		// iid传入见 components/goods-item/MyGoodsItem.js 的 itemClick 方法
		this.setData({
			iid: options.iid
		})

		// 请求商品详情数据
    this._getDetailData()

    // 请求推荐商品的数据
    this._getRecommends()
  },
  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    getRecommends().then(res => {
      console.log('到达底部，加载新的数据')
      const recommends = this.data.recommends
      const data = res.data.data.list
      
      recommends.push(...data)

		  this.setData({
			  recommends
      })
      
      console.log(this.data.recommends)
		})
  },

	/* --------------------- 网络请求函数 --------------------- */
	_getDetailData() {
		getDetail(this.data.iid).then(res => {
			const data = res.data.result

			// 获取轮播图图片
			const topImages = data.itemInfo.topImages;

      // 获取商品描述文字
      const baseInfo = new GoodsBaseInfo(data.itemInfo, data.columns, data.shopInfo.services)

      // 获取店铺信息
      const shopInfo = new ShopInfo(data.shopInfo);

      // 获取商品详细图片
      const detailInfo = data.detailInfo;

      // 获取商品尺寸信息
      const paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule)

      // 获取用户评价信息
      let commentInfo = {}
      if (data.rate && data.rate.cRate > 0) {
        commentInfo = data.rate.list[0]
      }

			// 保存
      this.setData({
        topImages,
        baseInfo,
        shopInfo,
        detailInfo,
        paramInfo,
        commentInfo
      })
		})
	},

	// 获取商品推荐数据
	_getRecommends() {
    getRecommends().then(res => {
		  this.setData({
			  recommends: res.data.data.list
      })

		})
  },

  /* --------------------- 事件监听函数 --------------------- */
  // 加入购物车
	addCart() {
    // 获取商品对象
    const obj = {}
    obj.iid = this.data.iid;
    obj.imageURL = this.data.topImages[0];
    obj.title = this.data.baseInfo.title;
    obj.desc = this.data.baseInfo.desc;
    obj.price = this.data.baseInfo.realPrice;

    // 加入到购物车
    app.addToCart(obj)

    // 加入成功提示
    wx.showToast({
      title: '加入购物车成功',
      duration: 1000
    })
  }
})