function compare (x, y) {
    let p
    
    // 判断NaN等于NaN
    if (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y)) {
      return true
    }
    
    // 直接用三等号判断
    if (x === y) {
      return true
    }
    
    // 判断typeof是function的，String和Number类型不严格（让1等于‘1’）
    if (typeof x === 'function' && typeof y === 'function') {
      if ((x instanceof RegExp && y instanceof RegExp) ||
      (x instanceof String || y instanceof String) ||
      (x instanceof Number || y instanceof Number)) {
        return x.toString() === y.toString()
      } else {
        return false
      }
    }
    // Date 类型用时间戳判断
    if (x instanceof Date && y instanceof Date) {
      return x.getTime() === y.getTime()
    }
    
    // 如果一个是对象，一个不是对象，就肯定不相等
    if (!(x instanceof Object && y instanceof Object)) {
      return false
    }
  
    // 判断Protype，好像有点问题，有待验证
    if (x.prototype !== y.prototype) {
      return false
    }
    
    // 判断constructor
    if (x.constructor !== y.constructor) {
      return false
    }
    
    // 判断x是否含有每个y中的属性值
    for (p in y) {
      if (!x.hasOwnProperty(p)) {
        return false
      }
    }
    
    // 判断y是否含有每个x中的属性值
    for (p in x) {
      if (!y.hasOwnProperty(p)) {
        return false
      }
      
      // 如果属性值都有，也就是key都有，但是key对应的值类型不同，也不行
      if (typeof y[p] !== typeof x[p]) {
        return false
      }
      
      //对象里的属性可能还是对象，再递归
      if (!compare(x[p], y[p])) {
        return false
      }
    }
  
    return true
  }
  
  const test1 = {
      name: 1,  b:[{age:12,a: 1}, {name: 'chenjianbin', list:[1,2,3,4]}],cat: 2
    }
    const test2 = {
      name: 1, cat: 2, b:[{age:12,a: 1}, {name: 'chenjianbin', list:[1,2,3,4]}]
    }
    console.log('00000', compare(test1, test2))