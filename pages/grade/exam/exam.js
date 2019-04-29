// pages/grade/exam/exam.js
let code = require('../../../utils/code');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:["2018-2019下学期考试","2018-2019下学期课程"],
    index:0,
    exam:[],
    show:'',
    getRotate:''
  },
  bindPickerChange(e) {
    this.setData({
      show: e.detail.value,
      index: e.detail.value,
    })
  },
  getrequestClass: function (week) {
    var that = this;
    wx.showToast({
      title: '加载中...',
      icon: "loading",
      duration: 10000
    });
    code.getLogin().then((res) => {
      code.getHttpRequest('https://xuchaoyang.cn/Loginweb/GetExamServlet', { code: res.code }).then((res) => {
        wx.hideToast();
        console.log(res.data)
        that.setData({
          exam: res.data.Exam,
          course: res.data.Course
        })
      })
    })
  },
  getRotate:function(){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getrequestClass();
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