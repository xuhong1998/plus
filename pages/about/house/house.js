Page({

  /**
   * 页面的初始数据
   */
  data: {
    lastX: 0,
    lastY: 0,
    left: 0,
    percent: -33.33333,
    index: 0,
    colorOne:'#000000',
    colorTwo:'#ffffff',
    info:"",
		findSelect:0,
    data:{
      select:0,
      money:0,
      year:1,
      rate:4.9,
    },
		findData:{
			select: 0,
			findMoney:0,
			findRate:3.25,
			money: 0,
			year: 1,
			rate: 4.9,
		}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  jumpBtn:function(){
		const that = this.data.data;
    if(this.data.data.money == 0||this.data.data.year == 0){
      return;
    }else {
      wx.navigateTo({
        url: '/pages/houseText/houseText?id=' + JSON.stringify(that)
      })
    }
  },
  rateInput:function(even){
    this.setData({data:{select:this.data.data.select,money:this.data.data.money,year:this.data.data.year,rate: even.detail.value}})
  },
  yearInput:function(even){
    this.setData({data:{select:this.data.data.select,money:this.data.data.money,year: even.detail.value,rate:this.data.data.rate}})
  },
  moneyInput:function(even){
    this.setData({data:{select:this.data.data.select,money: even.detail.value,year:this.data.data.year,rate:this.data.data.rate}})
  },
	radioChange:function(even){
		if (even.detail.id == 1) {
			this.setData({ data: { select: 0, money: this.data.data.money, year: this.data.data.year, rate: this.data.data.rate } });
		} else if (even.detail.id == 2) {
			this.setData({  data: { select: 1, money: this.data.data.money, year: this.data.data.year, rate: this.data.data.rate } });
		}
	},
	clickBtn:function(even){
		this.select(even.currentTarget.id);
	},
  select:function(id){
    if (id == 1){
      this.setData({ left:0, index:0,info:"",data:{select:0,money:0,year:0,rate:4.9}});
    } else if(id == 2){
      this.setData({left:250,index:1,info:"",data:{select:0,money:0,year:0,rate:3.25}})
    }else if(id ==3){
      this.setData({ left: 500, index: 2 })
    }
  },
  touchStart: function (even) {
    this.setData({
      lestX: even.touches[0].pageX,
      lestY: even.touches[0].pageY
    })
  },
  touchEnd: function (even) {
    if (even.changedTouches[0].pageX - this.data.lestX > 50) {
      if (this.data.index >= 2) {
        return
      } else {
        this.setData({left: this.data.left + 250, index: ++this.data.index})
        this.select(this.data.index+1);
      }
    }
    if (even.changedTouches[0].pageX - this.data.lestX < -50) {
      if (this.data.left <= 0) {
        return
      } else {
        this.setData({left: this.data.left - 250, index: -- this.data.index});
        this.select(this.data.index+1);
      }
    }
  },
	findSelect:function(even){
		if (even.detail.id == 1) {
			this.setData({findSelect:0})
		}else{
			this.setData({ findSelect: 1 })
		}
	},
  back_houtai:function(even){
		if (even.detail.value.findRate === ""){
			even.detail.value.findRate = 3.25
		}
		if (even.detail.value.rate === "") {
			even.detail.value.rate = 4.9
		}
    this.setData({
			findData:{
				select: this.data.findSelect,
				findMoney: even.detail.value.findMoney,
				findRate: even.detail.value.findRate,
				money: even.detail.value.money,
				year: even.detail.value.year,
				rate: even.detail.value.rate,
			}
		})
		console.log(this.data.findData)
  },
	findBtn:function(){
		let that = this.data.findData;
		console.log(that);
		if (this.data.findData.findmoney == 0 || this.data.findData.money == 0 || this.data.findData.year == 0){
			return;
		}else{
			wx.navigateTo({
        url: '../houseText/houseText?id=' + JSON.stringify(that)
			})
		}
	},
  onLoad: function (options) {

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