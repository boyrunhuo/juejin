
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

// var fetch = require('node-fetch');

// function* gen(){
//   var url = 'https://api.github.com/users/github';
//   var result = yield fetch(url);
// }

// var g = gen() 
// // g.next()的value是一个Promise对象{ value: Promise { <pending> }, done: false }

// g.next().value.then(res => {
//   console.log(res);
// })

// ---------------------------------------------------------------------
// var resolveAfter2Seconds = function() {
//   console.log("starting slow promise");
//   return new Promise((resolve,reject) => {
//     setTimeout(function() {
//       resolve(20);
//       console.log("slow promise is done");
//     }, 2000)
//   })
// }

// var resolveAfter1Second = function() {
//   console.log("starting fast promise");
//   return new Promise((resolve,reject) => {
//     setTimeout(function() {
//       resolve(10);
//       console.log("fast promise is done");
//     }, 1000)
//   })
// }

// var sequentialStart = async function() {
//   console.log('==SEQUENTIAL START==');
//   const slow = await resolveAfter2Seconds()
//   const fast = await resolveAfter1Second()
//   console.log('slow',slow);
//   console.log('fast',fast);
// }

// sequentialStart()


/**
 * Promise.all()
 */

// var items = [1,2,3,4,5]
// var fn = function asyncMultiplyBy2(v){
//   return new Promise((resolve, reject) => setTimeout(() => {resolve(v*2)},1000))
// }

// var actions = items.map(fn)

// console.log('actions',actions);

// var results = Promise.all(actions)

// console.log('results',results);


// results.then(data => {
//   console.log(data);
  
// })

/**
 * forEachPromise
 */

 function forEachPromise(items,fn) {
   return items.reduce(function(promise,item)  {
     return promise.then(function() {
      return fn(item)
     })
   },Promise.resolve())
 }

 var items = ['a', 'b', 'c'];

 function logItem(item) {
   return new Promise((resolve, reject) => {
     process.nextTick(() => {
       console.log(item)
       resolve()
     })
   })
 }
 forEachPromise(items, logItem).then(() => {
   console.log('done');
 })