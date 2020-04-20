/**
 * @Author: kingRoc
 * @Date: 2020-04-10
 * @LastEditors: kingRoc
 * @LastEditTime: 2020-02-18 16:26:42
 * @Description: 机器人需要扫描二维码时监听
 */
const { ScanStatus } = require('wechaty-puppet')
const QrcodeTerminal  = require('qrcode-terminal')

module.exports = function onScan(qrcode, status) {
	if (status === ScanStatus.Waiting) {
		QrcodeTerminal.generate(qrcode, {
			small: true
		})
	}
}
