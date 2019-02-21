// pages/merchants/manage/index.js
const config = require('../../../utils/config.js')
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
        orderstatus: ['未处理', '成功-未返还', '成功-已返还'],
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
            choosetit: '已退款',
            choosetype: '3'
        }, {
            choosetit: '交易失败',
            choosetype: '2'
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
    },
    onLoad: function() {
        var saleInfo = wx.getStorageSync('shopInfo')
        this.setData({
            merchantNumber: saleInfo.Number
        })
        this.getData()
        var that = this
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
            success: function(res) {
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
                        for (var i = 0; i < shoplist.length; i++) {
                            shoplist[i].transactionAmount = shoplist[i].transactionAmount.toFixed(2)
                            shoplist[i].transactionTime = shoplist[i].transactionTime.split('.')[0]
                        }
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
            var starttime = that.getDateStr(null, 0) + ' 00:00:00'
            var endtime = that.getDateStr(null, 0) + ' 23:59:59'
        }
        if (index == 'Yesterday') {
            var starttime = that.getDateStr(null, -1) + ' 00:00:00'
            var endtime = that.getDateStr(null, -1) + ' 23:59:59'
        }
        if (index == 'Recently') {
            var starttime = that.getDateStr(null, -6) + ' 00:00:00'
            var endtime = that.getDateStr(null, 0) + ' 23:59:59'
        }
        if (index == 'custom') {}
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
                indexStateS: ''
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
                        for (var i = 0; i < shoplist.length; i++) {
                            shoplist[i].transactionAmount = shoplist[i].transactionAmount.toFixed(2)
                            shoplist[i].transactionTime = shoplist[i].transactionTime.split('.')[0]
                        }
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
                    for (var i = 0; i < shoplist1.length; i++) {
                        shoplist1[i].transactionAmount = shoplist1[i].transactionAmount.toFixed(2)
                        shoplist1[i].transactionTime = shoplist1[i].transactionTime.split('.')[0]
                    }
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