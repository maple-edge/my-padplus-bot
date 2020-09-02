/**
 * @Author: kingRoc
 * @Date: 2020-04-10
 * @Description: 配置项
 */

module.exports = {
	// puppet_padplus Token
	token: "puppet_padplus_56cd5772ced9a",
	// 机器人名字
	name: "汪汪",
	// 房间/群聊
	room: {
		// 管理群组列表
		roomList: {
			// 群名(用于展示，最好是群名，可随意) : 群id(这个可不能随意)
		
			// "测试": "18285806331@chatroom",
		},
		// 加入房间回复
		roomJoinReply: `\n 你好，欢迎你的加入，请自觉遵守群规则，文明交流！ \n\n Hello, welcome to join, please consciously abide by the group rules, civilized communication！😊`
	},
	// 私人
	personal: {
		// 好友验证自动通过关键字
		addFriendKeywords: ["加群", "领券"],
		// 是否开启加群
		addRoom: true
	},
	// 想要发消息的人（备注）
	aliasName: '愚殇',
	// 想要发消息的人（昵称）
	nikeName: '愚殇',
	// 定时任务执行间隔
	rules: {
		second: [0, 20, 40], // 每20秒执行一次
		minute: [1, 20, 40], // 每20分钟执行一次
		hour: [1, 5, 9, 13, 17, 21] // 每4小时执行一次
	},

	// 接口配置项
	FATCH_API: 'http://106.12', // 自定义的后端服务地址
	//FATCH_API: 'http://localhost:3000', // 自定义的后端服务地址
	TXAPIKEY: '3541f85a83a62e84a', //此处须填写个人申请的天行apikey,请替换成自己的
	TXAPI: 'http://api.tianapi.com/txapi', //天行api地址
	//高级功能配置项（非必填项）
	AUTOREPLY: false //自动聊天功能 默认关闭 开启设置为: true

}
