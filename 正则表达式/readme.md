# 正则表达式

* ## ^和$ 开始和结束

  ^代表开始位置,匹配的是一个__开始的位置__
  e.g.
  
  ```javascript
  //["", index: 0, input: "sss"]
  console.log('sss'.match(/^/))

  //console.log('ssssbaa'.match(/^s+[a-z]+a$/));
  console.log('ssssbaa'.match(/^s+[a-z]+a$/));

  //[ '', index: 3, input: 'sss' ]
  console.log('sss'.match(/$/))

  ```
  上面的index就是正则匹配到的位置，很好的说明了^和$匹配的就是一个位置

* ## 转义 \

  如果需要匹配 __字符^__ 和 __字符$__, 就需要用到 __转义__: \,把 __元字符转为普通字符__

  e.g.

  ```javascript
  //[ '$2.7', index: 0, input: '$2.7' ]
  console.log('$2.7'.match(/^\$[0-9]+\.[0-9]+/))

  ```

  由于计算机通用字符太少，所以有时候需要用__转义加部分普通字符组成一些元字符__
  
  >
  | 元字符 | 含义 |
  |------|------|
  |\b|匹配一个单词边界(boundary)|
  |\B|匹配一个非单词边界|
  |\d|匹配一个数字字符(digit)|
  |\D|匹配一个非数字字符|
  |\s|匹配一个空白字符(space)|
  |\S|匹配一个非空白字符|
  |\w|匹配一个字母或者一个数字或者一个下划线(word)|
  |\W|匹配一个字母、数字和下划线之外的字符|

  __\加大写字母就是\加小写字母的对立面__

  \b 匹配的也是一个位置，而不是一个字符。单词和空格之间的位置，就是所谓单词边界。(所谓单词边界，对中文等其他语言是无效的。)

  ```javascript
  //[ 's', index: 2, input: 'l s' ]
  console.log('l s'.match(/\bs/))

  //null
  console.log('l s'.match(/\Bs/))
  ```

  \d匹配一个数字，注意，这里的数字不是指JavaScript中的数字类型，因为文本全是字符串。它指的是代表数字的字符。

  ```javascript
  // [ '1', index: 0, input: '123456' ]
  console.log('123456'.match(/\d/));

  // [ '123456', index: 0, input: '123456' ]
  console.log('123456'.match(/\d+/));
  ```

  \s匹配一个空白字符。空白字符是 __空格\f\n\r\t\v的总和__

  ```javascript
  //[ 'a b', index: 0, input: 'a b' ]
  console.log('a b'.match(/a\sb/));

  // null
  console.log('a b'.match(/\w\n\w/));
  ```

  \w匹配一个字母或者一个数字或者一个下划线。JavaScript中的变量规则，包括很多应用的用户名都只能是这三样，所以把它们放一起挺方便的。

  ```javascript
  //[ 'a_b', index: 0, input: 'a_b' ]
  console.log('a_b'.match(/\w+/));
  
  // [ '诶-逼', index: 0, input: '诶-逼' ]
  console.log('诶-逼'.match(/\W+/));
  ```

  __如果我们将大写和小写的带反斜杠的元字符组合在一起，就能匹配任何字符。__

  ```javascript
  // [ '@', index: 0, input: '@' ]
  console.log('@'.match(/[\d\D]/));
  ```

  *## .
  . 匹配除了换行符\n外的所有单一字符

  ```JavaScript
  //[ '咕噜咕噜刚刚@glglgl', index: 0, input: '咕噜咕噜刚刚@glglgl' ]
  console.log('咕噜咕噜刚刚@glglgl'.match(/.+/));
  
  //[ 'j', index: 0, input: 'jkl' ]
  console.log('jkl'.match(/./));
  ```

