// pages/merchants/register/index.js
const shopData = require('../../../utils/shopData.js')
const hangye = require('../../../utils/hangye.js')
const hangbie = require('../../../utils/hangbie.js')
const verify = require('../../../utils/verify.js')
const config = require('../../../utils/config.js')
var hangyeData = new Array()
var list1 = hangye.list1
var list2 = hangye.list2
var list3 = hangye.list3
var listVal = hangye.listVal
hangyeData.push(list1)
hangyeData.push(list2[0])
hangyeData.push(list3[0][0])
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
        rateList: [],
        rate1: [],
        rate2: [],
        server: config.server,
        server1: config.server,
        showModal: false,
        appear: false,
        disabled: false,
        steps: 0,
        // 多列选择器(行业)列表设置,及初始化
        list1: list1,
        list2: list2,
        list3: list3,
        listVal: listVal,
        listValid: 0,
        columNum: 0,
        verify: verify.very,
        merchantType: 0,
        //行业联动
        multihangye: '',
        multiArray3: hangyeData,
        multiIndex3: [],
        //地址联动
        multiaddress: '',
        multiArray1: addressData,
        multiIndex1: [],
        provincelist: [],
        provincelistc: [],
        provincecode: 0,
        branch: [],
        // 多列选择器(三级联动)列表设置,及初始化
        //date: shopData.shopData.shoplabel,
        imagelist: [{
            //营业执照
            imgSrc: '../../img/pic1.png',
            type: 1,
			name: "businessLicense",
            isS: false,
            ty: 1
        }, {
            //开户许可
            imgSrc: '../../img/pic2.png',
            type: 12,
            name: "openingPermit",
            isS: false,
            ty: 2
        }, {
            //身份证正面
            imgSrc: '../../img/pic3.png',
            type: 2,
            name: "juridicalpersonIdPositive",
            isS: false,
            ty: 0
        }, {
            //身份证反
            imgSrc: '../../img/pic4.png',
            type: 3,
            name: "juridicalpersonIdReverseside",
            isS: false,
            ty: 0
        }, {
            //手持身份证
            imgSrc: '../../img/pic5.png',
            type: 11,
            name: "holdId",
            isS: false,
            ty: 0
        }, {
            //银行卡正面
            imgSrc: '../../img/pic6.png',
            type: 6,
            name: "bankCardPositive",
            isS: false,
            ty: 0
        }, {
            //门店门头
            imgSrc: '../../img/pic7.png',
            type: 5,
            name: "doorheadPhoto",
            isS: false,
            ty: 0
        }, {
            //门店门脸
            imgSrc: '../../img/pic11.png',
            type: 4,
            name: "facePhoto",
            isS: false,
            ty: 0
        }, {
            //门店收银台
            imgSrc: '../../img/pic8.png',
            type: 13,
            name: "cashier",
            isS: false,
            ty: 2
        }, {
            //门店经营场所
            imgSrc: '../../img/pic9.png',
            type: 14,
            name: "placeBusiness",
            isS: false,
            ty: 2
        }, {
            //其他
            imgSrc: '../../img/pic10.png',
            type: 0,
            name: "rests",
            isS: true,
            ty: 0
        }],
        hangbie: hangbie.hangbie,
        pageNum: 1,
        geren: false,
        settlementLogo: '对私',
        rateType: 'D1',
        merchantNumber: '',
        imgTrue: 'true',
        institutionNumber: '',
        saleNumber: '',
        nextT: true,
        isUpdata: false,
		subNumber:'',
		orderNumber:'',
        merchantNumber:''

    },
    navOn: function(e) {
        var id = e.currentTarget.dataset.id
        this.setData({
            steps: id
        })
    },
    //选中事项
    radioChange: function(e) {
        console.log(e)
        var shopData = this.data.shopData
        console.log(shopData)
        if (e.detail.value != 0) {
            shopData[0].stepsCon[2].isS = true
            for (var i = 0; i < shopData[0].stepsCon[0].basicsetup[1].radiolist.length; i++) {
                shopData[0].stepsCon[0].basicsetup[1].radiolist[i].checked = false
            }
            shopData[0].stepsCon[0].basicsetup[1].radiolist[e.detail.value].checked = true
            for (var j = 0; j < shopData[1].stepsCon[0].basicsetup[0].radiolist.length; j++) {
                shopData[1].stepsCon[0].basicsetup[0].radiolist[j].checked = true
            }
            console.log(shopData[1].stepsCon[0].basicsetup[0].radiolist[1])
            shopData[1].stepsCon[0].basicsetup[0].radiolist[1].isS = true
            shopData[1].stepsCon[1].basicsetup[0].isS = true
            this.setData({
                shopData: shopData,
                merchantType: e.detail.value
            })
        } else {
            shopData[0].stepsCon[2].isS = false
            for (var i = 0; i < shopData[0].stepsCon[0].basicsetup[1].radiolist.length; i++) {
                shopData[0].stepsCon[0].basicsetup[1].radiolist[i].checked = false
            }
            shopData[0].stepsCon[0].basicsetup[1].radiolist[e.detail.value].checked = true

            for (var j = 0; j < shopData[1].stepsCon[0].basicsetup[0].radiolist.length; j++) {
                shopData[1].stepsCon[0].basicsetup[0].radiolist[j].checked = false
            }
            shopData[1].stepsCon[0].basicsetup[0].radiolist[e.detail.value].checked = true
            console.log(shopData[1].stepsCon[1].basicsetup[0])
            shopData[1].stepsCon[1].basicsetup[0].isS = false
            console.log(shopData[1].stepsCon[0].basicsetup[0].radiolist[1].isS)
            shopData[1].stepsCon[0].basicsetup[0].radiolist[1].isS = false
            this.setData({
                shopData: shopData,
                merchantType: e.detail.value
            })
        }
    },
    radioChange1: function(e) {
        console.log(e)
        var cur = e.currentTarget.dataset.name
        if (cur == 'settlementLogo') {
            this.setData({
                settlementLogo: e.detail.value
            })
        }
        if (cur == 'Settleway') {
            if (e.detail.value == 'D0') {
                var ra = this.data.rate2
                var raid = this.data.rateId2
                this.setData({
                    rateType: e.detail.value,
                    rateList: ra,
                    rateList1: raid
                })
            } else {
                var ra = this.data.rate1
                var raid = this.data.rateId1
                this.setData({
                    rateType: e.detail.value,
                    rateList: ra,
                    rateList1: raid
                })
            }

        }
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
            console.log(this.verify(this.data.step0))
            if (this.verify(this.data.step0)) {
                this.setData({
                    status: '',
                    steps: 1
                })
            } else {}
        }
        if (steps == 1) {
			console.log('21321')
            this.verify(this.data.step1)
            if (this.verify(this.data.step1)) {
                var shopInput = this.data.shopInput
                console.log(shopInput)
                shopInput.merchantType = this.data.merchantType
                shopInput.oneOperate = this.data.multihangye.split('-')[0]
                shopInput.twoOperate = this.data.multihangye.split('-')[1]
                shopInput.threeOperate = this.data.multihangye.split('-')[2]
                shopInput.provinceID = shopInput.region.split('-')[0]
                shopInput.cityID = shopInput.region.split('-')[1]
                shopInput.areaID = shopInput.region.split('-')[2]
                shopInput.province = this.data.multiaddress.split('-')[0]
                shopInput.city = this.data.multiaddress.split('-')[1]
                shopInput.area = this.data.multiaddress.split('-')[2]
                //结算
                shopInput.settlementLogo = this.data.settlementLogo
                shopInput.rateType = this.data.rateType
                shopInput.passWord = shopInput.registerCell.substring(5, 12)
                shopInput.institutionNumber = this.data.institutionNumber
                shopInput.saleNumber = this.data.saleNumber
				shopInput.subaccountNumber = this.data.subNumber
                shopInput.orderNumber = this.data.orderNumber
                shopInput.merchantNumber = this.data.merchantNumber
                var that = this
                wx.request({
                    url: this.data.server + 'merchantRegister/insertMerchantRegisterInfo',
                    method: 'post',
                    data: shopInput,
                    dataType: 'json',
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success: function(res) {
                        console.log(res.data.code)
                        console.log(res.data.code == 1000)
                        if (res.data.code == 1000) {
                            that.setData({
								orderNumber: res.data.data.orderNumber,
                                steps: 2
                            })
                        }else{
							wx.showToast({
								title: res.data.msg,
								icon:'none'
							})
						}
                    }
                })
            } else {}
        }
    },
    //验证
    verify: function(data) {
        var jgData = data
        var data = []
        var veNum = 0
        var that = this
        var merchantType = that.data.merchantType
        var shopInput = that.data.shopInput
        if (merchantType == 0) {
            for (var i = 0; i < jgData.length; i++) {
                if (jgData[i].shoplabel.indexOf('营业') < 0) {
                    data.push(jgData[i])
                }
            }
        } else {
            for (var i = 0; i < jgData.length; i++) {

                data.push(jgData[i])

            }
        }
        for (var i = 0; i < data.length; i++) {
            if (!shopInput[data[i].id]) {
                that.setData({
                    status: data[i].id,
                    statusTips: data[i].id
                })
                break
            } else {
                if (data[i].id == 'merchantName') {
                    var reg = new RegExp("^([a-z]|[A-Z]|[0-9]|[\\u4e00-\\u9fa5]){0,20}$")
                    if (reg.test(shopInput[data[i].id])) {
                        veNum++
                    } else {
                        wx.showToast({
                            title: '商户名称输入不合法',
                            icon: 'none'
                        })
                        that.setData({
                            status: data[i].id,
                            statusTips: data[i].id
                        })
                        break
                    }
                } else if (data[i].id == 'juridicalpersonName') {
                    var reg = new RegExp("^([a-z]|[A-Z]|[0-9]|[\\u4e00-\\u9fa5]){0,15}$")
                    if (reg.test(shopInput[data[i].id])) {
                        veNum++
                    } else {
                        wx.showToast({
                            title: '联系人姓名不能含有特殊符号',
                            icon: 'none'
                        })
                        that.setData({
                            status: data[i].id,
                            statusTips: data[i].id
                        })
                        break
                    }
                } else if (data[i].id == 'juridicalpersonId') {
                    var reg = new RegExp("^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$")
                    if (reg.test(shopInput[data[i].id])) {
                        veNum++
                    } else {
                        wx.showToast({
                            title: '身份证号码长度有误或者含有特殊符号',
                            icon: 'none'
                        })
                        that.setData({
                            status: data[i].id,
                            statusTips: data[i].id
                        })
                        break
                    }
                } else if (data[i].id == 'registerCell') {
                    var reg = /^1[3|4|5|6|7|8][0-9]{9}$/
                    if (reg.test(shopInput[data[i].id])) {
                        veNum++
                    } else {
                        wx.showToast({
                            title: '联系电话无效，请重新输入',
                            icon: 'none'
                        })
                        that.setData({
                            status: data[i].id,
                            statusTips: data[i].id
                        })
                        break
                    }
                } else if (data[i].id == 'juridicalpersonId') {
                    var reg = new RegExp("^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$")
                    if (reg.test(shopInput[data[i].id])) {
                        veNum++
                    } else {
                        wx.showToast({
                            title: '身份证号码长度有误或者含有特殊符号',
                            icon: 'none'
                        })
                        that.setData({
                            status: data[i].id,
                            statusTips: data[i].id
                        })
                        break
                    }
                } else if (data[i].id == 'businessLicenseName') {
                    var reg = new RegExp("^([a-z]|[A-Z]|[0-9]|[\\u4e00-\\u9fa5]){0,50}$")
                    if (reg.test(shopInput[data[i].id])) {
                        veNum++
                    } else {
                        wx.showToast({
                            title: '营业名称不能含有特殊符号且长度为50',
                            icon: 'none'
                        })
                        that.setData({
                            status: data[i].id,
                            statusTips: data[i].id
                        })
                        break
                    }
                } else if (data[i].id == 'businessLicenseNo') {
                    var reg = new RegExp("^([0-9]|[A-Z]){0,20}$")
                    if (reg.test(shopInput[data[i].id])) {
                        veNum++
                    } else {
                        wx.showToast({
                            title: '证件号码长度有误或者含有特殊符号',
                            icon: 'none'
                        })
                        that.setData({
                            status: data[i].id,
                            statusTips: data[i].id
                        })
                        break
                    }
                } else if (data[i].id == 'mailbox') {
                    var reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
                    if (reg.test(shopInput[data[i].id])) {
                        veNum++
                    } else {
                        wx.showToast({
                            title: '请输入正确的邮箱',
                            icon: 'none'
                        })
                        that.setData({
                            status: data[i].id,
                            statusTips: data[i].id
                        })
                        break
                    }
                } else {
                    veNum++
                }

            }
        }
		console.log(veNum)
        if (veNum == data.length) {
            return true
        } else {
            return false
        }
    },
    // 选择省市区函数
    changeRegin(e) {
        console.log(e)
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
    // 选择三级联动-行业
    businessPicker(e) {
        var picker1 = e.detail.value[0]
        var picker2 = e.detail.value[1]
        var picker3 = e.detail.value[2]
        var multiArray3 = this.data.multiArray3
        var listValid = this.data.listValid
        var shopInput = this.data.shopInput
        var operationId = e.target.dataset.current
        shopInput[operationId] = listVal[picker1][picker2][picker3]
        this.setData({
            multihangye: multiArray3[0][picker1] + '-' + multiArray3[1][picker2] + '-' + multiArray3[2][picker3],
            listValid: listVal[picker1][picker2][picker3],
            shopInput: shopInput
        })
    },
    columB: function(e) {
        if (e.detail.column == 0) {
            var multiArray3 = this.data.multiArray3
            multiArray3[1] = this.data.list2[e.detail.value]
            multiArray3[2] = this.data.list3[e.detail.value][0]
            this.setData({
                multiArray3: multiArray3,
                columNum: e.detail.value
            })
        }
        if (e.detail.column == 1) {
            var multiArray3 = this.data.multiArray3
            multiArray3[2] = this.data.list3[this.data.columNum][e.detail.value]
            this.setData({
                multiArray3: multiArray3
            })
        }
    },
    formSubmit(e) {
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
        if (!this.data.nextT) {
            return
        }
        var cur = e.target.dataset.current;
        this.setData({
            status: cur
        })
    },
    /* 文本框失去焦点时更改状态*/
    blur: function(e) {
        console.log(e)
        var data = e.detail.value
        var cur = e.target.dataset.current;
        var that = this
        if (cur == 'merchantName' && data != '') {
            wx.request({
                url: this.data.server + 'IntoPieces/merchantsToHeavy',
                method: 'post',
                data: {
                    merchantName: data,
                },
                dataType: 'json',
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function(e) {
                    console.log(e)
                    if (e.data.code != 1000) {
                        wx.showToast({
                            title: e.data.msg + ',请重新输入',
                            icon: 'none'
                        })
                        that.setData({
                            status: cur,
                            nextT: false
                        })
                        return
                    } else {
                        that.setData({
                            nextT: true
                        })
                    }
                }
            })
        }
        if (cur == 'registerCell' && data != '') {
            wx.request({
                url: this.data.server + 'merchantRegister/checkPhone',
                method: 'post',
                data: {
                    phone: data,
                    saleNumber: that.data.saleNumber
                },
                dataType: 'json',
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function(e) {
                    console.log(e)
                    if (e.data.code != 1000) {
                        wx.showToast({
                            title: e.data.msg + ',请重新输入',
                            icon: 'none'
                        })
                        that.setData({
                            status: cur,
                            nextT: false
                        })
                        return
                    } else {
                        that.setData({
                            nextT: true
                        })
                    }
                }
            })
        }
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
    bindPickerChange(e) {
        console.log(e)
        var data = e.detail.value
        var cur = e.target.dataset.current;
        if (!data) {
            this.setData({
                status: '',
            })
        } else {
            var shopInput = this.data.shopInput
            shopInput[cur] = this.data.rateList[data]
            if (cur == 'rate') {
                if (this.data.rateList1.length > 0) {
                    shopInput.rateCoding = this.data.rateList1[data]
                } else {
                    shopInput.rateCoding = ''
                }


            }
            this.setData({
                status1: cur,
                index: e.detail.value,
                shopInput: shopInput
            })
        }
    },
    bindBankchoose(e) {
        var cur = e.target.dataset.current;
        console.log(e)
        if (cur == "openingBank") {
            this.setData({
                showModal: true
            })
        } else {
            this.setData({
                showModal1: true
            })
        }

    },
    //选择银行
    chooseHang: function(e) {
        console.log(e)
        var shopInput = this.data.shopInput
        var name = e.currentTarget.dataset.name
        var num = e.currentTarget.dataset.num
        shopInput.openingBank = name
        shopInput.openingBankID = num
        this.setData({
            shopInput: shopInput,
            showModal: false
        })
    },
    chooseHang1: function(e) {
        console.log(e)
        var shopInput = this.data.shopInput
        var name = e.currentTarget.dataset.name
        var num = e.currentTarget.dataset.num
        shopInput.openingBankBranch = name
        shopInput.openingBankBranchID = num
        this.setData({
            shopInput: shopInput,
            showModal1: false
        })
    },
    //选择支行
    //搜索支行
    choosebranch: function(e) {
        console.log(e)
        clearTimeout(this.time)
        if (!this.data.shopInput.openingBankID) {
            wx.showToast({
                title: '请先选择银行名称',
                icon: "none"
            })
            return
        }
        var that = this
        wx.request({
            url: that.data.server + 'merchantRegister/selectBank',
            method: 'post',
            data: {
                bankCode: that.data.shopInput.openingBankID,
                bankName: e.detail.value,
                page: that.data.pageNum,
                limit: 20
            },
            dataType: 'json',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function(e) {
                console.log(e)
                if (e.data.code == 1000) {
                    that.setData({
                        branch: e.data.data.selectBank
                    })
                }
            }
        })
    },

    bankSearch: function(e) {
        var detail = e.detail.value
        var hang = this.data.hangbie
        for (var i = 0; i < hang.length; i++) {
            if (hang[i].text.indexOf(detail) > -1) {
                hang[i].type = true
            } else {
                hang[i].type = false
            }
        }
        this.setData({
            hangbie: hang
        })
    },
    //弹出框蒙层截断touchmove事件
    preventTouchMove(e) {},
    //隐藏模态对话框
    hideModal: function(e) {
        this.setData({
            showModal: false,
            showModal1: false
        });
    },
    //对话框取消按钮点击事件
    onCancel(e) {
        this.hideModal();
    },
    //对话框确认按钮点击事件
    onConfirm(e) {
        this.hideModal();
        wx.showToast({
            title: '修改成功',
        })
    },
    chooseImage(e) {
        console.log(e)
        const self = this
        var that = this
        var imagelist = that.data.imagelist
        var index = e.target.dataset.picindex
        var type = e.target.dataset.pictype

        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album'],
            success(res) {
                const imageSrc = res.tempFilePaths[0]
                wx.showLoading({
                    title: '正在上传，请稍等',
                })
                wx.uploadFile({
                    url: that.data.server1 + 'Sell/addPic',
                    filePath: imageSrc,
                    name: 'file',
                    formData: {
                        type: type,
                        institutionNumber: that.data.institutionNumber,
						orderNumber: that.data.orderNumber
                    },
                    success(res) {
                        wx.showToast({
                            title: '上传成功',
                            icon: 'success',
                            duration: 1000
                        })
                        var imgSrc = JSON.parse(res.data)
                        var imagelist = that.data.imagelist
                        imagelist[index].imgSrc = imgSrc.data + '?' + Math.random()
                        imagelist[index].isS = true
                        that.setData({
                            imagelist: imagelist
                        })
                        console.log(imagelist)
                    },
                    fail() {
                        wx.showToast({
                            title: '上传失败',
                            icon: 'success',
                            duration: 1000
                        })
                    }
                })
            },

            fail({
                errMsg
            }) {
                console.log('chooseImage fail, err is', errMsg)
            }
        })
    },
    subImage: function() {
        var imgList = this.data.imagelist
        var type = this.data.merchantType
        var tjData = new Object()
		tjData.orderNumber = this.data.orderNumber
        tjData.institutionNumber = this.data.institutionNumber
        console.log(imgList)
        if (type == 2) {
            for (var i = 0; i < imgList.length; i++) {
                if (imgList[i].isS == false) {
                    wx.showToast({
                        title: '请补充完整图片信息',
                        icon: "none"
                    })
                    this.setData({
                        imgTrue: false
                    })
                    break
                } else {
                    tjData[imgList[i].name] = imgList[i].imgSrc
                    this.setData({
                        imgTrue: true
                    })
                }
            }
        } else if (type == 0) {
            for (var i = 0; i < imgList.length; i++) {
                if (imgList[i].ty == 0) {
                    if (imgList[i].isS == false) {
                        wx.showToast({
                            title: '请补充完整图片信息',
                            icon: "none"
                        })
                        this.setData({
                            imgTrue: false
                        })
                        break
                    } else {
						if (imgList[i].imgSrc.indexOf('?') > -1){
							tjData[imgList[i].name] = imgList[i].imgSrc.split('?')[0]
						}else{
							tjData[imgList[i].name] = imgList[i].imgSrc
						}
                        
                        this.setData({
                            imgTrue: true
                        })
                    }
                }
            }
        } else if (type == 1) {
            for (var i = 0; i < imgList.length; i++) {
                if (imgList[i].ty != 2) {
                    if (imgList[i].isS == false) {
                        wx.showToast({
                            title: '请补充完整图片信息',
                            icon: "none"
                        })
                        this.setData({
                            imgTrue: false
                        })
                        break
                    } else {
                        tjData[imgList[i].name] = imgList[i].imgSrc
                        this.setData({
                            imgTrue: true
                        })
                    }
                }
            }
        }
        console.log(this.data.imgTrue)
        console.log(tjData)

        console.log(tjData)

        if (this.data.imgTrue) {
            if (tjData.rests.indexOf('../../') > -1) {
                tjData.rests = ''
            }
			wx.showLoading({
				title: '正在保存，请稍后',
				mask:true
			})
            var tjd = JSON.stringify(tjData)
            wx.request({
                url: this.data.server + 'Sell/updateMerPhotoInfo',
                method: 'post',
                data: tjd,
                dataType: 'json',
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function(res) {
                    console.log(res)
                    if (res.data.code == 1000) {
                        wx.showToast({
                            title: '保存信息成功',
                            icon: 'none',
							success:function(){
								setTimeout(function () {
									wx.navigateBack({
										delta:1
									})
								}, 500)
							}
                        })
                    } else {
                        wx.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                }
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        var options = options
        this.setData({
			orderNumber: options.id,
            isUpdata: options.type,
			subNumber: options.subNumber,
            merchantNumber: options.merchantNumber
        })
        var that = this
        if (that.data.isUpdata == 'true') {
            wx.request({
                url: that.data.server + 'merchantRegister/selectMerchantRegisterInfo',
                method: 'post',
                data: {
					orderNumber: that.data.orderNumber
                },
                dataType: 'json',
                header: {
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                success: function(res) {
                    var data1 = res.data.data.merchantRegisterInfo
					var shopData = that.data.shopData
                    console.log(data1)
                    var data2 = res.data.data.merchantBankCardInfo
					var dataRate = res.data.data.merchantRoteInfo
					var data3 = Object.assign(data1, data2,dataRate)
                    var multihangye = data3.oneOperate + '-' + data3.twoOperate + '-' + data3.threeOperate
                    var multiaddress = data3.province + '-' + data3.city + '-' + data3.area
					data3.region = data3.provinceID + '-' + data3.cityID + '-' + data3.areaID
					switch (data3.merchantType) {
						case '个人':
							data3.merchantType = 0
							break;
						case '个体':
							data3.merchantType = 1
							break;
						case '企业':
							data3.merchantType = 2
							break;
					}
                    if (data3.merchantType != 0) {
                        shopData[0].stepsCon[2].isS = true
                        for (var i = 0; i < shopData[0].stepsCon[0].basicsetup[1].radiolist.length; i++) {
                            shopData[0].stepsCon[0].basicsetup[1].radiolist[i].checked = false
							if(data3.merchantType == i){
								shopData[0].stepsCon[0].basicsetup[1].radiolist[i].checked = true
							}
                        }
						// shopData[0].stepsCon[0].basicsetup[1].radiolist[data3.merchantType].checked = true
						console.log(shopData[1].stepsCon[0].basicsetup[0].radiolist)
                        for (var j = 0; j < shopData[1].stepsCon[0].basicsetup[0].radiolist.length; j++) {
                            shopData[1].stepsCon[0].basicsetup[0].radiolist[j].checked = false
							if (data3.acntType == shopData[1].stepsCon[0].basicsetup[0].radiolist[j].radiotypeNum){
								shopData[1].stepsCon[0].basicsetup[0].radiolist[j].checked = true
							}
                        }
                        
                        shopData[1].stepsCon[0].basicsetup[0].radiolist[1].isS = true
                        shopData[1].stepsCon[1].basicsetup[0].isS = true
						console.log(shopData[1].stepsCon[1].basicsetup[0].radiolist)
						for (var k = 0 ;k < shopData[1].stepsCon[1].basicsetup[0].radiolist.length;k++){
							console.log(shopData[1].stepsCon[1].basicsetup[0].radiolist[k])
							shopData[1].stepsCon[1].basicsetup[0].radiolist[k].checked = false
							if (data3.rateType == shopData[1].stepsCon[1].basicsetup[0].radiolist[k].radiotypeNum){
								shopData[1].stepsCon[1].basicsetup[0].radiolist[k].checked = true
							}
						}
                        that.setData({
                            shopData: shopData,
							merchantType: data3.merchantType
                        })
                    } 
					else {
                        shopData[0].stepsCon[2].isS = false
                        for (var i = 0; i < shopData[0].stepsCon[0].basicsetup[1].radiolist.length; i++) {
                            shopData[0].stepsCon[0].basicsetup[1].radiolist[i].checked = false
                        }
						shopData[0].stepsCon[0].basicsetup[1].radiolist[data3.merchantType].checked = true

                        for (var j = 0; j < shopData[1].stepsCon[0].basicsetup[0].radiolist.length; j++) {
                            shopData[1].stepsCon[0].basicsetup[0].radiolist[j].checked = false
                        }
						shopData[1].stepsCon[0].basicsetup[0].radiolist[data3.merchantType].checked = true
                        console.log(shopData[1].stepsCon[1].basicsetup[0])
                        shopData[1].stepsCon[1].basicsetup[0].isS = false
                        console.log(shopData[1].stepsCon[0].basicsetup[0].radiolist[1].isS)
                        shopData[1].stepsCon[0].basicsetup[0].radiolist[1].isS = false
                        that.setData({
                            shopData: shopData,
							merchantType: data3.merchantType
                        })
                    }
                    console.log(data3)
                    that.setData({
                        shopInput: data3,
                        multihangye: multihangye,
                        multiaddress: multiaddress
                    })
                }
            })
			wx.request({
				url: that.data.server + 'Sell/getMerPhoto',
				method: 'post',
				data: {
					orderNumber: that.data.orderNumber
				},
				dataType: 'json',
				header: {
					'content-type': 'application/x-www-form-urlencoded'  // 默认值
				},
				success: function (res) {
					console.log(res)
					if(res.data.code == 1000){
						if(res.data.data == null){
							// wx.showToast({
							// 	title:res.data.msg,
							// 	icon:"none"
							// })
						}else{
							var imagelist = that.data.imagelist
							console.log(res.data.data[0])
							var imL = res.data.data[0]
							for(var i in imL){
								for(var m = 0 ; m < imagelist.length;m++){
									if (imagelist[m].name == i){
										if(!!imL[i]){
											imagelist[m].imgSrc = imL[i]
											imagelist[m].isS = true
										}
										break
									}
								}
							}
							console.log(imagelist)
							that.setData({
								imagelist:imagelist
							})
						}
					}
				}
			})
        }
        var saleInfo = wx.getStorageSync('saleInfo')
        console.log(saleInfo)
        var rateD0 = saleInfo.productSwitch.split('&');
        var rateD1 = saleInfo.productSwitchD1.split('&');
        var rate1 = [],
            rate2 = [],
            rateId1 = [],
            rateId2 = []
        if (saleInfo.productSwitchD1.indexOf('|') > -1) {
            for (var i = 0; i < rateD1.length; i++) {
                rate1.push(rateD1[i].split('|')[1])
                rateId1.push(rateD1[i].split('|')[0])
            }
        } else {
            for (var i = 0; i < rateD1.length; i++) {
                rate1.push(rateD1[i])
            }
        }
        if (saleInfo.productSwitch.indexOf('|') > -1) {
            for (var i = 0; i < rateD0.length; i++) {
                rate2.push(rateD0[i].split('|')[1])
                rateId2.push(rateD0[i].split('|')[0])
            }
        } else {
            for (var i = 0; i < rateD0.length; i++) {
                rate2.push(rateD0[i])
            }
        }
        this.setData({
            institutionNumber: saleInfo.institutionNumber,
            saleNumber: saleInfo.number,
            rateList: rate1,
            rateList1: rateId1,
            rate1: rate1,
            rate2: rate2,
            rateId1: rateId1,
            rateId2: rateId2,
        })
        var hangbie = this.data.hangbie
        for (var jj = 0; jj < hangbie.length; jj++) {
            hangbie[jj].type = true
        }
        console.log(hangbie)
        this.setData({
            hangbie: hangbie
        })
        var shopData = this.data.shopData
        var step0 = [],
            step1 = []
        var list = [step0, step1]
        for (var i = 0; i < shopData.length; i++) {
            for (var j = 0; j < shopData[i].stepsCon.length; j++) {
                for (var k = 0; k < shopData[i].stepsCon[j].basicsetup.length; k++) {
                    if (shopData[i].stepsCon[j].basicsetup[k].type == 0) {
                        list[i].push(shopData[i].stepsCon[j].basicsetup[k])
                    }
                }
            }
        }
        this.setData({
            step0: step0,
            step1: step1
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