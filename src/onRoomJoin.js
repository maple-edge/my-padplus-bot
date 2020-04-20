/**
 * @Author: kingRoc
 * @Date: 2020-04-10
 * @LastEditors: kingRoc
 * @LastEditTime: 2020-02-29 20:33:45
 * @Description: 进入房间监听回调
 */

// 配置文件
const config = require("../config/index");

const {
	roomJoinReply, // 管理群组列表
	roomList // 加入房间回复
} = config.room;

// 进入房间监听回调 room-群聊 inviteeList-受邀者名单 inviter-邀请者
module.exports = async function onRoomJoin(room, inviteeList, inviter) {
	// 判断配置项群组id数组中是否存在该群聊id
	if (Object.values(roomList).some(v => v == room.id)) {
		inviteeList.map(c => {
			// 发送消息并@
			room.say(roomJoinReply, c)
		})
	}
}
