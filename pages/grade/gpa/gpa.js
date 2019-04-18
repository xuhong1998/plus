// pages/grade/gpa/gpa.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    required:[],
    optional:[],
    rests:[],
    ScoreList: [],
    total:0,
    control:{
      style: "",
      open:false
    },
    show:"isshow",
    modalName:"",
    data:{
      gpa:"",
      credit:"",
      score:"",
      sumGpa:"",
      sumCredit:"",
      sumScore:""
    }
  },
  setControl:function(e){
    let open = this.data.control.open, total = 0;
    this.data.control.open = !open;
    console.log(!this.data.control.open)
    if (this.data.control.open){
      this.data.control.style = "control";
      for (let i in this.data.ScoreList){
        this.data.ScoreList[i].isopen = true;
        this.data.ScoreList[i].style = "checked";
      }
    }else{
      this.data.control.style = "";
      for (let i in this.data.ScoreList) {
        this.data.ScoreList[i].isopen = false;
        this.data.ScoreList[i].style = "";
      }
    }
    for (let i in this.data.ScoreList) {
      if (this.data.ScoreList[i].isopen) {
        total = total + 1
      }
    }
    this.setData({
      control: this.data.control,
      ScoreList: this.data.ScoreList,
      total:total,
    })
  },
  click:function(e){
    let total = 0;
    this.data.ScoreList[e.currentTarget.id].isopen = !this.data.ScoreList[e.currentTarget.id].isopen;
    if (this.data.ScoreList[e.currentTarget.id].isopen){
      this.data.ScoreList[e.currentTarget.id].style = "checked";
    }else{
      this.data.ScoreList[e.currentTarget.id].style = ""
    }
    for (let i in this.data.ScoreList){
      if (this.data.ScoreList[i].isopen) {
        total = total + 1
      } else{
        this.data.control.open = false;
        this.data.control.style = "";
      }
    }
    this.setData({
      ScoreList: this.data.ScoreList,
      total: total,
      control: this.data.control,
    })
    console.log(this.data.ScoreList)
  },
  hideModal(e) {
    this.setData({
      modalName:""
    })
  },
  HttpRequest: function (user, passward) {
    let ScoreList = [], Project = [], required = [], optional = [], newsArr = [], rests = [];
    let that = this;
    wx.showToast({
      title: '加载中...',
      icon: "loading",
      duration: 10000
    });
    wx.login({
      success(res) {
        console.log(res.code)
        if (res.code) {
          console.log(res.code)
          wx.request({
            url: 'https://xuchaoyang.cn/Loginweb/ScoreServlet',
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              wx.hideToast();
              console.log(res)
              res.data.data.ScoreList.shift();
              ScoreList = res.data.data.ScoreList;
              console.log(ScoreList);
              for(let i in ScoreList){
                if (parseInt(ScoreList[i].FinalScore) >= 90) {
                  ScoreList[i].color = "#11c1f3";
                } else if (parseInt(ScoreList[i].score) > 80) {
                  ScoreList[i].color = "#33cd5f";
                } else if (parseInt(ScoreList[i].score) > 70) {
                  ScoreList[i].color = "#886aea";
                } else if (parseInt(ScoreList[i].score) > 60) {
                  ScoreList[i].color = "#ffc900";
                } else {
                  ScoreList[i].color = "#CC0000";
                }
                ScoreList[i].id = i;
                ScoreList[i].isopen = false;
                ScoreList[i].style = ""
                if (ScoreList[i].CourseCategory == "必修" || ScoreList[i].CourseCategory == "分组必修"){
                  if (ScoreList[i].FinalScore != 0){
                    required.push(ScoreList[i]);
                    newsArr.push(ScoreList[i])
                 }          
                }else if (ScoreList[i].CourseCategory == "选修") {
                  optional.push(ScoreList[i])
                  newsArr.push(ScoreList[i])
                }else{
                  rests.push(ScoreList[i])
                  newsArr.push(ScoreList[i])
                }
              }
              that.data.data.sumGpa = res.data.data.SchoolCollect.AverageScorePoint;
              that.data.data.sumCredit = res.data.data.SchoolCollect.TotalCredit;
              console.log(required)
              that.setData({
                ScoreList: newsArr,
                required:required,
                optional: optional,
                rests: rests,
                show:"",
                data:that.data.data
              })
            }
          })
        }
      }
    })

  },
  getGPA:function(){
    let a = 0,b = 0,temp = 0;
    for (let i in this.data.required){
      a = a + (parseFloat(this.data.required[i].AchievementPoint) * parseFloat(this.data.required[i].credit));
      temp = temp + parseFloat(this.data.required[i].credit);
      if (this.data.required[i].AchievementPoint != 0){
        b = b + parseFloat(this.data.required[i].credit);
      }
    }
    console.log(b,temp, a/temp , this.data.required.length)
  },
  getCount:function(){
    let molecule = 0, denominator = 0,temp = 0,open = false;
    for(let i in this.data.ScoreList){
      if(this.data.ScoreList[i].isopen){
        open = true;
        molecule = molecule + (parseFloat(this.data.ScoreList[i].AchievementPoint) * parseFloat(this.data.ScoreList[i].credit));
        temp = temp + (parseFloat(this.data.ScoreList[i].FinalScore) * parseFloat(this.data.ScoreList[i].credit));
        denominator = denominator + parseFloat(this.data.ScoreList[i].credit);
        console.log(this.data.ScoreList[i])
      }
    }
    if(!open){
      wx.showToast({
        title: '至少选择一门课',
        icon: 'none',
        duration: 4000
      });
      return;
    }
    this.getGPA();
    console.log(molecule / denominator, molecule, denominator)
    this.data.data.gpa = (molecule / denominator).toFixed(3);
    this.data.data.credit = (temp/denominator).toFixed(2)
    this.data.data.score = (denominator).toFixed(1)
    this.setData({
      modalName:"show",
      data:this.data.data
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.HttpRequest();
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