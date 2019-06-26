// pages/merchants/register/index.js
const assistantData = require('../../../utils/assistantData.js')
const config = require('../../../utils/config.js')
const common = require('../../../utils/common.js').CmsConfig
Page({

    /**
     * 页面的初始数据
     */
	data: {
		assistantData: assistantData.assistantData,
		shopInput: {},
		status: '',
		setp0: [],
		statusTips: '',
		appear: false,
		disabled: false,
		steps: 0,
		showModal: false,
		chooseShop: '',
		chooseShopList: [],
		chooseShopnum: '',
		verData: ['clerkName', 'registeredCell', 'password', 'repassword'],
		//查询商户信息
		shopList: [],
		shopNumber: '',
		institutionNumber: '1001',
		shopName: '',
		agentName: '',
		merchantName: '',
		merchantNumber: '',
		auditStatus: '',
		merchantType: '',
		startTime: '',
		endtime: '',
		server: config.server,
		pageNum: 1,
		limit: 10,
		userKinds: 4
	},
	/* 文本框获取焦点时更改状态*/
	focus: function (e) {
		var cur = e.target.dataset.current;
		this.setData({
			status: cur
		})
	},
	/* 文本框失去焦点时更改状态*/
	blur: function (e) {
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
	//弹窗-选择门店
	chooseMendian: function (e) {
		var that = this
		var id = e.currentTarget.dataset.id;
		var shopName = this.data.shopName
		this.setData({
			showModal: true,
			shopName: shopName
		})
	},
	//弹出框蒙层截断touchmove事件
	preventTouchMove: function (e) {
		this.setData({
			showModal: false
		});
	},
	//隐藏模态对话框
	hideModal: function (e) {
		this.setData({
			showModal: false,
		});
	},
	//对话框取消按钮点击事件
	onCancel: function (e) {
		this.hideModal();
	},
	//对话框确认按钮点击事件
	onConfirm: function (e) {
		var that = this
		this.hideModal();
	},
	radioChange(e) {
		var id = e.detail.value
		var that = this
		var cur = e.target.dataset.current;
		var checked = this.data.checked
		var chooseShop = this.data.chooseShop
		var chooseShopList = this.data.chooseShopList
		var chooseShopnum = this.data.chooseShopnum
		for (var i = 0; i < chooseShopList.length; i++) {
			if (id == chooseShopList[i].shopNumber) {
				chooseShop = chooseShopList[i].shopName
				chooseShopnum = chooseShopList[i].shopNumber
				that.setData({
					chooseShop: chooseShop,
					chooseShopnum: chooseShopnum,
				})
				break
			}
		}
		this.setData({
			showModal: true,
		})
		this.hideModal();
	},
	radioChange1(e) {
		this.setData({
			userKinds: e.detail.value
		})
	},
	assistantAdd: function (e) {
		var that = this
		var shopInput = this.data.shopInput
		shopInput.merchantNumber = this.data.merchantNumber
		if (!this.data.chooseShopnum) {
			wx.showToast({
				title: '请选择所属门店！',
				icon: 'none'
			})
			return
		} else {
			shopInput.shopNumber = this.data.chooseShopnum
			shopInput.userKinds = this.data.userKinds
			if (this.verify(this.data.verData)) {
				if (shopInput.repassword != shopInput.password) {
					this.setData({
						status: 'repassword',
						statusTips: 'repassword',
					})
					return
				} else { //提交信息
					console.log(shopInput)
					shopInput.clerkerName = shopInput.clerkName
					shopInput.clerkerTel = shopInput.registeredCell
					wx.request({
						url: this.data.server + common.addClerker, //仅为示例，并非真实的接口地址
						data: shopInput,
						header: {
							'content-type': 'application/json' // 默认值
						},
						success: function (res) {
							if (res.data.code != 1000) {
								wx.showToast({
									title: res.data.msg,
									// image: '../../img/fail.png'
									icon: 'none'
								})
							} else {
								wx.showToast({
									title: '添加成功',
									duration: 4000,
									success: function () {
										wx.navigateBack({
											delta: 1
										})
										// wx.redirectTo({
										//     url: '../../shop-sh/assistant/index',
										// })
									}
								})
							}
						}
					})
				}
			}
		}
	},
	//验证
	verify: function (data) {
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
				if (data[i] == 'assistantCell') {
					var reg = new RegExp("^1[3456789][0-9]{9}$")
					if (reg.test(shopInput[data[i]])) {
						veNum++
					} else {
						wx.showToast({
							title: '请输入正确的手机号',
							icon: 'none'
						})
						that.setData({
							status: data[i],
							statusTips: data[i]
						})
						break
					}
				} else if (data[i] == 'password') {
					var reg = new RegExp("^[0-9A-Za-z]{6,12}$")
					if (reg.test(shopInput[data[i]])) {
						veNum++
					} else {
						wx.showToast({
							title: '密码不规范',
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

    /**
     * 生命周期函数--监听页面加载
     */
	onLoad: function (options) {
		var merchantNumber = JSON.parse(options.merchantNumber)
		var shopNumber = this.data.shopNumber
		var assistantData = this.data.assistantData
		var step0 = [],
			step1 = []
		var list = [step0, step1]
		for (var i = 0; i < assistantData.length; i++) {
			for (var j = 0; j < assistantData[i].stepsCon.length; j++) {
				for (var k = 0; k < assistantData[i].stepsCon[j].basicsetup.length; k++) {
					if (assistantData[i].stepsCon[j].basicsetup[k].type == 0) {
						list[i].push(assistantData[i].stepsCon[j].basicsetup[k])
					}
				}
			}
		}
		this.setData({
			step0: step0,
			step1: step1,
			merchantNumber: merchantNumber
		})
		console.log(this.data.merchantNumber)
		var that = this
		wx.request({
			url: this.data.server + common.getshopList, //仅为示例，并非真实的接口地址
			data: {
				merchantNumber: this.data.merchantNumber,
				page: 1,
				limit: 200
			},
			header: {
				'content-type': 'application/json' // 默认值
			},
			success: function (res) {
				if (res.data.code != 1000) {

				} else {
					that.setData({
						chooseShopList: res.data.data.shopList,
					})
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