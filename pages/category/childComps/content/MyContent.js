// pages/category/childComps/MyContent/MyContent.js

Component({
  /**
	 * 组件的属性列表
	 */
  properties: {
    subcategories: {
      type: Array,
      value: []
    },
    categoryDetail: {
      type: Array,
      value: []
    }
  },
  
	/**
	 * 组件的初始数据
	 */
  data: {
    currentIndex: 0, // tab-control当前的下标
    // currentType: 'pop' // tab-control当前的分类
  },
  observers: {
    // categoryDetail: function (newValue) {
    //   console.log(newValue)
    // }
  },
  lifetimes: {
    ready() {
      // console.log(this.properties.categoryDetail)
    }
  },
  
	/**
	 * 组件的方法列表
	 */
  methods: {
    tabClick(e) {
      // 获取当前点击的选项的下标
      const currentIndex = e.detail.index; 

      // 获取当前的type
      // const types = ['pop', 'new', 'sell']
      // let currentType = types[currentIndex] 

      // 保存数据
      this.setData({ 
        currentIndex,
        // currentType
      })

      // console.log(this.data.currentIndex)
      // console.log(this.data.currentType)

      // 发出事件
      
      this.triggerEvent("changeGoods", this.data.currentIndex, {})
    }
  }
})
