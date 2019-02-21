//  picker  1 时间类型  2 地址类型  3 行业类型  4费率选择  5页面跳转
var data = [{
        "stepsNum": "1",
        "stepsCon": [{
            "basic": "1",
			"isS": true,
            "basicsetup": [{
                "type": "0",
                "shoplabel": "商户名称",
                "id": "merchantName",
                "picker": "0",
                "placeholder": "请输入商户名称",
                "tipstype": "1",
                "tips": "商户名称不能为空！",
            }, {
                "type": "1",
                "shoplabel": "商户类型",
                "id": "merchantType",
                "picker": "0",
                "radiolist": [{
                    "checked": "1",
                    "radiotype": "个人",
                    "radiotypeNum": "0",
					"checked": true
                }, {
                    "checked": "2",
                    "radiotype": "个体",
                    "radiotypeNum": "1",
						"checked": false
                }, {
                    "checked": "3",
                    "radiotype": "企业",
                    "radiotypeNum": "2",
						"checked": false
                }],
            }],
        }, {
            "basic": "2",
				"isS": true,
            "basicsetup": [{
                "type": "0",
                "shoplabel": "姓名",
                "id": "juridicalpersonName",
                "picker": "0",
                "placeholder": "请输入姓名",
                "tipstype": "1",
                "tips": "姓名不能为空！",
            }, {
                "type": "0",
                "shoplabel": "身份证号",
                "id": "juridicalpersonId",
                "picker": "0",
                "placeholder": "请输入身份证号",
                "tipstype": "1",
                "tips": "身份证号不能为空！",
            }, {
                "type": "0",
                "shoplabel": "联系电话",
                "id": "registerCell",
                "picker": "0",
                "placeholder": "请输入联系电话",
                "tipstype": "1",
                "tips": "联系电话不能为空！",
            }, {
                "type": "0",
                "shoplabel": "身份证到期时间",
                "id": "juridicalpersonIdTime",
                "picker": "1",
                "placeholder": "请选择身份证到期时间",
                "tipstype": "1",
                "tips": "身份证到期时间不能为空！",
            }],
        }, {
            "basic": "3",
				"isS": false,
            "basicsetup": [{
                "type": "0",
                "shoplabel": "营业执照名称",
				"id": "businessLicenseName",
                "picker": "0",
                "placeholder": "请输入营业执照名称",
                "tipstype": "1",
                "tips": "营业执照名称不能为空！",
            }, {
                "type": "0",
                "shoplabel": "营业执照号",
					"id": "businessLicenseNo",
                "picker": "0",
                "placeholder": "请输入营业执照号",
                "tipstype": "1",
                "tips": "营业执照号不能为空！",
            }, {
                "type": "0",
                "shoplabel": "营业执照地址",
				"id": "businessLicenseAddress",
                "picker": "0",
                "placeholder": "请输入营业执照地址",
                "tipstype": "1",
                "tips": "营业执照地址不能为空！",
            }, {
                "type": "0",
                "shoplabel": "营业执照有效期",
				"id": "businessLicenseTime",
                "picker": "1",
                "placeholder": "请选择营业执照有效期",
                "tipstype": "1",
                "tips": "营业执照有效期不能为空！",
            }],
        }, {
            "basic": "4",
				"isS": true,
				"basicsetup": [{
					"type": "0",
					"shoplabel": "详细地址",
					"id": "address",
					"picker": "0",
					"placeholder": "请输入详细地址",
					"tipstype": "1",
					"tips": "详细地址不能为空！",
				}, {
						"type": "0",
						"shoplabel": "邮箱",
						"id": "mailbox",
						"picker": "0",
						"placeholder": "请输入邮箱",
						"tipstype": "1",
						"tips": "邮箱不能为空！",
					},{
                "type": "0",
                "shoplabel": "经营范围",
                "id": "operationId",
                "picker": "3",
                "placeholder": "请选择经营范围",
                "tipstype": "1",
                "tips": "经营范围不能为空！",
            }, {
                "type": "0",
                "shoplabel": "地址",
                "id": "region",
                "picker": "2",
                "placeholder": "请选择地址",
                "tipstype": "1",
                "tips": "地址不能为空！",
            }],
        }]
    },
    {
        "stepsNum": "2",
        "stepsCon": [{
            "basic": "5",
            "basicsetup": [{
                "type": "1",
                "shoplabel": "结算标识",
                "id": "settlementLogo",
				"isS": true,
                "picker": "0",
                "radiolist": [{
					"checked": true,
					"radiotype": "对私账户",
					"radiotypeNum": "对私",
					"isS": true
                   
                }, {
						"checked": false,
						"radiotype": "对公账户",
						"radiotypeNum": "对公",
						"isS": false
                }],
            }, {
                "type": "0",
                "shoplabel": "银行卡号",
                "id": "bankCardNo",
                "picker": "0",
                "placeholder": "请输入银行卡号",
                "tipstype": "1",
                "tips": "银行卡号不能为空！",
            }, {
                "type": "0",
                "shoplabel": "开户行",
                "id": "openingBank",
                "picker": "5",
                "placeholder": "请选择开户行",
                "tipstype": "1",
                "tips": "开户行不能为空！",
            }, {
                "type": "0",
                "shoplabel": "开户支行",
                "id": "openingBankBranch",
                "picker": "5",
                "placeholder": "请输入开户支行",
                "tipstype": "1",
                "tips": "开户支行不能为空！",
            }],
        }, {
            "basic": "6",
			
            "basicsetup": [{
                "type": "1",
                "shoplabel": "结算方式",
				"isS": false,
                "id": "Settleway",
                "picker": "0",
                "radiolist": [{
                    "checked": true,
                    "radiotype": "D1",
                    "radiotypeNum": "D1",
					"isS":true
                }, {
                    "checked": false,
                    "radiotype": "D0",
                    "radiotypeNum": "D0",
						"isS": true
                }],
            }, {
                "type": "0",
                "shoplabel": "结算费率",
                "id": "rate",
                "picker": "4",
                "placeholder": "请选择结算费率",
                "tipstype": "1",
                "tips": "结算费率不能为空！",
            }],
        }]
    }
]

module.exports = {
    shopData: data
}