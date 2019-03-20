// pages/login/index.js
const config = require('../../utils/config.js')
var timer
Page({

    /**
     * 页面的初始数据
     */
    data: {
        server: config.server,
        login: 0,
        typeName: '商户登录',
        type: "shop1",
        btn: "登录",
        saleloginName: "",
        saleloginPass: "",
		shoploginName: "",
		shoploginPass: "",
        saleRem: false,
        shopRem: false,
		num:'获取验证码',
		tell:'',
		code:'',
		pass:'',
		repass:'',
    },
    shop: function() {
		wx.showToast({
			title:'暂未开放功能',
			icon:'none',
			duration:2000
		})
		return
        this.setData({
            login: 1,
            typeName: "商户登录",
            type: "shop"
        })
    },
    sale: function() {
        this.setData({
            login: 1,
            typeName: "销售登录",
            type: "sale"
        })
    },
    back: function(e) {
        console.log(e)
        var login = this.data.login
        login = login - 1
        this.setData({
            login: login,

        })
    },
	backLogin:function(e){
		var login = this.data.login
		if(this.data.login == 2){
			login = login - 1
			this.setData({
				login: login,
			})
		}
	},
    forget: function() {
        this.setData({
            login: 2,
			btn:'去登陆'
        })
    },
	getCode:function(){
		var num = this.data.num
		if(this.data.tell == ''){
			wx.showToast({
				title: '请输入手机号',
				icon: 'none'
			})
			return
		}
		var reg = /^1[3|4|5|6|7|8][0-9]{9}$/
		if (!reg.test(this.data.tell)) {
			wx.showToast({
				title: '请输入正确的手机号',
				icon: 'none'
			})
			return
		}
		if (num != '获取验证码') {
			wx.showToast({
				title: '请在一分钟后尝试重新发送短信',
				icon: 'none'
			})
			return
		}
		this.Countdown()
	},
    rember: function(e) {
        if (this.data.type == 'shop') {
            this.setData({
                shopRem: !this.data.shopRem
            })
        } else {
            this.setData({
                saleRem: !this.data.saleRem
            })
        }
    },
    setZ: function(e) {
        console.log(e)
        var data = e.detail.value
        var type = e.currentTarget.dataset.type
		if(this.data.type =='shop'){
			if (type == 'zhanghao') {
				this.setData({
					shoploginName: data
				})
			}
			if (type == 'mima') {
				this.setData({
					shoploginPass: data
				})
			}
		}else{
			if (type == 'zhanghao') {
				this.setData({
					saleloginName: data
				})
			}
			if (type == 'mima') {
				this.setData({
					saleloginPass: data
				})
			}
		}
        
    },
	setTell:function(e){
		var data = e.detail.value
		this.setData({
			tell:data
		})
	},
	setCode: function (e) {
		var data = e.detail.value
		this.setData({
			code: data
		})
	},
	setPass: function (e) {
		var data = e.detail.value
		this.setData({
			pass: data
		})
	},
	setRepass: function (e) {
		var data = e.detail.value
		this.setData({
			repass: data
		})
	},
	Countdown:function(){
		var that = this
		var num = that.data.num
		
		timer = setTimeout(function () {
			that.Countdown();
			if(num != 0){
				if(num == '获取验证码'){
					num = 60
				}
				that.setData({
					num:num-1
				})
			}else{
				that.setData({
					num: '获取验证码'
				})
				clearTimeout(timer);
			}
			
		}, 800);
	},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
		if(!!wx.getStorageSync('saleRember')){
			var saleRember = wx.getStorageSync('saleRember')
			this.setData({
				saleRem: saleRember.saleRem,
				saleloginName:saleRember.loginName,
				saleloginPass: saleRember.loginPass
			})
		}
		if (!!wx.getStorageSync('shopRember')) {
			var shopRember = wx.getStorageSync('shopRember')
			this.setData({
				shopRem: shopRember.saleRem,
				shoploginName: shopRember.loginName,
				shoploginPass: shopRember.loginPass
			})
		}
		var that = this
		wx.request({
			url: this.data.server + 'merchantRegister/getAreajson',
			method: 'post',
			dataType: 'json',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success:res=>{
				console.log(res)
				that.setData({
					proCode: JSON.parse(res.data.data)
				})
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
    salelogin: function(e) {
        console.log(console.log(e))
        var that = this
        if (that.data.type == 'shop') {
			if (that.data.shoploginName == '') {
				wx.showToast({
					title: '请输入账号',
					icon: 'none'
				})
				return
			}
			if (that.data.shoploginPass == '') {
				wx.showToast({
					title: '请输入密码',
					icon: 'none'
				})
				return
			}
			if (that.data.shopRem == true) {
				var nJ = new Object()
				nJ.saleRem = true
				nJ.loginName = that.data.shoploginName
				nJ.loginPass = that.data.shoploginPass
				wx.setStorageSync('shopRember', nJ)
			} else {
				wx.removeStorageSync('shopRember')
			}
			wx.request({
				url: that.data.server + 'login/loginJG', //仅为示例，并非真实的接口地址
				data: {
					login: that.data.shoploginName,
					loginPass: that.data.shoploginPass,
					loginClass: '3',
				},
				header: {
					'content-type': 'application/json' // 默认值
				},
				success: function (res) {

					console.log(res)
					if (res.data.code != 1000) {
						wx.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					} else {
						console.log(res)
						wx.setStorageSync('shopInfo', res.data.data);
						wx.showToast({
							title: '登录成功',
							duration: 1000,
							success: function () {
								
							}
						})
						setTimeout(function(){
							wx.navigateTo({
								url: '../index-sh/index',
							})
						},500)

					}
				}
			})
        } else {
            if (that.data.saleloginName == '') {
                wx.showToast({
                    title: '请输入账号',
                    icon: 'none'
                })
                return
            }
            if (that.data.saleloginPass == '') {
                wx.showToast({
                    title: '请输入密码',
                    icon: 'none'
                })
                return
            }
			if(that.data.saleRem == true){
				var nJ = new Object()
				nJ.saleRem = true
				nJ.loginName = that.data.saleloginName
				nJ.loginPass = that.data.saleloginPass
				wx.setStorageSync('saleRember', nJ)
			}else{
				wx.removeStorageSync('saleRember')
			}
            wx.request({
                url: that.data.server + 'login/sellLogin', //仅为示例，并非真实的接口地址
                data: {
                    login: that.data.saleloginName,
                    loginPass: that.data.saleloginPass,
                    loginClass: '2',
                },
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function(res) {

                    console.log(res)
                    if (res.data.code != 1000) {
                        wx.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    } else {
                        console.log(res)
						var province = res.data.data.province
						var city = res.data.data.city
						var area = res.data.data.area
						console.log(that.data.proCode)
						var code = that.data.proCode
						console.log(province,city,area)
						console.log(code)
						for (let i = 0; i < code.length;i++ ){
							if(code[i].value == province){
								res.data.data.pro = code[i].text
								for(let k = 0 ; k < code[i].children.length;k++){
									if(code[i].children[k].value == city){
										res.data.data.cit = code[i].children[k].text
										var iii = code[i].children[k].children
										for (let m = 0; m < iii.length;m++ ){
											if(iii[m].value == area){
												res.data.data.are = iii[m].text
											}
										}
									}
								}
							}
						}
                        wx.setStorageSync('saleInfo', res.data.data);
                        wx.showToast({
                            title: '登录成功',
                            duration: 1000,
                            success: function() {
                              
                            }
                        })
						wx.removeStorageSync('shopInput')
						wx.removeStorageSync('multihangye')
						wx.removeStorageSync('multiaddress')
						setTimeout(function () {
							wx.navigateTo({
								url: '../index/index',
							})
						}, 500)

                    }
                }
            })
        }

    },
	updataPass:function(){
		if(this.data.tell == ''){
			wx.showToast({
				title:'请输入手机号',
				icon:'none'
			})
			return
		}
		var reg = /^1[3|4|5|6|7|8][0-9]{9}$/
		if (!reg.test(this.data.tell)) {
			wx.showToast({
				title: '请输入正确的手机号',
				icon: 'none'
			})
			return
		}
		if (this.data.code == '') {
			wx.showToast({
				title: '请输入验证码',
				icon: 'none'
			})
			return
		}
		if (this.data.pass == '') {
			wx.showToast({
				title: '请输入密码',
				icon: 'none'
			})
			return
		}
		if (this.data.repass == '') {
			wx.showToast({
				title: '请再次输入密码',
				icon: 'none'
			})
			return
		}
		if (this.data.repass != this.data.pass) {
			wx.showToast({
				title: '两次输入的密码不一致',
				icon: 'none'
			})
			return
		}
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