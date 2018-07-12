var j = 1;
function changeImg(){
    setInterval(changePeiyangImg,2000);
    
}
function changePeiyangImg(){
    j++;
    imgPeiyang = document.getElementById("imgPeiyang")
    imgPeiyang.src = "img/peiyang/"+j+".jpg";
    if (j >= 12){
        j = 0;
    }
}