* ## 量词
  如果想匹配一个单一字符多次，就需要用到 __量词__

  |量词|含义|
  |------|------|
  |？|重复零次或者一次|
  |+|重复一次或多次|
  |*|重复任意次|
  |{n}|重复n次|
  |{n,}|重复n次或更多次|
  |{n,m}|重复n到m之间的次数|
  
  ```javascript
  // [ '正正正', index: 0, input: '正正正正正' ]
  console.log('正正正正正'.match('正{1,3}'));

  // [ '正', index: 0, input: '正正正正正' ]
  console.log('正正正正正 '.match('正?'));
  ```

  量词不能紧贴着另外一个量词一次用

  ```javascript
  // SyntaxError: Invalid regular expression: /正{1,3}+/: Nothing to repeat
  console.log('正正正正正'.match('正{1,3}+'));
  ```

* ## 贪婪模式与非贪婪模式 ？
  如果量词后面紧跟着一个 __？__,这个时候？不是量词，而是开启非贪婪模式

  正则默认的是贪婪模式，会匹配尽量多

  ```javascript
  // [ '正正正', index: 0, input: '正正正正正' ]
  console.log('正正正正正'.match('正{1,3}'));
  ```

  如果量词后加上?,那就是 __非贪婪模式__ ,会匹配尽量少的字符

  ```JavaScript
  // [ '正', index: 0, input: '正正正正正' ]
  console.log('正正正正正'.match('正{1,3}?'));
  ```

* ## 字符组 [uo]
  方括号在正则中表示一个区间，我们称它为字符组。

  正则中的普通字符只能匹配它自己。如果我要匹配一个普通字符,就要使用到字符组。

  ```JavaScript
  // [ 'fork', index: 0, input: 'fork' ]
  console.log('fork'.match('f[ou][cr]k'));

  //console.log('fork'.match('f[ou][cr]k'));
  console.log('fuck'.match('f[ou][cr]k'));
  ```
  在字符组中，元字符不需要转义

  ```JavaScript
  //[ '$', index: 0, input: '$' ]
  console.log('$'.match(/[$%]/));
  ```
  ^和-在字符组中有特殊含义

  ^表示取反,-表示连字符

  ```javascript
  //[ 'b', index: 1, input: 'abc' ]
  console.log('abc'.match(/[^a]/));
  // [ 'abc123', index: 0, input: 'abc123' ]
  console.log('abc123'.match(/[a-z]+[0-9]+/));
  ```

* ## 捕获组与非捕获组 ()

  单个字符加上量词，可以重复匹配多个量词

  如果需要 __重复一个字符串__，就需要使用到圆括号（）

  ```javascript
  // [ 'you are a very very very big pig','very ',index: 0,input: 'you are a very very very big pig' ]
  console.log('you are a very very very big pig'.match('you are a (very )+big pig'));
  ```

  * ### 正则内捕获

    正则内捕获使用\数字的形式，分别对应前面的圆括号捕获的内容。这种捕获的引用也叫反向引用。

    ```javascript
    // [ '<div>ab</div>', 'div', index: 0, input: '<div>ab</div>' ]
    console.log('<div>ab</div>'.match(/<([a-zA-Z]+)>.*<\/\1>/));

    //[ '<div>ab</div><p>ab</p>','div','ab',index: 0,input: '<div>ab</div><p>ab</p>' ]
    console.log('<div>ab</div><p>ab</p>'.match(/<([a-zA-Z]+)>(ab)+<\/\1><p>\2<\/p>/));
    ```

  * ### 正则外捕获

    RegExp就是构造正则的构造函数。如果有捕获组，它的实例属性$数字会显示对应的引用。

    ```javascript
    // abc
    '@abc'.match(/@(abc)/);
    console.log(RegExp.$1);
    ```

    一个捕获的常用方法，replace方法可以将特定内容替换为捕获的引用

    ```javascript
    //hello <strong>regex</strong>
    console.log( 'hello **regex**'.replace(/\*{2}(.*)\*{2}/, '<strong>$1</strong>'));
    ```
  * ### 捕获命名 ES2018新特性
    给捕获引用命名，使用的时候更稳定

    在捕获组内部最前面加上?<key>，它就被命名了。使用\k<key>语法就可以引用已经命名的捕获组。

    ```javascript
    // ["<App>hello regex</App>", "App", index: 0, input: "<App>hello regex</App>", groups: {tag: "App"}]
    '<App>hello regex</App>'.match(/<(?<tag>[a-zA-Z]+)>.*<\/\k<tag>>/);
    ```

    （）包围的一个整体经常被用到，但是不一定需要它的引用，也就是不一定需要使用捕获组，因为捕获组会占用额外的内存去计算，所以就有了 __非捕获组__ 的说法

    ```JavaScript
    '@abc'.match(/@(abc)/);
    // ["@abc", "abc", index: 0, input: "@abc", groups: undefined]
    '@abc'.match(/@(?:abc)/);
    // ["@abc", index: 0, input: "@abc", groups: undefined]

    ```
    只要在圆括号内最前面加上?:标识，就是告诉正则引擎：我只要这个整体，不需要它的引用，你就别费劲了。从下面的例子也可以看出来，match方法返回的结果有些许不一样。

