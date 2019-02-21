//index.js
//获取应用实例
const app = getApp()
var Moment = require("../../utils/moment.js");
const config = require('../../utils/config.js')
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
		server: config.server,
		startT: Moment(new Date()).format('YYYY-MM-DD').split('-')[0] + '-' + Moment(new Date()).format('YYYY-MM-DD').split('-')[1] + '-' + Moment(new Date()).format('YYYY-MM-DD').split('-')[2],
		endT: Moment(new Date()).format('YYYY-MM-DD').split('-')[0] + '-' + Moment(new Date()).format('YYYY-MM-DD').split('-')[1] + '-' + Moment(new Date()).format('YYYY-MM-DD').split('-')[2],
        sList: [{
            name: "商户注册",
            icon: "icon-xinjianmendian",
            color: "#82c529",
			tap:"register"
        }, {
            name: "商户管理",
            icon: "icon-dianpuguanli",
            color: "#ffba00",
			tap:"shop"
        }, {
            name: "常见问题",
            icon: "icon-changjianwenti",
            color: "#0087f2"
        }],
        sList1: [{
            name: "设置管理",
            icon: "icon-shezhi",
            color: "#0093e2",
        }, {
            name: "营销推荐",
            icon: "icon-tuijian",
            color: "#f27b00"
        }, {
            name: "官方活动",
            icon: "icon-tuiguang",
				color: "#ffba00"
        }],
		moneyD:0,
		shopD:0,
		moneyA:0,
		shopA:0,
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function() {
		var that = this
		that.getTT()
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
	getTT:function(){
		var that = this
		wx.request({
			url: this.data.server + 'saleShareProfit/getSaleShop', //仅为示例，并非真实的接口地址
			data: {
				saleNumber: wx.getStorageSync('saleInfo').number,
				startTime: that.data.startT + ' ' + '00:00:00',
				endTime: that.data.endT + ' ' + '23:59:59'
			},
			header: {
				'content-type': 'application/json' // 默认值
			},
			success: function (res) {
				console.log(res.data.data.newShopList)

				if (res.data.code != 1000) {

				} else {
					console.log(res)
					var sList = that.data.sList
					for (var i = 0; i < sList.length; i++) {
						if (sList[i].tap == 'shop') {
							sList[i].num = '(' + res.data.data.merchantCount + ')'
						}
					}
					that.setData({
						moneyD: res.data.data.newShopList[0].settlementMoney,
						shopD: res.data.data.newShopList[0].shopCount,
						moneyA: res.data.data.todayMoney,
						shopA: res.data.data.todayCount,
						sList: sList
					})
				}
			}
		})
	},
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    record: function() {
        wx.navigateTo({
            url: '../record/index',
        })
    },
	register: function () {
		wx.navigateTo({
			url: '../merchants/register/index',
		})
	},
    salekit: function() {
        wx.navigateTo({
            url: '../salekit/index',
        })
    },
    shop: function() {
        wx.navigateTo({
            url: '../merchants/manage/index',
        })
    },
	onShow:function(){
		this.getTT()
	}
})