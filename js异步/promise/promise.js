function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
      })
  }
  // 过了5s输出resolved
timeout(5000).then(() => {
console.log('resolved');
})