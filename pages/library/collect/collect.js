// pages/library/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.HttpRequest("石油",1,this.data.list);
  },
  HttpRequest: function (name, page, list) {
    let that = this, index = [], Allpage = 1;
    wx.showLoading({
      title: '玩命加载中',
    });
    if (page > this.data.Allpage) {
      return;
    }
    wx.request({
      url: 'https://xuchaoyang.cn/Loginweb/BookServlet?bookName=' + name + '&page=' + page,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        Allpage = res.data.page;
        index = Object.keys(res.data.book);
        for (let i = 0; i < index.length; i++) {
          list.push(res.data.book[index[i]])
        }
        that.setData({
          Allpage: Allpage,
          list: list,
          name: name,
        });
        wx.hideLoading();
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})