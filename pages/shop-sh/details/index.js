// pages/shop-sh/details/index.js//index.js
var Moment = require("../../../utils/moment.js");
const config = require('../../../utils/config.js');
//获取应用实例
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        batch: '',
        orderState: '',
        detailsBtnstate:'hide',
        todayDate: Moment(new Date()).format('YYYY-MM-DD'),
        batchInfo: [],
        orderstatus: ['支付中', '交易成功', '交易成功', '交易失败', '全部退款', '部分退款', '退款中', '异常订单'],
        server: config.server,
        pageNum: 1,
        limit: 10,
        // 退款
        inputPass: '',
        orderTime: '',
        insNumber: '',
        paymentChannel: '',
        outTradeNo: '',
        type: '',
        refundAmount: '',
        reportingMerNum: '',
        merNumber: '',
        userNumber: '',
        equipmentType: 1,
        //弹窗
        showModal: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var batch = options.batch
        var orderState = options.orderState
        this.setData({
            batch: batch,
            orderState: orderState
        })
        this.batchInfo()
    },
    batchInfo: function() {
        wx.showLoading({
            title: '加载中...',
        })
        var that = this
        var refundAmount = that.data.refundAmount
        var outTradeNo = that.data.outTradeNo
        wx.request({
            url: this.data.server + 'merchantTransaction/getBatchInfo', //仅为示例，并非真实的接口地址
            method: 'post',
            data: {
                batch: that.data.batch,
                orderState: that.data.orderState,
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function(res) {
                wx.hideLoading()
                var data = res.data
                if (res.data.code != 1000) {

                } else {
                    var batchInfo = data.data
                    var insNumber = data.data.institutionNumber
                    var paymentChannel = data.data.paymentChannel
                    var outTradeNo = data.data.batch
                    var type = data.data.transactionType
                    var refundAmount = data.data.ketuiAmount
                    var reportingMerNum = data.data.subaccountNumber
                    var merNumber = data.data.merchantNumber
                    var userNumber = data.data.clerkNumber
                    var equipmentType = data.data.equipmentType
                    var orderTime = data.data.transactionTime
                    var orderTimeA = data.data.transactionTime.split(" ")[0]
                    var todayTime = that.data.todayDate
                    if (batchInfo.transactionType == '0') {
                        batchInfo.transactionType = '支付宝'
                        batchInfo.payType = 'ALIPAY'
                    } else if (batchInfo.transactionType == '1') {
                        batchInfo.transactionType = '微信'
                        batchInfo.payType = 'WECHAT'
                    }
                    console.log(orderTimeA)
                    console.log(todayTime)
                    if (parseInt(data.data.ketuiAmount) > 0){
                        if (orderTimeA == todayTime || that.data.orderState == '1' || that.data.orderState == '2' || that.data.orderState == '5') {
                            that.setData({
                                detailsBtnstate: 'show'
                            })
                        }
                    }
                    that.setData({
                        batchInfo: batchInfo,
                        insNumber: insNumber,
                        paymentChannel: paymentChannel,
                        outTradeNo: outTradeNo,
                        type: type,
                        refundAmount: refundAmount,
                        reportingMerNum: reportingMerNum,
                        merNumber: merNumber,
                        userNumber: userNumber,
                        equipmentType: equipmentType,
                        orderTime: orderTime
                    })
                    console.log(that.data.orderState)
                    console.log(that.data.detailsBtnstate)
                }
            }
        })
    },
    refundAInput: function(e) {
        this.setData({
            refundAmount: e.detail.value
        })
    },
    passWdInput: function(e) {
        this.setData({
            inputPass: e.detail.value
        })
    },
    /**
     * 弹窗
     */
    refund: function() {
        this.setData({
            showModal: true
        })
    },
    /**
     * 弹出框蒙层截断touchmove事件
     */
    preventTouchMove: function() {},
    /**
     * 隐藏模态对话框
     */
    hideModal: function() {
        this.setData({
            showModal: false
        });
    },
    /**
     * 对话框取消按钮点击事件
     */
    onCancel: function() {
        this.hideModal();
    },
    /**
     * 对话框确认按钮点击事件
     */
    onConfirm: function(e) {
        var that = this
        var shopPw = wx.getStorageSync('shopRember').loginPass
        if (that.data.refundAmount == '') {
            wx.showToast({
                title: '请输入退款金额！',
                icon: 'none'
            })
            return
        } else if (that.data.inputPass == '' || that.data.inputPass != shopPw) {
            wx.showToast({
                title: '请输入正确的退款密码！',
                icon: 'none'
            })
            return
        }
        wx.showLoading({
            title: '退款中...',
            mask: true
        })
        wx.request({
            url: this.data.server + 'merchantTransaction/backOrder', //仅为示例，并非真实的接口地址
            data: {
                time: this.data.orderTime,
                batch: this.data.outTradeNo,
                insNumber: this.data.insNumber,
                paymentChannel: this.data.paymentChannel,
                type: this.data.batchInfo.payType,
                refundAmount: this.data.refundAmount,
                reportingMerNum: this.data.reportingMerNum,
                merNumber: this.data.merNumber,
                userNumber: this.data.userNumber,
                equipmentType: this.data.equipmentType,
            },
            // url:'http://api.51shanhe.com/p-pay/refund/fuiouRefund',
            // data: {
            //     inputPass: this.data.inputPass,
            //     insNumber: this.data.insNumber,
            //     paymentChannel: this.data.paymentChannel,
            //     outTradeNo: this.data.outTradeNo,
            //     type: this.data.type,
            //     refundAmount: this.data.refundAmount,
            //     reportingMerNum: this.data.reportingMerNum,
            //     merNumber: this.data.merNumber,
            //     userNumber: this.data.userNumber,
            //     equipmentType: this.data.equipmentType,
            // },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function(res) {
                if (res.data.code != 1000) {
                    wx.hideLoading()
                    wx.showToast({
                        title: '退款失败',
                        image: '../../img/fail.png'
                    })
                } else {
                    wx.hideLoading()
                    that.hideModal();
                    wx.showToast({
                        title: "退款成功!"
                    })
                    that.batchInfo()
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})