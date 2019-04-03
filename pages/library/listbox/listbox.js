// pages/library/listbox/listbox.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[],
        index:1,
        Allpage:1,
        page:1,
        name:'石油',
        inputValue:"",
        history: ["墨菲定律", "c语言", "心理学", "物理", "白夜行", "人生十论", "明朝那些事", "月亮与六便士","挪威的森林"],
        show:true,
        about:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      // let list = [];
      // this.HttpRequest("石油",1,list);
      // this.setData({
      //   name:"石油",
      // })
    },
    pullDown: function () {
      if(this.data.page + 1 < this.data.Allpage){
        let page = this.data.page + 1;
        let list = this.data.list;
        this.HttpRequest(this.data.name,page,list);
        this.setData({
          page:page,
        })
      }
    },
    navigate:function(){
      if(this.data.inputValue != ""){
          let list = [];
          this.HttpRequest(this.data.inputValue,1,list);
          this.setData({
            show:false,
          })
      }
    },
    HttpRequest:function(name,page,list){
      let that = this, index = [], Allpage = 1;
      wx.showLoading({
        title: '玩命加载中',
      });
      if(page> this.data.Allpage){
        return;
      }
      wx.request({
        url: 'https://xuchaoyang.cn/Loginweb/BookServlet?bookName=' + name + '&page='+ page,
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data.length == 6){
            wx.hideLoading();
            that.setData({
              show: false,
              about: false,
              name:name,
            })
            return;
          }
          if (JSON.stringify(res.data) == "{}"){
            wx.hideLoading();
            return;
          }
          Allpage = res.data.page;
          index = Object.keys(res.data.book);
          for (let i = 0; i < index.length; i++) {
            list.push(res.data.book[index[i]])
          }
          console.log(list)
          that.setData({
            Allpage: Allpage,
            list: list,
            name:name,
          });
          wx.hideLoading();
        }
      })
    },
    onReachBottom:function(){
      console.log("1");
      this.pullDown();
    },
    bindKeyInput:function(e){
      this.setData({
        inputValue: e.detail.value
      })
    },
    setNavigator:function(e){
      let list = [];
      this.HttpRequest(e.currentTarget.id,1,list);
      this.setData({
        name: e.currentTarget.id,
        show: false,
      })
    },
    setBook:function(e){
      wx.redirectTo({
        url: '../detail/detail?no='+e.currentTarget.id,
      })
    }
});