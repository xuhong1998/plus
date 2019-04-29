// pages/incident/calendar/calendar.js
let code = require('../../../utils/code');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data_style:[],
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getCalendar: function (e) {
    let that = this;
    code.getHttpRequest('https://xuchaoyang.cn/onther/calendar.json',{}).then((res)=>{
      let list = res.data;
      for (let i in list) {
        list[i].distance = that.getTime(list[i].month - 1, list[i].day)
      }
      that.setData({
        list: list
      })
    })
  },
  onLoad: function (options) {
    let date = new Date();
    let data_style = [];
    data_style.push({
      month: 'current',
      day: date.getDate(),
      color: 'white',
      background: '#b49eeb'
    });
    this.setData({
      data_style: data_style
    })
    this.getCalendar();
    
  },
  dayClick: function (event){
    console.log(event.detail)
    let data_style = this.data.data_style;
    if(data_style.length = 2){
      data_style.pop();
    }
    data_style.push({
      month: 'current',
      day: event.detail.day,
      color: 'white',
      background: '#b49eeb'
    })
    this.setData({
      data_style:data_style
    })
  },
  getTime(month,day){
    let now = new Date();
    let endDate = new Date(2019,month,day);
    let leftTime = endDate.getTime() - now.getTime();
    let dd = parseInt(leftTime / (1000 * 60 * 60 * 24), 10);//计算剩余的天数
    return dd;
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