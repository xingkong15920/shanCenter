// pages/merchants/manage/index.js
const config = require('../../../utils/config.js')
var QRCode = require('../../../utils/weapp-qrcode.js')
var qrcode, qrcode1
const W = wx.getSystemInfoSync().windowWidth;
const rate = 750.0 / W;
// 300rpx 在6s上为 150px
const code_w = 350 / rate;
const code_ww = 343 / rate;
Page({
    data: {
        shopEdit: {},
        status: '',
        checked: false,
        requestBreak: false,
        chooseShop: '全部门店',
        chooseShopList: [],
        chooseShopList1: [],
        chooseShopNum: '',
        //二维码信息
        deviceCode: '',
        code_w: code_w,
		code_ww: code_ww,
        //编辑店员信息
        shopEname: '',
        shopEnum: '',
        //店员信息
        paymentCode: '',
        assistantData: {},
        currentTab: 0,
        index: 0,
        showModal1: false,
        showModal2: false,
        showModal3: false,
        showModal4: false,
        showModal5: false,
        showModal6: false,
        shopName: '',
        array: ['0.025%', '0.036%', '0.038%', '0.05%', '0.056%', '0.062%'],
        shopList: [],
        merchantName: '',
        saleNumber: '',
        // merchantNumber: '180308165207885',
        merchantNumber: '',
        clerkName: '',
        clerkNumber: '',
        registeredCell: '',
        shopName: '',
        server: config.server,
        pageNum: 1,
        limit: 10,
		codeImg:'',
		isBind:false
    },
    onLoad: function() {
        var that = this
        var saleInfo = wx.getStorageSync('shopInfo')
        this.setData({
            merchantNumber: saleInfo.Number
        })
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
                            chooseShopList1: res.data.data.result,
                        })
                        var a = {}
                        a.shopName = '全部门店'
                        a.shopNumber = ''
                        res.data.data.result.unshift(a)
                        that.setData({
                            chooseShopList: res.data.data.result,
                        })
                    }
                }
            }
        })
        qrcode = new QRCode('canvas', {
            //usingIn: this,
            text: that.data.paymentCode,
            width: code_w,
            height: code_w,
            colorDark: "black",
            colorLight: "white",
            correctLevel: QRCode.CorrectLevel.H,
        });
		qrcode1 = new QRCode('canvas1', {
			//usingIn: this,
			
			text: that.data.codeImg,
			colorDark: "black",
			colorLight: "white",
			correctLevel: QRCode.CorrectLevel.H,
		});
    },
    onShow: function() {
        this.getData()
    },
    switch1Change(e) {
        var clerkNumber = e.target.dataset.id
        if (e.detail.value) {
            wx.request({
                url: this.data.server + 'clerk/modifyClerk', //仅为示例，并非真实的接口地址
                data: {
                    clerkNumber: clerkNumber,
                    enable: 0
                },
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function(res) {
                    if (res.data.code != 1000) {

                    } else {}
                }
            })
        } else {
            wx.request({
                url: this.data.server + 'clerk/modifyClerk', //仅为示例，并非真实的接口地址
                data: {
                    clerkNumber: clerkNumber,
                    enable: 1
                },
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function(res) {
                    if (res.data.code != 1000) {

                    } else {}
                }
            })
        }
    },
    //获取初始数据
    getData: function() {
        var that = this
        wx.request({
            url: this.data.server + 'clerk/getClerks', //仅为示例，并非真实的接口地址
            data: {
                merchantNumber: this.data.merchantNumber,
                clerkName: this.data.clerkName,
                registeredCell: this.data.registeredCell,
                shopName: this.data.shopName,
                page: 1,
                limit: 20
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function(res) {
                if (res.data.code != 1000) {
					wx.showToast({
						title: '查询为空！',
						icon: 'none'
					})
					that.setData({
						requestBreak: false,
						shopList: [],
					})
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
    editShop: function(e) {
        wx.navigateTo({
            url: '../../shop/shop-list/index',
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
        console.log(cur)
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
        var chooseShopList = this.data.chooseShopList
        for (var i = 0; i < chooseShopList.length; i++) {
            if (id == chooseShopList[i].shopNumber) {
                chooseShop = chooseShopList[i].shopName
                that.setData({
                    chooseShop: chooseShop
                })
                break
            }
        }
        wx.showLoading({
            title: '加载中...',
        })
        wx.request({
            url: that.data.server + 'clerk/getClerks', //仅为示例，并非真实的接口地址
            data: {
                merchantNumber: this.data.merchantNumber,
                shopNumber: id,
                clerkName: this.data.clerkName,
                registeredCell: this.data.registeredCell,
                shopName: this.data.shopName,
                page: 1,
                limit: this.data.limit
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function(res) {
                that.setData({
                    shopList: [],
                })
                if (res.data.code != 1000) {
					wx.hideLoading()
					wx.showToast({
						title:res.data.msg,
					})
                } else {
                    wx.hideLoading()
                    wx.showToast({
                        title: '查询成功',
                    })
                    that.setData({
                        shopList: res.data.data.result,
                        'active': 0
                    })
                }
            }
        })
        this.setData({
            showModal1: true
        })
        this.hideModal();
    },
    radioChangeE(e) {
        console.log(this.data.chooseShopList1)
        var id = e.detail.value
        var that = this
        var checked = this.data.checked
        var shopEname = this.data.shopEname
        var shopEnum = this.data.shopEnum
        var chooseShopList1 = this.data.chooseShopList1
        for (var i = 0; i < chooseShopList1.length; i++) {
            if (id == chooseShopList1[i].shopNumber) {
                shopEname = chooseShopList1[i].shopName
                shopEnum = chooseShopList1[i].shopNumber
                that.setData({
                    shopEname: shopEname,
                    shopEnum: shopEnum
                })
                break
            }
        }
        this.setData({
            showModal6: false
        })
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
    //弹窗-修改信息
    editData: function(e) {
        var that = this
        var id = e.currentTarget.dataset.id;
        var shopnumber = e.currentTarget.dataset.shopnum;
        var shopList = that.data.shopList
        var assistantData = that.data.assistantData
        var shopEdit = that.data.shopEdit
        for (var i = 0; i < shopList.length; i++) {
            if (id == shopList[i].clerkNumber) {
                assistantData = shopList[i]
                shopEdit.shopName = shopList[i].shopName
                shopEdit.clerkName = shopList[i].clerkName
                shopEdit.registeredCell = shopList[i].registeredCell
                that.setData({
                    assistantData: assistantData,
                    shopEname: shopList[i].shopName,
                    shopEnum: shopnumber
                })
                break
            }
        }
        this.setData({
            showModal2: true,
            id: id
        })
    },
    //弹窗-修改信息-选择门店
    chooseMendian: function(e) {
        var that = this
        var id = e.currentTarget.dataset.id;
        var shopName = this.data.shopName
        this.setData({
            showModal6: true,
            shopName: shopName
        })
    },

    //弹窗-微信推送
    editWXpush: function(e) {
		this.getName(e.currentTarget.dataset.id)
		// isBind
        var that = this
        var id = e.currentTarget.dataset.id;
		that.setData({
            showModal3: true,
            id: id,
			codeImg:'http://user.51shanhe.com/oneCode/getCode.html?clerkNumber=' + id
        })
		setTimeout(function () {
			qrcode1.makeCode(that.data.codeImg)
		}, 10)
    },
	getName:function(e){
		var that = this
		wx.request({
			url: that.data.server +'clerk/getClerkInfo',
			data: {
				clerkNumber: e,
			},
			method: "POST",
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			success: function (res) {
				console.log(res)
				if (res.data.data.code == 1000 || res.data.data.openId == '未绑定'){
					that.setData({
						isBind: false,
						name: '',
						time: ''
					})
					setTimeout(function () {
						qrcode1.makeCode(that.data.codeImg)
					}, 10)
				}else{
					that.setData({
						isBind: true,
						name: res.data.data.nickName,
						time: res.data.data.bindTime
					})
				}

				
			}
		})
	},
	unBind:function(e){
		console.log(e)
		var that = this
		wx.showModal({
			title: '提示',
			content: '确定要解绑微信推送吗',
			success(res) {
				if (res.confirm) {
					
					wx.request({
						url: that.data.server +'/clerk/relievePushBind',
						data: {
							clerkNumber: e.currentTarget.dataset.iid,
						},
						method: "POST",
						header: {
							'content-type': 'application/x-www-form-urlencoded' // 默认值
						},
						success: function (res) {
							if (res.data.code == 1000) {
								wx.showToast({
									title: '解绑成功',
									icon: 'none'
								})
							}
							that.getName(e.currentTarget.dataset.iid)
						}
					})
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
		
	},
    //弹窗-修改密码
    editPass: function(e) {
		console.log(e)
        var that = this
        var id = e.currentTarget.dataset.id;
		wx.request({
			url: that.data.server + 'clerk/getClerkQrcode', //仅为示例，并非真实的接口地址
			data: {
				clerkNumber: clerkNumber,
				deletionFlag: 1,
				merchantNumber: that.data.merchantNumber,
				shopName: e.currentTarget.dataset.shopname,
				shopNumber: e.currentTarget.dataset.shopnumber,
			},
			header: {
				'content-type': 'application/json' // 默认值
			},
			success: function (res) {
				if (res.data.code != 1000) {
					wx.showToast({
						title: res.data.msg,
						icon: 'none'
					})
				} else {
					wx.hideLoading()
					that.setData({
						shopList: [],
					})
					that.getData()
				}
			}
		})
        this.setData({
            showModal4: true,
            id: id,
			shopN:e.currentTarget.dataset.shopname,
			shopM: e.currentTarget.dataset.shopnumber,
        })
    },
    //弹窗-一码付
    editPay: function(e) {
        var that = this
        var id = e.currentTarget.dataset.id;
        var qrcodeLink = e.currentTarget.dataset.qrcode;
        var deviceCode = qrcodeLink.split('outTradeNo=')[1]
        // console.log(deviceCode)
        // this.setData({
        //     showModal5: true,
        //     id: id,
        //     paymentCode: qrcodeLink,
        //     deviceCode: deviceCode
        // })
        // setTimeout(function() {
        //     qrcode.makeCode(that.data.paymentCode)
        // }, 10)

    },
    //弹窗-删除
    editDel: function(e) {
		console.log(e)
        var that = this
        var clerkName = e.currentTarget.dataset.name;
        var clerkNumber = e.currentTarget.dataset.id;
        wx.showModal({
            title: '是否确认删除？',
            content: '店员：' + clerkName,
            confirmText: '确定',
            cancelText: '取消',
            success: function(res) {
                if (res.confirm) {
                    wx.showLoading({
                        title: '删除中...',
                    })
                    wx.request({
                        url: that.data.server + 'clerk/modifyClerk', //仅为示例，并非真实的接口地址
                        data: {
                            clerkNumber: clerkNumber,
                            deletionFlag: 1,
							merchantNumber: that.data.merchantNumber,
							shopName: e.currentTarget.dataset.shopname,
							shopNumber: e.currentTarget.dataset.shopnumber,
                        },
                        header: {
                            'content-type': 'application/json' // 默认值
                        },
                        success: function(res) {
                            if (res.data.code != 1000) {
								wx.showToast({
									title:res.data.msg,
									icon:'none'
								})
                            } else {
                                wx.hideLoading()
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
    //弹出框蒙层截断touchmove事件
    preventTouchMove: function(e) {
        this.setData({
            showModal1: false,
            //     showModal2: false,
            //     showModal3: false,
            //     showModal4: false,
            //     showModal5: false,
            showModal6: false,
        });
    },
    //隐藏模态对话框
    hideModal: function(e) {
        this.setData({
            showModal1: false,
            showModal2: false,
            showModal3: false,
            showModal4: false,
            showModal5: false,
        });
    },
    //对话框取消按钮点击事件
    onCancel: function(e) {
        this.hideModal();
        this.setData({
            paymentCode: ''
        })
    },
    //对话框确认按钮点击事件
    onConfirm: function(e) {
		console.log(e)
        var that = this
        var shopEdit = this.data.shopEdit
        var status = e.target.dataset.status
        var clerkNumber = e.target.dataset.id
        var chooseShopNum = this.data.chooseShopNum
        var shopEnum = this.data.shopEnum
        var shopEdit = this.data.shopEdit
        if (status == "confirm2") {
            wx.request({
                url: this.data.server + 'clerk/modifyClerk', //仅为示例，并非真实的接口地址
                data: {
                    shopNumber: shopEnum,
                    clerkNumber: chooseShopNum,
                    clerkName: shopEdit.clerkName,
                    registeredCell: shopEdit.registeredCell,
                    shopName: shopEdit.shopName
                },
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function(res) {
                    if (res.data.code != 1000) {
                        wx.showToast({
                            title: res.data.msg,
                            image: '../../img/fail.png'
                        })
                    } else {
                        wx.showToast({
                            title: "修改成功!"
                        })
                        that.setData({
                            shopList: [],
                            'active': 0
                        })
                        that.getData()
                    }
                }
            })
        }
        if (status == "confirm3") {
            // wx.showToast({
            //     title: "推送" + chooseShopNum,
            //     icon: 'none'
            // })
        }
        if (status == "confirm4") {
            if (shopEdit.password == shopEdit.repassword) {
                wx.request({
                    url: this.data.server + 'clerk/modifyClerk', //仅为示例，并非真实的接口地址
                    data: {
                        clerkNumber: clerkNumber,
                        password: shopEdit.password,
						merchantNumber: that.data.merchantNumber,
						shopName : that.data.shopN,
						shopNumber: that.data.shopM,
						deletionFlag: 0
                    },
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success: function(res) {
                        if (res.data.code != 1000) {
							wx.showToast({
								title: res.data.msg,
								icon:"none"
							})
                        } else {
                            wx.showToast({
                                title: "修改成功"
                            })
                        }
                    }
                })
            } else if (shopEdit.password != shopEdit.repassword) {
                wx.showToast({
                    title: '两次密码不一致！',
                    icon: 'none'
                })
                return
            }
        }
        if (status == "confirm5") {
            wx.showToast({
                title: "一码付" + chooseShopNum,
                icon: 'none'
            })
        }
        this.hideModal();
    },
    //店员添加
    toassistantAdd: function(e) {
        var merchantNumber = this.data.merchantNumber
        wx.navigateTo({
            url: '../../shop-sh/assistant-add/index?merchantNumber=' + merchantNumber,
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
            url: this.data.server + 'clerk/getClerks', //仅为示例，并非真实的接口地址
            data: {
                merchantNumber: this.data.merchantNumber,
                clerkName: this.data.clerkName,
                registeredCell: this.data.registeredCell,
                shopName: this.data.shopName,
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
					wx.showToast({
						title: '无更多数据！',
						icon: 'none'
					})
                } else {
                    if (!res.data.data) {
                        wx.showToast({
                            title: '无更多数据！',
                            icon: 'none'
                        })
                        setTimeout(function() {
                            that.setData({
                                requestBreak: false,
                            })
                        }, 500)
                    } else {
                        var shoplist = res.data.data.result
                        that.setData({
                            shopList: shoplist,
                            pageNum: 2
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
        console.log()
        var page = this.data.pageNum
        page++
        if (page > this.data.pageCount) {
            wx.showToast({
                title: '无更多数据！',
                icon: 'none'
            })
            return
        }
        wx.request({
            url: this.data.server + 'clerk/getClerks', //仅为示例，并非真实的接口地址
            data: {
                merchantNumber: this.data.merchantNumber,
                clerkName: this.data.clerkName,
                registeredCell: this.data.registeredCell,
                shopName: this.data.shopName,
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
                    var shoplist1 = res.data.data.result
                    var pageCount = Math.ceil(res.data.data.count / 10)
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