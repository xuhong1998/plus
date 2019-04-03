// pages/about/card/card.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news:true,
    weather:true,
    class: true,
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
  onShow: function () {
    this.setData({
      news: app.globalData.isNews,
      class: app.globalData.isClass,
      weather: app.globalData.isWeather
    })
  },
  SetShadow:function(e){
    if (e.currentTarget.id == "news"){
      this.data.news = !this.data.news;
      app.globalData.isNews = !app.globalData.isNews;
      this.setData({news:this.data.news})
      console.log(this.data.news);
    }
    if (e.currentTarget.id == "class") {
      this.data.class = !this.data.class;
      app.globalData.isClass = !app.globalData.isClass;
      this.setData({class: this.data.class})
    }
    if (e.currentTarget.id == "weather") {
      this.data.weather = !this.data.weather;
      app.globalData.isWeather = !app.globalData.isWeather;
      this.setData({weather: this.data.weather})
    }
  }
})