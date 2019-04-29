//login.js
//获取应用实例
var app = getApp();
let code = require('../../../utils/code');
Page({
  data: {
    remind: '加载中',
    help_status: false,
    userid_focus: false,
    passwd_focus: false,
    userid: '',
    passwd: '',
    angle: 0,
    page:0,
    isbind:false
  },
  onLoad:function(e){
    if(e.id != null){
      this.setData({
        page: e.id
      })
    }
    
  },
  getlanding:function (userName, userpassword){
    let that = this;
    code.getLogin().then((res) => {
      wx.showToast({
        title: '绑定中...',
        icon: "loading",
        duration: 10000
      });
      code.getHttpRequest('https://xuchaoyang.cn/Loginweb/BoundStuNoServlet', { code: res.code, userName: userName, userpassword: userpassword }).then((e) => {
        that.setData({
          isbind: false
        })
        console.log(e);
        if (e.data.state.length == 5) {
          wx.showToast({
            title: '账户或密码错误',
            icon: 'success',
            image: '../../../images/loser.png',
            duration: 4000
          })
          return;
        }
        console.log(e)
        app.globalData.isLogin = true;
        // wx.setStorage({
        //   key: 'id',
        //   data: userName
        // // })
        wx.clearStorage();
        if (e.data.state) {
          if (that.data.page == 1) {
            wx.redirectTo({
              url: '../show/show',
            })
          }
          if (that.data.page == 2) {
            wx.redirectTo({
              url: '../../incident/course/course',
            })
          }
          if (that.data.page == 3) {
            wx.redirectTo({
              url: '../gpa/gpa',
            })
          }
          if (that.data.page == 4) {
            wx.redirectTo({
              url: '../exam/exa',
            })
          }
          wx.showToast({
            title: '绑定成功',
            icon: 'success',
            duration: 4000
          })
        } else {
          wx.showToast({
            title: '账户或密码错误',
            icon: 'success',
            duration: 4000
          })
        }
      })
    })
  },
  onReady: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });
  },
  bind: function () {
    if(this.data.isbind){
      return;
    }
    var that = this;
    if (!that.data.userid || !that.data.passwd) {
      wx.showToast({
        title: '账号及密码不能为空',
        icon: 'none',
        duration: 4000
      });
      return;
    }
    that.setData({
      isbind:true
    });
    this.getlanding(that.data.userid, that.data.passwd);
  },
  useridInput: function (e) {
    this.setData({
      userid: e.detail.value
    });
    if (e.detail.value.length >= 9) {
      wx.hideKeyboard();
    }
  },
  passwdInput: function (e) {
    this.setData({
      passwd: e.detail.value
    });
  },
  inputFocus: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': true
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': true
      });
    }
  },
  inputBlur: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': false
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': false
      });
    }
  },
  tapHelp: function (e) {
    if (e.target.id == 'help') {
      this.hideHelp();
    }
  },
  showHelp: function (e) {
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function (e) {
    this.setData({
      'help_status': false
    });
  }
});