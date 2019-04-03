// pages/incident/calendar/calendar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data_style:[],
    list:[{
      month:4,
      day:1,
      festival:"全国计算机等级考试",
      remark:"2019年全国计算机等级考试（NCRE）将举办四次考试",
      distance:30
    },{
      month:4,
      day:5,
      festival:"清明节",
      remark:"国家法定节日放假3天",
      distance:34
    },{
      month:4,
      day:1,
      festival:"全国英语等级考试",
      remark:"全国英语等级考试（Public English Test System，简称PETS，下同）是教育部考试中心设计并实施的全国性英语能力评价体系。",
      distance:30
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
      data_style:data_style
    })
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