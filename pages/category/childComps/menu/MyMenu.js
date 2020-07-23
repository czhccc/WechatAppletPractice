// pages/category/childComps/MyMenu/MyMenu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categories: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    menuIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onItemClick(e) {
      // 1.改变当前的menuIndex
      const menuIndex = e.currentTarget.dataset.index;
      this.setData({
        menuIndex
      })

      // 2.将最新的menuIndex传递到分类页面
      this.triggerEvent('menuclick', {menuIndex}, {})
    }
  }
})
