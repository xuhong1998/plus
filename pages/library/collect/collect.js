// pages/library/collect/collect.js
var startX, startY, key, endX, endY, maxRight = 163;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    cardTeams:[]
  },
  drawStart : function(e){
    var touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    var cardTeams = this.data.cardTeams;
    for(var i in cardTeams){
      var data = cardTeams[i];
      data.startRight = data.right;
    }
    key = true;
  },
  drawEnd : function(e){
    console.log("drawEnd");
    var cardTeams = this.data.cardTeams;
    for(var i in cardTeams){
      var data = cardTeams[i];
      if(data.right <= 100/2){
        data.right = 0;
      }else{
        data.right = maxRight;
      }
    }
    this.setData({
      cardTeams:cardTeams
    });
  },
  drawMove : function(e){
    //console.log("drawMove");
    var self = this;
    var id = e.currentTarget.id;
    var cardTeams = this.data.cardTeams;
    if(key){
      var touch = e.touches[0];
      endX = touch.clientX;
      endY = touch.clientY;
      console.log("startX="+startX+" endX="+endX );
      if(endX - startX == 0)
        return ;
      var res = cardTeams;
      //从右往左
      if((endX - startX) < 0){
        console.log(id)
        var startRight = res[id].startRight;
        var change = startX - endX;
        startRight += change;
        if (startRight > maxRight)
          startRight = maxRight;
        res[id].right = startRight;
        // for(var k in res){
        //   var data = res[k];
        //   if(res[k].id == dataId){
        //     var startRight = res[k].startRight;
        //     var change = startX - endX;
        //     startRight += change;
        //     if(startRight > maxRight)
        //       startRight = maxRight;
        //     res[k].right = startRight;
        //   }
       // }
      }else{
        //从左往右
        var startRight = res[id].startRight;
        var change = endX - startX;
        startRight -= change;
        if (startRight < 0)
          startRight = 0;
        res[id].right = startRight;
        // for(var k in res){
        //   var data = res[k];
        //   if(res[k].id == dataId){
        //     var startRight = res[k].startRight;
        //     var change = endX - startX;
        //     startRight -= change;
        //     if(startRight < 0)
        //       startRight = 0;
        //     res[k].right = startRight ;
        //   }
        // }
      }
      self.setData({
        cardTeams:cardTeams
      });

    }
  },
  delServer:function(id){
    let no = this.data.list[id].no
    wx.login({
      success(res) {
        console.log(res.code)
        if (res.code) {
          wx.showToast({
            title: '删除中...',
            icon: "loading",
            duration: 10000
          });
          console.log(res.code)
          wx.request({
            url: 'https://xuchaoyang.cn/Loginweb/BookCollectServlet',
            data: {
              code: res.code,
              no:no,
              n: 4
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              wx.hideToast();
              console.log(res)
            },

          })
        }
      }
    })
  },
  delItem:function(e){
    let id = e.currentTarget.id;
    let newlist = [], newcardTeams = []
    console.log(id)
    for(let i in this.data.list){
      if(i != id){
        console.log(id)
        newlist.push(this.data.list[i]);
        newcardTeams.push(this.data.cardTeams[i])
      }
    }
    this.delServer(id);
    this.setData({
      list:newlist,
      cardTeams: newcardTeams
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.HttpRequest();
  },
  HttpRequest: function () {
    let that = this, index = [], Allpage = 1, cardTeams = [];
    wx.login({
      success(res) {
        console.log(res.code)
        if (res.code) {
          wx.showToast({
            title: '加载中...',
            icon: "loading",
            duration: 10000
          });
          console.log(res.code)
          wx.request({
            url: 'https://xuchaoyang.cn/Loginweb/BookCollectServlet',
            data: {
              code: res.code,
              n: 2
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log(res.data)
              for(let i in res.data.book){
                cardTeams.push({
                  right: 0,
                  startRight: 0
                })
              }
              wx.hideToast();
              console.log(res.data.book)
              that.setData({
                list: res.data.book,
                cardTeams: cardTeams
              })
              
              
            },

          })
        }
      }
    })
  },
  setBook: function (e) {
    let isbn = "";
    console.log(this.data.list)
    if (this.data.list[e.currentTarget.id].isbn == "" || this.data.list[e.currentTarget.id].isbn == undefined) {
      isbn = "0";
    } else {
      isbn = this.data.list[e.currentTarget.id].isbn
    }
    console.log(this.data.list[e.currentTarget.id].isbn, this.data.list[e.currentTarget.id].no)
    wx.navigateTo({
      url: '../detail/detail?no=' + this.data.list[e.currentTarget.id].no + '&isbn=' + isbn
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