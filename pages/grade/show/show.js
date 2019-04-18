// pages/grade/show/show.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        array: [],
        index: 0,
        data:[],
        Project:[],
        TotalCredit:"",
        AverageScorePoint:"",
        color:[],
        user:"",
        passward:"",
        show:"show"
    },
      bindPickerChange(e) {
        let color = [];
        console.log('picker发送选择改变，携带值为', e.detail.value);
        for(let i = 0; i < this.data.data[e.detail.value].length; i++){
          if (parseInt(this.data.data[e.detail.value][i].score) >= 90){
            color.push("#11c1f3");
          } else if (parseInt(this.data.data[e.detail.value][i].score) > 80){
            color.push("#33cd5f");
          } else if (parseInt(this.data.data[e.detail.value][i].score) > 70) {
            color.push("#886aea");
          } else if (parseInt(this.data.data[e.detail.value][i].score) > 60) {
            color.push("#ffc900");
          }else{
            color.push("#CC0000");
          }
        }
        this.setData({
          index: e.detail.value,
          list:this.data.data[e.detail.value],
          TotalCredit:this.data.Project[e.detail.value].TotalCredit,
          AverageScorePoint: this.data.Project[e.detail.value].AverageScorePoint,
          color:color
        })
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.HttpRequest(this.data.user,this.data.passward)
    },
    refresh:function(){
      this.HttpRequest(this.data.user, this.data.passward)
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    HttpRequest:function(user,passward){
      let ScoreList = [], Project = [], data = [], array = [], color = [],semester = [];
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
                code:res.code
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                wx.hideToast();
                console.log(res.data)
                res.data.data.ScoreList.shift();
                res.data.data.Project.shift();
                ScoreList = res.data.data.ScoreList;
                Project = res.data.data.Project;
                for(let i in Project){
                  if (Project[i].Semester == 1){
                    semester.push("上学期");
                  }
                  if (Project[i].Semester == 2) {
                    semester.push("下学期");
                  }
                }
                for (let i = 0; i < Project.length; i++) {
                  data[i] = [];
                  array.push(Project[i].SchoolYear + ' ' + semester[i])
                  for (let j = 0; j < ScoreList.length; j++) {
                    if (Project[i].SchoolYear + ' ' + Project[i].Semester == ScoreList[j].AcademicYear) {
                      data[i].push(ScoreList[j])
                    }
                  }
                }

                data.reverse();
                array.reverse();
                for (let i = 0; i < data[0].length; i++) {
                  if (parseInt(data[0][i].score) >= 90) {
                    color.push("#11c1f3");
                  } else if (parseInt(data[0][i].score) > 80) {
                    color.push("#33cd5f");
                  } else if (parseInt(data[0][i].score) > 70) {
                    color.push("#886aea");
                  } else if (parseInt(data[0][i].score) > 60) {
                    color.push("#ffc900");
                  } else {
                    color.push("#CC0000");
                  }
                }
                that.setData({
                  list: data[0],
                  array: array,
                  data: data,
                  Project: Project,
                  TotalCredit: Project[Project.length - 1].TotalCredit,
                  AverageScorePoint: Project[Project.length - 1].AverageScorePoint,
                  color: color,
                  show:"",
                })
              }
            })
          }
        }
      })
      
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