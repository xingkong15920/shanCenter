const config = require('../../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
	data: {
		server: config.server,
		pageNum: 1,
		limit: 10,
		shopNumber: '',
		shopList: [],
		empty:true,
		institutionNumber: '',
		saleNumber: ''
	},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  var saleInfo = wx.getStorageSync('saleInfo')
	  console.log(saleInfo)
	  this.setData({
		  institutionNumber: saleInfo.institutionNumber,
		  saleNumber: saleInfo.number
	  })
	  console.log(options)
	  this.setData({
		  shopNumber:options.id,
		  menchartsName: options.menchartsName
	  })
	  this.getData()
  },
	unbind:function(e) {
		var id = e.currentTarget.dataset.id
		var that  = this
		wx.showModal({
			title: '提示',
			content: '确定要解除该码牌吗',
			confirmText: '确定',
			cancelText: '取消',
			success: function (res) {
				if (res.confirm) {
					wx.request({
						url: that.data.server + 'merchantManage/updateQRcode', //仅为示例，并非真实的接口地址
						data: {
							// merchantNumber:: this.data.shopNumber,
							equipmentNumber:id
						},
						header: {
							'content-type': 'application/json' // 默认值
						},
						success: function (res) {
							if(res.data.code != 1000){
								wx.showToast({
									title:res.data.msg,
									icon:"none"
								})
							}else{
								that.getData()
							}
						}
					})
					// wx.showToast({
					// 	title: '解绑成功'
					// })
				} else if (res.cancel) {

				}
			}
		})
	},
	getData: function () {
		var that = this
		wx.request({
			url: this.data.server + 'merchantManage/getQRcodeList', //仅为示例，并非真实的接口地址
			data: {
				// merchantNumber: this.data.shopNumber,
				shopNumber: this.data.shopNumber,
				qrCode: '',
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
					if (res.data.data == null) {
						that.setData({
							shopList: [],
							empty: false
						})
					} else {
						that.setData({
							shopList: res.data.data.qRcodeList,
							empty: true,
							menNum:res.data.data.count
						})
					}
				}
			}
		})
	},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
	
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
	
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
	
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
	
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
	
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
	
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
	
  }
})