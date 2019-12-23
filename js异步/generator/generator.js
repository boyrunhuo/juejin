
// function* f() {
//     for(var i = 0; true; i++) {
//       var reset = yield i;
//       console.log('reset',reset);
      
//       if(reset) { i = -1; }
//     }
//   }
  
//   var g = f();
//   debugger
//   console.log(g.next());// { value: 0, done: false }
//   console.log(g.next());// { value: 1, done: false }
//   console.log(g.next());// { value: 2, done: false }

//   console.log(g.next(true));// { value: 0, done: false }

//   console.log(g.next());// { value: 0, done: false }
//   console.log(g.next());// { value: 1, done: false }
//   console.log(g.next());// { value: 2, done: false }
   
// function* foo(x) {
//     var y = 2 * (yield (x + 1));
//     var z = yield (y / 3);
//     console.log(x,y,z);
    
//     return (x + y + z);
//   }
  
//   var a = foo(5);
//  console.log(a.next());// Object{value:6, done:false}
//  console.log(a.next())// Object{value:NaN, done:false}
//  console.log(a.next())// Object{value:NaN, done:true}

  
//   var b = foo(5);
//   console.log(b.next());// { value:6, done:false }
//   console.log(b.next(12))// { value:8, done:false }第二次调用next方法，将上一次yield表达式的值设为12，因此y等于24
//   console.log(b.next(13))// { value:42, done:true }


const person = sex => {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      const data = {
        sex,
        name: 'keith',
        height: 180
      }
      resolve(data)
    }, 1000)
  })
}
person('boy').then(res => {
  console.log('res',res);
  
})
function *gen () {
  const data = yield person('boy')
  console.log(data)
}
const g = gen()
const next1 = g.next() // {value: Promise, done: false}
next1.value.then(data => {
  g.next(data)
})


// --------------------------------async函数------------------------------------
// function fetchUser() { 
//   return new Promise((resolve, reject) => {
//       fetch('https://api.github.com/users/superman66')
//       .then((data) => {
//           resolve(data.json());
//       }, (error) => {
//           reject(error);
//       })
//   });
// }

// async function getUserByAsync(){
//   let user =  fetchUser();
//   console.log('user',user);
  
//   return user.id;
// }
// getUserByAsync()
// .then(v => console.log(v));


