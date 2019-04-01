// pages/merchants/manage/index.js
const config = require('../../../utils/config.js')
Page({
    data: {
        currentTab: 0,
        index: 0,
        showModal: false,
        array: ['0.025%', '0.036%', '0.038%', '0.05%', '0.056%', '0.062%'],
        //查询门店列表信息
        shopList: [],
        merchantName: '',
        merchantNumber: '',
        shopName: '',
        province: '',
        city: '',
        area: '',
        enable: '',
        auditStatus: '',
        merchantType: '',
        startTime: '',
        endtime: '',
        server: config.server,
        pageNum: 1,
        pageCount: 10,
        limit: 10,
		start:0
    },
    onLoad: function() {
        var saleInfo = wx.getStorageSync('shopInfo')
        this.setData({
            merchantNumber: saleInfo.Number
        })
        this.getData()
    },
    getData: function() {
        var that = this
        wx.request({
            url: this.data.server + 'store/getShops', //仅为示例，并非真实的接口地址
            data: {
                merchantNumber: this.data.merchantNumber,
                shopName: this.data.shopName,
                province: this.data.auditStatus,
                city: this.data.merchantType,
                area: this.data.startTime,
                enable: this.data.endtime,
                page: 1,
                limit: 20
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function(res) {
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
                        })
                    } else {
                        that.setData({
                            pageNum: 2,
                            requestBreak: false,
                            shopList: res.data.data.result,
                        })
                    }
                }
            }
        })
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
        if (id == that.data.active) {
            that.setData({
                'active': 0
            })
        } else {
            that.setData({
                'active': id
            })
        }
    },
    editData: function(e) {
        var shopNumber = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../../shop-sh/shop-check/index?shopNumber=' + shopNumber,
        })
    },
	start:function(e){
		this.setData({
			start: e.changedTouches[0].pageX
		})
	},
	move:function(e){
		var that = this
		var s = this.data.start
		var ee = e.changedTouches[0].pageX
		if (s - ee >= 15){
			var id = e.currentTarget.dataset.id;
			if (id == that.data.active) {
				that.setData({
					'move': 0
				})
			} else {
				that.setData({
					'move': id
				})
			}
		}else{
			that.setData({
				'move': 0
			})
		}
	},
    editDel: function(e) {
        var that = this
        var shopname = e.currentTarget.dataset.shopname;
        var shopnumber = e.currentTarget.dataset.id;
        wx.showModal({
            title: '是否确认删除？',
            content: shopname,
            confirmText: '确定',
            cancelText: '取消',
            success: function(res) {
                if (res.confirm) {
                    wx.showLoading({
                        title: '删除中...',
                    })
                    wx.request({
                        url: that.data.server + 'store/modifyShop', //仅为示例，并非真实的接口地址
                        data: {
                            merchantNumber: that.data.merchantNumber,
                            shopNumber: shopnumber,
                            deletionFlag: 1
                        },
                        header: {
                            'content-type': 'application/json' // 默认值
                        },
                        success: function (res) {
                            if (res.data.code != 1000) {

                            } else {
                                wx.hideLoading()
                                wx.showToast({
                                    title: '删除成功'
                                })
                                that.setData({
                                    shopList: [],
                                })
                                that.getData()
                            }
                        }
                    })
                } else if (res.cancel) {

                }
            }
        })
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
            url: this.data.server + 'store/getShops', //仅为示例，并非真实的接口地址
            data: {
                merchantNumber: this.data.merchantNumber,
                shopName: this.data.shopName,
                province: this.data.auditStatus,
                city: this.data.merchantType,
                area: this.data.startTime,
                enable: this.data.endtime,
                page: 1,
                limit: 20
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
                        var shoplist = res.data.data.result
                        that.setData({
                            shopList: shoplist,
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
            url: this.data.server + 'store/getShops', //仅为示例，并非真实的接口地址
            data: {
                merchantNumber: this.data.merchantNumber,
                shopName: this.data.shopName,
                province: this.data.auditStatus,
                city: this.data.merchantType,
                area: this.data.startTime,
                enable: this.data.endtime,
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
                    var pageCount = Math.ceil(res.data.data.count / 10)
                    var shoplist1 = res.data.data.result
                    that.setData({
                        pageNum: page,
                        pageCount: pageCount,
                        shopList1: shoplist1,
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
	onShow:function(){
		this.getData()
	}
})