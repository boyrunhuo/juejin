// 0.6061255024402574
// Math.random()

// function timeout(ms) {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, ms)
//   })
// }

// function* gen(x){
//   var y = yield x + 2;
//   return y;
// }

// var g = gen(1);
// console.log(g.next());
//  // { value: 3, done: false }
// console.log(g.next(8));
// // { value: 2, done: true }


// var fetch = require('node-fetch');

// function* gen(){
//   var url = 'https://api.github.com/users/github';
//   var result = yield fetch(url);
//   console.log(result.bio);
// }

// var g = gen()
// //{ value: Promise { <pending> }, done: false }
// var result = g.next()
// // 返回值就是执行fetch的value是一个Promise对象

// result.value.then(res => {
//   return res.json()
// }).then(res => {
//   g.next(res)
// })



// function* helloWorldGenerator() {
//   yield 'hello';
//   yield 'world';
//   return 'ending'
// }

// var hw = helloWorldGenerator()

// //{ value: 'hello', done: false }
// console.log(hw.next());

// //{ value: 'world', done: false }
// console.log(hw.next());

// //{ value: 'ending', done: true }
// console.log(hw.next());

// //{ value: undefined, done: true }
// console.log(hw.next());


// function* gen(x) {
//   try {
//     var y = yield x + 2
//   } catch(e) {
//     console.log(e)
//   }
//   return y
// }

// var g = gen(1)
// console.log(g.next());
// // console.log(g.next(1));
// // console.log(g.next());
// g.throw('出错了')

var fetch = require('node-fetch');

function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
}

var g = gen() 
// g.next()的value是一个Promise对象{ value: Promise { <pending> }, done: false }

g.next().value.then(res => {
  console.log(res);
})