// update: 2015-01-20
//
// author: xiaobai

// # 功能描述
// 1. 用户选择id为yuedu的div中某些文字，会为选中的文字添加高亮样式。
// 2. 用户点击已经高亮的文字，会取消高亮样式。
(function () {
    // ## 这个实现也是错误的。
    // 它比下面那个错误好一点的地方时用正则替换了所有匹配选中的部分。
    // 比如  abc def abc hjk
    // 如果选择了第二个abc，会高亮第一个和第二个abc，虽然也不好，
    // 但至少用户不会觉得自己选中的没有高亮而是去高亮一个不相关的地方，
    //
    // ## 选中部分可以改进的。
    // 现在用户选择什么就是什么，哪怕用户选择一个单词当中的一个字母。
    // 可以改进为最小选择区域是一个单词。即使用户选择了一个字母，也扩展为字母所在的单词。
    // 这个行为和kindle保持一致。
    // 实现方式未想到。
    $('#yuedu').mouseup(function(e) {
        var content, re, replacement, newHTML, oldHTML, target;
        content = window.getSelection().toString();
        re = new RegExp(content,"g"); // 为了在正则中用变量，只能用regexp构造方法
        replacement = "<span class='annotation'>" + content + "</span>"
        if (content !== '') {
            target = e.target;
            oldHTML = target.innerHTML;
            newHTML = oldHTML.replace(re, replacement);
            return target.innerHTML = newHTML;
        }
    });

    // ## 我写了取消高亮的功能
    // 下面的实现是做不到的。
    // 但取消功能依然让人迷惑。
    // 因为它只取消你点击的高亮，而不是所有和点击高亮内容相同的高亮。
    // 举例：还是上面的 abc def abc hjk
    // 如果选择了第二个abc，会高亮第一个和第二个abc，虽然也不好，
    // 但如果点击第二个abc触发取消高亮，第一个abc不会关联也取消的。
    // 这是正确的方式。只是由于实现高亮用了错误的方式，才让这个取消功能也变得有点怪。
    // ### 现在取消高亮的实现方式还存在一个问题，
    // 就是如果选取的高亮只有一两个字符，点击取消的时候，会出现没有取消，反而高亮了更多的文字。
    // 产生原因是用户觉得自己只是点了一下鼠标，实际dom检测到的是点下鼠标的时候稍微移动了一下。
    // 解决方法暂时没想出来。
    $('#yuedu').delegate("span", "click", function (e) {
        console.log('triggered!');
        $(this).toggleClass('annotation');
    });
})();

// ## 参考其他人的实现
// http://zhidao.baidu.com/link?url=DukzamGwQXO308uHAqEWqr0kAvyVP6FBKc0uXNGE0kt_fRuBIIuiMpm8HkIDR0ChlYxBBNkCu22Fma3maKEDlEfq0n6RST7ziKioRLsBEGu
// 这个实现是错误的，简单的正则替换，会替换文章中第一次出现的选中词，而不是选中词。
// 比如  abc def abc hjk
// 如果选择了第二个abc，会高亮第一个abc，而第二个abc根本没变化。非常让人疑惑
// document.onmouseup=function(e){
//     content=window.getSelection().toString();
//     if(content!=''){
//         var len=content.length;
//         var   target=e.target;
//         var  position=target.innerHTML.indexOf(content);
//         var  position2=position+len;
//         var  tempstr1=target.innerHTML.substring(0,position);
//         var tempstr2=target.innerHTML.substring(position2);
//         content="<span style='color:red;'>"+content+"</span>";
//         target.innerHTML=tempstr1+content+tempstr2;
//     }}