
修改记录

20150116

修改 hightlight 的 solid 效果的样式

方法

1 修改透明度，


  源文件是 Annotator.js

      this.highlighter_ = new tvs.AnnotatorImpl(
          'highlighter',
          tvs.Annotator.getTemplates(),
          tvs.AnnotatorCore.highlightPositioner,
          {opacity: 0.45});

 我们直接修改合并压缩过的文件 annotator.min.js
 搜索关键词 opacity， 一共两个 一个 0.45 一个 0.9
 修改 0.45 的那个到 0.34

2. 修改高亮红色图标的高度。之前高度是何字母m高度一样。要求高度和鼠标选中默认高亮条的高度一样。

  源文件是 ImageTemplatePart.js  在97行

        if (!bgIsSet) {
            td.style['backgroundImage'] = this.getCssBackground(color);
            td.style['backgroundSize'] = 'auto 100%';
        }

 我们要将 backgroundSize'] = 'auto 100%'; 改为  'auto 1px'。
 原理，设定为1px后那个小图标就会自动填充填满高度。？？

 直接修改合并压缩过的文件 annotator.min.js。搜索 backgroundSize 修改即可。

