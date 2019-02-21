var very = {
	//商户名称registerCell
	"registerCell": "^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$",
	//姓名
	"juridicalpersonName": "^([a-z]|[A-Z]|[0-9]|[\\u4e00-\\u9fa5]){0,15}$",
	//身份证号
	"juridicalpersonId": "^([0-9]|[A-Z]){0,20}$",
	//联系电话merchantName
	"merchantName": new RegExp("/^1[3|4|5|6|7|8][0-9]{9}$/"),
	//营业执照
	"BLname": "^([a-z]|[A-Z]|[0-9]|[\\u4e00-\\u9fa5]){0,50}$",
	//营业执照号
	"BLnumber": "^([0-9]|[A-Z]){0,20}$"
}

console.log(very)
module.exports = {
	very: very
}