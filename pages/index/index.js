var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconList:[{
      id:"1",
      url:"grade/landing/landing?id=1",
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
        url:"grade/landing/landing?id=1",
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
      }],
    news: true,
    weather: true,
    class: true,
    wea:{
      temp:"",
      Maxtemp:"",
      Mintemp:"",
      site:"",
      wea:"",
      air_tips:"",
      background:"",
      icon:"",
      color:"",
      images:""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    this.getWeather();
  },
  getOpenid:function(){
    var that = this;
    wx.login({
      success(res) {
        if (res.code) {
          console.log(res.code)
          wx.request({
            url: 'https://xuchaoyang.cn/Loginweb/Login',
            data: {
              code:res.code
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(e) {
              console.log(e.data)
              if (e.data.NoState){
                app.globalData.isLog = false
                that.data.iconList[0].url = "grade/show/show";
                that.data.iconList[3].url = "incident/course/course";
                console.log("1")
                that.setData({
                  iconList: that.data.iconList
                })
              }
            }
          })
        } else {
          app.globalData.isLog = false;
        }
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
    let that = this, weather = [];
    let seteat = {
      images: "",
      color: "",
      icon: ""
    };
    this.getOpenid();
    this.setData({
      news: app.globalData.isNews,
      class:app.globalData.isClass,
      weather:app.globalData.isWeather
    })
  },
  getWeather:function(){
    let that = this, wea = this.data.wea, seteat = {};
    wx.request({
      url: 'https://xuchaoyang.cn/Loginweb/WeatherServlet',
      data:{
        cityid:101200102
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        let data = res.data.data;
        wea.temp = data.tem.substring(0,2);
        wea.Maxtemp = data.tem1.substring(0,2);
        wea.Mintemp = data.tem2.substring(0,2);
        wea.site = "WuHan";
        wea.wea = data.wea;
        seteat = that.getImage(data.wea_img);
        wea.air_tips = data.air_tips;
        wea.images = seteat.images;
        wea.icon = seteat.icon;
        wea.color = seteat.color;
        that.setData({
          wea:wea
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  getImage:function(icon){
    let seteat = {
      images:"",
      color:"",
      icon:""
    };
    if(icon == "yu"){
      seteat.images = "06";
      seteat.color = "#5dc8e1";
      seteat.icon = "icon-yu";
      return seteat;
    }if(icon == "yun" || icon == "yin"){
      seteat.images = "02";
      seteat.color = "#53b1ff";
      seteat.icon = "icon-yintian";
      return seteat;
    } if (icon == "qing") {
      seteat.images = "03";
      seteat.color = "#4cb4fb";
      seteat.icon = "icon-duoyun";
      return seteat;
    } if (icon == "xue") {
      seteat.images = "04";
      seteat.color = "#6ac0fe";
      seteat.icon = "icon-xue";
      return seteat;
    } 
    seteat.images = "01";
    seteat.color = "#53b1ff";
    seteat.icon = "icon-duoyun";
    return seteat;
  },
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