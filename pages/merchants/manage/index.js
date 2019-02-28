// pages/merchants/manage/index.js
const config = require('../../../utils/config.js')
Page({
	data: {
		currentTab: 0,
		index: 0,
        showModal: false,
        requestBreak: false,
		array: ['0.025%', '0.036%', '0.038%', '0.05%', '0.056%', '0.062%'],
        shopList: [],
        shopList1: [],
		server: config.server,
        pageNum: 1,
        pageCount: 10,
		limit:10,
		currentTab:2,
		empty:true,
		searchText:"",
		institutionNumber: '',
		saleNumber: '',
		rateCoding:'',
		lastRate: '',
		lastcod: '',
		choRate:''
	},
	onLoad:function(){
		var saleInfo = wx.getStorageSync('saleInfo')
		console.log(saleInfo)
		this.setData({
			institutionNumber: saleInfo.institutionNumber,
			saleNumber: saleInfo.number
		})
		this.getData()
	},
	wxSearchinput: function (e) {
		var sousuozhi = this.removeAllSpace(e.detail.value);
		this.setData({
			searchText: sousuozhi
		})
		this.getData()
	},
	removeAllSpace(str) {
		return str.replace(/\s+/g, "");
	},
	getData: function () {
		var that = this
		wx.request({
			url: this.data.server + 'merchantManage/getMerchantList', //仅为示例，并非真实的接口地址
			data: {
				saleNumber: this.data.saleNumber,
				merchantName: this.data.searchText,
				auditStatus: this.data.currentTab,
				page: 1,
				limit: 20
			},
			header: {
				'content-type': 'application/json' // 默认值
			},
			success: function (res) {
				console.log(res.data)

				if (res.data.code != 1000) {

				} else {
					console.log(res)
                    if (res.data.data == null) {
                        wx.showToast({
                            title: '查询为空！',
                            icon: 'none'
                        })
						that.setData({
							shopList:[],
                            empty: false,
                            requestBreak: false,
						})
					}else{
						that.setData({
                            shopList: res.data.data.merchantList,
                            pageNum: 2,
							empty: true
						})
					}
					
				}
			}
		})
	},
	swichNav: function (e) {
		var cur = e.target.dataset.current;
		wx.showLoading({
			mask:'true',

		})
		setTimeout(function () {
			wx.hideLoading()
		}, 800)
		if (this.data.currentTaB == cur) {
			return false;
		} else {
			this.setData({
				currentTab: cur
			})
			this.getData()
		}
	},
	shopOperation: function (e) {
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
	editData: function (e) {
		console.log(e)
		var id = e.currentTarget.dataset.id
		var subNumber = e.currentTarget.dataset.subnumber
        var merchantNumber = e.currentTarget.dataset.mernumber
		
		wx.navigateTo({
            url: '../../merchants/register/index?id=' + id + '&type=true' + '&subNumber=' + subNumber + '&merchantNumber=' + merchantNumber,
		})
	},
	editShop: function (e) {
        console.log(e)
        var id = e.currentTarget.dataset.id
        var merchantNumber = e.currentTarget.dataset.mernumber
		wx.navigateTo({
            url: '../../shop/shop-list/index?id=' + id + '&merchantNumber=' + merchantNumber,
		})
	},
	bindPickerChange(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			index: e.detail.value,
			choRate:this.data.array[e.detail.value]
		})
	},
	//弹窗
	editRate: function (e) {
		console.log(e)
		var D0 = wx.getStorageSync('saleInfo').productSwitch.split('&')
		var D1  = wx.getStorageSync('saleInfo').productSwitchD1.split('&')
		var id = e.currentTarget.dataset.id
		var cod
		if(id == this.data.lastRate){
			cod = this.data.lastcod
		}else{
			cod = e.currentTarget.dataset.ratecoding
		}
		console.log(id)
		console.log(cod)
		var d1list = []
		var d0list = []
		var d1list1 = []
		var d0list1 = []
		var rateCoding;
		var choRate;
		for(let i = 0 ; i < D0.length;i++){
			console.log(D0[i])
			var ob = new Object()
			ob.name = D0[i].split('|')[0]
			ob.key = D0[i].split('|')[1]
			d0list1.push(ob)
			d0list.push(D0[i].split('|')[1])
		}
		for (let i = 0; i < D1.length; i++) {
			console.log(D1[i])
			var ob = new Object()
			ob.name = D1[i].split('|')[0]
			ob.key = D1[i].split('|')[1]
			d1list1.push(ob)
			d1list.push(D1[i].split('|')[1])
		}
		console.log(d0list)
		if(e.currentTarget.dataset.type == 'D0'){
			for (let i = 0; i < d0list1.length;i++){
				if (d0list1[i].name == cod){
					rateCoding = d0list1[i].key
					choRate = d0list1[i].key
				}
			}
			console.log(rateCoding)
			this.setData({
				array:d0list,
				array1: d0list1,
				rateType:'D0',
				shopN: id,
				rateCoding: rateCoding,
				choRate: choRate
			})
		}else{
			for (let i = 0; i < d1list1.length; i++) {
				if (d1list1[i].name == cod) {
					rateCoding = d1list1[i].key
					choRate = d1list1[i].key
				}
			}
			console.log(rateCoding)
			this.setData({
				array: d1list,
				array1: d1list1,
				rateType: 'D1',
				shopN: id,
				rateCoding: rateCoding,
				choRate: choRate
			})
		}
		this.setData({
			showModal: true
		})
	},
	//弹出框蒙层截断touchmove事件
	preventTouchMove: function (e) { },
	//隐藏模态对话框
	hideModal: function (e) {
		this.setData({
			showModal: false
		});
	},
	//对话框取消按钮点击事件
	onCancel: function (e) {
		this.hideModal();
	},
	//对话框确认按钮点击事件
	onConfirm: function (e) {
		// this.hideModal();
		var that = this
		let i = this.data.index
		console.log(this.data.array1[i])
		var rate = this.data.array1[i]
		var saleInfo = wx.getStorageSync('saleInfo')
		wx.request({
			url: this.data.server + 'merchantRegister/insertMerchantRegisterInfo', //仅为示例，并非真实的接口地址
			method:"post",
			data: {
				institutionNumber: saleInfo.institutionNumber,
				merchantNumber: this.data.shopN,
				rateType: this.data.rateType,
				rateCoding: rate.name,
				paymentChannel: saleInfo.paymentChannel,
				rate:rate.key
			},

			header: {
				'content-type': 'application/json' // 默认值
			},
			success: function (res) {
				console.log(res.data)
				if(res.data.code == 1000){
					wx.showToast({
						title: res.data.msg,
						icon:"none"
					})
					that.setData({
						showModal: false,
						lastRate: that.data.shopN,
						lastcod: rate.name
					})
				}else{
					wx.showToast({
						title: res.data.msg,
						icon: "none"
					})
				}
			}
		})
	},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    reFresh: function () {
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
            url: this.data.server + 'merchantManage/getMerchantList', //仅为示例，并非真实的接口地址
            data: {
                saleNumber: this.data.saleNumber,
                merchantName: this.data.searchText,
                auditStatus: this.data.currentTab,
                page: 1,
                limit: this.data.limit
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
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
                        var shoplist = res.data.data.merchantList
                        that.setData({
                            shopList: shoplist,
                        })
                        setTimeout(function () {
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
    loadMore: function () {
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
            url: this.data.server + 'merchantManage/getMerchantList', //仅为示例，并非真实的接口地址
            data: {
                saleNumber: this.data.saleNumber,
                merchantName: this.data.searchText,
                auditStatus: this.data.currentTab,
                page: page,
                limit: this.data.limit
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                wx.hideLoading()
                var data = res.data
                if (res.data.code != 1000) {

                } else {
                    var pageCount = Math.ceil(count / 10)
                    var shoplist1 = res.data.data.merchantList
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
                    setTimeout(function () {
                        that.setData({
                            requestBreak: false
                        })
                    }, 500)
                }
            }
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    reFresh: function () {
        var that = this
        console.log(that.data.requestBreak)
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
            url: this.data.server + 'merchantManage/getMerchantList', //仅为示例，并非真实的接口地址
            data: {
                saleNumber: this.data.saleNumber,
                merchantName: this.data.searchText,
                auditStatus: this.data.currentTab,
                page: 1,
                limit: 20
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
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
                        setTimeout(function () {
                            that.setData({
                                requestBreak: false,
                            })
                        }, 500)
                    } else {
                        var shoplist = res.data.data.merchantList
                        that.setData({
                            shopList: shoplist,
                            pageNum: 2
                        })
                        setTimeout(function () {
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
    loadMore: function () {
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
                icon: 'none'
            })
            that.setData({
                requestBreak: false,
            })
            return
        }
        wx.request({
            url: this.data.server + 'merchantManage/getMerchantList', //仅为示例，并非真实的接口地址
            data: {
                saleNumber: this.data.saleNumber,
                merchantName: this.data.searchText,
                auditStatus: this.data.currentTab,
                page: page,
                limit: this.data.limit
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                wx.hideLoading()
                var data = res.data
                if (res.data.code != 1000) {

                } else {
                    var shoplist1 = res.data.data.merchantList
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
                    setTimeout(function () {
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