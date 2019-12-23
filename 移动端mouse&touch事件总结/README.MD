# 移动端 Mouse&Touch 事件总结

## 普通情况
类似(鼠标/手指)按下->滑动->抬起这一系列动作，应该使用Mouse事件和Touch事件区分PC端和移动端上的事件绑定。

PC端 | 移动端
---- | ---
mousedown | touchstart
mousemove |  touchmove
mouseup | touchend

## 部分安卓系统不支持touchend事件

针对部分安卓系统不支持touchend事件的情况，可以同时绑定touchcancel和touchend事件做兼容。

```javascript
$(document).on({
    'touchend': end,
    'touchcancel':end
})

function end() {
    /***/
}
```


## 移动端浏览器“访问电脑版”功能

部分移动端浏览器有“访问电脑版”这个功能，当开启这个功能，在移动端访问时，终端会被模拟为PC，但是却不包含Mouse的一系列事件，所以就要使用Touch事件做兼容。

```javascript
$(document).on({
    'touchmove': end,
    'mousemove':end
})
var move = function(e) {
    var x = e.type === 'mousemove' ? e.clientX  : e.originanEvent.changedTouch[0].clientX
}
```
