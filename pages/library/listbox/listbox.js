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
        hot: ["墨菲定律","c语言", "心理学", "物理", "白夜行", "人生十论", "明朝那些事", "月亮与六便士","挪威的森林"],
        history: [],
        isHistory:false,
        isHot:false,
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
      this.getHistory();
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
    getHistory:function(){
      let isHistory = false, that = this;
      wx.login({
        success(res){
          console.log(res.code)
         if(res.code){
            wx.request({
              url: 'https://xuchaoyang.cn/Loginweb/BookHistoryServlet',
              data:{
                code:res.code
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res){
                if (res.data.history.length > 0){
                  isHistory = true
                }
                that.setData({
                  history:res.data.history,
                  isHistory:isHistory,
                  isHot:true
                })             
              }
            })
         }
        }
      })
    },
    HttpRequest:function(name,page,list){
      let that = this, index = [], Allpage = 1;
      wx.showLoading({
        title: '玩命加载中',
      });
      if(page> this.data.Allpage){
        return;
      }
      wx.login({
        success(res){
          if(res.code){
            wx.request({
              url: 'https://xuchaoyang.cn/Loginweb/SelectBookServlet',
              data: {
                bookName:name,
                page:page,
                code:res.code
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                if (res.data.length == 6) {
                  wx.hideLoading();
                  that.setData({
                    show: false,
                    about: false,
                    name: name,
                  })
                  return;
                }
                if (JSON.stringify(res.data) == "{}") {
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
                  name: name,
                });
                wx.hideLoading();
              }
            })
          }
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
      let isbn = ""
      if (this.data.list[e.currentTarget.id].isbn == ""){
        isbn = "0";
      }else{
        isbn = this.data.list[e.currentTarget.id].isbn
      }
      console.log(this.data.list[e.currentTarget.id].isbn, this.data.list[e.currentTarget.id].no)
      wx.navigateTo({
        url: '../detail/detail?no=' + this.data.list[e.currentTarget.id].no + '&isbn=' + isbn
      })
    }
});