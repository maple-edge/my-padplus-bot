// bot.js
const {Wechaty} = require("wechaty") // Wechaty核心包
const {PuppetPadplus} = require("wechaty-puppet-padplus") // padplus协议包

const onScan = require("../src/onScan") // 机器人需要扫描二维码时监听回调
const onRoomJoin = require("../src/onRoomJoin") // 加入房间监听回调
const onMessage = require("../src/onMessage") // 消息监听回调
const onFriendShip = require("../src/onFriendShip") // 好友添加监听回调

/**
 * 配置文件
 * @type {{token, name, room, personal, TXAPIKEY, TXAPI, AUTOREPLY}|*}
 */
const {
	name,
	token
} = require('../config/index')
const { initDay } = require('../utils/scheduleService')
const puppet = new PuppetPadplus({
	token,
})

const bot = new Wechaty({
	puppet,
	name
})

// 登录
async function onLogin (user) {
	console.log(`贴心小助理${user}登录了`);
	// 登陆后创建定时任务
	await initDay(bot);
}


bot.on("scan", onScan) // 机器人需要扫描二维码时监听
bot.on("login", onLogin) // 机器人需要扫描二维码时监听
.on("room-join", onRoomJoin) // 加入房间监听
.on("message", onMessage(bot)) // 消息监听
.on("friendship", onFriendShip) // 好友添加监听

bot.start()
.then(() => {
	console.log('开始登陆微信');
}).catch(async function (e) {
	console.log(`初始化失败: ${e}.`)
	await bot.stop()
	process.exit(1)
});
