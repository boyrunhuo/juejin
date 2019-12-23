# JS异步

* 在平时的JS代码开发工作中，很多bug都是异步操作产生的，也有很多业务场景去异步的执行，所以搞清楚JS异步操作，学习一些高效的异步问题解决方法对于平时的工作很有帮助。
  
  * ### 同步
    函数返回时，函数调用者立刻能得到返回值，那么函数就是同步的。

    ```JavaScript
      // 0.6061255024402574
      // 函数返回时，获得了结果，得到了一个0-1的随机数
      Math.random()
    ``` 

    同步函数在得到返回值之前，会一直在等待，直到得到结果

  * ### 异步
    
    像读取文件、网络请求这种类型的函数，如果一直在那里等着，会很耗时，这样就会导致你进行一个耗时长的操作，使整个页面都没法干活了。所以这类函数返回时，并不能立即得到结果，这些耗时的操作交给其他线程去执行，保证主线程不会被阻塞，待到操作执行完后，把相应的结果传递给回调函数，通知主线程（执行JavaScript代码的线程执行回调)。

* ## 多线程
  
  JavaScript诞生之初，只是为了处理页面中的用户交互以及操作DOM树，CSS样式树，如果JavaScript是多线程的，那操作这些资源时，就会出现冲突，比如同一个DOM节点，一个线程要删除它，一个线程要修改它，那就不好裁决要执行哪个操作了，为了不增加复杂性，所以JavaScript设计之初就选择了单线程。

  虽然JavaScript是单线程的，但是JavaScript的运行环境——浏览器的内核是多线程的，一个浏览器通常有以下几个常驻的线程：

  * GUI渲染引擎线程：负责页面渲染，当页面发生重绘或者回流时，该线程就会执行，当JS引擎运行期间，GUI渲染线程就不会运行了。
  * JS引擎线程：负责JS的解析和执行
  * 定时触发器线程：执行定时时间，比如setTimeout等
  * 事件触发线程： 处理DOM事件
  * 异步http请求线程： 处理http请求


* ## 消息队列与事件循环
  现在知道了JavaScript是通过自己的主线程与浏览器中的其他线程交互协作实现异步的，其他线程执行完自己的操作得到结果时，会将结果传给回调函数，通知JavaScript主线程执行回调函数。

  ![avatar](./img/message.png)

  消息队列和事件循环决定了回调函数何时加入到JavaScript主线程中被执行。

  ![avatar](./img/stack.png)

  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop

  stack（栈）中存储了一些能立即执行、不耗时的任务，如变量和函数的初始化、事件的绑定等等那些不需要回调函数的操作都可归为这一类。

  heap（堆）中存储声明的变量、对象，即用以表示一个大部分非结构化的内存区域。

  queue（队列）中，执行一个异步任务时，这个任务被交给其他线程去执行，当有结果可以回调时，就有一个消息（该任务）被推到队列中，当栈中有的任务执行完毕，也就是栈被清空时，消息队列中的待处理任务被读取（异步任务都和回调函数相关连），相关的回调函数就会被压入栈中。

  JS引擎线程从消息队列中读取任务是不断循环的，每次栈被清空后，都会在消息队列中读取新的任务，如果没有新的任务，就会等待，直到有新的任务，这就叫事件循环。

* ## 回调函数
  由于异步操作需要回调函数执行，所以异步操作经常这样写：

  ```JavaScript
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
            return success(request.responseText);
        } else {
            return fail(request.status);
        }
      }
    }
  ```

  这样回调少的时候还好，如果回调函数一多，就会造成代码十分难看：

  回调地狱了解一下：

  ```JavaScript
  fs.readdir(source, function (err, files) {
    if (err) {
      console.log('Error finding files: ' + err)
    } else {
      files.forEach(function (filename, fileIndex) {
        console.log(filename)
        gm(source + filename).size(function (err, values) {
          if (err) {
            console.log('Error identifying file size: ' + err)
          } else {
            console.log(filename + ' : ' + values)
            aspect = (values.width / values.height)
            widths.forEach(function (width, widthIndex) {
              height = Math.round(width / aspect)
              console.log('resizing ' + filename + 'to ' + height + 'x' + height)
              this.resize(width, height).write(dest + 'w' + width + '_' + filename, function(err) {
                if (err) console.log('Error writing file: ' + err)
              })
            }.bind(this))
          }
        })
      })
    }
  })
  ```

