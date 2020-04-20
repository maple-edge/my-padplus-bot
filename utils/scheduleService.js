/**
 * 定时任务
 */

const nodeSchedule = require('node-schedule')
// 使用 FileBox 来发送文件
const { FileBox } = require('file-box')
// 配置文件
const {
	room,
	nikeName,
	aliasName,
	rules
} = require('../config')
// 延时函数，防止检测出类似机器人行为操作
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// 定时
const schedule = require('./schedule');
const {
	getOne,
	getWanAn,
	getProduct,
	updateProduct
} = require('../seivice')


// 创建微信每日说定时任务
async function initDay (bot) {
	console.log(`已经设定每日说任务`);
	schedule.setSchedule('0 30 9 * * *', async () => {
		let one = await getOne(); //获取每日一句
		// 发送图片
		let msg = [`${one.date}\n\n`,
			'又是元气满满的一天,要开心噢^_^ \n\n',
			`每日一句: \n\n${one.content} \n\n ${one.note} \n`
		].join('');
		await sendMessage(msg, one.imgurl)
	});

	/**
	 * 每小时定时发送
	 */
	let rule = new nodeSchedule.RecurrenceRule();
	rule.hour = [8, new nodeSchedule.Range(9, 21)];
	rule.minute = rules.minute;
	rule.second = 0;
	schedule.setSchedule(rule, async () => {
		console.log('设定定时发送优惠信息')
		const product = await getProduct();
		if (product) {
			await delay(1000)
			await updateProduct(product.id)
			await delay(1000)
			await sendMessage(product.recommend, product.imageUrl)
		}
	});

	schedule.setSchedule('0 0 22 * * *', async () => {
		let wanAn = await getWanAn(); //获取晚安心语
		let content = wanAn.content;
		if (!content.endsWith('晚安！') || !content.endsWith('晚安。')) {
			content = content + '--晚安，祝你做个香香甜甜的好梦！'
		}
		await sendMessage(bot, content)
	});
	/**
	 * 定时任务2020年12月22日8点发送
	 * @type {Date}
	 */
	let date = new Date(2020, 12, 22, 8, 0, 0);
	schedule.setSchedule(date, async () => {
		// 获取想要发送的联系人
		let contact =
				(await bot.Contact.find({ name: nikeName })) || // 昵称
				(await bot.Contact.find({ alias: aliasName }));  // 备注
		// const fileBox = FileBox.fromUrl(imgUrl)
		// await contact.say(fileBox)
		await delay(1000);
		await contact.say('节日快乐'); // 发送消息
	});
}

async function sendMessage (bot, msg, imgUrl = "") {
	// 发送图片
	let fileBox;
	if (imgUrl) {
		fileBox = FileBox.fromUrl(imgUrl)
	}
	// 循环发送每一个群
	Object.keys(room.roomList).forEach(async key => {
		let group = await bot.Room.find({topic: key}); //获取要发送的群组
		try {
			if (imgUrl) {
				await group.say(fileBox)
			}
			await delay(1000);
			await group.say(msg); // 发送消息
		} catch (e) {
			console.log(e.message);
		}
	})
}

module.exports = {
	initDay
}
