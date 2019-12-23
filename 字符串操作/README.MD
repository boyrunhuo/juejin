
* slice
       
    语法： str.slice(beginIndex[, endIndex])

    beginIndex： 如果值为负数，会被当做 strLength + beginIndex 看待，这里的strLength 是字符串的长度（例如， 如果 beginIndex 是 -3 则看作是：strLength - 3）

    endIndex： 如果省略该参数，slice() 会一直提取到字符串末尾。如果该参数为负数，则被看作是 strLength + endIndex，这里的 strLength 就是字符串的长度(例如，如果 endIndex 是 -3，则是, strLength - 3)。

    tip： 
    1. str.slice(2, -1) 提取第三个字符到倒数第一个字符。

    2. str.slice(1, 4) 提取第二个字符到第四个字符（被提取字符的索引值（index）依次为 1、2，和 3）。

* substring 
    
    语法： str.substring(indexStart[, indexEnd])

    indexStart：需要截取的第一个字符的索引，该索引位置的字符作为返回的字符串的首字母。

    indexEnd：如果省略 indexEnd，substring 提取字符一直到字符串末尾。

    tip：
    1. 如果任一参数小于 0 或为 NaN，则被当作 0。

    2. 如果任一参数大于 stringName.length，则被当作 stringName.length。

    3. 如果 indexStart 大于 indexEnd，则 substring 的执行效果就像两个参数调换了一样。

* substr
    语法：str.substr(start[, length])

    tip：
        
    1. start：如果为负值，则被看作 strLength + start，其中 strLength 为字符串的长度（例如，如果 start 为 -3，则被看作 strLength + (-3)）。

方法 | 原字符串不变| 原字符串变化 | 不传入endIndex | 'abcdef'.func(-1) | 'abcdef'.func()
----|---- | ----| --- | --- | ---
slice | √ | -|默认到末尾 | 'f' |
substring | √ | - |默认到末尾 | 'abcdef' |
substr | √ | -| 默认到末尾 | 'f' |