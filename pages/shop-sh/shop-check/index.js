// pages/merchants/register/index.js
const config = require('../../../utils/config.js')
const shopData = require('../../../utils/shopData1.js')
var addressData = new Array()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        shopData: shopData.shopData,
        shopInput: {},
        setp0: [],
        statusTips: '',
        rateList: ['0.025%', '0.038%', '0.046%', '0.055%'],
        appear: false,
        disabled: false,
        steps: 0,
        //地址联动
        multiaddress: '',
        multiArray1: addressData,
        multiIndex1: [],
        provincelist: [],
        provincelistc: [],
        provincecode: 0,
        //查询商户信息
        shopList: [],
        shopNumber: '',
        institutionNumber: '1001',
        shopName: '',
        agentName: '',
        merchantName: '',
        auditStatus: '',
        merchantType: '',
        startTime: '',
        endtime: '',
        server: config.server,
        pageNum: 1,
        limit: 10,
        add: true
    },
    laststep(e) {
        var steps = e.target.dataset.current;
        if (steps == 1) {
            this.setData({
                steps: 0
            })
        }
        if (steps == 2) {
            this.setData({
                steps: 1
            })
        }
    },
    nextstep(e) {
        var data = e.detail.value
        var steps = e.target.dataset.current;
        if (steps == 0) {
            this.verify(this.data.step0)
            if (this.verify(this.data.step0)) {
                this.setData({
                    status: '',
                    steps: 1
                })
            } else {}
        }
        if (steps == 1) {
            this.setData({
                steps: 2
            })
        }
    },
    subInfo: function() {
        console.log('123123')
        this.verify(this.data.step0)
        console.log(this.verify(this.data.step0))
        if (this.verify(this.data.step0)) {
            if (this.data.add == true) {
                var addData = new Object()
                var shop = this.data.shopInput
                addData.merchantNumber = this.data.saleNumber
                addData.adminName = shop.BLname
                addData.shopName = shop.merchantName
                addData.province = shop.region.split('-')[0]
                addData.city = shop.region.split('-')[1]
                addData.area = shop.region.split('-')[2]
                addData.storePhone = shop.BLnumber
                addData.address = shop.address
				if (shop.BLaddress){
					addData.remark1 = shop.BLaddress
				}else{
					addData.remark1 = ''
				}
                wx.request({
                    url: this.data.server + 'store/addShop',
                    method: 'post',
                    data: addData,
                    dataType: 'json',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded' // 默认值
                    },
                    success: function(res) {
                        if (res.data.code == 1000) {
                            wx.showToast({
                                title: res.data.msg,
                                icon: 'none',
                            })
                            setTimeout(function() {
								console.log('12321')
                                wx.navigateBack({
                                    delta: 1
                                })
                            }, 1000)

                        } else if (res.data.code != 1000) {
                            wx.showToast({
                                title: res.data.msg,
                                icon: 'none',
                            })
                        }
                    }
                })
            }
        } else {}
    },
    //验证
    verify: function(data) {
        var veNum = 0
        var that = this
        var shopInput = that.data.shopInput
        for (var i = 0; i < data.length; i++) {
            if (!shopInput[data[i]]) {
                that.setData({
                    status: data[i],
                    statusTips: data[i]
                })
                break
            } else {
                if (data[i] == 'BLnumber') {
                    var reg = /^1[3|4|5|6|7|8][0-9]{9}$/
                    if (reg.test(shopInput[data[i]])) {
                        veNum++
                    } else {
                        wx.showToast({
                            title: '联系电话无效，请重新输入',
                            icon: 'none'
                        })
                        that.setData({
                            status: data[i],
                            statusTips: data[i]
                        })
                        break
                    }
                } else {
                    veNum++
                }

            }
        }
        if (veNum == data.length) {
            return true
        } else {
            return false
        }
    },
    // 选择三级联动-地址
    addressPicker(e) {
        var picker1 = e.detail.value[0]
        var picker2 = e.detail.value[1]
        var picker3 = e.detail.value[2]
        var provincelist = this.data.provincelist
        var provincelistc = this.data.provincelistc
        var shopInput = this.data.shopInput
        // var operationId = e.target.dataset.current
        // shopInput[provinceId] = provincelist[picker1][picker2][picker3]
        var region = e.target.dataset.current
        shopInput[region] = provincelistc[0][picker1] + '-' + provincelistc[1][picker2] + '-' + provincelistc[2][picker3]
        this.setData({
            multiaddress: provincelist[0][picker1] + '-' + provincelist[1][picker2] + '-' + provincelist[2][picker3],
            shopInput: shopInput
        })
    },
    columA: function(e) {
        var that = this
        if (e.detail.column == 0) {
            wx.request({
                url: that.data.server + 'merchantRegister/selectArea',
                method: 'post',
                data: {
                    provinceCode: that.data.provincelistc[0][e.detail.value],
                    cityCode: ''
                },
                dataType: 'json',
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function(res) {
                    if (res.data.code == '1000') {
                        var addresslist = [],
                            addresslistc = []
                        var provincelist = that.data.provincelist
                        var provincelistc = that.data.provincelistc
                        for (var i = 0; i < res.data.data.length; i++) {
                            addresslist.push(res.data.data[i].cityName)
                            addresslistc.push(res.data.data[i].cityCode)
                        }
                        provincelist[1] = addresslist
                        provincelistc[1] = addresslistc
                        that.setData({
                            provincelist: provincelist,
                            provincelistc: provincelistc
                        })
                        wx.request({
                            url: that.data.server + 'merchantRegister/selectArea',
                            method: 'post',
                            data: {
                                provinceCode: that.data.provincelistc[0][e.detail.value],
                                cityCode: that.data.provincelistc[1][0]
                            },
                            dataType: 'json',
                            header: {
                                'content-type': 'application/json' // 默认值
                            },
                            success: function(res) {
                                if (res.data.code == '1000') {
                                    var addresslist = [],
                                        addresslistc = []
                                    var provincelist = that.data.provincelist
                                    var provincelistc = that.data.provincelistc
                                    for (var i = 0; i < res.data.data.length; i++) {
                                        addresslist.push(res.data.data[i].areaName)
                                        addresslistc.push(res.data.data[i].areaCode)
                                    }
                                    provincelist[2] = addresslist
                                    provincelistc[2] = addresslistc
                                    var provincecode = e.detail.value
                                    that.setData({
                                        provincelist: provincelist,
                                        provincelistc: provincelistc,
                                        provincecode: provincecode
                                    })
                                }
                            }
                        })
                    }
                }
            })
        }
        if (e.detail.column == 1) {
            wx.request({
                url: that.data.server + 'merchantRegister/selectArea',
                method: 'post',
                data: {
                    provinceCode: that.data.provincelistc[0][that.data.provincecode],
                    cityCode: that.data.provincelistc[1][e.detail.value]
                },
                dataType: 'json',
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function(res) {
                    if (res.data.code == '1000') {
                        var addresslist = [],
                            addresslistc = []
                        var provincelist = that.data.provincelist
                        var provincelistc = that.data.provincelistc
                        for (var i = 0; i < res.data.data.length; i++) {
                            addresslist.push(res.data.data[i].areaName)
                            addresslistc.push(res.data.data[i].areaCode)
                        }
                        provincelist[2] = addresslist
                        provincelistc[2] = addresslistc
                        that.setData({
                            provincelist: provincelist,
                            provincelistc: provincelistc
                        })
                    }
                }
            })
        }
    },
    formSubmit(e) {
        var imagelist = this.data.imagelist
        console.log(imagelist)
        var data = e.detail.value
        data.saleNumber = '123456789'
        data.institutionNumber = '123456789'
        data.passWord = data.registerCell.substring(5, 12)
        data.oneOperate = data.Businessscope.split("-")[0]
        data.twoOperate = data.Businessscope.split("-")[1]
        data.threeOperate = data.Businessscope.split("-")[2]
        data.province = data.region.split("-")[0]
        data.city = data.region.split("-")[1]
        data.area = data.region.split("-")[2]
        data.operationId = this.data.listValid
        if (data.operationId == 0) {
            return
            wx.showToast({
                title: '请选择经营类目！',
            })
        }
        wx.request({
            url: this.data.server + 'merchantRegister/insertMerchantRegisterInfo',
            method: 'post',
            data: JSON.stringify(data),
            dataType: 'json',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function(res) {
                if (res.code == 1000) {

                } else if (res.code != 1000) {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                    })
                }
            }
        })
    },
    /* 文本框获取焦点时更改状态*/
    focus: function(e) {
        var cur = e.target.dataset.current;
        this.setData({
            status: cur
        })
    },
    /* 文本框失去焦点时更改状态*/
    blur: function(e) {
        var data = e.detail.value
        var cur = e.target.dataset.current;
        if (data == '') {
            var shopInput = this.data.shopInput
            shopInput[cur] = data
            this.setData({
                status: '',
                shopInput: shopInput
            })
        } else {
            var shopInput = this.data.shopInput
            shopInput[cur] = data
            this.setData({
                status1: cur,
                shopInput: shopInput
            })
        }
    },
    bindDateChange(e) {
        var data = e.detail.value
        var cur = e.target.dataset.current;
        if (!data) {
            this.setData({
                status: '',
            })
        } else {
            var shopInput = this.data.shopInput
            shopInput[cur] = data
            this.setData({
                status1: cur,
                date: e.detail.value,
                shopInput: shopInput
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var saleInfo = wx.getStorageSync('shopInfo')
        console.log(saleInfo)
        this.setData({
            institutionNumber: saleInfo.institutionNumber,
            saleNumber: saleInfo.Number
        })
        var shopnumber = options.shopNumber
        console.log(shopnumber)
        var shopNumber = this.data.shopNumber
        var shopData = this.data.shopData[0].stepsCon[0].basicsetup
        console.log(shopData)
        var step0 = [],
            step1 = []
        for (let i = 0; i < shopData.length - 1; i++) {
            step0.push(shopData[i].id)
        }
        this.setData({
            step0: step0,
            step1: step1,
            shopNumber: shopnumber
        })
        var that = this
        wx.request({
            url: that.data.server + 'merchantRegister/selectArea',
            method: 'post',
            data: {
                provinceCode: '',
                cityCode: ''
            },
            dataType: 'json',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function(res) {
                if (res.data.code == '1000') {
                    var addresslist = [],
                        addresslistc = []
                    var provincelist = that.data.provincelist
                    var provincelistc = that.data.provincelistc
                    for (var i = 0; i < res.data.data.length; i++) {
                        addresslist.push(res.data.data[i].provinceName)
                        addresslistc.push(res.data.data[i].provinceCode)
                    }
                    provincelist.push(addresslist)
                    provincelistc.push(addresslistc)
                    that.setData({
                        provincelist: provincelist,
                        provincelistc: provincelistc
                    })
                    wx.request({
                        url: that.data.server + 'merchantRegister/selectArea',
                        method: 'post',
                        data: {
                            provinceCode: that.data.provincelistc[0][0],
                            cityCode: ''
                        },
                        dataType: 'json',
                        header: {
                            'content-type': 'application/json' // 默认值
                        },
                        success: function(res) {
                            if (res.data.code == '1000') {
                                var addresslist = [],
                                    addresslistc = []
                                var provincelist = that.data.provincelist
                                var provincelistc = that.data.provincelistc
                                for (var i = 0; i < res.data.data.length; i++) {
                                    addresslist.push(res.data.data[i].cityName)
                                    addresslistc.push(res.data.data[i].cityCode)
                                }
                                provincelist.push(addresslist)
                                provincelistc.push(addresslistc)
                                that.setData({
                                    provincelist: provincelist,
                                    provincelistc: provincelistc
                                })
                                wx.request({
                                    url: that.data.server + 'merchantRegister/selectArea',
                                    method: 'post',
                                    data: {
                                        provinceCode: that.data.provincelistc[0][0],
                                        cityCode: that.data.provincelistc[1][0]
                                    },
                                    dataType: 'json',
                                    header: {
                                        'content-type': 'application/json' // 默认值
                                    },
                                    success: function(res) {
                                        if (res.data.code == '1000') {
                                            var addresslist = [],
                                                addresslistc = []
                                            var provincelist = that.data.provincelist
                                            var provincelistc = that.data.provincelistc
                                            for (var i = 0; i < res.data.data.length; i++) {
                                                addresslist.push(res.data.data[i].areaName)
                                                addresslistc.push(res.data.data[i].areaCode)
                                            }
                                            provincelist.push(addresslist)
                                            provincelistc.push(addresslistc)
                                            that.setData({
                                                provincelist: provincelist,
                                                provincelistc: provincelistc
                                            })
                                        }
                                    }
                                })
                            }
                        }
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