var timer
function interval(func, wait){
    var interv = function(){
      func.call(null);
      timer = setTimeout(interv, wait);
    };
  
    timer = setTimeout(interv, wait);
  }
  let count = 0
  
  var timer = interval(function(){
    log(2)
    
  },1000);

  function log(num) {
      count = count + num
    console.log(count);
  }
  
var stopbtn = document.getElementById("stop")
stopbtn.addEventListener('click', function() {
    window.clearTimeout(timer)

})
