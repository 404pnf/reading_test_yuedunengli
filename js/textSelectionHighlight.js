// updated: 2015-01-20
//
// author: xiaobai

// # 功能描述
// 1. 用户选择id为yuedu的div中某些文字，会为选中的文字添加高亮样式。
// 2. 用户点击已经高亮的文字，会取消高亮样式。
(function () {
    // rangy.init(); // 默认已经初始化了。除非出错。否则不用显性调用？

    // 实现选择字段高亮
    // 使用的时 rangy-core.js 和 rangy-cssclassapplier.js 中的功能。
    $('#yuedu').mouseup(function(e) {
        // document.getSelection ? document.getSelection(); : document.selection.createRange();
        rangy.getSelection();
        rangy.createCssClassApplier('annotation').applyToSelection(); // 默认将选中内容用span裹起来
    });

    // 取消高亮的功能
    //
    // 取消高亮的时候，我们不但要取消css类，也应该取消span。否则遗留在页面的span会有时让
    // 页面混乱。还好，有jquery帮忙。
    $('#yuedu').delegate("span", "click", function (e) {
        var text = $(this).text();
        $(this).replaceWith(text);
    });
    // 需要有这个事件监听。它会在用户试图选中已经高亮的区域时先取消掉高亮。
    // 如果不这样做。用户再次选择已经高亮区域的部分文字，会出现嵌套的span。
    // 在某些情况下让页面异常混乱。
    $('#yuedu').delegate("span", "mousedown", function (e) {
        var text = $(this).text();
        $(this).replaceWith(text);
    });
})();
