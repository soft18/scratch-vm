## scratch-vm 更新修改说明
尽量 PC， Iphone 同源

## 连接本地
$ # 先去到模块目录，把它 link 到全局
$ cd scratch-vm
$ npm link
$
$ # 再去项目目录通过包名来 link
$ cd scratch-gui
$ npm link scratch-vm


## 更新同步时间
1。2017-12-4

## 更新的代码点

1. src/blocks/**
2。src/virtual-machine.js    79
3. src/engine/runtime.js     700

## 使用说明
1。更新内容时，在vm 先 webpack 生成一下文件
2。再在 gui中 重新生成测试

## end

## other
1.先按手机的方法处理，兼容手机的先；




## 
