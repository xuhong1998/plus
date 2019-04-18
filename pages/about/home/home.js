// pages/about/home/home.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    view:1,
    name:"",
    no:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  CopyLink:function(){
    wx.setClipboardData({
      data: 'https://github.com/xuhong1998/plus',
      success:res =>{
        wx.showToast({
          title: '已复制',
          duration:1000,
        })
      }
    })
  },
  CopyQQ:function(){
    wx.setClipboardData({
      data: '453255330',
      success: res => {
        wx.showToast({
          title: '已复制',
          duration: 1000,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(app.globalData.stuName)
    if (app.globalData.stuName.length > 1){
      this.setData({
        view:2,
        name:app.globalData.stuName,
        no: app.globalData.stuNo
      })
    }
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