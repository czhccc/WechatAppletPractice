// pages/home/home.js

import {getMultidata, getGoodsData} from '../../service/home'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [], // 轮播图数据
    recommends: [], // 推荐数据
    titles: ['流行', '新款', '精选'], // tab-control
    goods: { // 商品数据
      'pop': {page: 0, list: []},
      'new': {page: 0, list: []},
      'sell': {page: 0, list: []}
    },
    currentType: 'pop', // 记录tab-control的当前选项
    isBackTop: false, // 是否显示回到顶部按钮
    isTabFixed: false, // tab-control是否固定
    tabScrollTop: 0, // tab-control显示的最小高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求轮播图和推荐数据
    this._getMultidata()

    // 请求商品数据
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 请求新的数据
    this._getGoodsData(this.data.currentType)
  },

  /**
   * 监听页面滚动
   */
  onPageScroll(options) {
    const scrollTop = options.scrollTop
    const flag1 = scrollTop >= 1000
    if(flag1 != this.data.isBackTop) { // 官方推荐：不要在滚动的函数回调中平凡调用this.setData()
      this.setData({
        isBackTop: scrollTop >= 1000
      })
    }

    // 修改isTabFixed的值
    const flag2 = scrollTop >= this.data.tabScrollTop
    if(flag2 != this.data.isTabFixed) {
      this.setData({
        isTabFixed: flag2
      })
    }
  },

  /* ----------------------- 网络请求函数 ----------------------- */
  // 请求轮播图和推荐数据
  _getMultidata() { 
    getMultidata().then(res => {
      const banners = res.data.data.banner.list // 保存轮播图数据
      const recommends = res.data.data.recommend.list // 保存推荐数据
      this.setData({ // 更新data中的数据
        banners,
        recommends
      })
    }).catch(err => {
      // console.log(err)
    })
  },
  // 请求商品数据
  _getGoodsData(type) {
    // 获取页码
    const page = this.data.goods[type].page + 1
    // 发送网络请求
    getGoodsData(type, page).then(res => {
      // 取出数据
      const list = res.data.data.list 
      // 将数据保存到对应type的list中
      const theList = this.data.goods[type].list
      theList.push(...list)
      // 将数据保存到对应type的list中
      const theType = `goods.${type}.list`
      const thePage = `goods.${type}.page`
      this.setData({
        [theType]: theList,
        [thePage]: page
      })
    })
  },

   /* ----------------------- 事件监听函数 ----------------------- */
  tabClick(event) { // tab-control 点击
    const index = event.detail.index
    const types = ['pop', 'new', 'sell']
    this.setData({
      currentType: types[index]
    })
  },
  imageLoad() { // 图片加载完成
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      this.data.tabScrollTop = rect.top
    }).exec()
  }
})