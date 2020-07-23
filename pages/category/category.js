// pages/category/category.js

import {getCategory, getSubcategory, getCategoryDetail} from '../../service/category.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [], // menu列表的数据
    categoryData: {}, // menu列表每一个选项的数据，结构如下：
    /* categoryData的结构
        categoryData：{
          subcategories: Array,  // 分类数据
          categoryDetail: [ // 商品数据
            [], // '流行'的商品数据
            [], // '新款'的商品数据
            []  // '精选'的商品数据
          ]
        }
    */
    menuIndex: 0, // menu的当前选项的下标
    tabControlIndex: 0, // tab-control的当前选项下标
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getCategory() // 请求数据并初始化页面
  },

  /* ------------------- 网络请求函数 ------------------- */
  // 请求数据并初始化页面
  _getCategory() { 
    getCategory().then(res => {
      // 获取categories数据
      const categories = res.data.data.category.list

      // 初始化categoryData的结构
      const categoryData = {}
      for (let i=0; i<categories.length; i++) {
        categoryData[i] = {
          subcategories: [], // 分类数据
          categoryDetail: [ // 商品数据
            [], // '流行'的商品数据
            [], // '新款'的商品数据
            []  // '精选'的商品数据
          ]
        }
      }

      // 保存数据
      this.setData({
        categories,
        categoryData
      })
      
      // 页面初始化显示
      this._getSubcategory(0) // 请求menu第一个选项的分类数据
      this._getCategoryDetail(0) // 请求menu第一个选项的商品数据
    })
  },

  // 获取分类数据
  _getSubcategory(menuIndex) {
    // 获取对应的maitkey，maitkey用于获取对应的分类数据
    const maitkey = this.data.categories[menuIndex].maitKey

    // 获取分类数据
    getSubcategory(maitkey).then(res => {
      const categoryData = this.data.categoryData
      categoryData[menuIndex].subcategories = res.data.data.list
      this.setData({
        categoryData
      })
    })
  },

  // 获取商品数据
  _getCategoryDetail(menuIndex) {
    // 获取对应的miniWallKey，miniWallKey用于获取对应的商品数据
    const miniWallKey = this.data.categories[menuIndex].miniWallkey

    // 调用函数获取商品数据
    const goodsType = ['pop', 'new', 'sell']
    const tabControlIndex = this.data.tabControlIndex
    const theType = goodsType[tabControlIndex]
    // 这里需要传入type，是因为/service/category.js中的getCategoryDetail函数需要传入请求的类别
    this._getRealCategoryDetail(menuIndex, miniWallKey, theType)
  },
  _getRealCategoryDetail(menuIndex, miniWallKey, type) {
    getCategoryDetail(miniWallKey, type).then(res => {
      // 获取对应的商品数据并保存
      const categoryData = this.data.categoryData
      const tabControlIndex = this.data.tabControlIndex
      categoryData[menuIndex].categoryDetail[tabControlIndex] = res.data
      this.setData({
        categoryData
      })
    })
  },

  /* ------------------- 事件监听函数 ------------------- */
  // menu列表点击
  menuClick(e) {
    // 改变当前的menuIndex
    const menuIndex = e.detail.menuIndex
    this.setData({
      menuIndex
    })

    // 请求对应的数据
    this._getSubcategory(menuIndex) // 根据menuIndex请求对应的分类数据
    this._getCategoryDetail(menuIndex) // 根据menuIndex请求对应的商品数据
  },

  // tab-control点击
  changeGoods(e) {
    const tabControlIndex = e.detail // 获取点击的tab-control的选项的下标
    this.setData({
      tabControlIndex
    })
    this._getCategoryDetail(this.data.menuIndex) // tab-control点击后请求对应的商品数据
  },

})