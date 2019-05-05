// pages/merchants/register-sh/index.js
const config = require('../../../utils/config.js')
var timer
var reg = /^1[3|4|5|6|7|8][0-9]{9}$/

Page({

    /**
     * 页面的初始数据
     */
    data: {
        server: config.server,
        codenum:'获取验证码',
        merchantsInfo: {},
    },
    /* 文本框获取焦点时更改状态*/
    focus: function(e) {
        var merchantsInfo = this.data.merchantsInfo
    },
    /* 文本框失去焦点时更改状态*/
    blur: function(e) {
        var merchantsInfo = this.data.merchantsInfo
        if (e.currentTarget.dataset.id == 'merchantsName') {
            if (e.detail.value.length < 3) {
                wx.showToast({
                    title: '请输入正确的商户名称!',
                    icon: 'none'
                })
                return
            } else {
                merchantsInfo.merchantsName = e.detail.value
                this.setData({
                    merchantsInfo: merchantsInfo
                })
            }
        }
        if (e.currentTarget.dataset.id == 'merchantsPhone') {
            if (!reg.test(e.detail.value)) {
                wx.showToast({
                    title: '请输入正确的商户手机号!',
                    icon: 'none'
                })
                return
            } else {
                merchantsInfo.merchantsPhone = e.detail.value
                this.setData({
                    merchantsInfo: merchantsInfo
                })
            }
        }
        if (e.currentTarget.dataset.id == 'merchantsCode') {
            merchantsInfo.merchantsCode = e.detail.value
            this.setData({
                merchantsInfo: merchantsInfo
            })
        }
    },
    subBtn: function () {
        var merchantsInfo = this.data.merchantsInfo
        if (merchantsInfo.merchantsName == '' || !merchantsInfo.merchantsName) {
            wx.showToast({
                title: '请输入正确的商户名称!',
                icon: 'none'
            })
            return
        } else if (merchantsInfo.merchantsPhone == '' || !merchantsInfo.merchantsPhone) {
            wx.showToast({
                title: '请输入正确的商户手机号!',
                icon: 'none'
            })
            return
        } else if (merchantsInfo.merchantsCode == '' || !merchantsInfo.merchantsCode || merchantsInfo.merchantsCode != this.data.photoCode){
                wx.showToast({
                    title: '请输入正确的验证码！',
                    icon: 'none'
                })
            return
        } else {
            console.log(merchantsInfo)
            wx.showToast({
                title: '注册成功!',
                icon: 'success'
            })
            setTimeout(function(){
                wx.navigateTo({
                    url: 'test?id=1'
                })
            },1000)
        }
    },
    securitycode:function(){
        var codenum = this.data.codenum
        var merchantsInfo = this.data.merchantsInfo
        if (!reg.test(merchantsInfo.merchantsPhone)){
            wx.showToast({
                title: '请输入正确的手机号！',
                icon:'none',
            })
            return
        }
        if (codenum != '获取验证码') {
            wx.showToast({
                title: '请在' + codenum+'秒后尝试重新发送短信',
                icon: 'none'
            })
            return
        }
        var that = this
        wx.request({
            url: this.data.server + 'Verify/salePhone',
            method: 'post',
            dataType: 'json',
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            data: {
                "phone": merchantsInfo.merchantsPhone,
                "institutionNumber": 1004
            },
            success: res => {
                console.log(res)
                // wx.showToast({
                // 	title: '发送验证码成功',
                // })
                if (res.data.code == 1000) {
                    that.setData({
                        photoCode: res.data.data
                    })
                    this.Countdown()
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    })
                }

            }
        })
    },
    Countdown: function () {
        var that = this
        var codenum = that.data.codenum

        timer = setTimeout(function () {
            that.Countdown();
            if (codenum != 0) {
                if (codenum == '获取验证码') {
                    codenum = 60
                }
                that.setData({
                    codenum: codenum - 1
                })
            } else {
                that.setData({
                    codenum: '获取验证码'
                })
                clearTimeout(timer);
            }

        }, 800);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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