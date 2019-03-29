Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconList:[{
      id:"1",
      url:"grade/show/show",
      icon:"grade",
      name:"成绩"
    },{
      id:"2",
        url:"library/listbox/listbox",
      icon:"book",
      name:"图书"
    },{
      id:"3",
        url:"library/collect/collect",
      icon:"collect",
      name:"图书收藏"
    },{
      id:"4",
      url:"incident/course/course",
      icon:" schedule",
      name:"课表"
    },{
      id:"5",
        url:"incident/calendar/calendar",
      icon:" calendar",
      name:"校历"
    },{
      id:"6",
      url:"",
      icon:"examination ",
      name:"考试安排"
    },{
      id:"7",
      url:"",
      icon:"news",
      name:"新闻"
    },{
      id:"8",
      url:"",
      icon:"punch",
      name:"打卡"
    }],
    inform:[{
      comment:"消息",
      name:"长江大学教务小程序上线了"
    }],
    course:[{
      day:"今天",
      time:"3-6",
      name:"毛泽东思想和中国特色社会主义",
      site:"B教b205",
      color:"#28cbb8",
      background:"#e6f9f7"
    }, {
        day: "明天",
        time: "3-6",
        name: "石油工程",
        site: "B教b205",
        color: "#ffca43",
        background: "#fef7e5"
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    wx.login({
      success(res){
        console.log(res.code)
      }
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