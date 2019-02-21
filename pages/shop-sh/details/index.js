// pages/shop-sh/details/index.js//index.js
const config = require('../../../utils/config.js')
//获取应用实例
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        batch: '',
        orderState: '',
        batchInfo: [],
        orderstatus: ['支付中', '交易成功', '交易失败', '已退款'],
        server: config.server,
        pageNum: 1,
        limit: 10,
        //输入框显隐
        showPassword: false,
        // 输入框参数设置
        inputData: {
            input_value: "", //输入框的初始内容
            value_length: 0, //输入框密码位数
            isNext: false, //是否有下一步的按钮
            get_focus: true, //输入框的聚焦状态
            focus_class: true, //输入框聚焦样式
            value_num: [1, 2, 3, 4, 5, 6], //输入框格子数
            height: "98rpx", //输入框高度
            width: "604rpx", //输入框宽度
            see: false, //是否明文展示
            interval: true, //是否显示间隔格子
        },
    },
    // 6位密码输入成功后
    valueSix(e) {
        this.hidePassBord()
        // 模态交互效果
        wx.showToast({
            title: '退款成功',
            icon: 'success',
            duration: 2000
        })
    },
    //显示交易密码框
    passwordInput(e) {
        this.setData({
            showPassword: true,
        })
    },
    //隐藏交易密码框
    hidePassBord(e) {
        this.setData({
            showPassword: false,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '加载中',
        })
        var that = this
        var batch = options.batch
        var orderState = options.orderState
        wx.request({
            url: this.data.server + 'merchantTransaction/getBatchInfo', //仅为示例，并非真实的接口地址
            method: 'post',
            data: {
                batch: batch,
                orderState: orderState,
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                wx.hideLoading()
                var data = res.data
                if (res.data.code != 1000) {

                } else {
                    var batchInfo = data.data
                    batchInfo.transactionTime = batchInfo.transactionTime.substring(0,19)
                    if (batchInfo.transactionType == 'Alipay_Pay') {
                        batchInfo.transactionType = '支付宝'
                    } else if (batchInfo.transactionType == 'WeChat_Pay') {
                        batchInfo.transactionType = '微信'
                    }
                    that.setData({
                        batchInfo: batchInfo
                    })
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