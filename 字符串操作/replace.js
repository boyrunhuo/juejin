// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace
// str.replace(regexp|substr, newSubStr|function)

//ab0
// let str = 'abc'.replace('c', '0')
// console.log(str);

// //1b11
// let str1 = 'abcc'.replace(/[a|c]/g, '1' )
// console.log(str1)

// //ab2
// let str2 = 'abc'.replace('c', function(replacement) {
//   return replacement = '2'
// })
// console.log(str2);

// // 3b33
// let str3 = 'abcc'.replace(/[a|c]/g, function(replacement) {  
//   return replacement = '3'
// })
// console.log(str3);

/** ------------------------------------------------------------------------------- */
/*------------------------replace高级用法：使用正则捕获组------------------------------*/
/* 为超链接自动补全协议名:*/

// const reg3 = /(https?:\/\/)?((\w|=|\?|\.|\/|&|-)+)(.com|.cn)((\w|=|\?|\.|\/|&|-)*)/g // 这个能支持不带www的链接
// let val1 = 'http://github.com/udacity/frontend-nanodegree-styleguide-zh/issues/4'
// let val2 = 'www.baidu.com'
// let val3 = 'https://segmentfault.com/u/fanqie_5ab4f13ebd778'


// val3.replace(reg3, (match, capture) => {
//   // capture为捕获组，匹配正则中第一个捕获组
//   if (capture) {
//     console.log(`有协议：${capture}! 链接为：`, match);
//     return match
//   } else {
//     console.log(`补充协议链接为：`, `http://${match}`);
//   }
// })

/*连字符转化为转驼峰写法*/
const _hyphenPattern = /-(.)/g

function camelize(string) {
  string = string.replace(_hyphenPattern, function(match, character) {
    return character.toUpperCase()
  })
  console.log(string);
  
}
/*fooStyleCss */
camelize("foo-style-css")