* ## 分支 |
  | 在正则表达式中表示“或”
  ```JavaScript
  // [ '这周打篮球', index: 0, input: '这周打篮球' ]
  console.log('这周打篮球'.match(/\W{2}(?:打篮球|睡觉|浪)/));
  // [ '这周浪', index: 0, input: '这周浪' ]
  console.log('这周浪'.match(/\W{2}(?:打篮球|睡觉|浪)/));
  ```
* ## 修饰符
  
  正则表达式修饰符，写在正则表达式主体后面

  * ### g修饰符（开启全局匹配）

    ```javascript
    // [ '科比', index: 2, input: '后卫科比 前锋詹姆斯 后卫库里' ]
    console.log('后卫科比 前锋詹姆斯 后卫库里'.match(/(?<=后卫)\S+/));
    // [ '科比', '库里' ]
    console.log('后卫科比 前锋詹姆斯 后卫库里'.match(/(?<=后卫)\S+/g))
    ```

    开启全局匹配后，会匹配完整个文本，找到所有的匹配结果。

  * ### i修饰符 （全局忽略大小写）
  
    ```javascript
    //null
    console.log('javascript is great'.match(/JavaScript/));
    // [ 'javascript', index: 0, input: 'javascript is great' ]
    console.log('javascript is great'.match(/JavaScript/i));
    ```

  * ### m修饰符 （多行模式,匹配文本的开始和结束）
    m要和^和$配合使用，加上m修饰符，它们的含义就变成了行的开始和结束。

    ```javascript
    //[ 'xyz', index: 4, input: 'abc\nxyz' ]
    console.log(`abc\nxyz`.match(/xyz/));

    // null
    console.log(`abc\nxyz`.match(/^xyz$/));

    //[ 'xyz', index: 4, input: 'abc\nxyz' ]
    console.log(`abc\nxyz`.match(/^xyz$/m));
    ```

  * ### s修饰符 （增强.的功能）
    ES2018新特性
    让.可以匹配任意单个字符
    
    ```javascript
    // null
    console.log('abc\nxyz'.match(/'c.x'/));
    // ["c↵x", index: 3, input: "↵abc↵xyz↵", groups: undefined]
    console.log('abc\nxyz'.match(/'c.x'/s));
    ```
  
  * ### u修饰符 (unicode模式)

    有一些Unicode字符超过一个字节，正则无法正确识别它们

    ```JavaScript
    //[ '�', index: 0, input: '𠮷' ]
    console.log('𠮷'.match(/./));
    //[ '𠮷', index: 0, input: '𠮷' ]
    console.log('𠮷'.match(/./u));
    ```

  * ### y修饰符 （粘连全局模式）
    
    
* ## 零宽断言