// pages/merchants/manage/index.js
const config = require('../../../utils/config.js')
var Moment = require("../../../utils/moment.js");
var DATE_LIST = [];
var DATE_YEAR = new Date().getFullYear();
var DATE_MONTH = new Date().getMonth() + 1;
var DATE_DAY = new Date().getDate();
Page({
    data: {
        shopEdit: {},
        status: '',
        checked: false,
        requestBreak: false,
        chooseShop: '全部门店',
        chooseShopNum: '',
        currentTab: 0,
        index: 0,
        indexState: 0,
        showModal1: false,
        showModal2: false,
        shopName: '',
        indexStateT: '',
        indexStateP: '',
        indexStateS: '',
        array: ['0.025%', '0.036%', '0.038%', '0.05%', '0.056%', '0.062%'],
        // orderstatus: ['未处理', '成功-未返还', '成功-已返还'],
        orderstatus: ['支付中', '交易成功', '交易成功', '失败', '全部退款', '部分退款', '异常订单', '退款中'],
        chooseTimgA: [{
            choosetit: '今天',
            choosetype: 'Today'
        }, {
            choosetit: '昨天',
            choosetype: 'Yesterday'
        }, {
            choosetit: '最近7天',
            choosetype: 'Recently'
        }, {
            choosetit: '自定义',
            choosetype: 'custom'
        }],
        choosePaymentA: [{
            choosetit: '全部',
            choosetype: 'all'
        }, {
            choosetit: '微信',
            choosetype: 'WeChat_Pay'
        }, {
            choosetit: '支付宝',
            choosetype: 'Alipay_Pay'
        }],
        chooseStateA: [{
            choosetit: '全部',
            choosetype: 'all'
        }, {
            choosetit: '已成功',
            choosetype: '1'
        }, {
            choosetit: '全部退款',
            choosetype: '4'
        }, {
			choosetit: '部分退款',
            choosetype: '5'
        }],
        shopListM: [],
        shopList: [],
        shopList1: [],
        shopNumber: '',
        startTime: '',
        endTime: '',
        transactionType: 'all',
        orderState: 'all',
        transactionListAmount: '',
        transactionListCount: '',
        server: config.server,
        pageNum: 1,
        pageCount: 10,
        limit: 10,
        merchantNumber: '',
		
        //上拉加载，下拉刷新
		chooseData: false,
		year: DATE_YEAR,
		month: DATE_MONTH,
		startT: Moment(new Date()).format('YYYY-MM-DD').split('-')[0] + '-' + Moment(new Date()).format('YYYY-MM-DD').split('-')[1] + '-' + Moment(new Date()).format('YYYY-MM-DD').split('-')[2],
		endT: Moment(new Date()).format('YYYY-MM-DD').split('-')[0] + '-' + Moment(new Date()).format('YYYY-MM-DD').split('-')[1] + '-' + Moment(new Date()).format('YYYY-MM-DD').split('-')[2],
		firstNum: Moment(new Date()).format('YYYY-MM-DD').split('-')[0] + Moment(new Date()).format('YYYY-MM-DD').split('-')[1] + Moment(new Date()).format('YYYY-MM-DD').split('-')[2],
		twoNum: Moment(new Date()).format('YYYY-MM-DD').split('-')[0] + Moment(new Date()).format('YYYY-MM-DD').split('-')[1] + Moment(new Date()).format('YYYY-MM-DD').split('-')[2],
		cNum:0,
		dataTrue:false
    },
    onLoad: function() {
        var saleInfo = wx.getStorageSync('shopInfo')
        this.setData({
            merchantNumber: saleInfo.Number
        })
    },
    onShow:function(){
        this.getData()
        var that = this
        this.createDateListData()
        wx.request({
            url: this.data.server + 'store/getShops', //仅为示例，并非真实的接口地址
            data: {
                merchantNumber: this.data.merchantNumber,
                page: 1,
                limit: 200
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                if (res.data.code != 1000) {

                } else {
                    var a = {}
                    a.shopName = '全部门店'
                    a.shopNumber = ''
                    res.data.data.result.unshift(a)
                    that.setData({
                        shopListM: res.data.data.result,
                    })
                }
            }
        })
    },
	/*
	以下是日期处理逻辑
	
	
	*/
	createDateListData: function () {
		var dateList = [];
		var now = new Date();
        /*
          设置日期为 年-月-01,否则可能会出现跨月的问题
          比如：2017-01-31为now ,月份直接+1（now.setMonth(now.getMonth()+1)），则会直接跳到跳到2017-03-03月份.
            原因是由于2月份没有31号，顺推下去变成了了03-03
        */
		now = new Date(this.data.year, this.data.month, 1);
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
	getTotalDayByMonth: function (year, month) {
		month = parseInt(month, 10);
		var d = new Date(year, month, 0);
		return d.getDate();
	},
	getWeek: function (year, month, day) {
		var d = new Date(year, month - 1, day);
		return d.getDay();
	},
	/**
     * 点击日期事件
     */
	onPressDate: function (e) {
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
			var that = this
			that.setData({
				twoNum: year.toString() + month + day,
				endT: year.toString() + '-' + month + '-' + day,
				dataTrue:true
			})
			var st = that.data.startT.split('-')[0] + that.data.startT.split('-')[1] + that.data.startT.split('-')[2]
			var et = that.data.endT.split('-')[0] + that.data.endT.split('-')[1] + that.data.endT.split('-')[2]
			console.log(st,et)
			if(st > et){
				console.log('1111')
				var a = that.data.startT
				var b = that.data.endT
				
				that.setData({
					startT: b,
					endT: a,
					startTime: b + ' ' + '00:00:00',
					endTime: a + ' ' + '23:59:59'
				})
			}else{
				var a = that.data.startT
				var b = that.data.endT
				that.setData({
					startTime: a +' ' +  '00:00:00',
					endTime: b + ' '+ '23:59:59'
				})
			}
			setTimeout(function () {
				that.setData({

					chooseData: false
				})
				// that.getData()
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
	noClick: function (e) {
		if (e.target.dataset.isl != undefined) {
			return
		}

		this.setData({
			chooseData: false,
		})
	},
	yearjian: function () {
		this.setData({
			year: this.data.year - 1
		})
		this.createDateListData()
	},
	yearadd: function () {
		this.setData({
			year: this.data.year + 1
		})
		this.createDateListData()
	},
	monthjian: function () {
		if (this.data.month == 1) {
			this.setData({
				month: 12,
				year: this.data.year - 1
			})
		} else {
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
	以上是日期处理逻辑
	
	
	*/
    onReachBottom: function() {
        if (this.data.isRefreshing || this.data.isLoadingMoreData || !this.data.hasMoreData) {
            return
        }
        this.setData({
            isLoadingMoreData: true
        })
    },
    switch1Change(e) {
        var id = e.target.dataset.id
    },
    getData: function() {
        var that = this
        wx.showLoading({
            title: '加载中',
            mask:true
        })
        wx.request({
            url: this.data.server + 'merchantTransaction/getTransactionList', //仅为示例，并非真实的接口地址
            method: 'post',
            data: {
                merchantNumber: this.data.merchantNumber,
                shopNumber: this.data.shopNumber,
                startTime: this.data.startTime,
                endTime: this.data.endTime,
                transactionType: this.data.transactionType,
                orderState: this.data.orderState,
                page: this.data.pageNum,
                limit: this.data.limit
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function(res) {
                wx.hideLoading()
                var data = res.data
                if (res.data.code != 1000) {

                } else {
                    if (!res.data.data) {
                        wx.showToast({
                            title: '查询为空！',
                            icon: 'none'
                        })
                        that.setData({
                            requestBreak: false,
                            shopList: [],
                            transactionListAmount: 0,
                            transactionListCount: 0
                        })
                    } else {
                        var transactionListAmount = that.data.transactionListAmount
                        var transactionListCount = that.data.transactionListCount
                        var shoplist = res.data.data.transactionList
                        that.setData({
                            shopList: shoplist,
                            transactionListAmount: res.data.data.transactionListAmount,
                            transactionListCount: res.data.data.transactionListCount
                        })
                    }
                }
            }
        })
    },
    //筛选按钮状态
    chooseT: function(e) {
        var that = this
        var index = e.target.dataset.index
        var indexStateT = that.data.indexState
        var startTime = that.data.startTime
        var endTime = that.data.endTime
        if (index == 'Today') {
            var starttime = that.getDateStr(null, 0) + ' '+ ' 00:00:00'
			var endtime = that.getDateStr(null, 0) + ' ' + ' 23:59:59'
        }
        if (index == 'Yesterday') {
			var starttime = that.getDateStr(null, -1) + ' ' + ' 00:00:00'
			var endtime = that.getDateStr(null, -1) + ' ' + ' 23:59:59'
        }
        if (index == 'Recently') {
			var starttime = that.getDateStr(null, -6) + ' ' + ' 00:00:00'
			var endtime = that.getDateStr(null, 0) + ' ' + ' 23:59:59'
        }
        if (index == 'custom') {
			console.log('123')
			this.setData({
				chooseData:true,
			})
		}
        this.setData({
            indexStateT: index,
            startTime: starttime,
            endTime: endtime
        })
    },
    //筛选按钮状态
    chooseP: function(e) {
        var index = e.target.dataset.index
        var indexStateP = this.data.indexState
        var transactionType = this.data.transactionType
        // if (index == 'all') {
        // }
        // if (index == 'WeChat_Pay') {
        // }
        // if (index == 'Alipay_Pay') {
        // }
        this.setData({
            indexStateP: index,
            transactionType: index
        })
    },
    //筛选按钮状态
    chooseS: function(e) {
        var index = e.target.dataset.index
        var indexStateS = this.data.indexState
        var orderState = this.data.orderState
        // if (index == 'all') {
        // }
        // if (index == '1') {
        // }
        // if (index == '3') {
        // }
        // if (index == '2') {
        // }
        this.setData({
            indexStateS: index,
            orderState: index
        })
    },
    getDateStr: function(today, addDayCount) {
        var dd;
        if (today) {
            dd = new Date(today);
        } else {
            dd = new Date();
        }
        dd.setDate(dd.getDate() + addDayCount); //获取AddDayCount天后的日期 
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1; //获取当前月份的日期 
        var d = dd.getDate();
        if (m < 10) {
            m = '0' + m;
        };
        if (d < 10) {
            d = '0' + d;
        };
        return y + "-" + m + "-" + d;
    },
    swichNav: function(e) {
        var cur = e.target.dataset.current;
        if (this.data.currentTaB == cur) {
            return false;
        } else {
            this.setData({
                currentTab: cur
            })
        }
    },
    shopOperation: function(e) {
        var that = this
        var id = e.currentTarget.dataset.id;
        var chooseShopNum = this.data.chooseShopNum
        if (id == that.data.active) {
            that.setData({
                'active': 0,
                chooseShopNum: id
            })
        } else {
            that.setData({
                'active': id,
                chooseShopNum: id
            })
        }
    },
    toDetails: function(e) {
        var batch = e.currentTarget.dataset.batch
        var orderstate = e.currentTarget.dataset.orderstate
        wx.navigateTo({
            url: '../../shop-sh/details/index?batch=' + batch + '&orderState=' + orderstate,
        })
    },
    bindPickerChange(e) {
        this.setData({
            index: e.detail.value
        })
    },
    /* 文本框获取焦点时更改状态*/
    focus: function(e) {
        var cur = e.target.dataset.status;
        this.setData({
            status: cur
        })
    },
    /* 文本框失去焦点时更改状态*/
    blur: function(e) {
        var data = e.detail.value
        var cur = e.target.dataset.status;
        if (data == '') {
            var shopEdit = this.data.shopEdit
            shopEdit[cur] = data
            this.setData({
                status: '',
                shopEdit: shopEdit
            })
        } else {
            var shopEdit = this.data.shopEdit
            shopEdit[cur] = data
            this.setData({
                status: cur,
                shopEdit: shopEdit
            })
        }
    },
    radioChange(e) {
        var id = e.detail.value
        var that = this
        var checked = this.data.checked
        var chooseShop = this.data.chooseShop
        var shopNumber = this.data.shopNumber
        var shopListM = this.data.shopListM
        for (var i = 0; i < shopListM.length; i++) {
            if (id == shopListM[i].shopNumber) {
                chooseShop = shopListM[i].shopName
                shopNumber = shopListM[i].shopNumber
                that.setData({
                    chooseShop: chooseShop,
                    shopNumber: shopNumber
                })
                break
            }
        }
        wx.showLoading({
            title: '加载中...',
        })
        this.setData({
            showModal1: true,
            shopList: []
        })
        this.hideModal()
        this.getData()
    },
    //弹窗-选择门店
    editMendian: function(e) {
        var that = this
        var id = e.currentTarget.dataset.id;
        var shopName = this.data.shopName
        this.setData({
            showModal1: true,
            shopName: shopName
        })
    },
    //弹窗-刷选条件
    screen: function(e) {
        this.setData({
            showModal2: true
        })
    },
    //弹窗-修改信息-选择门店
    //弹窗-微信推送
    //弹窗-修改密码
    //弹窗-一码付
    //弹窗-删除
    //弹出框蒙层截断touchmove事件
    preventTouchMove: function(e) {
        this.setData({
            showModal1: false,
            //     showModal2: false,
        });
    },
    //隐藏模态对话框
    hideModal: function(e) {
        this.setData({
            showModal1: false,
            showModal2: false,
        });
    },
    //对话框取消按钮点击事件
    onCancel: function(e) {
        var status = e.target.dataset.status
        if (status == "cancel2") { //重置筛选条件
            var startTime = this.data.startTime
            var endTime = this.data.endTime
            this.setData({
                startTime: '',
                endTime: '',
                indexStateT: '',
                indexStateP: '',
                indexStateS: '',
				dataTrue:false,
				year: DATE_YEAR,
				month: DATE_MONTH,
				startT: Moment(new Date()).format('YYYY-MM-DD').split('-')[0] + '-' + Moment(new Date()).format('YYYY-MM-DD').split('-')[1] + '-' + Moment(new Date()).format('YYYY-MM-DD').split('-')[2],
				endT: Moment(new Date()).format('YYYY-MM-DD').split('-')[0] + '-' + Moment(new Date()).format('YYYY-MM-DD').split('-')[1] + '-' + Moment(new Date()).format('YYYY-MM-DD').split('-')[2],
				firstNum: Moment(new Date()).format('YYYY-MM-DD').split('-')[0] + Moment(new Date()).format('YYYY-MM-DD').split('-')[1] + Moment(new Date()).format('YYYY-MM-DD').split('-')[2],
				twoNum: Moment(new Date()).format('YYYY-MM-DD').split('-')[0] + Moment(new Date()).format('YYYY-MM-DD').split('-')[1] + Moment(new Date()).format('YYYY-MM-DD').split('-')[2],
				cNum: 0,
            })
        } else {
            this.hideModal();
        }
    },
    //对话框确认按钮点击事件
    onConfirm: function(e) {
        this.hideModal();
        wx.showLoading({
            title: '加载中...',
        })
        var status = e.target.dataset.status
        var chooseShopNum = this.data.chooseShopNum
        if (status == "confirm2") {
            this.getData()
        }
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    reFresh: function() {
        var that = this
        if (that.data.requestBreak) {
            return
        }
        that.setData({
            requestBreak: true,
        })
        wx.showLoading({
            title: '正在刷新...',
            mask: true
        })
        wx.request({
            url: this.data.server + 'merchantTransaction/getTransactionList', //仅为示例，并非真实的接口地址
            method: 'post',
            data: {
                merchantNumber: this.data.merchantNumber,
                shopNumber: this.data.shopNumber,
                startTime: this.data.startTime,
                endTime: this.data.endTime,
                transactionType: this.data.transactionType,
                orderState: this.data.orderState,
                page: 1,
                limit: this.data.limit
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function(res) {
                wx.hideLoading()
                that.setData({
                    shopList: []
                })
                var data = res.data
                if (res.data.code != 1000) {

                } else {
                    if (!res.data.data) {
                        wx.showToast({
                            title: '无更多数据！',
                            icon: 'none'
                        })
                    } else {
                        var transactionListAmount = that.data.transactionListAmount
                        var transactionListCount = that.data.transactionListCount
                        var shoplist = res.data.data.transactionList
                        that.setData({
                            shopList: shoplist,
                            transactionListAmount: res.data.data.transactionListAmount,
                            transactionListCount: res.data.data.transactionListCount
                        })
                        setTimeout(function() {
                            that.setData({
                                requestBreak: false,
                            })
                        }, 500)
                    }
                }
            }
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    loadMore: function() {
        var that = this
        if (that.data.requestBreak) {
            return
        }
        that.setData({
            requestBreak: true,
        })
        wx.showLoading({
            title: '正在加载更多...',
            mask: true
        })
        var page = this.data.pageNum
        page++
        if (page > this.data.pageCount) {
            wx.showToast({
                title: '无更多数据！',
                image: '../../img/fail.png'
            })
            return
        }
        wx.request({
            url: this.data.server + 'merchantTransaction/getTransactionList', //仅为示例，并非真实的接口地址
            method: 'post',
            data: {
                merchantNumber: this.data.merchantNumber,
                shopNumber: this.data.shopNumber,
                startTime: this.data.startTime,
                endTime: this.data.endTime,
                transactionType: this.data.transactionType,
                orderState: this.data.orderState,
                page: page,
                limit: this.data.limit
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function(res) {
                wx.hideLoading()
                var data = res.data
                if (res.data.code != 1000) {

                } else {
                    var transactionListAmount = that.data.transactionListAmount
                    var transactionListCount = that.data.transactionListCount
                    var pageCount = Math.ceil(transactionListCount / 10)
                    var shoplist1 = res.data.data.transactionList
                    that.setData({
                        pageNum: page,
                        pageCount: pageCount,
                        shopList1: shoplist1,
                        transactionListAmount: res.data.data.transactionListAmount,
                        transactionListCount: res.data.data.transactionListCount
                    })
                    var shopList = that.data.shopList
                    shopList.push.apply(shopList, shoplist1)
                    that.setData({
                        shopList: shopList
                    })
                    setTimeout(function() {
                        that.setData({
                            requestBreak: false
                        })
                    }, 500)
                }
            }
        })
    },
})
// Component({
//     /**
//      * 组件的属性列表
//      */
//     properties: {

//     },

//     /**
//      * 组件的初始数据
//      */



//     /**
//      * 组件的方法列表
//      */
//     methods: {

//     },

// })