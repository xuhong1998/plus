Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		data: {},
		average: 0,
		interest: 0,
		sum: 0,
		index: [],
		motMoney: [],
		essence: [],//本金
		inter: [],//利息
		surplus: [],//剩余
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(options)
		const bean = JSON.parse(options.id);
		console.log(bean);
		// const bean = {
		// 	findMoney:10,
		// 	findRate:3.25,
		// 	year:	1,
		// 	money:10,
		// 	rate:4.9,
		// 	select:1
		// };
		let findBean = {
			money: bean.findMoney,
			rate: bean.findRate,
			year: bean.year,
		};
		let beans = {
			money: bean.money,
			rate: bean.rate,
			year: bean.year
		};
		let findTemp;
		let temp;
		if (bean.select == 0) {
			findTemp = this.interest(findBean);
			temp = this.interest(beans);
		} else if (bean.select == 1) {
			findTemp = this.principal(findBean);
			temp = this.principal(bean);
		}
		this.binding(findTemp, temp);
		this.setData({
			data: bean
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function (options) {
		
	},
	interest: function (bean) {//等额本息
		let temp = bean.money * 10000;
		let interests;
		let index = [];
		let motMoney = [];
		let essence = [];//本金
		let inter = [];//利息
		let surplus = [];
		let month = bean.rate / 1200;
		let average = (temp * month * Math.pow(1 + month, bean.year * 12)) / (Math.pow(1 + month, bean.year * 12) - 1);
		for (let i = 1; i <= bean.year * 12; i++) {
			motMoney.push(average.toFixed(2));
			index.push(i);
			inter.push((temp * month).toFixed(2));
			essence.push((motMoney[i - 1] - inter[i - 1]).toFixed(2));
			surplus.push((temp - essence[i - 1]).toFixed(2));
			temp = temp - essence[i - 1];
		}
		interests = ((average * bean.year * 12) - bean.money * 10000).toFixed(2);
		let data = {
			average: average.toFixed(2),
			index: index,
			motMoney: motMoney,
			essence: essence,
			inter: inter,
			surplus: surplus,
			interest: interests,
			sum: (average * bean.year * 12).toFixed(2)
		};
		console.log(this.data.surplus);
		return data;	
	},
  principal:function(bean){//等额本金
    let temp = bean.money * 10000;
    let speed;
    let interests = 0;
    let index = [];
    let motMoney = [];
    let essence = [];//本金
    let inter = [];//利息
    let surplus = [];
    let month =  bean.rate/1200;
    let average = temp / (bean.year*12);
    for (let i = 1; i <= bean.year*12; i++){
      index.push(i);
      essence.push(average.toFixed(2));
      inter.push((temp*month).toFixed(2));
      motMoney.push((temp*month+average).toFixed(2));
      surplus.push((temp - average).toFixed(2));
      interests = interests + (temp * month);
      temp = temp - average;
    }
    let data = {
      average: motMoney[0],
      index:index,
      motMoney:motMoney,
      essence:essence,
      inter:inter,
      surplus:surplus,
      interest:interests.toFixed(2),
      sum:(bean.money*10000 + interests).toFixed(2)
		};
    return data;
  },
  binding:function(findTemp,temp){
    for(let i = 0; i < temp.index.length; i++){
      this.data.motMoney.push((Number(temp.motMoney[i])+Number(findTemp.motMoney[i])).toFixed(2));
      this.data.essence.push((Number(temp.essence[i])+Number(findTemp.essence[i])).toFixed(2));
      this.data.inter.push((Number(temp.inter[i])+Number(findTemp.inter[i])).toFixed(2));
      this.data.surplus.push((Number(temp.surplus[i])+Number(findTemp.surplus[i])).toFixed(2));
    }
    console.log(this.data.surplus)
    this.setData({
      average:this.data.motMoney[0],
      index:temp.index,
      motMoney:this.data.motMoney,
      inter:this.data.inter,
      essence:this.data.essence,
      surplus:this.data.surplus,
      interest:(Number(temp.interest)+Number(findTemp.interest)).toFixed(2),
			sum:(Number(temp.sum)+Number(findTemp.sum)).toFixed(2)
    });
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