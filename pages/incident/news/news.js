// pages/incident/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    news:[],
    JaoWu:[],
    academic:[],
    show:"show"
  },
  getRequest:function(){
    let swiperList = [],that = this;
    wx.request({
      url: 'https://xuchaoyang.cn/Loginweb/GetMessageServlet',
      data:{},
      header:{
        'content-type': 'application/json' // 默认值
      },
      success(res){
        console.log(res.data);
        for(let i in res.data.message1){
          swiperList.push({
            id: i,
            type: 'image',
            image: res.data.message1[i].image,
            url:res.data.message1[i].url
          })
          that.setData({
            swiperList: swiperList,
            news: res.data.SchoolMessage,
            academic: res.data.ScienceMessage3,
            JaoWu:res.data.JaoWu,
            show:""
          })
          console.log(that.data.academic, res.data.ScienceMessage3)
        }
      }
    })
  },
  setClass:function(e){
    wx.navigateTo({
      url: '../../about/article/article?url=' + e.currentTarget.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRequest()
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