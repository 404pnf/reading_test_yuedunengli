// update: 2015-01-20
//
// author: xiaobai

// # 功能描述
// 1. 用户选择id为yuedu的div中某些文字，会为选中的文字添加高亮样式。
// 2. 用户点击已经高亮的文字，会取消高亮样式。
(function () {

    rangy.init();
    // 正确的实现
    $('#yuedu').mouseup(function(e) {
        document.getSelection();
        rangy.createCssClassApplier('annotation').applyToSelection();
    });

    // ## 这个实现也是错误的。
    // 它比下面那个错误好一点的地方时用正则替换了所有匹配选中的部分。
    // 比如  abc def abc hjk
    // 如果选择了第二个abc，会高亮第一个和第二个abc，虽然也不好，
    // 但至少用户不会觉得自己选中的没有高亮而是去高亮一个不相关的地方，
    //
    // ## 改进选中部分。
    // 即使用户选择了一个字母，也扩展为字母所在的单词。
    // 这个行为和kindle保持一致。
    // 使用方法，正则：
    // 捕获 零个或多个非空白且非'>'字符 加鼠标选中的字符 加 零个或多个非空白且非'<'或'>'字符
    // 中的鼠标选中字符。
    /*
    $('#yuedu').mouseup(function(e) {
        var content, re, replacement, newHTML, oldHTML, target;

        { try{
            // non-IE
            content = document.getSelection().toString();
        } catch (err) {
            // IE
            content = document.selection.createRange().text;
            }
        }
        // 1. 为了在正则中用变量，只能用regexp构造方法。
        // 2. 捕获content的括号分散在前后两个正则中，在js的正则使用变量只能这样。脏乱差啊。
        // ruby中很干净啦 Regexp.new(" (#{a}) ")
        // 3. content前面去匹配html的结束符号'>'，后面是去匹配hmtl标签的开始符号'<'。
        re = new RegExp('([^ >]*' + content + '[^ <]*)', "g");
        if (content !== '') {
            target = e.target;
            oldHTML = target.innerHTML;
            newHTML = oldHTML.replace(re, function (sel) {
                console.log(sel);
                return "<span class='annotation'>" + sel + "</span>"
            });
            return target.innerHTML = newHTML;
        }
    });
    */

    // ## 我写了取消高亮的功能
    // 下面的实现是做不到的。
    // 但取消功能依然让人迷惑。
    // 因为它只取消你点击的高亮，而不是所有和点击高亮内容相同的高亮。
    // 举例：还是上面的 abc def abc hjk
    // 如果选择了第二个abc，会高亮第一个和第二个abc，虽然也不好，
    // 但如果点击第二个abc触发取消高亮，第一个abc不会关联也取消的。
    // 这是正确的方式。只是由于实现高亮用了错误的方式，才让这个取消功能也变得有点怪。

    // 取消高亮的时候，我们不但要取消css类，也应该取消span。否则遗留在页面的span会有时让
    // 页面混乱。还好，有jquery帮忙。
    $('#yuedu').delegate("span", "click", function (e) {
        var text = $(this).text();
        console.log('triggered!');
        $(this).replaceWith(text);
    });
    // 需要有这个事件监听。它会在用户试图选中已经高亮的区域时先取消掉高亮。
    // 如果不这样做。用户再次选择已经高亮区域的部分文字，会出现嵌套的span。
    // 在某些情况下让页面异常混乱。
    $('#yuedu').delegate("span", "mousedown", function (e) {
        var text = $(this).text();
        console.log('triggered!');
        $(this).replaceWith(text);
    });
})();

// ## 参考其他人的实现
// http://zhidao.baidu.com/link?url=DukzamGwQXO308uHAqEWqr0kAvyVP6FBKc0uXNGE0kt_fRuBIIuiMpm8HkIDR0ChlYxBBNkCu22Fma3maKEDlEfq0n6RST7ziKioRLsBEGu
// 这个实现是错误的，简单的正则替换，会替换文章中第一次出现的选中词，而不是选中词。
// 比如  abc def abc hjk
// 如果选择了第二个abc，会高亮第一个abc，而第二个abc根本没变化。非常让人疑惑
//
// 而且这个例子的代码也真是脏乱差啊。
//
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