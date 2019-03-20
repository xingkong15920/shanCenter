//  picker  1 时间类型  2 地址类型  3 行业类型  4费率选择  5页面跳转
var data = [{
    "stepsNum": "1",
    "stepsCon": [{
        "basic": "1",
        "basicsetup": [{
            "type": "0",
            "shoplabel": "门店名称",
            "id": "merchantName",
            "picker": "0",
            "placeholder": "请输入门店名称",
            "tipstype": "1",
            "tips": "门店名称不能为空！",
        }, {
            "type": "0",
            "shoplabel": "管理员姓名",
            "id": "BLname",
            "picker": "1",
            "placeholder": "请输入管理员姓名",
            "tipstype": "1",
            "tips": "管理员姓名不能为空！",
			"idea":"name"
        }, {
            "type": "0",
            "shoplabel": "联系电话",
            "id": "BLnumber",
            "picker": "0",
            "placeholder": "请输入联系电话",
            "tipstype": "1",
            "tips": "联系电话不能为空！",
        }, {
            "type": "0",
            "shoplabel": "门店地址",
            "id": "region",
            "picker": "2",
            "placeholder": "请选择门店地址",
            "tipstype": "1",
            "tips": "门店地址不能为空！",
			}, {
				"type": "0",
				"shoplabel": "详细地址",
				"id": "address",
				"picker": "0",
				"placeholder": "请输入详细地址",
				"tipstype": "1",
				"tips": "详细地址不能为空！",
			}, {
            "type": "0",
            "shoplabel": "备注",
            "id": "BLaddress",
            "picker": "0",
            "placeholder": "请输入备注",
            "tipstype": "1",
            "tips": "备注不能为空！",
        }]
    }]
}]

module.exports = {
    shopData: data
}