* ## Promise

  所以我们希望有更好的写法来处理异步操作，于是出现了Promise：

  http://es6.ruanyifeng.com/#docs/promise

  Promise对象代表一个异步操作，从中可以获取异步操作的消息。

  ```JavaScript
  function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
      })
  }
  // 过了5s输出resolved
  timeout(5000).then(() => {
    console.log('resolved');
  })
  ```
  Promise对象有三种状态：pending（进行中）、fulfilled（已成功）、rejected（已失败），异步操作的结果，决定当前对象是哪一种状态。

  Promise构造函数接收一个函数作为参数，该函数的两个参数分别是 __resolve__ 和 __reject__,这是JavaScript引擎提供的两个函数。
  
  resolve将Promise对象的状态从pending变为resolved，在异步操作成功时调用，并将异步操作的结果，作为参数传递出去。
  
  reject将Promise对象的状态从pending变为rejected，在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

  Promise实例生成后，可以then方法分别指定resolved状态和rejected状态的回调函数。

  ```JavaScript
  function ajax(url) {
    return new Promise((resolve,reject) => {
      var xhr = new XMLHttpRequest()
      xhr.open('GET', url, true)
      xhr.send(null)
      if(xhr.readyState === 4 ){
        if (xhr.status === 200) {
          resolve()
        }
      } else {
        reject()
      }
    })
  }

  ajax('www.baidu.com').then(() => {
    console.log('connect success');
  }).catch(() => {
    console.log('connet failed');
  })
  ```

  如上，把http请求这样的异步操作放在Promise里，只需要关心什么时候异步操作成功，状态变为resolved，什么时候异步操作失败，状态变为rejected。

  至于操作成功和失败后的操作是什么，就只用在then和catch方法里写就行了。

