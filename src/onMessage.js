/**
 * @Author: kingRoc
 * @Date: 2020-04-10
 * @Description: 消息监听回调
 */
const { Message } = require("wechaty")
// node-request请求模块包
const request = require("request")
// 请求参数解码
const urlencode = require("urlencode")

const service = require('../utils/service')
// 配置文件
const { TXAPI, TXAPIKEY, room, name } = require('../config')

// 管理群组列表
const roomList = room.roomList



// 消息监听回调
module.exports = bot => {
	return async function onMessage(msg) {
		// console.log({msg})
		// 判断消息来自自己，直接return
		if (msg.self()) return

		// console.log("=============================")
		// console.log(`msg : ${msg}`)
		// console.log(
		// 		`from: ${msg.from() ? msg.from().name() : null}: ${
		// 				msg.from() ? msg.from().id : null
		// 				}`
		// )
		// console.log(`to: ${msg.to()}`)
		// console.log(`text: ${msg.text()}`)
		// console.log(`isRoom: ${msg.room()}`)
		// console.log("=============================")

		// 判断此消息类型是否为文本
		if (msg.type() == Message.Type.Text) {
			// 判断消息类型来自群聊
			if (msg.room()) {
				// 获取群聊
				const room = await msg.room()

				// 收到消息，提到自己
				if (await msg.mentionSelf()) {
					// 获取提到自己的名字
					let self = await msg.to()
					self = "@" + self.name()
					// 获取消息内容，拿到整个消息文本，去掉 @+名字
					let sendText = msg.text().replace(self, "")
					// 请求机器人接口回复
					// let res = await requestRobot(sendText)
					// 天行聊天机器人
					let res = await getTxReply(sendText)

					// 返回消息，并@来自人
					room.say(res, msg.from())
					return
				}
				// 收到消息，没有提到自己  忽略
			} else {
				// 回复信息是关键字 “加群”
				if (await isAddRoom(msg)) return

				// 回复信息是所管理的群聊名
				if (await isRoomName(bot, msg)) return

				// 请求机器人聊天接口
				// let res = await requestRobot(msg.text())

				// 天行聊天机器人
				let res = await getTxReply(msg.text())
				// 返回聊天接口内容
				await msg.say(res)
			}
		} else {
			console.log("消息不是文本！")
		}
	}
}

/**
 * @description 回复信息是关键字 “加群” 处理函数
 * @param {Object} msg 消息对象
 * @return {Promise} true-是 false-不是
 */
async function isAddRoom(msg) {
	// 关键字 加群 处理
	if (msg.text() == "加群") {
		let roomListName = Object.keys(roomList)
		let info = `${name}当前管理群聊有${roomListName.length}个，回复群聊名即可加入哦\n\n`
		roomListName.map(v => {
			info += "【" + v + "】" + "\n"
		})
		msg.say(info)
		return true
	}
	return false
}

/**
 * @description 回复信息是所管理的群聊名 处理函数
 * @param {Object} bot 实例对象
 * @param {Object} msg 消息对象
 * @return {Promise} true-是群聊 false-不是群聊
 */
async function isRoomName(bot, msg) {
	// 回复信息为管理的群聊名
	if (Object.keys(roomList).some(v => v == msg.text())) {
		// 通过群聊id获取到该群聊实例
		const room = await bot.Room.find({ id: roomList[msg.text()] })
		// 判断是否在房间中 在-提示并结束
		if (await room.has(msg.from())) {
			await msg.say("您已经在房间中了")
			return true
		}

		// 发送群邀请
		await room.add(msg.from())
		await msg.say("已发送群邀请")
		return true
	}
	return false
}

/**
 * @description 机器人请求接口 处理函数
 * @param {String} info 发送文字
 * @return {Promise} 相应内容
 */
function requestRobot(info) {
	return new Promise(resolve=> {
		let url = `https://open.drea.cc/bbsapi/chat/get?keyWord=${urlencode(info)}`
		request(url, (error, response, body) => {
			if (!error && response.statusCode == 200) {
				let res = JSON.parse(body)
				if (res.isSuccess) {
					let send = res.data.reply
					// 免费的接口，所以需要把机器人名字替换成为自己设置的机器人名字
					send = send.replace(/Smile/g, name)
					resolve(send)
				} else {
					if (res.code == 1010) {
						resolve("没事别老艾特我，我还以为爱情来了")
					} else {
						resolve("你在说什么，我听不懂")
					}
				}
			} else {
				resolve("你在说什么，我脑子有点短路诶！")
			}
		})
	})
}

// 天行聊天机器人
async function getTxReply(word) {
	let url = TXAPI + '/robot/index';
	const params = {
		key: TXAPIKEY,
		question: word,
		mode: 1,
		datatype: 0
	}
	return new Promise(resolve => {
		service(url, params).then(content => {
			let response = '';
			if (content.code === 200) {
				if (content.datatype === 'text') {
					let reply = content.newslist[0].reply
					reply = reply.replace(/{robotname}/g, name)
					reply = reply.replace(/{appellation}/g, '')
					response = reply
				} else if (content.datatype === 'view') {
					response =`虽然我不太懂你说的是什么，但是感觉很高级的样子，因此我也查找了类似的文章去学习，你觉得有用吗<br>《${content.newslist[0].title}》${content.newslist[0].url}`
				} else {
					response = '你太厉害了，说的话把我难倒了，我要去学习了，不然没法回答你的问题';
				}
			} else {
				response = '我好像迷失在无边的网络中了，你能找回我么';
			}
			resolve(response)
		})
	})
}
