const service = require('../utils/service')
const { formatTime } = require('../utils')
const { TXAPI, TXAPIKEY, FATCH_API } = require('../config')

/**
 * 获取每日一句
 * @returns {Promise<any>}
 */
function getOne() {
	// 获取每日一句
	return new Promise(resolve => {
		const time = new Date().getTime();
		const newTime = time + 8 * 60 * 60 * 1000;
		const newDate = new Date(newTime)
		const data = {
			key: TXAPIKEY,
			date: formatTime('YY', newDate)
		}
		service(`${TXAPI}/everyday/index`, data).then(jsonRes => {
			resolve(jsonRes.newslist[0])
		})
	})
}


async function getTxWeather() {
	// 获取天行天气
	let url = TXHOST + 'tianqi/';
	try {
		let res = await superagent.req(url, 'GET', {
			key: config.TXAPIKEY,
			city: config.CITY
		});
		let content = JSON.parse(res.text);
		if (content.code === 200) {
			let todayInfo = content.newslist[0];
			let obj = {
				weatherTips: todayInfo.tips,
				todayWeather:`今天${todayInfo.weather}<br>温度:${todayInfo.lowest}/${todayInfo.highest}<br>${todayInfo.wind} ${todayInfo.windspeed}<br>空气:${todayInfo.air_level} ${todayInfo.air}<br>`
			};
			console.log('获取天行天气成功', obj);
			return obj;
		} else {
			console.log('获取接口失败', content.code);
		}
	} catch (err) {
		console.log('获取接口失败', err);
	}
}

/**
 * 获取晚安心语
 * @returns {Promise<any>}
 */
function getWanAn() {
	return new Promise(resolve => {
		const data = {
			key: TXAPIKEY
		}
		service(`${TXAPI}/wanan/index`, data).then(jsonRes => {
			resolve(jsonRes.newslist[0])
		})
	})
}

/**
 * 获取产品信息
 */
function getProduct() {
	return new Promise(resolve => {
		const params = {
			page: 1,
			pageSize: 9999,
			state: "0"
		}
		service(`${FATCH_API}/product/list`, params).then(jsonRes => {
			resolve(jsonRes.data.list[0])
		})
	})
}
/**
 * 删除产品信息
 */
function updateProduct(id) {
	return new Promise(resolve => {
		service(`${FATCH_API}/product/delete`, {id}).then(jsonRes => {
			resolve(jsonRes)
		})
	})
}
module.exports = {
	getOne,
	getTxWeather,
	getWanAn,
	getProduct,
	updateProduct
}
