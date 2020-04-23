# Wechaty  ![Image text](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=0.38.4&x2=0) ![Image text](https://github.com/wechaty/wechaty/workflows/NPM/badge.svg)  ![Image text](https://github.com/wechaty/wechaty/workflows/Docker/badge.svg) 

![Image text](https://wechaty.github.io/wechaty/images/wechaty-logo-green-en.png)

# 配置npm源
>>>配置npm源为淘宝源（重要，因为需要安装chromium，不配置的话下载会失败或者速度很慢，因为这个玩意140M左右）
```
	npm config set registry https://registry.npm.taobao.org
	npm config set disturl https://npm.taobao.org/dist
	npm config set puppeteer_download_host https://npm.taobao.org/mirror
```

# 为了确保安装wechaty-puppet-padplus成功

## windows 您必须以管理员身份启动PowerShell并运行以下命令
```
    npm install -g windows-build-tools
    npm install -g node-gyp
```

## Centos7 环境需要使用yum安装
```
yum install node-gyp
	执行npm run start时无法安装puppet-puppeteer&&Chromium
	>>>>依赖库
	yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 -y
	>>>>字体
	yum install ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc -y
```

# 创建您的bot文件夹并执行一些init配置
```
mkdir my-padplus-bot && cd my-padplus-bot
npm init -y
```
# 安装机器人依赖项
```
npm install wechaty@latest

npm install wechaty-puppet-padplus@latest

```
# 安装其他依赖项
`npm install qrcode-terminal`
