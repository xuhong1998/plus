Page({

  /**
   * 页面的初始数据
   */
  data: {
    collection:[],
    kind:[],
    name:[],
    isName:[],
    value:[],
    isValue:[],
    show:"noshow",
    no:"",
    isbn:"",
    nameShow:"",
    image:"",
    bookName:""
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
    this.setBook(this.data.no)
  },
  onLoad: function (options) {
    console.log(options.no,options.isbn)
    this.setData({
      no: options.no,
      isbn: options.isbn
    })
    this.getLibrary();

  },
  getBook:function(){
    let kind = [], that = this, name = [], value = [];
    console.log("https://xuchaoyang.cn/Loginweb/DouBanServlet?isbn=" + that.data.isbn)
    wx.showToast({
      title: '加载中...',
      icon: "loading",
      duration: 10000
    });
    wx.request({
      url: 'https://xuchaoyang.cn/Loginweb/DouBanServlet',
      data: {
        isbn:that.data.isbn
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideToast();
        if(res.data.state.length == 5){
          kind = {
            bookName: that.data.bookName,
            image: that.data.image
          }
          that.setData({
            name:that.data.isName,
            value:that.data.isValue,
            show: "",
            nameShow:"noshow",
            kind:kind
          })
          console.log(that.data.isName,that.data.isValue)
          return;
        }
        if (that.data.isbn.replace(/-/g, "") != res.data.info.value[res.data.info.value.length - 1]) {
          console.log(1);
          kind = {
            bookName: that.data.bookName,
            image: that.data.image
          }
          that.setData({
            name: that.data.isName,
            value: that.data.isValue,
            show: "",
            nameShow: "noshow",
            kind: kind
          })
          console.log(that.data.isName, that.data.isValue)
          return;
        }
        console.log(res.data);
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
        no:that.data.no
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        collection = res.data.collection;
        that.setData({
          collection:collection,
          isName:res.data.bookinfo.name,
          isValue:res.data.bookinfo.value,
          image:res.data.image,
          bookName:res.data.bookinfo.bookName
        })
        console.log(collection)
        that.getBook();  
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