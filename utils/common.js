var CmsConfig = {
    //公共接口
    //登录
	login:"common/login",
    //发送验证码
	sendCode:"common/sendCode",
    //修改密码
	updatePassword:"common/updatePassword",

    //公共接口   缓存加载及查询
    //获取省市区
	getAreajson:"cache/getAreajson",
    //查询开户行
	getBank:"cache/getBank",

    //商户端  主模块
	//获取广告
	getAdvert:"merchantMain/getAdvert",
    //交易简报
	getMerBulletinList:"merchantMain/getMerBulletinList",
    //收款记录
	getTransactionList:"merchantMain/getTransactionList",
	//退款
	backOrder:"merchantMain/backOrder",
    //今日交易（金额，笔数）
	getTransicationTodayShop:"merchantMain/getTransicationToday",

    //商户端  店员管理
    //添加店员
	addClerker:"clerkerManage/addClerker",
    //删除店员
	deleteClerker:"clerkerManage/deleteClerker",
    //店员详情
	getClerker:"clerkerManage/getClerker",
    //店员列表
    getclerkerList:"clerkerManage/getclerkerList",
    //一码付
    getClerkQrcode:"clerkerManage/getClerkQrcode",
    //编辑店员
    updateClerker:"clerkerManage/updateClerker",
    //修改店员密码
    updateClerkerPassword:"clerkerManage/updateClerkerPassword",
    //更改店员状态
    updateClerkerStatus:"clerkerManage/updateClerkerStatus",
	//查询微信绑定
	queryWx:"clerkerManage/searchBind",
	//解绑微信推送
	relievePushBind:"clerkerManage/relievePushBind",

    //商户端 门店管理
    //添加门店
    addShop:"shopManage/addShop",
    //门店详情
    getShopInfo:"shopManage/getShopInfo",
    //门店列表
    getshopList:"shopManage/getshopList",
    //编辑门店
    updateShop:"shopManage/updateShop",


    //销售端  主模块
    //今日佣金、累计佣金、今日新增门店数量
    getBrokerage:"saleMain/getBrokerage",
    //佣金记录
    getBrokerageLog:"saleMain/getBrokerageLog",
    //销售简报
    getSaleBulletinList:"saleMain/getSaleBulletinList",
    //今日数据(交易总金额，交易总笔数)
    getTransicationToday:"saleMain/getTransicationToday",


    //销售端  商户注册
    //查询商户信息
    getMerchantInfo:"register/getMerchantInfo",
    //获取进件通道和费率
    getPayments:"register/getPayments",
    //商户信息注册
    merchantRegister:"register/merchantRegister",
	//回调
	intoSubmission:"register/intoSubmission",
	//查询销售下商户数量
	getMerchantCount:"saleMain/getMerchantCount",

    //销售端  商户管理
	//检测二维码
	checkQRcode:"merchantManage/checkQRcode",
    //绑定码牌
    addQRcode:"merchantManage/addQRcode",
    //商户列表
    getMerchantList:"merchantManage/getMerchantList",
    //门店码牌列表
    getQrCodeList:"merchantManage/getQrCodeList",
    //解绑码牌
    updateQRcode:"merchantManage/updateQRcode",


    //销售端  图片相关
    //获取商户图片信息
    getMerPhotoInfo:"imgManage/getMerPhotoInfo",
    //图片上传
    imgUpload:"imgManage/imgUpload",
    //更新图片
    updateMerPhotoInfo:"imgManage/updateMerPhotoInfo",
}
module.exports = {
    CmsConfig: CmsConfig,
}