var app = getApp();
let getweek = require('../../utils/time');
let code = require('../../utils/code');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    iconList:[{
      id:"1",
      url:"",
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
      url:"",
      icon:"schedule",
      name:"课表"
    },{
      id:"5",
      url:"",
      icon:"punch",
      name:"绩点计算"
    },{
      id:"6",
      url:"incident/calendar/calendar",
      icon:"calendar",
      name:"校历"
    },{
      id:"7",
      url:"",
      icon:"examination",
      name:"考试安排"
    },{
      id:"8",
      url: "incident/news/news",
      icon:"news",
      name:"新闻"
    }],
    message:[],
    color:['#28cbb8','#ffca43','','',''],
    background:['#e6f9f7','#fef7e5','','','','',''],
    inform:[],
    course:[],
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
    },
    time:{
      date:10,
      month:10,
      day:7,
    },
    show:"show",
    classUrl:"",
    weekIndex:[6,0,1,2,3,4,5],
    isCourse:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getMessage:function(){  //消息
  console.log(this);
    let that = this;
    code.getHttpRequest('https://xuchaoyang.cn/onther/message.json').then((res)=>{
      that.setData({
        inform:res.data
      })
    });
  },
  
  getStore: function (week) {
    console.log("1")
    let that = this;
    wx.getStorage({
      key: 'course',
      success(res) {
        that.setData({ message: res.data })
        if (res.data[week] == null) {
          that.getrequestWeek(week);
        }
        console.log(res.data[week])
        that.getWeek(res.data[week])
      }, fail(e) {
        that.getrequestWeek(week);
      }
    })
  },
  getTime: function (e) {  //日期
    let time = new Date();
    let times = {
      date: "",
      month: "",
      day: "",
    };
    times.date = time.getDate();
    let day;
    switch (time.getDay()) {
      case 1: day = "一";
        break;
      case 2: day = "二";
        break;
      case 3: day = "三";
        break;
      case 4: day = "四";
        break;
      case 5: day = "五";
        break;
      case 6: day = "六";
        break;
      case 0: day = "日";
        break;
    }
    times.month = time.getMonth();
    times.day = day;
    console.log(times, times.date);
    this.setData({
      time: times
    })
  },
  onLoad: function (options) {
    console.log("1")
    this.getTime();
    this.getMessage();
    this.getStore(getweek.getWeek());
    this.getWeather(); 
  },
  getOpenid:function(){ //是否登陆
    var that = this;
    code.getLogin().then((res)=>{
      code.getHttpRequest('https://xuchaoyang.cn/Loginweb/Login',{code:res.code}).then((res)=>{
        console.log(res)
        if (res.data.NoState.length == 4){
          app.globalData.isLog = false;
          that.data.iconList[0].url = "grade/show/show";
          that.data.iconList[3].url = "incident/course/course";
          that.data.iconList[4].url = "grade/gpa/gpa";
          that.data.iconList[6].url = "grade/exam/exam";
          that.setData({ classUrl:"incident/course/course"});
          app.globalData.stuCampus = res.data.StuInfo.stuCampus;
          app.globalData.stuName = res.data.StuInfo.stuName;
          app.globalData.stuNo = res.data.StuInfo.stuNo;
          console.log(res.data.StuInfo.stuCampus, app.globalData.stuName );
          that.getWeather();
        } else {
          that.data.iconList[0].url = "grade/landing/landing?id=1";
          that.data.iconList[3].url = "grade/landing/landing?id=2";
          that.data.iconList[4].url = "grade/landing/landing?id=3";
          that.data.iconList[6].url = "grade/landing/landing?id=4";
        }
        that.setData({
          iconList: that.data.iconList
        })
      });
    })
  },
  getWeek:function(list){//处理课表
    let that = this, course = [], time = new Date(), isCourse = false;
    for (let i in list) {
     // list[i].className = list[i].className.slice(0, list[i].className.length - 8);
      if (list[i].index[0].week == that.data.weekIndex[time.getDay()]) {
        course.push({
          id: (parseInt(list[i].index[0].section) + 1),
          day: '今天',
          time: '第' + (parseInt(list[i].index[0].section)+1) + '节',
          name: list[i].className,
          site: list[i].place,
        })
      }
    }
    course.sort((a, b) => {
      return a.id - b.id
    });
    if (course.length == 0) {
      isCourse = true
    }
    that.setData({
      course: course,
      show: '',
      isCourse:isCourse
    })
  },
  getrequestWeek: function (week) {//获取课表
    let that = this, message = this.data.message;
    code.getLogin().then((res)=>{
      code.getHttpRequest('https://xuchaoyang.cn/Loginweb/ClassServlet',{code: res.code, week: week}).then((res)=>{
        wx.hideToast();
        console.log(res)
        let list = res.data;
        message[week] = res.data
        wx.setStorage({
          key: 'course',
          data: message,
        })
        that.getWeek(list)
      })
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
    if (app.globalData.isLogin){
      this.getrequestWeek(getweek.getWeek());
      
      app.globalData.isLogin = false;
    }
  },
  getWeather:function(){ //获取天气
    let that = this, wea = this.data.wea, seteat = {}, cityid = "";
    if (app.globalData.stuCampus == "武" || app.globalData.stuCampus == ""){
      cityid =101200102;
      wea.site = "WuHan";
    }else{
      cityid =101200801;
      wea.site = "JingZhou";
    }
    code.getHttpRequest('https://xuchaoyang.cn/Loginweb/WeatherServlet',{cityid:cityid}).then((res)=> {
      let data = res.data.data;
      wea.temp = data.tem.replace('℃','');
      wea.Maxtemp = data.tem1.replace('℃','');
      wea.Mintemp = data.tem2.replace('℃','');
      wea.wea = data.wea;
      seteat = that.getImage(data.wea_img);
      wea.air_tips = data.air_tips;
      wea.images = seteat.images;
      wea.icon = seteat.icon;
      wea.color = seteat.color;
      that.setData({
        wea:wea
      })
    });
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
  setClass:function(){
    if(this.data.classUrl.length != 0){
      wx.navigateTo({
        url: '../' + this.data.classUrl,
      })
    }
    
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