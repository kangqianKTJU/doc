var welcomeSen = "欢迎光临我的网站，如有建议，还请多多指教!!! >_<";
var i = 0;
function init(){
    var welcomeObj = document.getElementById("welcome");
    setInterval(welcomeFun,300);
}


function welcomeFun(){
    var str = welcomeSen.substring(0,i);
    welcome.innerHTML = str;
    i++;
    if (i > welcomeSen.length){
        i = 0;
    }
}

$(function(){
    $('.carousel').carousel({
        interval: 2000
      });
    
});