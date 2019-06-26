var Moment = require("../../utils/moment.js");
var DATE_LIST = [];
var DATE_YEAR = new Date().getFullYear();
var DATE_MONTH = new Date().getMonth() + 1;
var DATE_DAY = new Date().getDate();
const config = require('../../utils/config.js')
const common = require('../../utils/common.js').CmsConfig
Page({
	data: {
		maxMonth: 7, //最多渲染月数
		dateList: [],
		systemInfo: {},
		weekStr: ['日', '一', '二', '三', '四', '五', '六'],
		checkInDate: Moment(new Date()).format('YYYY-MM-DD'),
		checkOutDate: Moment(new Date()).add(1, 'day').format('YYYY-MM-DD'),
		markcheckInDate: false, //标记开始时间是否已经选择
		markcheckOutDate: false, //标记结束时间是否已经选择
		cNum: 0,
		firstNum: Moment(new Date()).format('YYYY-MM-DD').split('-')[0]  + Moment(new Date()).format('YYYY-MM-DD').split('-')[1]  + Moment(new Date()).format('YYYY-MM-DD').split('-')[2],
		twoNum: Moment(new Date()).format('YYYY-MM-DD').split('-')[0] + Moment(new Date()).format('YYYY-MM-DD').split('-')[1] + Moment(new Date()).format('YYYY-MM-DD').split('-')[2],
		server: config.server,
		chooseData:false,
		year: DATE_YEAR,
		month: DATE_MONTH,
		startT: Moment(new Date()).format('YYYY-MM-DD').split('-')[0] + '-' +Moment(new Date()).format('YYYY-MM-DD').split('-')[1] + '-' + Moment(new Date()).format('YYYY-MM-DD').split('-')[2] ,
		endT: Moment(new Date()).format('YYYY-MM-DD').split('-')[0] + '-' + Moment(new Date()).format('YYYY-MM-DD').split('-')[1] + '-' + Moment(new Date()).format('YYYY-MM-DD').split('-')[2],
		height:0,
		isLong: false,
		record:[],
		moneyCount:'0',
		today:0,
		institutionNumber: '',
		saleNumber: ''
	},
	onLoad: function (options) {
		// 页面初始化 options为页面跳转所带来的参数
		var saleInfo = wx.getStorageSync('saleInfo')
		console.log(saleInfo)
		this.setData({
			institutionNumber: saleInfo.institutionNumber,
			saleNumber: saleInfo.Number
		})
		this.getData()
		this.createDateListData();
		var _this = this;
		// 页面初始化 options为页面跳转所带来的参数
		wx.getSystemInfo({
			success: function (res) {
				console.log(res);
				// 可使用窗口宽度、高度
				console.log('height=' + res.windowHeight);
				console.log('width=' + res.windowWidth);
				// 计算主体部分高度,单位为px
				_this.setData({
					// second部分高度 = 利用窗口可使用高度 - first部分高度（这里的高度单位为px，所有利用比例将300rpx转换为px）
					second_height: 395 + 'px'
				})
			}
		})
		var checkInDate = options.checkInDate ? options.checkInDate : Moment(new Date()).format('YYYY-MM-DD');
		var checkOutDate = options.checkOutDate ? options.checkOutDate : Moment(new Date()).add(1, 'day').format('YYYY-MM-DD');
		wx.getSystemInfo({
			success: function (res) {
				_this.setData({
					systemInfo: res,
					checkInDate: checkInDate,
					checkOutDate: checkOutDate
				});
			}
		})
	},
	onReady: function () {
		// 页面渲染完成
	},
	onShow: function () {
		
	},
	onHide: function () {
		// 页面隐藏
	},
	onUnload: function () {
		// 页面关闭
	},
	noClick:function(e){
		return false
	},
	chooseDate:function(e){
		
		this.setData({
			chooseData:true,
		})
		
	},
	getData:function(){
		var that = this
		wx.request({
			url: this.data.server + common.getBrokerageLog, //仅为示例，并非真实的接口地址
			data: {
				saleNumber: that.data.saleNumber,
				startTime: that.data.startT  + ' ' + '00:00:00',
				endTime: that.data.endT + ' ' +  '23:59:59'
			},
			header: {
				'content-type': 'application/json' // 默认值
			},
			success: function (res) {
				console.log(res.data.data.newShopList)

				if (res.data.code != 1000) {

				} else {
					if(res.data.data.logList.length == 0){
						wx.showToast({
							title: '暂无佣金记录',
							icon:'none'
						})
					}
					console.log(res)
					that.setData({
						record: res.data.data.logList,
						moneyCount: res.data.data.brokerageSum
					})
				}
			}
		})
	},
	noClick:function(e){
		if (e.target.dataset.isl != undefined){
			return
		}
		
		this.setData({
			chooseData: false,
		})
	},
	createDateListData: function () {
		var dateList = [];
		var now = new Date();
        /*
          设置日期为 年-月-01,否则可能会出现跨月的问题
          比如：2017-01-31为now ,月份直接+1（now.setMonth(now.getMonth()+1)），则会直接跳到跳到2017-03-03月份.
            原因是由于2月份没有31号，顺推下去变成了了03-03
        */
		now = new Date(this.data.year,this.data.month, 1);
		for (var i = 0; i < 1; i++) {
			var momentDate = Moment(now).add(this.data.maxMonth - (this.data.maxMonth - i), 'month').date;
			var year = this.data.year;
			var month = this.data.month;
			console.log(month)
			var days = [];
			var totalDay = this.getTotalDayByMonth(year, month);
			var week = this.getWeek(year, month, 1);
			//-week是为了使当月第一天的日期可以正确的显示到对应的周几位置上，比如星期三(week = 2)，
			//则当月的1号是从列的第三个位置开始渲染的，前面会占用-2，-1，0的位置,从1开正常渲染
			for (var j = 1; j <= totalDay; j++) {
				//var tempWeek = -1;
				// if (j > 0)
				//     tempWeek = this.getWeek(year, month, j);
				var clazz = '';
				// if (tempWeek == 0 || tempWeek == 6)
				//     clazz = 'week'
				// // if (j < DATE_DAY && year == DATE_YEAR && month == DATE_MONTH)
				//     //当天之前的日期不可用
				//     // clazz = 'unavailable ' + clazz;
				// else
				clazz = '' + clazz
				var day = j
				var month1 = month
				if (month1 < 10) month1 = '0' + month1
				if (day < 10) day = '0' + day
				days.push({
					day: day,
					class: clazz,
					isA: year.toString() + month1 + day
				})
			}
			var dateItem = {
				id: year + '-' + month1,
				year: year,
				month: month1,
				days: days
			}
			console.log(dateItem)

			dateList.push(dateItem);
		}
		// var sFtv = this.data.sFtv;
		// for (let i = 0; i < dateList.length; i++){//加入公历节日
		//    for(let k = 0; k < sFtv.length; k++){
		//      if (dateList[i].month == sFtv[k].month){
		//        let days = dateList[i].days;
		//        for (let j = 0; j < days.length; j++){
		//          if (days[j].day == sFtv[k].day){
		//            days[j].daytext = sFtv[k].name
		//          }
		//        }
		//      }
		//    }
		// }
		this.setData({
			dateList: dateList
		});
		DATE_LIST = dateList;
	},
	yearjian:function(){
		this.setData({
			year:this.data.year-1
		})
		this.createDateListData()
	},
	yearadd: function () {
		this.setData({
			year: this.data.year+1
		})
		this.createDateListData()
	},
	monthjian: function () {
		if(this.data.month == 1){
			this.setData({
				month: 12,
				year:this.data.year-1
			})
		}else{
			this.setData({
				month: this.data.month - 1
			})
		}
		this.createDateListData()
	},
	monthadd: function () {
		if (this.data.month == 12) {
			this.setData({
				month: 1,
				year: this.data.year + 1
			})
		} else {
			this.setData({
				month: this.data.month + 1
			})
		}
		this.createDateListData()
	},
    /*
     * 获取月的总天数
     */
	getTotalDayByMonth: function (year, month) {
		month = parseInt(month, 10);
		var d = new Date(year, month, 0);
		return d.getDate();
	},
    /*
     * 获取月的第一天是星期几
     */
	getWeek: function (year, month, day) {
		var d = new Date(year, month - 1, day);
		return d.getDay();
	},
    /**
     * 点击日期事件
     */
	onPressDate: function (e) {
		var that = this
		console.log(e)
		var {
			year,
			month,
			day
		} = e.currentTarget.dataset;
		//当前选择的日期为同一个月并小于今天，或者点击了空白处（即day<0），不执行
		// if ((day < DATE_DAY && month == DATE_MONTH) || day <= 0) return;

		var tempMonth = month;
		var tempDay = day;

		if (month < 10) tempMonth = '0' + month
		if (day < 10) tempDay = '0' + day

		var date = year + '-' + tempMonth + '-' + day;
		this.setData({
			cNum: this.data.cNum + 1
		})
		console.log(this.data.cNum % 2)
		var click = this.data.cNum % 2
		if (click == 1) {
			console.log('第一次点击')
			this.setData({
				firstNum: year.toString() + month + day,
				startT: year.toString() + '-' + month + '-' + day,
				twoNum: year.toString() + month + day,
				endT: year.toString() + '-' + month + '-' + day,
			})
		}
		if (click == 0) {
			console.log('第二次点击')
			this.setData({
				twoNum: year.toString() + month + day,
				endT: year.toString() + '-' + month + '-' + day,
				
			})
			var st = that.data.startT.split('-')[0] + that.data.startT.split('-')[1] + that.data.startT.split('-')[2]
			var et = that.data.endT.split('-')[0] + that.data.endT.split('-')[1] + that.data.endT.split('-')[2]
			console.log(st, et)
			if (st > et) {
				console.log('1111')
				var a = that.data.startT
				var b = that.data.endT

				that.setData({
					startT: b,
					endT: a,
					startTime: b + '00:00:00',
					endTime: a + '23:59:59'
				})
			} else {
				var a = that.data.startT
				var b = that.data.endT
				that.setData({
					startTime: a + ' ' + '00:00:00',
					endTime: b + ' ' + '23:59:59'
				})
			}
			setTimeout(function () {
				that.setData({

					chooseData: false
				})
				that.getData()
			}, 500)
		}
	},
	renderPressStyle: function (year, month, day) {
		var dateList = this.data.dateList;
		//渲染点击样式
		for (var i = 0; i < dateList.length; i++) {
			var dateItem = dateList[i];
			var id = dateItem.id;
			if (id === year + '-' + month) {
				var days = dateItem.days;
				for (var j = 0; j < days.length; j++) {
					var tempDay = days[j].day;
					if (tempDay == day) {
						days[j].class = days[j].class + ' active';
						days[j].inday = true;
						break;
					}
				}
				break;
			}
		}
		this.setData({
			dateList: dateList
		});
	},
	cToday: function () {
		console.log(this.getDateStr(null, 0))
		this.setData({
			today: 0,
			startT: this.getDateStr(null, 0),
			endT: this.getDateStr(null, 0),
			firstNum: this.getList(this.getDateStr(null, 0)),
			twoNum: this.getList(this.getDateStr(null, 0)),
		})
		this.getData()
	},
	cYesday:function(){
		console.log(this.getDateStr(null,-1))
		this.setData({
			today:1,
			startT: this.getDateStr(null, -1),
			endT: this.getDateStr(null, -1),
			firstNum: this.getList(this.getDateStr(null, -1)),
			twoNum: this.getList(this.getDateStr(null, -1)),
		})
		this.getData()
	},
	cLastSeven: function () {
		console.log(this.getDateStr(null, -6))
		this.setData({
			today: 2,
			startT: this.getDateStr(null, -6),
			endT: this.getDateStr(null, -0),
			firstNum: this.getList(this.getDateStr(null, -6)),
			twoNum: this.getList(this.getDateStr(null, 0)),
		})
		this.getData()
	},
	getDateStr: function (today, addDayCount){
		var dd;
		if (today) {
			dd = new Date(today);
		} else {
			dd = new Date();
		}
		dd.setDate(dd.getDate() + addDayCount);//获取AddDayCount天后的日期 
		var y = dd.getFullYear();
		var m = dd.getMonth() + 1;//获取当前月份的日期 
		var d = dd.getDate();
		if (m < 10) {
			m = '0' + m;
		};
		if (d < 10) {
			d = '0' + d;
		};
		return y + "-" + m + "-" + d;
	},
	getList:function(data){
		var list = data.split('-')
		var str = '';
		for(var i = 0  ; i < list.length;i++){
			str += list[i]
		}
		return str
	}
})