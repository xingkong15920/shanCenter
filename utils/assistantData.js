//  picker  1 时间类型  2 地址类型  3 行业类型  4费率选择  5页面跳转
var data = [{
	"stepsNum": "1",
	"stepsCon": [{
		"basic": "1",
		"basicsetup": [{
			"type": "0",
			"shoplabel": "名称",
			"id": "clerkName",
			"picker": "0",
			"placeholder": "请输入店员姓名",
			"tipstype": "1",
			"tips": "店员姓名不能为空！",
		}, {
			"type": "0",
			"shoplabel": "所属门店",
			"id": "region",
			"picker": "2",
			"placeholder": "请选择所属门店",
			"tipstype": "1",
			"tips": "所属门店不能为空！",
		}, {
			"type": "2",
			"shoplabel": "角色",
			"id": "userKinds",
			"picker": "0",
			"isShow": true,
			"radiolist": [{
				"checked": "1",
				"radiotype": "店长",
				"radiotypeNum": "4",
				"checked": true,
			}, {
				"checked": "2",
				"radiotype": "店员",
				"radiotypeNum": "5",
				"checked": false,
			}],
		}, {
			"type": "0",
			"shoplabel": "手机号",
			"id": "registeredCell",
			"picker": "0",
			"placeholder": "请输入店员手机号",
			"tipstype": "1",
			"tips": "店员手机号不能为空！",
		}, {
			"type": "0",
			"shoplabel": "密码",
			"id": "password",
			"picker": "0",
			"placeholder": "请输入密码",
			"tipstype": "1",
			"tips": "密码不能为空！",
			"passType": "1"
		}, {
			"type": "0",
			"shoplabel": "确认密码",
			"id": "repassword",
			"picker": "0",
			"placeholder": "请确认密码",
			"tipstype": "1",
			"tips": "两次密码不一致！",
			"passType": "1"
		}]
	}]
}]

module.exports = {
	assistantData: data
}