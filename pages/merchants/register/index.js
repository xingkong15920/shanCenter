// pages/merchants/register/index.js
const shopData = require('../../../utils/shopData.js')
const hangye = require('../../../utils/hangye.js')
const hangbie = require('../../../utils/hangbie.js')
const yirongma111 = require('../../../utils/yirongma.js')
console.log(yirongma)
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
var yirongma = []
yirongma.push(yirongma111.yirongma)
var yirongmaCode = yirongma111.yirongmaCode
var yirongmaL = yirongma111.yirongmaL
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
		rateList1:[],
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
        yirongmaList: yirongma.yirongma,
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
        citycode: 0,
        branch: [],
		rateNameList:[],
        // 多列选择器(三级联动)列表设置,及初始化
        //date: shopData.shopData.shoplabel,
        imagelist: [{
                //营业执照
                imgSrc: '../../img/pic1.png',
                type: 1,
                name: "businessLicense",
                isS: false,
                ty: 1,
                yrm: 1,
                text: "营业执照"
            }, {
                //开户许可
                imgSrc: '../../img/pic2.png',
                type: 12,
                name: "openingPermit",
                isS: false,
                ty: 2,
                yrm: 2,
                text: "开户许可"
            }, {
                //身份证正面
                imgSrc: '../../img/pic3.png',
                type: 2,
                name: "juridicalpersonIdPositive",
                isS: false,
                ty: 0,
                yrm: 0,
                text: "身份证正面"
            }, {
                //身份证反面
                imgSrc: '../../img/pic4.png',
                type: 3,
                name: "juridicalpersonIdReverseside",
                isS: false,
                ty: 0,
                yrm: 0,
                text: "身份证反面"
            }, {
                //手持身份证
                imgSrc: '../../img/pic5.png',
                type: 11,
                name: "holdId",
                isS: false,
                ty: 0,
                yrm: 0,
                text: "手持身份证"
            }, {
                //银行卡正面
                imgSrc: '../../img/pic6.png',
                type: 6,
                name: "bankCardPositive",
                isS: false,
                ty: 0,
                yrm: 0,
                text: "银行卡正面"
            }, {
                //门店门头
                imgSrc: '../../img/pic7.png',
                type: 5,
                name: "doorheadPhoto",
                isS: false,
                ty: 0,
                yrm: 0,
                text: "门店门头"
            }, {
                //门店门脸
                imgSrc: '../../img/pic11.png',
                type: 4,
                name: "facePhoto",
                isS: false,
                ty: 0,
                yrm: 0,
                text: "门店门脸"
            }, {
                //门店收银台
                imgSrc: '../../img/pic8.png',
                type: 13,
                name: "cashier",
                isS: false,
                ty: 2,
                yrm: 0,
                text: "门店收银台"
            }, {
                //门店经营场所
                imgSrc: '../../img/pic9.png',
                type: 14,
                name: "placeBusiness",
                isS: false,
                ty: 2,
                yrm: 0,
                text: "门店经营场所"
            }, {
                //其他
                imgSrc: '../../img/pic10.png',
                type: 16,
                name: "rests",
                isS: true,
                ty: 0,
                yrm: 0,
                text: "其他"
            }
            // , {
            // 	//商户信息表
            // 	imgSrc: '../../img/pic12.png',
            // 	type: 17,
            // 	name: "rests",
            // 	isS: true,
            // 	ty: 0,
            // 	yrm: 0,
            // 	text: "商户信息表"
            // }, {
            // 	//支付协议
            // 	imgSrc: '../../img/pic13.png',
            // 	type: 18,
            // 	name: "rests",
            // 	isS: true,
            // 	ty: 0,
            // 	yrm: 0,
            // 	text: "支付协议"
            // }
        ],
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
        //是否更新
        isUpdata: false,
        subNumber: '',
        orderNumber: '',
        merchantNumber: '',
        jiesuanType: 'false',
        feilvType: true,
        channelType: '',
        youzhiType: 'false',
        qualityClient: '1',
        businessLicenseType: '1',
        juridicalPersonIDType: '1',
        busIs: true,
        jurIs: true,
        accesstoken: "24.a0fb9fa44301bc5cc2c294fab424bfe3.2592000.1554618078.282335-15712319",
        jurInfo: '快速识别',
        buiInfo: '快速识别',
        bankInfo: '快速识别',
        searchZhi: '',
        cw: 300,
        ch: 200,
        uploadPic: [],
        typeInfo: 0
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
            // console.log(shopData[1].stepsCon[0].basicsetup[0].radiolist[1])
            shopData[1].stepsCon[0].basicsetup[0].radiolist[1].isS = true
            // shopData[1].stepsCon[1].basicsetup[0].isS = true
            if (e.detail.value == 2) {
                console.log(this.data.channelType)
                if (this.data.channelType == 3) {
                    console.log('13132')
                    for (let i = 0; i < shopData[1].stepsCon[0].basicsetup[0].radiolist.length; i++) {
                        shopData[1].stepsCon[0].basicsetup[0].radiolist[i].isS = false
                        shopData[1].stepsCon[0].basicsetup[0].radiolist[i].checked = false
                    }
                    shopData[1].stepsCon[0].basicsetup[0].radiolist[1].isS = true
                    shopData[1].stepsCon[0].basicsetup[0].radiolist[1].checked = true
                    this.setData({
                        "settlementLogo": '对公'
                    })
                } else {
                    for (let i = 0; i < shopData[1].stepsCon[0].basicsetup[0].radiolist.length; i++) {
                        shopData[1].stepsCon[0].basicsetup[0].radiolist[i].isS = true
                        shopData[1].stepsCon[0].basicsetup[0].radiolist[i].checked = false
                    }
                    shopData[1].stepsCon[0].basicsetup[0].radiolist[0].checked = true
                    this.setData({
                        "settlementLogo": '对私'
                    })
                }
            } else {
				//对公对私
                for (let i = 0; i < shopData[1].stepsCon[0].basicsetup[0].radiolist.length; i++) {
                    shopData[1].stepsCon[0].basicsetup[0].radiolist[i].isS = true
                    shopData[1].stepsCon[0].basicsetup[0].radiolist[i].checked = false
                }
                shopData[1].stepsCon[0].basicsetup[0].radiolist[0].checked = true
				console.log(shopData[0].stepsCon[0].basicsetup[2])
            }
            // if (this.data.channelType == 3) {
            //     for (var i = 0; i < shopData[0].stepsCon[0].basicsetup[2].radiolist.length; i++) {
            //         shopData[0].stepsCon[0].basicsetup[2].radiolist[i].isShow = false
            //     }
            //     shopData[0].stepsCon[0].basicsetup[2].radiolist[0].isShow = true
            // }else{
			// 	console.log(shopData[0].stepsCon[0].basicsetup[2])
			// 	for (var i = 0; i < shopData[0].stepsCon[0].basicsetup[2].radiolist.length; i++) {
			// 		shopData[0].stepsCon[0].basicsetup[2].radiolist[i].isShow = true
			// 	}
			// }
            this.setData({
                shopData: shopData,
                merchantType: e.detail.value,
                jiesuanType: true
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
            // console.log(shopData[1].stepsCon[1].basicsetup[0])
            // shopData[1].stepsCon[1].basicsetup[0].isS = false
            // console.log(shopData[1].stepsCon[0].basicsetup[0].radiolist[1].isS)
            shopData[1].stepsCon[0].basicsetup[0].radiolist[1].isS = false
            //循环结算方式
            for (var i = 0; i < shopData[0].stepsCon[0].basicsetup[2].radiolist.length; i++) {
                shopData[0].stepsCon[0].basicsetup[2].radiolist[i].checked = false
            }
            shopData[0].stepsCon[0].basicsetup[2].radiolist[0].checked = true
			this.setData({
				rateList: ra,
				rateList1: raid,
				shopData: shopData,
				merchantType: e.detail.value,
				jiesuanType: false,
				rateType: 'D1',
				youzhiType: this.data.paymentType == 3 ? true : false
			})
            var ra = []
            var raid = []
			if(this.data.rateType == 'D0'){
				ra = this.data.d0rate[0]
				raid = this.data.d0rateNum[0]
			}else{
				ra = this.data.d1rate[0]
				raid = this.data.d1rateNum[0]
			}
			var rl1 = []
			if (this.data.d1rateNum.length != 0) {
				rl1 = this.data.d1rateNum[0]
			}
			var  shopInput = this.data.shopInput
			shopInput.channel = this.data.d1n[0]
			this.setData({
				
				shopInput: shopInput,
				shopInput: shopInput,
				rateList: this.data.d1rate[0],
				rateList1: rl1,
				shopData: shopData,
				channelType: this.data.d1t[0],
				youzhiType: this.data.d1t[0] == 3 ? true : false,
				feilvType: true,
				rateNameList: this.data.d1n,
				rateNumList: this.data.d1c,
				rateTypeList: this.data.d1t,
				paymentChannel:this.data.d1c[0]
			})
			if (this.data.channelType == 3) {
				var shopInput = this.data.shopInput
				shopInput.operationId = ''
				shopInput.rate1 = ''
				shopInput.rateCoding = ''
				this.setData({
					shopInput: shopInput,
					multihangye: '',
					yirongmaId: '',
					listValid: '',
					shopInput: shopInput,
					multiArray3: yirongma
				})
			} else {
				var shopInput = this.data.shopInput
				shopInput.operationId = ''
				shopInput.rate1 = '',
					shopInput.rateCoding = '',
					this.setData({
						shopInput: shopInput,
						multihangye: '',
						yirongmaId: '',
						listValid: '',
						shopInput: shopInput,
						multiArray3: hangyeData
					})
			}
            
        }
        this.getTop()
    },
    radioChange1: function(e) {
        console.log(e)
        var cur = e.currentTarget.dataset.name
        var shopData = this.data.shopData
        if (cur == 'settlementLogo') {
            if (e.detail.value == '对公') {
                for (let i = 0; i < shopData[1].stepsCon[0].basicsetup[0].radiolist.length; i++) {
                    // shopData[1].stepsCon[0].basicsetup[0].radiolist[i].isS = false
                    shopData[1].stepsCon[0].basicsetup[0].radiolist[i].checked = false
                }
                shopData[1].stepsCon[0].basicsetup[0].radiolist[1].isS = true
                shopData[1].stepsCon[0].basicsetup[0].radiolist[1].checked = true
                this.setData({
                    "settlementLogo": '对公',
                    shopData: shopData
                })
            } else {
                for (let i = 0; i < shopData[1].stepsCon[0].basicsetup[0].radiolist.length; i++) {
                    shopData[1].stepsCon[0].basicsetup[0].radiolist[i].isS = true
                    shopData[1].stepsCon[0].basicsetup[0].radiolist[i].checked = false
                }
                shopData[1].stepsCon[0].basicsetup[0].radiolist[0].checked = true
                this.setData({
                    "settlementLogo": '对私',
                    shopData: shopData
                })
            }


        }
        if (cur == 'Settleway') {
            if (e.detail.value == 'D0') {
                for (var i = 0; i < shopData[0].stepsCon[0].basicsetup[2].radiolist.length; i++) {
                    shopData[0].stepsCon[0].basicsetup[2].radiolist[i].checked = false
                }
                shopData[0].stepsCon[0].basicsetup[2].radiolist[1].checked = true
				var shopInput = this.data.shopInput
				shopInput.channel = this.data.d0n[0]
				var rl1 = []
				if (this.data.d0rateNum.length != 0) {
					rl1 = this.data.d0rateNum[0]
				}
				
                this.setData({
                    rateType: e.detail.value,
					shopInput: shopInput,
					rateList: this.data.d0rate[0],
					rateList1: rl1,
                    shopData: shopData,
                    channelType: this.data.d0t[0],
					youzhiType: this.data.d0t[0] == 3 ? true : false,
					rateNameList: this.data.d0n,
					rateNumList: this.data.d0c,
					rateTypeList:this.data.d0t
                })
               
                if (this.data.channelType == 3) {
                    var shopInput = this.data.shopInput
                    shopInput.operationId = ''
					shopInput.rate1 = '',
					shopInput.rateCoding = '',
                    this.setData({
                        shopInput: shopInput,
                        multihangye: '',
                        yirongmaId: '',
                        listValid: '',
                        shopInput: shopInput,
                        multiArray3: yirongma
                    })
                } else {
                    var shopInput = this.data.shopInput
                    shopInput.operationId = ''
					shopInput.rate1 = '',
					shopInput.rateCoding = '',
                    this.setData({
                        shopInput: shopInput,
                        multihangye: '',
                        yirongmaId: '',
                        listValid: '',
                        shopInput: shopInput,
                        multiArray3: hangyeData
                    })
                }
                if (this.data.channelType == 3 && this.data.qualityClient == 0) {
                    this.setData({
                        feilvType: false
                    })
                } else {
                    this.setData({
                        feilvType: true
                    })
                }
				if (this.data.channelType == 3 && this.data.merchantType == 2) {
					for (let i = 0; i < shopData[1].stepsCon[0].basicsetup[0].radiolist.length; i++) {
						shopData[1].stepsCon[0].basicsetup[0].radiolist[i].isS = false
						shopData[1].stepsCon[0].basicsetup[0].radiolist[i].checked = false
					}
					shopData[1].stepsCon[0].basicsetup[0].radiolist[1].isS = true
					shopData[1].stepsCon[0].basicsetup[0].radiolist[1].checked = true
				} else {
					for (let i = 0; i < shopData[1].stepsCon[0].basicsetup[0].radiolist.length; i++) {
						shopData[1].stepsCon[0].basicsetup[0].radiolist[i].isS = true
						shopData[1].stepsCon[0].basicsetup[0].radiolist[i].checked = false
					}
					shopData[1].stepsCon[0].basicsetup[0].radiolist[0].checked = true
				}
				this.setData({
					shopData: shopData
				})
            } else {
                for (var i = 0; i < shopData[0].stepsCon[0].basicsetup[2].radiolist.length; i++) {
                    shopData[0].stepsCon[0].basicsetup[2].radiolist[i].checked = false
                }
                shopData[0].stepsCon[0].basicsetup[2].radiolist[0].checked = true
				var shopInput = this.data.shopInput;
				shopInput.channel = this.data.d1n[0]
				var rl1 = []
				if (this.data.d1rateNum.length != 0) {
					rl1 = this.data.d1rateNum[0]
				}
                this.setData({
                    rateType: e.detail.value,
					shopInput:shopInput,
					rateList: this.data.d1rate[0],
					rateList1: rl1,
                    shopData: shopData,
                    channelType: this.data.d1t[0],
					youzhiType: this.data.d1t[0] == 3 ? true : false,
					feilvType: this.data.d1t[0] != 3 ? true : false,
					rateNameList: this.data.d1n,
					rateNumList: this.data.d1c,
					rateTypeList: this.data.d1t
                })
                if (this.data.channelType == 3) {
                    var shopInput = this.data.shopInput
                    shopInput.operationId = ''
					shopInput.rate1 = ''
					shopInput.rateCoding = ''
                    this.setData({
                        shopInput: shopInput,
                        multihangye: '',
                        yirongmaId: '',
                        listValid: '',
                        shopInput: shopInput,
                        multiArray3: yirongma
                    })
                } else {
                    var shopInput = this.data.shopInput
                    shopInput.operationId = ''
					shopInput.rate1 = '',
					shopInput.rateCoding = '',
                    this.setData({
                        shopInput: shopInput,
                        multihangye: '',
                        yirongmaId: '',
                        listValid: '',
                        shopInput: shopInput,
                        multiArray3: hangyeData
                    })
                }
				console.log(this.data.channelType)
                if (this.data.channelType == 3 && this.data.merchantType == 2) {
                    for (let i = 0; i < shopData[1].stepsCon[0].basicsetup[0].radiolist.length; i++) {
                        shopData[1].stepsCon[0].basicsetup[0].radiolist[i].isS = false
                        shopData[1].stepsCon[0].basicsetup[0].radiolist[i].checked = false
                    }
                    shopData[1].stepsCon[0].basicsetup[0].radiolist[1].isS = true
                    shopData[1].stepsCon[0].basicsetup[0].radiolist[1].checked = true
                } else {
                    for (let i = 0; i < shopData[1].stepsCon[0].basicsetup[0].radiolist.length; i++) {
                        shopData[1].stepsCon[0].basicsetup[0].radiolist[i].isS = true
                        shopData[1].stepsCon[0].basicsetup[0].radiolist[i].checked = false
                    }
                    shopData[1].stepsCon[0].basicsetup[0].radiolist[0].checked = true
                }
                this.setData({
                    shopData: shopData
                })
                if (this.data.channelType == 3 && this.data.qualityClient == 0) {
                    this.setData({
                        feilvType: false
                    })
                } else {
                    this.setData({
                        feilvType: true
                    })
                }
            }

        }
    },
    radioChange3: function(e) {
        console.log(e)
        var shopData = this.data.shopData
        if (e.detail.value == 0) {
            for (var i = 0; i < shopData[0].stepsCon[0].basicsetup[4].radiolist.length; i++) {
                shopData[0].stepsCon[0].basicsetup[4].radiolist[i].checked = false
            }
            shopData[0].stepsCon[0].basicsetup[4].radiolist[e.detail.value].checked = true
            this.setData({
                shopData: shopData,
                feilvType: true,
                qualityClient: '1'
            })
        } else {
            for (var i = 0; i < shopData[0].stepsCon[0].basicsetup[4].radiolist.length; i++) {
                shopData[0].stepsCon[0].basicsetup[4].radiolist[i].checked = false
            }
            shopData[0].stepsCon[0].basicsetup[4].radiolist[e.detail.value].checked = true
            this.setData({
                shopData: shopData,
                feilvType: false,
                qualityClient: '0'
            })
        }
    },
    radioChange4(e) {
        console.log(e)
        var vl = e.detail.value
        if (vl == 0) {
            this.setData({
                "juridicalPersonIDType": 1,
                "jurIs": true
            })
        } else {
            this.setData({
                "juridicalPersonIDType": 0,
                "jurIs": false
            })
        }
    },
    radioChange5(e) {
        console.log(e)
        var vl = e.detail.value
        if (vl == 0) {
            this.setData({
                "businessLicenseType": 1,
                "busIs": true
            })
        } else {
            this.setData({
                "businessLicenseType": 0,
                "busIs": false
            })
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
                    steps: 1,
                    status: '',
                    statusTips: ''
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


                if (this.data.channelType != 3) {
                    shopInput.oneOperate = this.data.multihangye.split('-')[0]
                    shopInput.twoOperate = this.data.multihangye.split('-')[1]
                    shopInput.threeOperate = this.data.multihangye.split('-')[2]

                }
                shopInput.provinceID = shopInput.region.split('-')[0]
                shopInput.cityID = shopInput.region.split('-')[1]
                shopInput.areaID = shopInput.region.split('-')[2]
                shopInput.province = this.data.multiaddress.split('-')[0]
                shopInput.city = this.data.multiaddress.split('-')[1]
                shopInput.area = this.data.multiaddress.split('-')[2]
                if (shopInput.rate1 != undefined) {
                    var rate1 = shopInput.rate1
                    console.log(rate1)
                    if (this.data.channelType == 3 && this.data.qualityClient == 0) {
                        rate1 = '0.38%'
                    }
                    if (rate1.indexOf('%') > -1) {
                        var ratea = rate1.replace('%', '') / 100
                        ratea = ratea * 10000
                        ratea = Math.round(ratea)
                        console.log(ratea.toString().length)
                        if (ratea.toString().length == 2) {
                            shopInput.rate = '0.00' + ratea
                        }
                        if (ratea.toString().length == 1) {
                            shopInput.rate = '0.000' + ratea
                        }
                        if (ratea.toString().length == 3) {
                            shopInput.rate = '0.0' + ratea
                        }
                    } else {
                        wx.showToast({
                            title: "进件费率错误",
                            icon: 'none'
                        })
                        return
                    }
                }

                //结算
                shopInput.settlementLogo = this.data.settlementLogo
                shopInput.rateType = this.data.rateType
                shopInput.passWord = shopInput.registerCell.substring(5, 12)
                shopInput.institutionNumber = this.data.institutionNumber
                shopInput.saleNumber = this.data.saleNumber
                shopInput.subaccountNumber = this.data.subNumber
                shopInput.orderNumber = this.data.orderNumber
                shopInput.bankCardNo = shopInput.bankCardNo.replace(/\s/g, '')
                console.log(this.data.merchantNumber == "null")
                if (this.data.merchantNumber == "null") {

                } else {
                    shopInput.merchantNumber = this.data.merchantNumber
                }
                console.log(shopInput.merchantNumber)
                if (!shopInput.merchantNumber) {
                    console.log('123123')
                    shopInput.merchantNumber = ''
                }
				shopInput.paymentChannel = this.data.paymentChannel
                console.log(shopInput.merchantNumber)
                shopInput.paymentType = this.data.channelType
                shopInput.qualityClient = this.data.qualityClient
                shopInput.businessLicenseType = this.data.businessLicenseType
                shopInput.juridicalPersonIDType = this.data.juridicalPersonIDType
                var that = this
				console.log(shopInput)
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
                                // merchantNumber: res.data.data.merchantNumber,
                                steps: 2
                            })
                            wx.removeStorageSync('shopInput')
                            wx.removeStorageSync('multihangye')
                            wx.removeStorageSync('multiaddress')
                        } else {
                            wx.showToast({
                                title: res.data.msg,
                                icon: 'none'
                            })
                        }
                    },
                    fail: function(res) {
                        wx.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            } else {}
        }
    },
    //验证
    verify: function(data) {
        console.log(data)

        var jgData = []
        for (let i = 0; i < data.length; i++) {
            jgData.push(data[i])
        }
        if (this.data.steps == 0) {
            if (this.data.feilvType == false) {
                for (let i = 0; i < jgData.length; i++) {
                    if (jgData[i].id == 'rate1') {
                        jgData.splice(i, 1)
                        break
                    }
                }
            }
            if (this.data.juridicalPersonIDType == 0) {
                for (let i = 0; i < jgData.length; i++) {

                    if (jgData[i].id == 'juridicalpersonIdTime') {
                        jgData.splice(i, 1)
                    }
                }
            }
            if (this.data.businessLicenseType == 0) {
                for (let i = 0; i < jgData.length; i++) {

                    if (jgData[i].id == 'businessLicenseTime') {
                        jgData.splice(i, 1)
                    }
                }
            }
        }
        console.log(jgData)

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
                if (data[i].setTop == 1) {
                    that.setData({
                        "Stop": '0px'
                    })
                }
                if (data[i].setTop == 2) {
                    that.setData({
                        "Stop": that.data.top.top2 - 50 + 'px'
                    })
                }
                if (data[i].setTop == 3) {
                    that.setData({
                        "Stop": that.data.top.top3 - 50 + 'px'
                    })
                }
                if (data[i].setTop == 4) {
                    that.setData({
                        "Stop": that.data.top.top4 + 'px'
                    })
                }
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
        console.log(e.detail.value)
        if (picker3 == null) {
            picker3 = 0
        }
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
            var num = e.detail.value
            var addresslist = [],
                addresslistc = []
            var provincelist = that.data.provincelist
            var provincelistc = that.data.provincelistc
            for (let i = 0; i < that.data.proCode[num].children.length; i++) {
                addresslist.push(that.data.proCode[num].children[i].text)
                addresslistc.push(that.data.proCode[num].children[i].value)
            }
            provincelist[1] = addresslist
            provincelistc[1] = addresslistc

            var addresslist1 = [],
                addresslistc1 = []
            var num1 = e.detail.value
            for (let i = 0; i < that.data.proCode[num].children[0].children.length; i++) {
                addresslist1.push(that.data.proCode[num].children[0].children[i].text)
                addresslistc1.push(that.data.proCode[num].children[0].children[i].value)
            }
            provincelist[2] = addresslist1
            provincelistc[2] = addresslistc1
            that.setData({
                provincelist: provincelist,
                provincelistc: provincelistc,
                provincecode: num
            })
            // wx.request({
            //     url: that.data.server + 'merchantRegister/selectArea',
            //     method: 'post',
            //     data: {
            //         provinceCode: that.data.provincelistc[0][e.detail.value],
            //         cityCode: ''
            //     },
            //     dataType: 'json',
            //     header: {
            //         'content-type': 'application/json' // 默认值
            //     },
            //     success: function(res) {
            //         if (res.data.code == '1000') {
            //             var addresslist = [],
            //                 addresslistc = []
            //             var provincelist = that.data.provincelist
            //             var provincelistc = that.data.provincelistc
            //             for (var i = 0; i < res.data.data.length; i++) {
            //                 addresslist.push(res.data.data[i].cityName)
            //                 addresslistc.push(res.data.data[i].cityCode)
            //             }
            //             provincelist[1] = addresslist
            //             provincelistc[1] = addresslistc
            //             that.setData({
            //                 provincelist: provincelist,
            //                 provincelistc: provincelistc
            //             })
            //             wx.request({
            //                 url: that.data.server + 'merchantRegister/selectArea',
            //                 method: 'post',
            //                 data: {
            //                     provinceCode: that.data.provincelistc[0][e.detail.value],
            //                     cityCode: that.data.provincelistc[1][0]
            //                 },
            //                 dataType: 'json',
            //                 header: {
            //                     'content-type': 'application/json' // 默认值
            //                 },
            //                 success: function(res) {
            //                     if (res.data.code == '1000') {
            //                         var addresslist = [],
            //                             addresslistc = []
            //                         var provincelist = that.data.provincelist
            //                         var provincelistc = that.data.provincelistc
            //                         for (var i = 0; i < res.data.data.length; i++) {
            //                             addresslist.push(res.data.data[i].areaName)
            //                             addresslistc.push(res.data.data[i].areaCode)
            //                         }
            //                         provincelist[2] = addresslist
            //                         provincelistc[2] = addresslistc
            //                         var provincecode = e.detail.value
            //                         that.setData({
            //                             provincelist: provincelist,
            //                             provincelistc: provincelistc,
            //                             provincecode: provincecode
            //                         })
            //                     }
            //                 }
            //             })
            //         }
            //     }
            // })
        }
        if (e.detail.column == 1) {
            var addresslist = [],
                addresslistc = []
            var num1 = e.detail.value
            var provincelist = that.data.provincelist
            var provincelistc = that.data.provincelistc
            for (let i = 0; i < that.data.proCode[that.data.provincecode].children[num1].children.length; i++) {
                addresslist.push(that.data.proCode[that.data.provincecode].children[num1].children[i].text)
                addresslistc.push(that.data.proCode[that.data.provincecode].children[num1].children[i].value)
            }
            provincelist[2] = addresslist
            provincelistc[2] = addresslistc
            that.setData({
                provincelist: provincelist,
                provincelistc: provincelistc,
                citycode: num1
            })
            // wx.request({
            //     url: that.data.server + 'merchantRegister/selectArea',
            //     method: 'post',
            //     data: {
            //         provinceCode: that.data.provincelistc[0][that.data.provincecode],
            //         cityCode: that.data.provincelistc[1][e.detail.value]
            //     },
            //     dataType: 'json',
            //     header: {
            //         'content-type': 'application/json' // 默认值
            //     },
            //     success: function(res) {
            //         if (res.data.code == '1000') {
            //             var addresslist = [],
            //                 addresslistc = []
            //             var provincelist = that.data.provincelist
            //             var provincelistc = that.data.provincelistc
            //             for (var i = 0; i < res.data.data.length; i++) {
            //                 addresslist.push(res.data.data[i].areaName)
            //                 addresslistc.push(res.data.data[i].areaCode)
            //             }
            //             provincelist[2] = addresslist
            //             provincelistc[2] = addresslistc
            //             that.setData({
            //                 provincelist: provincelist,
            //                 provincelistc: provincelistc
            //             })
            //         }
            //     }
            // })
        }
    },
    // 选择三级联动-行业
    businessPicker(e) {
        console.log(e)
        if (this.data.channelType != 3) {
            var picker1 = e.detail.value[0]
            var picker2 = e.detail.value[1]
            var picker3 = e.detail.value[2]
            if (picker3 == null) {
                picker3 = 0
            }
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
        } else {
            var picker = e.detail.value[0]
            console.log(yirongmaCode[picker])
            var shopInput = this.data.shopInput
            var operationId = e.target.dataset.current
            shopInput[operationId] = yirongmaCode[picker]
            this.setData({
                multihangye: yirongma111.yirongma[picker],
                yirongmaId: yirongmaCode[picker],
                shopInput: shopInput
            })
        }

    },
    columB: function(e) {
        if (this.data.channelType != 3) {
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
        data.channelType = this.data.channelType
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
        if (cur == 'bankCardNo') {
            data = e.detail.value.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
        }
        var that = this
        // if (cur == 'merchantName' && data != '') {
        //     wx.request({
        //         url: this.data.server + 'IntoPieces/merchantsToHeavy',
        //         method: 'post',
        //         data: {
        //             merchantName: data,
        //         },
        //         dataType: 'json',
        //         header: {
        //             'content-type': 'application/json' // 默认值
        //         },
        //         success: function(e) {
        //             console.log(e)
        //             if (e.data.code != 1000) {
        //                 wx.showToast({
        //                     title: e.data.msg + ',请重新输入',
        //                     icon: 'none'
        //                 })
        //                 that.setData({
        //                     status: cur,
        //                     nextT: false
        //                 })
        //                 return
        //             } else {
        //                 that.setData({
        //                     nextT: true
        //                 })
        //             }
        //         }
        //     })
        // }
        // if (cur == 'registerCell' && data != '') {
        //     wx.request({
        //         url: this.data.server + 'merchantRegister/checkPhone',
        //         method: 'post',
        //         data: {
        //             phone: data,
        //             saleNumber: that.data.saleNumber
        //         },
        //         dataType: 'json',
        //         header: {
        //             'content-type': 'application/json' // 默认值
        //         },
        //         success: function(e) {
        //             console.log(e)
        //             if (e.data.code != 1000) {
        //                 wx.showToast({
        //                     title: e.data.msg + ',请重新输入',
        //                     icon: 'none'
        //                 })
        //                 that.setData({
        //                     status: cur,
        //                     nextT: false
        //                 })
        //                 return
        //             } else {
        //                 that.setData({
        //                     nextT: true
        //                 })
        //             }
        //         }
        //     })
        // }
        console.log('123132')
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
    // getaaaaa(e){
    // 	wx.showModal({
    // 		title: "提示",
    // 		content: "是否为长期",
    // 		success: function (res) {
    // 			if (res.confirm) {
    // 				console.log("点击确定")
    // 			} else {
    // 				console.log('点击取消')
    // 			}
    // 		}
    // 	})
    // },
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
	bindDateChangeRate:function(e){
		var data = e.detail.value
		var cur = e.target.dataset.current;
		console.log(data,cur)
		if (!data) {
			this.setData({
				status: '',
			})
		} else {
			var shopInput = this.data.shopInput
			shopInput[cur] = this.data.rateNameList[data]
			console.log(this.data.rateType)
			if (this.data.rateType == 'D0'){
				this.setData({
					status1: cur,
					data:data,
					shopInput: shopInput,
					paymentChannel: this.data.rateNumList[data],
					channelType: this.data.rateTypeList[data],
					rateList: this.data.d0rate[data],
					rateList1:this.data.d0rateNum[data],
					youzhiType: this.data.rateTypeList[data] == 3?true:false
				})
			}else{
				this.setData({
					status1: cur,
					shopInput: shopInput,
					paymentChannel: this.data.rateNumList[data],
					channelType: this.data.rateTypeList[data],
					rateList: this.data.d1rate[data],
					rateList1: this.data.d1rateNum[data],
					youzhiType: this.data.rateTypeList[data] == 3?true:false,
				})
			}
			if (this.data.channelType == 3) {
				var shopInput = this.data.shopInput
				shopInput.operationId = ''
				shopInput.rate1 = ''
				shopInput.rateCoding = ''
				this.setData({
					shopInput: shopInput,
					multihangye: '',
					yirongmaId: '',
					listValid: '',
					shopInput: shopInput,
					multiArray3: yirongma,
					feilvType: this.data.qualityClient != 0?true:false
				})
			} else {
				var shopInput = this.data.shopInput
				shopInput.operationId = ''
				shopInput.rate1 = '',
					shopInput.rateCoding = '',
					this.setData({
						shopInput: shopInput,
						multihangye: '',
						yirongmaId: '',
						listValid: '',
						shopInput: shopInput,
						multiArray3: hangyeData,
					feilvType: true
					})
			}
			
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
            if (cur == 'rate1') {
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
        shopInput.openingBankBranch = ''
        shopInput.openingBankBranchID = ''
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
        var detail = e.detail.value
        this.setData({
            searchZhi: detail,
            pageNum: 1
        })
        this.getZhihang()
    },
    getZhihang: function(e) {
        var that = this
        wx.request({
            url: that.data.server + 'merchantRegister/selectBank',
            method: 'post',
            data: {
                bankCode: that.data.shopInput.openingBankID,
                bankName: that.data.searchZhi,
                page: that.data.pageNum,
                limit: 20,
                paymentType: that.data.channelType
            },
            dataType: 'json',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function(e) {
                console.log(e)
                setTimeout(function() {
                    wx.hideLoading()
                }, 300)

                if (e.data.code == 1000) {
                    var branch = that.data.branch
                    if (that.data.pageNum == 1) {
                        branch = []
                    }
                    for (let i = 0; i < e.data.data.selectBank.length; i++) {
                        branch.push(e.data.data.selectBank[i])
                    }
                    that.setData({
                        branch: branch,
                        pageCount: Math.ceil(parseInt(e.data.data.bankCount) / 20)
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
        let uploadFile = ''
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                console.log(res)
                const tempFilePaths = res.tempFilePaths[0];
                console.log()
                wx.compressImage({
                    src: tempFilePaths, // 图片路径
                    quality: 70, // 压缩质量
                    success: function(res) {
                        uploadFile = res.tempFilePath
                        wx.showLoading({
                            title: '正在上传',
                        })
                        wx.uploadFile({
                            url: that.data.server1 + 'Sell/addPic',
                            filePath: uploadFile,
                            name: 'file',
                            formData: {
                                type: type,
                                institutionNumber: that.data.institutionNumber,
                                orderNumber: that.data.orderNumber
                            },
                            success(res) {
                                console.log(res)
                                var res1 = JSON.parse(res.data)
                                console.log(res1.code)
                                if (res1.code != 1000) {
                                    wx.showToast({
                                        title: res1.msg,
                                        icon: 'success',
                                        duration: 1000
                                    })
                                    return
                                }
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
                    fail: function(res) {
                        console.log(res)
                    }
                })
                return

                /**** */
                // wx.getImageInfo({
                //     src: res.tempFilePaths[0],
                //     success(res) {
                //         // console.log('获得原始图片大小',res.width)
                //         //console.log(res.height)
                //         var originWidth, originHeight;
                //         originHeight = res.height;
                //         originWidth = res.width;
                //         console.log(originWidth);
                //         //压缩比例
                //         // 最大尺寸限制
                //         var maxWidth = 1200,
                //             maxHeight = 600;
                //         // 目标尺寸
                //         var targetWidth = originWidth,
                //             targetHeight = originHeight;
                //         //等比例压缩，如果宽度大于高度，则宽度优先，否则高度优先
                //         if (originWidth > maxWidth || originHeight > maxHeight) {
                //             if (originWidth / originHeight > maxWidth / maxHeight) {
                //                 // 要求宽度*(原生图片比例)=新图片尺寸
                //                 targetWidth = maxWidth;
                //                 targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                //             } else {
                //                 targetHeight = maxHeight;
                //                 targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                //             }
                //         }

                //         //更新canvas大小
                //         that.setData({
                //             cw: targetWidth,
                //             ch: targetHeight
                //         });
                //         //尝试压缩文件，创建 canvas
                //         var ctx = wx.createCanvasContext('firstCanvas');
                //         ctx.clearRect(0, 0, targetWidth, targetHeight);
                //         ctx.drawImage(tempFilePaths[0], 0, 0, targetWidth, targetHeight);
                //         ctx.draw(false, function() {
                //             //获得新图片输出
                //             wx.canvasToTempFilePath({
                //                 canvasId: 'firstCanvas',
                //                 success: (res) => {
                // 					console.log(res)
                //                     //写入图片数组
                //                     var uploadpic = "uploadPic[" + index + "]";
                //                     //
                //                     that.setData({
                //                         [uploadpic]: res.tempFilePath
                //                     });
                //                     uploadFile = res.tempFilePath;


                //                 },
                //                 fail: (err) => {
                //                     console.error(err)
                //                 }
                //             }, this)
                //         });





                //     }
                // })




            }
        })













        /********* */


    },
    subImage: function() {
        var that = this
        var imgList = this.data.imagelist
        var type = this.data.merchantType
        var tjData = new Object()
        tjData.orderNumber = this.data.orderNumber
        tjData.institutionNumber = this.data.institutionNumber
        tjData.saleNumber = wx.getStorageSync('saleInfo').number
        console.log(imgList)
        // if(this.data.channelType != 4){
        // 	for(let i = 0 ; i < imgList.length;i++){
        // 		if(imgList[i].type == 17){
        // 			imgList.splice(i,1)
        // 		}
        // 		if (imgList[i].type == 18) {
        // 			imgList.splice(i, 1)
        // 		}
        // 	}
        // }
        console.log(imgList)
        if (this.data.channelType != 3) {
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
                        if (imgList[i].imgSrc.indexOf('?') > -1) {
                            tjData[imgList[i].name] = imgList[i].imgSrc.split('?')[0]
                        } else {
                            tjData[imgList[i].name] = imgList[i].imgSrc
                        }
                        this.setData({
                            imgTrue: true
                        })
                    }
                }
            } else if (type == 0) {
                for (var i = 0; i < imgList.length; i++) {
                    console.log(imgList[i])
                    if (imgList[i].ty == 0) {
                        console.log(imgList[i])
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
                            if (imgList[i].imgSrc.indexOf('?') > -1) {
                                tjData[imgList[i].name] = imgList[i].imgSrc.split('?')[0]
                            } else {
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
                            if (imgList[i].imgSrc.indexOf('?') > -1) {
                                tjData[imgList[i].name] = imgList[i].imgSrc.split('?')[0]
                            } else {
                                tjData[imgList[i].name] = imgList[i].imgSrc
                            }
                            this.setData({
                                imgTrue: true
                            })
                        }
                    }
                }
            }
        } else if (this.data.channelType == 3) {
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
                        if (imgList[i].imgSrc.indexOf('?') > -1) {
                            tjData[imgList[i].name] = imgList[i].imgSrc.split('?')[0]
                        } else {
                            tjData[imgList[i].name] = imgList[i].imgSrc
                        }
                        this.setData({
                            imgTrue: true
                        })
                    }
                }
            } else if (type == 0) {
                for (var i = 0; i < imgList.length; i++) {

                    if (imgList[i].yrm == 0) {
                        console.log(imgList[i])
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
                            if (imgList[i].imgSrc.indexOf('?') > -1) {
                                tjData[imgList[i].name] = imgList[i].imgSrc.split('?')[0]
                            } else {
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
                    if (imgList[i].yrm != 2) {
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

                            if (imgList[i].imgSrc.indexOf('?') > -1) {
                                tjData[imgList[i].name] = imgList[i].imgSrc.split('?')[0]
                            } else {
                                tjData[imgList[i].name] = imgList[i].imgSrc
                            }
                            this.setData({
                                imgTrue: true
                            })
                        }
                    }
                }
            }
        }

		tjData.paymentChannel = this.data.paymentChannel
        console.log(this.data.imgTrue)
        console.log(tjData)

        console.log(tjData)

        if (this.data.imgTrue) {
            if (tjData.rests.indexOf('../../') > -1) {
                tjData.rests = ''
            }
            wx.showLoading({
                title: '正在保存',
                mask: true
            })
            tjData.paymentType = this.data.channelType
            var typeInfo = this.data.typeInfo
            var saleI = wx.getStorageSync('saleInfo')
            var loca = wx.getStorageSync('location')
            var shopInput = this.data.shopInput
            console.log(saleI)
            console.log(loca)
            console.log(shopInput)
			// if (saleI.pro != loca.pro) {
			// 	typeInfo = 1
			// }
			// if (shopInput.province != loca.pro) {
			// 	typeInfo = 1
			// }
            tjData.typeInfo = typeInfo
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
                    wx.hideLoading()
                    if (res.data.code == 1000) {
                        var saleI = wx.getStorageSync('saleInfo')
                        var loca = wx.getStorageSync('location')
                        var newO = new Object()
                        newO.orderNumber = that.data.orderNumber
						newO.paymentChannel = that.data.paymentChannel
						newO.paymentType = that.data.channelType
                        newO.typeInfo = 0
						// if (saleI.pro != loca.pro) {
						// 	newO.typeInfo = 1
						// }
						// if (shopInput.province != loca.pro) {
						// 	newO.typeInfo = 1
						// }
                        console.log(newO)
                        wx.request({
                            url: that.data.server + 'submit/intoSubmission',
                            method: 'post',
                            data: newO,
                            header: {
                                'Content-Type': 'application/x-www-form-urlencoded' // 默认值
                            },
                            success: function(res) {
                                console.log(res)
                            }
                        })
                        wx.showModal({
                            title: '提示',
                            content: res.data.msg,
                            showCancel: false,
                            icon: 'none',
                            success: function(res) {
                                if (res.cancel) {

                                } else {
                                    setTimeout(function() {
                                        wx.navigateBack({
                                            delta: 1
                                        })
                                    }, 500)
                                }

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
            merchantNumber: options.merchantNumber,
			institutionNumber: wx.getStorageSync('saleInfo').institutionNumber,
			saleNumber: wx.getStorageSync('saleInfo').number
        })

        var that = this
		wx.request({
			url: that.data.server + 'login/getSalePcList',
			method: 'post',
			data: {
				institutionNumber: wx.getStorageSync('saleInfo').institutionNumber
			},
			dataType: 'json',
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			success:function(res){
				var d0n = [],d0c=[],d0t=[],d1n = [],d1c=[],d1t=[],d0rate=[],d1rate=[],d0rateNum=[],d1rateNum=[]
				var ls0 = res.data.data.d0Td
				var ls1 = res.data.data.d1Td
				for(let i = 0 ; i < ls0.length;i++){
					d0n.push(ls0[i].paymentChannelName)
					d0c.push(ls0[i].paymentChannel)
					d0t.push(ls0[i].channelType)
					console.log(ls0[i].channelD0Rate.split('&'))
					if (ls0[i].channelD0Rate.indexOf('|') >=0){
						var lis = ls0[i].channelD0Rate.split('&')
						var l1 = [], l0 = []
						for (let n = 0; n < lis.length; n++) {
							l1.push(lis[n].split('|')[1])
							l0.push(lis[n].split('|')[0])
						}
						console.log(l1,l0)
						d0rate.push(l1)
						d0rateNum.push(l0)
					}else{
						d0rate.push(ls0[i].channelD0Rate.split('&'))
						var ne = new Array()
						d0rateNum.push(ne)
					}
					
				}
				for (let i = 0; i < ls1.length; i++) {
					d1n.push(ls1[i].paymentChannelName)
					d1c.push(ls1[i].paymentChannel)
					d1t.push(ls1[i].channelType)
					
					if (ls1[i].channelD1Rate.indexOf('|') >= 0) {
						var lis = ls1[i].channelD1Rate.split('&')
						console.log(lis)
						var l1 = [],l0 = []
						for(let n = 0 ; n < lis.length;n++){
							l1.push(lis[n].split('|')[1])
							l0.push(lis[n].split('|')[0])
						}
						d1rate.push(l1)
						d1rateNum.push(l0)
					} else {
						d1rate.push(ls1[i].channelD1Rate.split('&'))
						var ne = new Array()
						d1rateNum.push(ne)
					}
				}
				var shopInput = that.data.shopInput
				shopInput.channel = d1n[0]
				console.log(d0rateNum,d1rateNum)
				
				that.setData({
					d0n:d0n,
					d0c: d0c,
					d0t: d0t,
					d1rate:d1rate,
					d0rate: d0rate,
					d0rateNum: d0rateNum,
					d1rateNum: d1rateNum,
					rateList: d1rate[0],
					rateList1: d1rateNum[0],
					d1n: d1n,
					d1c: d1c,
					d1t: d1t,
					shopInput: shopInput,
					rateNameList:d1n,
					rateNumList:d1c,
					rateTypeList:d1t,
					channelType: d1t[0],
					paymentChannel:d1c[0],
					youzhiType: d1t[0] == 3 ? true : false,
				})
				if (that.data.channelType == 3) {
					var shopInput = that.data.shopInput
					shopInput.operationId = ''
					shopInput.rate1 = '',
						shopInput.rateCoding = '',
						that.setData({
							shopInput: shopInput,
							multihangye: '',
							yirongmaId: '',
							listValid: '',
							shopInput: shopInput,
							multiArray3: yirongma
						})
				} else {
					var shopInput = that.data.shopInput
					shopInput.operationId = ''
					shopInput.rate1 = '',
						shopInput.rateCoding = '',
						that.setData({
							shopInput: shopInput,
							multihangye: '',
							yirongmaId: '',
							listValid: '',
							shopInput: shopInput,
							multiArray3: hangyeData
						})
				}
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
						success: function (res) {
							var data1 = res.data.data.merchantRegisterInfo
							var shopData = that.data.shopData
							console.log(data1)
							var data2 = res.data.data.merchantBankCardInfo
							var dataRate = res.data.data.merchantRoteInfo
							var data3 = Object.assign(data1, data2, dataRate)
							if (data1.paymentType == 3) {
								var hangye = yirongmaL
								var name = ''
								for (let i = 0; i < hangye.length; i++) {
									if (hangye[i].id == data1.operationId) {
										name = hangye[i].name
									}
								}

								var multihangye = name
								var iii = data1.qualityClient == "0" ? 1 : 0
								console.log(iii)
								if (iii == 0) {
									that.setData({
										feilvType: true,
										youzhiType: true
									})
									for (let i = 0; i < shopData[0].stepsCon[0].basicsetup[4].radiolist.length; i++) {
										shopData[0].stepsCon[0].basicsetup[4].radiolist[i].checked = false
									}

									shopData[0].stepsCon[0].basicsetup[4].radiolist[iii].checked = true
								} else {
									for (let i = 0; i < shopData[0].stepsCon[0].basicsetup[4].radiolist.length; i++) {
										shopData[0].stepsCon[0].basicsetup[4].radiolist[i].checked = false
									}

									shopData[0].stepsCon[0].basicsetup[4].radiolist[iii].checked = true
									that.setData({
										feilvType: false
									})
								}

							} else {
								var multihangye = data3.oneOperate + '-' + data3.twoOperate + '-' + data3.threeOperate
							}

							if (data1.juridicalPersonIDType == 1) {
								that.setData({
									"juridicalPersonIDType": 1,
									"jurIs": true
								})
							} else {
								that.setData({
									"juridicalPersonIDType": 0,
									"jurIs": false
								})
							}
							console.log(data1.businessLicenseType)
							if (data1.businessLicenseType == 1) {
								that.setData({
									"businessLicenseType": 1,
									"busIs": true
								})
							} else {
								console.log(data1.businessLicenseType)
								that.setData({
									"businessLicenseType": 0,
									"busIs": false
								})
							}
							if (data3.rateType == 'D1') {

								console.log(that.data.d1c)
								var paymentN;
								var thatN
								for (let i = 0; i < that.data.d1c.length; i++) {
									if (that.data.d1c[i] == data3.paymentChannel) {
										paymentN = that.data.d1n[i]
										thatN = i
										break
									}
								}
								console.log(thatN)
								that.setData({
									rateList:that.data.d1rate[thatN],
									rateList1: that.data.d1rateNum[thatN],
								})
								data3.channel = paymentN

							}else{
								
								var paymentN;
								var thatN
								for (let i = 0; i < that.data.d0c.length; i++) {
									if (that.data.d0c[i] == data3.paymentChannel) {
										paymentN = that.data.d0n[i]
										thatN = i
										break
									}
								}
								console.log(thatN)
								that.setData({
									rateList: that.data.d0rate[thatN],
									rateList1: that.data.d0rateNum[thatN],
								})
								data3.channel = paymentN
							}
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

							var rate = data3.rate * 100
							console.log(rate)
							data3.rate1 = rate.toFixed(2) + '%'
							if (data3.merchantType != 0) {
								//设置营业板块是否显示
								shopData[0].stepsCon[2].isS = true
								//设置商户类型的判断
								for (var i = 0; i < shopData[0].stepsCon[0].basicsetup[1].radiolist.length; i++) {
									shopData[0].stepsCon[0].basicsetup[1].radiolist[i].checked = false
									if (data3.merchantType == i) {
										shopData[0].stepsCon[0].basicsetup[1].radiolist[i].checked = true
									}
								}

								shopData[0].stepsCon[0].basicsetup[1].radiolist[data3.merchantType].checked = true
								// console.log(shopData[1].stepsCon[0].basicsetup[0].radiolist)
								//处理对公对私的循环
								for (var j = 0; j < shopData[1].stepsCon[0].basicsetup[0].radiolist.length; j++) {
									shopData[1].stepsCon[0].basicsetup[0].radiolist[j].checked = false
									if (data3.settlementLogo == shopData[1].stepsCon[0].basicsetup[0].radiolist[j].radiotypeNum) {
										shopData[1].stepsCon[0].basicsetup[0].radiolist[j].checked = true
									}
								}
								//如果通道是3并且类型为2，对公对私的判断
								if (data1.paymentType == 3 && data3.merchantType == 2) {
									shopData[1].stepsCon[0].basicsetup[0].radiolist[0].isS = false
									shopData[1].stepsCon[0].basicsetup[0].radiolist[1].checked = true
								}
								shopData[1].stepsCon[0].basicsetup[0].radiolist[1].isS = true
								// shopData[1].stepsCon[1].basicsetup[0].isS = true
								//D0，D1标识
								for (var k = 0; k < shopData[0].stepsCon[0].basicsetup[2].radiolist.length; k++) {
									console.log(shopData[0].stepsCon[0].basicsetup[2].radiolist[k])
									shopData[0].stepsCon[0].basicsetup[2].radiolist[k].checked = false
									if (data3.rateType == shopData[0].stepsCon[0].basicsetup[2].radiolist[k].radiotypeNum) {
										shopData[0].stepsCon[0].basicsetup[2].radiolist[k].checked = true
									}
								}
								that.setData({
									shopData: shopData,
									settlementLogo: data3.settlementLogo,
									merchantType: data3.merchantType,
									channelType: data1.paymentType,
									youzhiType: true
								})
							} else {
								shopData[0].stepsCon[2].isS = false
								for (var i = 0; i < shopData[0].stepsCon[0].basicsetup[1].radiolist.length; i++) {
									shopData[0].stepsCon[0].basicsetup[1].radiolist[i].checked = false
								}
								shopData[0].stepsCon[0].basicsetup[1].radiolist[data3.merchantType].checked = true

								for (var j = 0; j < shopData[1].stepsCon[0].basicsetup[0].radiolist.length; j++) {
									shopData[1].stepsCon[0].basicsetup[0].radiolist[j].checked = false
								}
								shopData[1].stepsCon[0].basicsetup[0].radiolist[data3.merchantType].checked = true
								// console.log(shopData[1].stepsCon[1].basicsetup[0])
								// shopData[1].stepsCon[1].basicsetup[0].isS = false
								// console.log(shopData[1].stepsCon[0].basicsetup[0].radiolist[1].isS)
								// shopData[1].stepsCon[0].basicsetup[0].radiolist[1].isS = false
								that.setData({
									shopData: shopData,
									merchantType: data3.merchantType,
									channelType: data1.paymentType,
									youzhiType: false
								})
							}
							console.log(data3)
							var shopData = that.data.shopData
							for (let j = 0; j < shopData[0].stepsCon[2].basicsetup[4].radiolist.length; j++) {
								shopData[0].stepsCon[2].basicsetup[4].radiolist[j].checked = false
							}
							shopData[0].stepsCon[2].basicsetup[4].radiolist[data1.businessLicenseType==0?1:0].checked = true
							that.setData({
								shopData:shopData
							})
							if (that.data.channelType == 3) {
								var shopData = that.data.shopData
								console.log(shopData[0].stepsCon[0].basicsetup[3])
								shopData[0].stepsCon[0].basicsetup[3].isShow = true
								console.log(that.data.channelType)
								that.setData({
									shopData: shopData,
									youzhiType: true
								})
							} else {
								var shopData = that.data.shopData
								console.log(shopData[0].stepsCon[0].basicsetup[3])
								shopData[0].stepsCon[0].basicsetup[3].isShow = false
								that.setData({
									shopData: shopData,
									youzhiType: false
								})
							}
							
							that.setData({
								shopInput: data3,
								multihangye: multihangye,
								multiaddress: multiaddress,
								qualityClient: data3.qualityClient,
								paymentChannel: data3.paymentChannel
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
							'content-type': 'application/x-www-form-urlencoded' // 默认值
						},
						success: function (res) {
							console.log(res)
							if (res.data.code == 1000) {
								if (res.data.data == null) {
									// wx.showToast({
									// 	title:res.data.msg,
									// 	icon:"none"
									// })
								} else {
									var imagelist = that.data.imagelist
									console.log(res.data.data[0])
									var imL = res.data.data[0]
									for (var i in imL) {
										for (var m = 0; m < imagelist.length; m++) {
											if (imagelist[m].name == i) {
												if (!!imL[i]) {
													imagelist[m].imgSrc = imL[i]
													imagelist[m].isS = true
												}
												break
											}
										}
									}
									console.log(imagelist)
									that.setData({
										imagelist: imagelist
									})
								}
							}
						}
					})
				}
			}
		})
        
        console.log(this.data.channelType)
        if (this.data.channelType == 3) {
            var shopData = this.data.shopData
            console.log(shopData[0].stepsCon[0].basicsetup[3])
            shopData[0].stepsCon[0].basicsetup[3].isShow = true
            console.log(this.data.channelType)
            this.setData({
                shopData: shopData,
                youzhiType: true
            })
        } else {
            var shopData = this.data.shopData
            console.log(shopData[0].stepsCon[0].basicsetup[3])
            shopData[0].stepsCon[0].basicsetup[3].isShow = false
            this.setData({
                shopData: shopData,
                youzhiType: false
            })
        }
        if (this.data.channelType == 3) {
            this.setData({
                multiArray3: yirongma
            })
        } else {
            this.setData({
                multiArray3: hangyeData
            })
        }
        // var saleInfo = wx.getStorageSync('saleInfo')
        // console.log(saleInfo)
        // var rateD0 = saleInfo.productSwitch.split('&');
        // var rateD1 = saleInfo.productSwitchD1.split('&');
        // var rate1 = [],
        //     rate2 = [],
        //     rateId1 = [],
        //     rateId2 = []
        // if (saleInfo.productSwitchD1.indexOf('|') > -1) {
        //     for (var i = 0; i < rateD1.length; i++) {
        //         rate1.push(rateD1[i].split('|')[1])
        //         rateId1.push(rateD1[i].split('|')[0])
        //     }
        // } else {
        //     for (var i = 0; i < rateD1.length; i++) {
        //         rate1.push(rateD1[i])
        //     }
        // }
        // if (saleInfo.productSwitch.indexOf('|') > -1) {
        //     for (var i = 0; i < rateD0.length; i++) {
        //         rate2.push(rateD0[i].split('|')[1])
        //         rateId2.push(rateD0[i].split('|')[0])
        //     }
        // } else {
        //     for (var i = 0; i < rateD0.length; i++) {
        //         rate2.push(rateD0[i])
        //     }
        // }
        // this.setData({
        //     institutionNumber: saleInfo.institutionNumber,
        //     saleNumber: saleInfo.number,
        //     rateList: rate1,
        //     rateList1: rateId1,
        //     rate1: rate1,
        //     rate2: rate2,
        //     rateId1: rateId1,
        //     rateId2: rateId2,
        // })
        var hangbie = this.data.hangbie
        for (var jj = 0; jj < hangbie.length; jj++) {
            hangbie[jj].type = true
        }
     
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
        //获取省市区
        wx.request({
            url: that.data.server + 'merchantRegister/getAreajson',
            method: 'post',
            dataType: 'json',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function(res) {
                if (res.data.code == '1000') {
                    console.log(JSON.parse(res.data.data))
                    that.setData({
                        proCode: JSON.parse(res.data.data)
                    })
                    var provincelist = that.data.provincelist
                    var provincelistc = that.data.provincelistc
                    var addresslist = [],
                        addresslistc = []
                    for (let i = 0; i < that.data.proCode.length; i++) {
                        addresslist.push(that.data.proCode[i].text)
                        addresslistc.push(that.data.proCode[i].value)
                    }
                    provincelist.push(addresslist)
                    provincelistc.push(addresslistc)

                    var addresslist1 = [],
                        addresslistc1 = []
                    for (let i = 0; i < that.data.proCode[0].children.length; i++) {
                        addresslist1.push(that.data.proCode[0].children[i].text)
                        addresslistc1.push(that.data.proCode[0].children[i].value)
                    }
                    provincelist.push(addresslist1)
                    provincelistc.push(addresslistc1)
                    var addresslist2 = [],
                        addresslistc2 = []
                    for (let i = 0; i < that.data.proCode[0].children[0].children.length; i++) {
                        addresslist2.push(that.data.proCode[0].children[0].children[i].text)
                        addresslistc2.push(that.data.proCode[0].children[0].children[i].value)
                    }
                    provincelist.push(addresslist2)
                    provincelistc.push(addresslistc2)
                    that.setData({
                        provincelist: provincelist,
                        provincelistc: provincelistc
                    })
                }
            }
        })
        // wx.request({
        // 	url: that.data.server + 'merchantRegister/selectArea',
        // 	method: 'post',
        // 	data: {
        // 		provinceCode: '',
        // 		cityCode: ''
        // 	},
        // 	dataType: 'json',
        // 	header: {
        // 		'content-type': 'application/json' // 默认值
        // 	},
        // 	success: function (res) {
        // 		if (res.data.code == '1000') {
        // 			var addresslist = [],
        // 				addresslistc = []
        // 			var provincelist = that.data.provincelist
        // 			var provincelistc = that.data.provincelistc
        // 			for (var i = 0; i < res.data.data.length; i++) {
        // 				addresslist.push(res.data.data[i].provinceName)
        // 				addresslistc.push(res.data.data[i].provinceCode)
        // 			}
        // 			provincelist.push(addresslist)
        // 			provincelistc.push(addresslistc)
        // 			that.setData({
        // 				provincelist: provincelist,
        // 				provincelistc: provincelistc
        // 			})
        // 			wx.request({
        // 				url: that.data.server + 'merchantRegister/selectArea',
        // 				method: 'post',
        // 				data: {
        // 					provinceCode: that.data.provincelistc[0][0],
        // 					cityCode: ''
        // 				},
        // 				dataType: 'json',
        // 				header: {
        // 					'content-type': 'application/json' // 默认值
        // 				},
        // 				success: function (res) {
        // 					if (res.data.code == '1000') {
        // 						var addresslist = [],
        // 							addresslistc = []
        // 						var provincelist = that.data.provincelist
        // 						var provincelistc = that.data.provincelistc
        // 						for (var i = 0; i < res.data.data.length; i++) {
        // 							addresslist.push(res.data.data[i].cityName)
        // 							addresslistc.push(res.data.data[i].cityCode)
        // 						}
        // 						provincelist.push(addresslist)
        // 						provincelistc.push(addresslistc)
        // 						that.setData({
        // 							provincelist: provincelist,
        // 							provincelistc: provincelistc
        // 						})
        // 						wx.request({
        // 							url: that.data.server + 'merchantRegister/selectArea',
        // 							method: 'post',
        // 							data: {
        // 								provinceCode: that.data.provincelistc[0][0],
        // 								cityCode: that.data.provincelistc[1][0]
        // 							},
        // 							dataType: 'json',
        // 							header: {
        // 								'content-type': 'application/json' // 默认值
        // 							},
        // 							success: function (res) {
        // 								if (res.data.code == '1000') {
        // 									var addresslist = [],
        // 										addresslistc = []
        // 									var provincelist = that.data.provincelist
        // 									var provincelistc = that.data.provincelistc
        // 									for (var i = 0; i < res.data.data.length; i++) {
        // 										addresslist.push(res.data.data[i].areaName)
        // 										addresslistc.push(res.data.data[i].areaCode)
        // 									}
        // 									provincelist.push(addresslist)
        // 									provincelistc.push(addresslistc)
        // 									that.setData({
        // 										provincelist: provincelist,
        // 										provincelistc: provincelistc
        // 									})
        // 								}
        // 							}
        // 						})
        // 					}
        // 				}
        // 			})
        // 		}
        // 	}
        // })
        this.getTop()
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    scrollHeight: res.windowHeight
                });

            }
        });
        wx.request({
            url: this.data.server + 'login/getInfoRate',
            method: 'post',
            data: {
                institutionNumber: this.data.institutionNumber
            },
            dataType: 'json',
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function(res) {
                console.log(res)
                console.log(wx.getStorageSync('saleInfo'))
                var sI = wx.getStorageSync('saleInfo')
                // sI.channelTypeOne = res.data.data.channelTypeOne
                // sI.channelTypeTwo = res.data.data.channelTypeTwo
                // sI.productSwitch = res.data.data.productSwitch
                // sI.productSwitchD1 = res.data.data.productSwitchD1
                wx.setStorageSync('saleInfo', sI)
            }
        })
        var that = this
        wx.request({
            url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=BIuEzeLr4mZaCGuDjEeLvSCp&client_secret=q5XFY7XBaZ48ccbMpdebqsU1hurMLxsB&',
            method: 'post',

            success: function(data) {
                that.setData({
                    accesstoken: data.data.access_token
                })
            }
        })
    },
    getJurInfo: function(e) {
        console.log(e)
        const self = this
        var that = this
        var imagelist = that.data.imagelist
        var index = e.target.dataset.picindex
        var type = e.target.dataset.pictype

        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                const imageSrc = res.tempFilePaths[0]
                wx.showLoading({
                    title: '正在上传',
                })
                var tempFilePaths = res.tempFilePaths
                console.log(tempFilePaths)
                wx.getFileSystemManager().readFile({
                    filePath: res.tempFilePaths[0], //选择图片返回的相对路径
                    encoding: 'base64', //编码格式
                    success: res => { //成功的回调
                        var imgBase = res.data
                        wx.request({
                            url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token=' + that.data.accesstoken,
                            data: {
                                "id_card_side": "front",
                                "detect_direction": "true",
                                image: imgBase
                            },
                            method: 'post',
                            header: {
                                "Content-type": "application/x-www-form-urlencoded"
                            },
                            success: res => {
                                // console.log(res.data.words_result.公民身份号码)
                                var shopInput = that.data.shopInput
                                shopInput.juridicalpersonId = res.data.words_result.公民身份号码.words
                                shopInput.juridicalpersonName = res.data.words_result.姓名.words
                                that.setData({
                                    shopInput: shopInput,
                                    jurInfo: '请核对'
                                })
                                wx.showToast({
                                    title: '请核对信息',
                                    icon: 'success',
                                    duration: 1000
                                })
                            }
                        })
                    }
                })
                // wx.uploadFile({
                //     url: that.data.server1 + 'Sell/addPic',
                //     filePath: imageSrc,
                //     name: 'file',
                //     formData: {
                //         type: 2,
                //         institutionNumber: that.data.institutionNumber,
                //         orderNumber: that.data.orderNumber
                //     },
                //     success(res) {
                //         wx.showToast({
                //             title: '上传成功',
                //             icon: 'success',
                //             duration: 1000
                //         })
                //         var imgSrc = JSON.parse(res.data)
                //         var imagelist = that.data.imagelist
                //         console.log(imagelist)
                //         for (let i = 0; i < imagelist.length; i++) {
                //             if (imagelist[i].type == 2) {
                //                 imagelist[i].imgSrc = imgSrc.data + '?' + Math.random()
                //                 imagelist[i].isS = true
                //             }
                //         }

                //         that.setData({
                //             imagelist: imagelist
                //         })
                //         console.log(imagelist)
                //     },
                //     fail() {
                //         wx.showToast({
                //             title: '上传失败',
                //             icon: 'success',
                //             duration: 1000
                //         })
                //     }
                // })
            },

            fail({
                errMsg
            }) {
                console.log('chooseImage fail, err is', errMsg)
            }
        })
    },
    getJurInfo1: function(e) {
        console.log(e)
        const self = this
        var that = this
        var imagelist = that.data.imagelist

        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                const imageSrc = res.tempFilePaths[0]
                wx.showLoading({
                    title: '正在上传',
                })
                var tempFilePaths = res.tempFilePaths
                console.log(tempFilePaths)
                wx.getFileSystemManager().readFile({
                    filePath: res.tempFilePaths[0], //选择图片返回的相对路径
                    encoding: 'base64', //编码格式
                    success: res => { //成功的回调
                        var imgBase = res.data
                        wx.request({
                            url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/business_license?access_token=' + that.data.accesstoken,
                            data: {
                                "detect_direction": "true",
                                image: imgBase
                            },
                            method: 'post',
                            header: {
                                "Content-type": "application/x-www-form-urlencoded"
                            },
                            success: res => {
                                console.log(res)
                                // wx.showModal({
                                // 	title: '提示',
                                // 	content: JSON.parse(res.data.words_result),
                                // 	success(res) {
                                // 		if (res.confirm) {
                                // 			console.log('用户点击确定')
                                // 		} else if (res.cancel) {
                                // 			console.log('用户点击取消')
                                // 		}
                                // 	}
                                // })
                                var shopInput = that.data.shopInput
                                shopInput.businessLicenseName = res.data.words_result.单位名称.words
                                if (res.data.words_result.社会信用代码.words != '无') {
                                    shopInput.businessLicenseNo = res.data.words_result.社会信用代码.words
                                }
                                if (res.data.words_result.证件编号.words != '无') {
                                    shopInput.businessLicenseNo = res.data.words_result.证件编号.words
                                }
                                shopInput.businessLicenseAddress = res.data.words_result.地址.words
                                shopInput.businessLicenseEndTime = res.data.words_result.成立日期.words.replace('年', '-').replace('月', '-').replace('日', '')
                                that.setData({
                                    shopInput: shopInput,
                                    buiInfo: '请核对'
                                })
                                wx.showToast({
                                    title: '请核对信息',
                                    icon: 'success',
                                    duration: 1000
                                })
                            }
                        })
                    }
                })
                // wx.uploadFile({
                //     url: that.data.server1 + 'Sell/addPic',
                //     filePath: imageSrc,
                //     name: 'file',
                //     formData: {
                //         type: 1,
                //         institutionNumber: that.data.institutionNumber,
                //         orderNumber: that.data.orderNumber
                //     },
                //     success(res) {
                //         wx.showToast({
                //             title: '上传成功',
                //             icon: 'success',
                //             duration: 1000
                //         })
                //         var imgSrc = JSON.parse(res.data)
                //         var imagelist = that.data.imagelist
                //         console.log(imagelist)
                //         for (let i = 0; i < imagelist.length; i++) {
                //             if (imagelist[i].type == 1) {
                //                 imagelist[i].imgSrc = imgSrc.data + '?' + Math.random()
                //                 imagelist[i].isS = true
                //             }
                //         }

                //         that.setData({
                //             imagelist: imagelist
                //         })
                //         console.log(imagelist)
                //     },
                //     fail() {
                //         wx.showToast({
                //             title: '上传失败',
                //             icon: 'success',
                //             duration: 1000
                //         })
                //     }
                // })
            },

            fail({
                errMsg
            }) {
                console.log('chooseImage fail, err is', errMsg)
            }
        })
    },
    getJurInfo2: function(e) {
        console.log(e)
        const self = this
        var that = this
        var imagelist = that.data.imagelist

        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                const imageSrc = res.tempFilePaths[0]
                wx.showLoading({
                    title: '正在上传',
                })
                var tempFilePaths = res.tempFilePaths
                console.log(tempFilePaths)
                wx.getFileSystemManager().readFile({
                    filePath: res.tempFilePaths[0], //选择图片返回的相对路径
                    encoding: 'base64', //编码格式
                    success: res => { //成功的回调
                        var imgBase = res.data
                        wx.request({
                            url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/bankcard?access_token=' + that.data.accesstoken,
                            data: {
                                image: imgBase
                            },
                            method: 'post',
                            header: {
                                "Content-type": "application/x-www-form-urlencoded"
                            },
                            success: res => {
                                console.log(res)
                                var shopInput = that.data.shopInput
                                if (res.data.error_code) {
                                    wx.showToast({
                                        title: '识别失败',
                                        icon: 'none',
                                        duration: 1000
                                    })
                                    return
                                }
                                shopInput.bankCardNo = res.data.result.bank_card_number.replace(/\s/g, "").replace(/(.{4})/g, "$1 ");


                                var hang = that.data.hangbie
                                for (let i = 0; i < hang.length; i++) {
                                    if (hang[i].text.indexOf(res.data.result.bank_name) > -1) {
                                        shopInput.openingBank = hang[i].text
                                        shopInput.openingBankID = hang[i].value
                                        shopInput.openingBankBranch = ''
                                        shopInput.openingBankBranchID = ''
                                    }
                                }

                                that.setData({
                                    shopInput: shopInput,
                                    bankInfo: '请核对'
                                })
                                wx.showToast({
                                    title: '请核对信息',
                                    icon: 'success',
                                    duration: 1000
                                })
                            },
                            fail: res => {
                                wx.showToast({
                                    title: res.data.error_msg,
                                    icon: 'success',
                                    duration: 1000
                                })
                            }
                        })
                    }
                })
                // wx.uploadFile({
                //     url: that.data.server1 + 'Sell/addPic',
                //     filePath: imageSrc,
                //     name: 'file',
                //     formData: {
                //         type: 6,
                //         institutionNumber: that.data.institutionNumber,
                //         orderNumber: that.data.orderNumber
                //     },
                //     success(res) {
                //         wx.showToast({
                //             title: '上传成功',
                //             icon: 'success',
                //             duration: 1000
                //         })
                //         var imgSrc = JSON.parse(res.data)
                //         var imagelist = that.data.imagelist
                //         for (let i = 0; i < imagelist.length; i++) {
                //             if (imagelist[i].type == 6) {
                //                 imagelist[i].imgSrc = imgSrc.data + '?' + Math.random()
                //                 imagelist[i].isS = true
                //             }
                //         }

                //         that.setData({
                //             imagelist: imagelist
                //         })
                //     },
                //     fail() {
                //         wx.showToast({
                //             title: '上传失败',
                //             icon: 'success',
                //             duration: 1000
                //         })
                //     }
                // })
            },

            fail({
                errMsg
            }) {
                console.log('chooseImage fail, err is', errMsg)
            }
        })
    },
    getTop: function() {
        console.log(this.data.merchantType)
        var that = this
        var obj = new Object()
        wx.createSelectorQuery().selectAll('.bodyC').boundingClientRect(function(rect) {
            console.log(rect)
            for (let i = 0; i < rect.length; i++) {
                console.log(rect[i])
                var a = 'top' + rect[i].dataset.basic
                console.log(a)
                var b = rect[i].top
                obj[a] = b
            }
            console.log(obj)
            that.setData({
                top: obj
            })
        }).exec()

    },
    loadHang: function(e) {
        console.log('3')
    },
    loadHang1: function(e) {
        wx.showLoading({

        })
        var pagenum = this.data.pageNum
        if (pagenum >= this.data.pageCount) {
            wx.showToast({
                title: '没有更多数据',
                icon: 'none',
                duration: 1000
            })
            return
        }
        this.setData({
            pageNum: pagenum + 1
        })
        this.getZhihang()
    },
    loadHang2: function(e) {
        console.log('1')
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    getShengOld: function() {
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
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        console.log(wx.getStorageSync('shopInput'))
        if (wx.getStorageSync('shopInput')) {
            this.setData({
                shopInput: wx.getStorageSync('shopInput')
            })
        }
        if (wx.getStorageSync('multihangye')) {
            this.setData({
                multihangye: wx.getStorageSync('multihangye')
            })
        }
        if (wx.getStorageSync('multiaddress')) {
            this.setData({
                multiaddress: wx.getStorageSync('multiaddress')
            })
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
        if (!this.data.orderNumber) {
            wx.setStorageSync('shopInput', this.data.shopInput)
            wx.setStorageSync('multihangye', this.data.multihangye)
            wx.setStorageSync('multiaddress', this.data.multiaddress)
        }
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function(e) {
        // var that = this
        // if(this.data.orderNumber == ''){
        // 	wx.showModal({
        // 		title: '提示',
        // 		content: '是否保存刚才所输入的信息',
        // 		success(res) {
        // 			if (res.confirm) {
        // 				wx.setStorageSync('shopInput', that.data.shopInput)
        // 				wx.setStorageSync('multihangye', that.data.multihangye)
        // 				wx.setStorageSync('multiaddress', that.data.multiaddress)
        // 			} else if (res.cancel) {
        // 				console.log('用户点击取消')
        // 			}
        // 		}
        // 	})
        // }
        if (!this.data.orderNumber) {
            wx.setStorageSync('shopInput', this.data.shopInput)
            wx.setStorageSync('multihangye', this.data.multihangye)
            wx.setStorageSync('multiaddress', this.data.multiaddress)
        }

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