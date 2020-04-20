const schedule = require('node-schedule')
// date 参数

//其他规则见 https://www.npmjs.com/package/node-schedule
// 规则参数讲解    *代表通配符
//
// *  *  *  *  *  *
// ┬ ┬ ┬ ┬ ┬ ┬
// │ │ │ │ │  |
// │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
// │ │ │ │ └───── month (1 - 12)
// │ │ │ └────────── day of month (1 - 31)
// │ │ └─────────────── hour (0 - 23)
// │ └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

// 每分钟的第30秒触发： '30 * * * * *'
//
// 每小时的1分30秒触发 ：'30 1 * * * *'
//
// 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
//
// 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
//
// 每周1的1点1分30秒触发 ：'30 1 1 * * 1'

/*************************
 * 使用方法

1、指定时间间隔执行方法

var rule = new schedule.RecurrenceRule();

rule.second = 10;

var j = schedule.scheduleJob(rule, function(){
	console.log('现在时间：',new Date());
});
这是每当秒数为10时打印时间。

如果想每隔10秒执行，设置 rule.second =[0,10,20,30,40,50]即可。
rule支持设置的值有second, minute, hour, date, dayOfWeek, month, year

2、一个星期中的某些天的某个时刻执行，

例如：周一到周日的20点执行

var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 6)];
rule.hour = 20;
rule.minute = 0;

var j = schedule.scheduleJob(rule, function(){
    console.log("执行任务");
});

3、 确定时间

例如：2014年2月14日，15:40执行

var schedule = require("node-schedule");
var date = new Date(2014,2,14,15,40,0);
var j = schedule.scheduleJob(date, function(){
	console.log("执行任务");
});
***********************/

function setSchedule(date,callback) {
  schedule.scheduleJob(date, callback)
}
module.exports = {
  setSchedule
}
