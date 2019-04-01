//index.js
//获取应用实例
const app = getApp()
var Moment = require("../../utils/moment.js");
const config = require('../../utils/config.js')
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
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
		qqmapsdk = new QQMapWX({
			key: 'PTABZ-B2TRX-7C643-TAKNM-KED36-24BUQ'
		});
		that.getPermission()
		that.getTT()
		// wx.getLocation({
		// 	type: 'wgs84',
		// 	success(res) {
		// 		console.log(res)
		// 		const latitude = res.latitude
		// 		const longitude = res.longitude
		// 		const speed = res.speed
		// 		const accuracy = res.accuracy
		// 	}
		// })
		
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
						shopD: res.data.data.newShopList[0].newShopCount,
						moneyA: res.data.data.todayMoney,
						shopA: res.data.data.todayCount,
						sList: sList
					})
				}
			}
		})
	},
	getPermission: function (obj) {
		var that = this
		wx.getLocation({
			success: function (res) {
				console.log(res)
				that.getLocal(res.latitude,res.longitude)
			},
			fail: function () {
				wx.getSetting({
					success: function (res) {
						var statu = res.authSetting;
						if (!statu['scope.userLocation']) {
							wx.showModal({
								title: '是否授权当前位置',
								content: '需要获取您的地理位置，请确认授权',
								success: function (tip) {
									if (tip.confirm) {
										wx.openSetting({
											success: function (data) {
												if (data.authSetting["scope.userLocation"] === true) {
													wx.showToast({
														title: '授权成功',
														icon: 'success',
														duration: 1000
													})
													//授权成功之后，再调用chooseLocation选择地方
													wx.getLocation({
														success: function (res) {
															console.log(res)
														},
													})
												} else {
													wx.showToast({
														title: '授权失败',
														icon: 'success',
														duration: 1000
													})
												}
											}
										})
									}
								}
							})
						}
					},
					fail: function (res) {
						wx.showToast({
							title: '调用授权窗口失败',
							icon: 'success',
							duration: 1000
						})
					}
				})
			}
		})
	},
	getLocal:function(lat,lon){
		let that = this
		
		qqmapsdk.reverseGeocoder({
			location:{
				latitude:lat,
				longitude:lon
			},
			success:function(res){
				console.log(res)
				var obj = new Object()
				obj.pro = res.result.ad_info.province
				obj.cit = res.result.ad_info.city
				obj.are = res.result.ad_info.district
				wx.setStorageSync('location', obj)
			},
			fail:res=>{
				console.log(res)
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
		console.log(wx.getStorageSync('saleInfo'))
		var saleInfo = wx.getStorageSync('saleInfo')
		wx.getSetting({
			success: function (res) {
				
				var statu = res.authSetting;
				if (!statu['scope.userLocation']) {
					wx.showModal({
						title: '是否授权当前位置',
						content: '需要获取您的地理位置，请确认授权',
						success: function (tip) {
							if (tip.confirm) {
								wx.openSetting({
									success: function (data) {
										if (data.authSetting["scope.userLocation"] === true) {
											wx.showToast({
												title: '授权成功',
												icon: 'success',
												duration: 1000
											})
											//授权成功之后，再调用chooseLocation选择地方
											wx.getLocation({
												success: function (res) {
													console.log(res)
												},
											})
											if (saleInfo.productSwitch == null || saleInfo.productSwitchD1 == null) {
												wx.showToast({
													title: '您的默认进件通道没有设置进件费率',
													icon: 'none',
													duration: 2000
												})
												return
											}
											wx.navigateTo({
												url: '../merchants/register/index',
											})
										} else {
											wx.showToast({
												title: '授权失败',
												icon: 'success',
												duration: 1000
											})
										}
									}
								})
							}
						}
					})
				}else{
					if (saleInfo.productSwitch == null || saleInfo.productSwitchD1 == null) {
						wx.showToast({
							title: '您的默认进件通道没有设置进件费率',
							icon: 'none',
							duration: 2000
						})
						return
					}
					wx.navigateTo({
						url: '../merchants/register/index',
					})
				}
			},
			fail: function (res) {
				wx.showToast({
					title: '调用授权窗口失败',
					icon: 'success',
					duration: 1000
				})
			}
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