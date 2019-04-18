// pages/incident/course/course.js
let time = require('../../../utils/time');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // colorArrays: ["#39b54a", "#8dc63f", "#1cbbb4", "#8dc63f", "#0081ff", "#9c26b0", "#8799a3", "#8799a3"],
    colorArrays: ["bg-red", "bg-green", "bg-blue", "bg-purple", "bg-mauve", "bg-pink", "bg-brown", "bg-grey"],
    array:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
    wlist: [
    ],
    week:"",
    weekArray:[],
    px:130,
    several:2,
  },
  getrequestWeek: function (week) {
    var that = this;
    wx.showToast({
      title: '加载中...',
      icon: "loading",
      duration: 10000
    });
    wx.login({
      success(res) {
        if (res.code) {
          console.log(res.code)
          wx.request({
            url: 'https://xuchaoyang.cn/Loginweb/ClassServlet',
            data: {
              code: res.code,
              week:week
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              wx.hideToast();
              console.log(res.data,that.data.wlist)
              let list = res.data;
              for(let i in res.data){
                list[i].className = list[i].className.slice(0, list[i].className.length-8);
                console.log(list[i].className)
              }
              that.setData({
                wlist:res.data
              })
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  bindPickerChange(e) {
    let week = parseInt(e.detail.value) + 1;
    console.log(week)
    this.getrequestWeek(week)
    this.setData({
      week: e.detail.value,
    })
  },
  onLoad: function (options) {
    let now = new Date();
    this.setData({
      several:now.getDay() - 1,
      week:time.getWeek() - 1,
      weekArray: time.getweekArray(),
    });
    this.getrequestWeek(time.getWeek());
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