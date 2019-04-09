Page({

  /**
   * 页面的初始数据
   */
  data: {
    collection:[],
    kind:[],
    name:[],
    value:[],
    show:"noshow",
    no:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  setBook:function(no){
    wx.login({
      success(res) {
        console.log(res.code)
        if (res.code) {
          wx.showToast({
            title: '收藏中...',
            icon: "loading",
            duration: 10000
          });
          console.log(res.code)
          wx.request({
            url: 'https://xuchaoyang.cn/Loginweb/BookCollectServlet',
            data: {
              code: res.code,
              no:no,
              n:3
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                console.log(res);
                wx.hideToast();
                // wx.showToast({
                //   title: '收藏成功...',
                //   icon: "loading",
                //   duration: 500
                // });
            },
            
          })
        }
      }
    })
  },
  getCollect:function(e){
    this.setBook(123455)
  },
  onLoad: function (options) {
    this.getBook();
    this.getLibrary();
  },
  getBook:function(){
    let kind = [], that = this, name = [], value = [];
    wx.showToast({
      title: '加载中...',
      icon: "loading",
      duration: 10000
    });
    wx.request({
      url: 'https://xuchaoyang.cn/Loginweb/DouBanServlet?No=30397063',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideToast();
        console.log(res.data.info.name);
        kind = res.data;
        name = res.data.info.name;
        value = res.data.info.value
        that.setData({
          kind: kind,
          value: value,
          name: name,
          show:""
        })
      }
    })
  },
  getLibrary:function(){
    let collection = [],that = this;
    wx.request({
      url: 'https://xuchaoyang.cn/Loginweb/BookInfoServlet',
      data:{
        no:123
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        collection = res.data.collection;
        that.setData({
          collection:collection
        })
        console.log(collection)
      }
    })
  },
  setIndex:function(e){
    wx.navigateTo({
      url: '../collect/collect',
    })
  },
  setListbox:function(e){
    wx.navigateTo({
      url: '../listbox/listbox',
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