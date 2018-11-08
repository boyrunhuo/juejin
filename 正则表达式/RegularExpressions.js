
console.log('ssssbaa'.match(/^s+[a-z]+a$/));
console.log('sss'.match(/^/))
console.log('sss'.match(/$/))

console.log('$2.7'.match(/^\$[0-9]+\.[0-9]+/))
//[ 's', index: 2, input: 'l s' ]
console.log('l s'.match(/\bs/))

//null
console.log('l s'.match(/\Bs/))

// [ '1', index: 0, input: '123456' ]
console.log('123456'.match(/\d/));

// [ '123456', index: 0, input: '123456' ]
console.log('123456'.match(/\d+/));

//[ 'a b', index: 0, input: 'a b' ]
console.log('a b'.match(/a\sb/));

// null
console.log('a b'.match(/\w\n\w/));

//[ 'a_b', index: 0, input: 'a_b' ]
console.log('a_b'.match(/\w+/));

// [ '诶-逼', index: 0, input: '诶-逼' ]
console.log('诶-逼'.match(/\W+/));

// [ '@', index: 0, input: '@' ]
console.log('@'.match(/[\d\D]/));
//[ '咕噜咕噜刚刚@glglgl', index: 0, input: '咕噜咕噜刚刚@glglgl' ]
console.log('咕噜咕噜刚刚@glglgl'.match(/.+/));
//[ 'j', index: 0, input: 'jkl' ]
console.log('jkl'.match(/./));

// [ '正正正', index: 0, input: '正正正正正' ]
console.log('正正正正正'.match('正{1,3}'));

// [ '正', index: 0, input: '正正正正正' ]
console.log('正正正正正'.match('正?'));


// [ '正正正', index: 0, input: '正正正正正' ]
console.log('正正正正正'.match('正{1,3}'));

// [ '正', index: 0, input: '正正正正正' ]
console.log('正正正正正'.match('正{1,3}?'));

// [ 'fork', index: 0, input: 'fork' ]
console.log('fork'.match('f[ou][cr]k'));

//console.log('fork'.match('f[ou][cr]k'));
console.log('fuck'.match('f[ou][cr]k'));
//[ '$', index: 0, input: '$' ]
console.log('$'.match(/[$%]/));

//[ 'b', index: 1, input: 'abc' ]
console.log('abc'.match(/[^a]/));
// [ 'abc123', index: 0, input: 'abc123' ]
console.log('abc123'.match(/[a-z]+[0-9]+/));

console.log('921194360@qq.com'.match('[0-Z]+@[a-z]+.com'));
// [ 'you are a very very very big pig','very ',index: 0,input: 'you are a very very very big pig' ]
console.log('you are a very very very big pig'.match('you are a (very )+big pig'));
// [ '<div>ab</div>', 'div', index: 0, input: '<div>ab</div>' ]
console.log('<div>ab</div>'.match(/<([a-zA-Z]+)>.*<\/\1>/));

//[ '<div>ab</div><p>ab</p>','div','ab',index: 0,input: '<div>ab</div><p>ab</p>' ]
console.log('<div>ab</div><p>ab</p>'.match(/<([a-zA-Z]+)>(ab)+<\/\1><p>\2<\/p>/));

// abc
'@abc'.match(/@(abc)/);
console.log(RegExp.$1);
//hello <strong>regex</strong>
console.log( 'hello **regex**'.replace(/\*{2}(.*)\*{2}/, '<strong>$1</strong>'));

// console.log('<div></div>'.match(/<(?<tag>[a-zA-Z]+)><\/\k<tag>>/));


console.log( '@abc'.match(/@(abc)/));
    // ["@abc", "abc", index: 0, input: "@abc", groups: undefined]
 console.log('@abc'.match(/@(?:abc)/))
    // ["@abc", index: 0, input: "@abc", groups: undefined]


// [ '这周打篮球', index: 0, input: '这周打篮球' ]
console.log('这周打篮球'.match(/\W{2}(?:打篮球|睡觉|浪)/));
// [ '这周浪', index: 0, input: '这周浪' ]
console.log('这周浪'.match(/\W{2}(?:打篮球|睡觉|浪)/));

// [ '科比', index: 2, input: '后卫科比 前锋詹姆斯 后卫库里' ]
console.log('后卫科比 前锋詹姆斯 后卫库里'.match(/(?<=后卫)\S+/));
// [ '科比', '库里' ]
console.log('后卫科比 前锋詹姆斯 后卫库里'.match(/(?<=后卫)\S+/g))


//null
console.log('javascript is great'.match(/JavaScript/));
// [ 'javascript', index: 0, input: 'javascript is great' ]
console.log('javascript is great'.match(/JavaScript/i));

//[ 'xyz', index: 4, input: 'abc\nxyz' ]
console.log(`abc\nxyz`.match(/xyz/));

// null
console.log(`abc\nxyz`.match(/^xyz$/));

//[ 'xyz', index: 4, input: 'abc\nxyz' ]
console.log(`abc\nxyz`.match(/^xyz$/m));

// null
console.log('abc\nxyz'.match(/'c.x'/));
// ["c↵x", index: 3, input: "↵abc↵xyz↵", groups: undefined]
console.log('abc\nxyz'.match(/'c.x'/s));

//[ '�', index: 0, input: '𠮷' ]
console.log('𠮷'.match(/./));
//[ '𠮷', index: 0, input: '𠮷' ]
console.log('𠮷'.match(/./u));
