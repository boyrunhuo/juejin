console.log("test 执行");

for(var i=0;i<10000;i++){
    console.log("delay");
    if(i==9999){
        loadStyle('lime.css');
    }
}


function loadStyle(url){
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
}