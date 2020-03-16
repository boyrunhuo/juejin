function Animal(){
  
    // 私有变量
    var series = "哺乳动物";
    function run(){
      console.log("Run!!!");
    }
    run()
    // 特权方法
    this.getSeries = function(){
      return series;
    };
  }
Animal()
console.log(new Animal());

var animal = new Animal()
console.log("animal",animal,animal.getSeries())