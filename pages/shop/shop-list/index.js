// pages/shop-manage/index.js   
const config = require('../../../utils/config.js')
Page({
	data:{
		server: config.server,
		pageNum: 1,
		limit: 10,
        merchantNumber:'',
		shopNumber:'',
		shopList:[],
		searchText:"",
		empty:true,
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
	Tocheck:function(e) {
		console.log(e)
		var id =  e.currentTarget.dataset.id
		var name = e.currentTarget.dataset.name
		console.log(e)
		wx.navigateTo({
			url: '../shop-check/index?id=' + id + '&menchartsName=' + name,
		});
	},
	Toadd:function(e) {
		console.log(e)
		var shopNumber = e.currentTarget.dataset.id
		console.log(this)
		const that = this
		wx.scanCode({
			success(res) {
				console.log(this)
				// var code = res.result.split('?')[1].split('&')[1].split('=')[1]
				console.log(res)
				var equipmentLinkAddress = res.result
				if (res.result.indexOf('outTradeNo') < 0){
					wx.showToast({
						title: '请扫描正确的二维码',
						icon:'none',
					})
				}else{
					var code = that.getQueryString(res.result.split('?')[1],'outTradeNo')
					wx.request({
						url: that.data.server + 'merchantManage/checkQRcode', //仅为示例，并非真实的接口地址
						data: {
							// merchantNumber: this.data.shopNumber,
							saleNumber: that.data.saleNumber,
							qrCode: code
						},
						header: {
							'content-type': 'application/json' // 默认值
						},
						success: function (res) {
							console.log(res)

							if (res.data.code != 1000) {
								wx.showToast({
									title: res.data.msg,
									icon:'none'
								})
							} else {
								wx.showModal({
									title: '绑定桌牌码',
									content: '桌牌码：' + code,
									confirmText: '确定',
									cancelText: '取消',
									success: function (res) {
										if (res.confirm) {
											wx.request({
												url: that.data.server + 'merchantManage/insertShopCode', //仅为示例，并非真实的接口地址
												data: {
													merchantNumber: that.data.shopNumber,
													shopNumber: shopNumber,
													equipmentNumber: code,
													equipmentLinkAddress: equipmentLinkAddress
												},
												header: {
													'content-type': 'application/json' // 默认值
												},
												success: function (res) {
													console.log(res)
													if(res.data.code == 1000){
														wx.showToast({
															title: '绑定成功',
															icon: 'none',
														})
													}
												}
											})
										} else if (res.cancel) {

										}
									}
								})
							}
						}
					})
				}
				
				// wx.showToast({
				// 	title: '扫码成功'
				// })
			},
			fail() { }
		})
	},
	onLoad:function(e){
		var saleInfo = wx.getStorageSync('saleInfo')
		console.log(saleInfo)
		this.setData({
			institutionNumber: saleInfo.institutionNumber,
			saleNumber: saleInfo.number
		})
		console.log(e)
		this.setData({
			shopNumber:e.id,
            merchantNumber: e.merchantNumber
		})
		this.getData()
	},
	getQueryString:function (ref,name) {
		if(ref.indexOf('&') <0 ){
			var a = ref.split('=')
			if(a[0] == name){
				return a[1]
			}
		}else{
			var a = ref.split('&');
			console.log(a)
			var b = new Array()
			for(var i = 0 ; i < a.length;i++){
				var c  = new Object()
				var d = a[i].split('=')
				if(d[0] == name){
					return d[1]
				}
			}

		}
    },
	//var sousuozhi = this.removeAllSpace(e.detail.value);
	getData: function () {
		var that = this
		wx.request({
			url: this.data.server + 'merchantManage/getshopList', //仅为示例，并非真实的接口地址
			data: {
                merchantNumber: this.data.merchantNumber,
				// merchantNumber: '180630165567858b',
				shopName: this.data.searchText,
				page: this.data.pageNum,
				limit: this.data.limit
			},
			header: {
				'content-type': 'application/json' // 默认值
			},
			success: function (res) {
				console.log(res.data)

				if (res.data.code != 1000) {

				} else {
					console.log(res)
					if(res.data.data == null){
						that.setData({
							shopList: [],
							empty:false

						})
					}else{
						that.setData({
							shopList: res.data.data.shopList,
							empty: true
						})
					}
					
				}
			}
		})
	},

})