* ## Generator函数

  Generator函数时ES6提供的一种异步编程解决方案。

  ```JavaScript
  function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending'
  }

  var hw = helloWorldGenerator()

  //{ value: 'hello', done: false }
  console.log(hw.next());

  //{ value: 'world', done: false }
  console.log(hw.next());

  //{ value: 'ending', done: true }
  console.log(hw.next());

  //{ value: undefined, done: true }
  console.log(hw.next());
  ```

  yiled函数定义了Generator函数内部的状态，调用遍历器的next方法，使指针移动向下一个状态。

  换言之，Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。

  Generator封装异步任务
  ```javaScript
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
  function *gen () {
    const data = yield person('boy')
    console.log(data)
  }
  const g = gen()
  const next1 = g.next() // {value: Promise, done: false}
  next1.value.then(data => {
    g.next(data)
  })
  ```
  person函数返回一个Promise对象，Generator 函数第一次调用next()方法时，启动了遍历器（Iterator）对象，返回包含value是Promise的对象，此时用Promise对象的then方法可以获取到resolve传递过来的data，再使用带有data参数的next方法给上一个yield表达式传递返回值。

  此时在const data = yield person()这句语句中，就可以得到异步任务传递的参数值了，实现了异步任务的同步化。

  但是上面的代码会有问题。每次获取异步的值时，都要手动执行next()。

  我们可以引入thunk函数实现流程控制： 
   
  thunk函数实际上有些类似于JavaScript函数柯里化，会将某个函数作为参数传递到另一个函数中，然后通过闭包的方式为参数(函数)传递参数进而实现求值。

  编译器的“传名调用”实现，即直接将表达式x + 5传入函数体，只在用到它的时候求值。将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数。
  ```javaScript
  var x = 1

  function f(m) {
    return m * 2;
  }

  f(x + 5);

  // 等同于

  var thunk = function () {
    return x + 5;
  };

  function f(thunk) {
    return thunk() * 2;
  }
  ```

  JavaScript 语言是传值调用(即先算出x+5,再传入函数f)，它的 Thunk 函数含义有所不同。在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成一个只接受回调函数作为参数的单参数函数。


  ```javaScript
  // 正常版本的readFile（多参数版本）
  fs.readFile(fileName, callback);

  // Thunk版本的readFile（单参数版本）
  var Thunk = function (fileName) {
    return function (callback) {
      return fs.readFile(fileName, callback);
    };
  };

  var readFileThunk = Thunk(fileName);
  readFileThunk(callback);
  ```

  任何函数，只要参数有回调函数，就能写成 Thunk 函数的形式。下面是一个简单的 Thunk 函数转换器。

  ```javaScript
  // ES5版本
  var Thunk = function(fn){
    return function (){
      var args = Array.prototype.slice.call(arguments);
      return function (callback){
        args.push(callback);
        return fn.apply(this, args);
      }
    };
  };

  // ES6版本
  const Thunk = function(fn) {
    return function (...args) {
      return function (callback) {
        return fn.call(this, ...args, callback);
      }
    };
  };
  ```
  
  使用转换函数：
  ```javaScript
  function f(a, cb) {
    cb(a);
  }
  const ft = Thunk(f);

  ft(1)(console.log) // 1
  ```

  也可以直接使用第三方Thunkify 模块作为转换器
  > npm install thunkify

  有了thunk函数，再来写上面的Generator函数：
  ```javaScript
  const person = (sex, fn) => {
  window.setTimeout(() => {
      const data = {
        sex,
        name: 'keith',
        height: 180
      }
      fn(data)
    }, 1000)
  }
  const personThunk = thunkify(person)
  function *gen () {
    const data = yield personThunk('boy')
    console.log(data)
  }
  const g = gen()
  const next = g.next()
  next.value(data => {
    g.next(data)
  })
  ```
 * ## async函数
  
    async是Generator函数的语法糖。  
    比起Generator函数，async函数含有以下优点：  
    1. 内置执行器  
    调用函数不需要再使用next方法执行下一步，只要一次调用，就会自动执行返回最终结果。

    2. 更广的适用性  
    co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。

    3. 返回值是 Promise  
    async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作。

    4. 更好的语义  
    async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。


      ```javaScript
      function fetchUser() { 
        return new Promise((resolve, reject) => {
            fetch('https://api.github.com/users/superman66')
            .then((data) => {
                resolve(data.json());
            }, (error) => {
                reject(error);
            })
          });
        }

      async function getUserByAsync(){
        let user = await fetchUser();
        return user.id;
      }
      getUserByAsync()
      .then(v => console.log(v));
    ```
  
      async函数内部return返回的值，会成为then方法回调函数的参数。如果 async 函数内部抛出异常，则会导致返回的 Promise 对象状态变为 reject 状态。抛出的错误而会被 catch 方法回调函数接收到。

      await 表达式，这会使 async 函数暂停执行，等待 Promise  的结果出来，然后恢复async函数的执行并返回解析值（resolved）。

      比如上面的getUserByAsync函数，如果没有await，user被返回时是一个Promise，user.id就是undefined。

      如果await后面的异步操作出错，那么等同于async函数返回的 Promise 对象被reject。防止出错的方法，也是将其放在try...catch代码块之中。

      ```javaScript
      async function main() {
      try {
        const val1 = await firstStep();
        const val2 = await secondStep(val1);
        const val3 = await thirdStep(val1, val2);

        console.log('Final: ', val3);
      }
      catch (err) {
        console.error(err);
      }
    }
      ```




  