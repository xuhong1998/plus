// pages/about/article/article.js
var WxParse = require('../../../wxParse/wxParse.js');
let code = require('../../../utils/code');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.url);
    this.httpRequest(options.url);
  },
  httpRequest:function(url){
    let that = this;
    code.getHttpRequest('https://xuchaoyang.cn/Loginweb/ShowMessage', { url:url }).then((res) => {
      WxParse.wxParse("content", 'html', res.data.message, that, 5)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  wxParseImgLoad:function(e){
    console.log(e)
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