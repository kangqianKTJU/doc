var KEY = {
    UP:38,
    DOWN:40,
    W:87,
    S:83
}


//  键盘监听事件  一次只能监听一个按键
// $(document).ready(function(){
//     $(document).keydown(function(e){
//         console.log(e.which);
//         switch(e.which){
//             case KEY.UP:
//             var top = parseInt($("#paddleB").css("top"));
//             $("#paddleB").css("top",top-5);
//             break;

//             case KEY.DOWN:
//             var top = parseInt($("#paddleB").css("top"));
//             $("#paddleB").css("top",top+5);
//             break;

//             case KEY.W:
//             var top = parseInt($("#paddleA").css("top"));
//             $("#paddleA").css("top",top-5);
//             break;
            
//             case KEY.S:
//             var top = parseInt($("#paddleA").css("top"));
//             $("#paddleA").css("top",top+5);
//             break;
//         }
//     });

// });


var pingpong = {
    scoreA: 0,
    scoreB: 0
};
pingpong.pressedKeys = [];
pingpong.ball = {
    speed:5,
    x:150,
    y:100,
    directionX:1,
    directionY:1,
};

$(document).ready(function(){
    //  设置每隔30mm调用一次gameloop
    pingpong.timer = setInterval(gameloop, 30);
    
    $(document).keydown(function(e){
        pingpong.pressedKeys[e.which] = true;
    });

    $(document).keyup(function(e){
        pingpong.pressedKeys[e.which] = false;
    });
});

//  键盘监听循环
function gameloop(){
    movePaddles();
    moveBall();
}

//  键盘处理函数
function movePaddles(){
    if (pingpong.pressedKeys[KEY.UP]){
        var top = parseInt($("#paddleB").css("top"));
        $("#paddleB").css("top",top-5);
    }

    if (pingpong.pressedKeys[KEY.DOWN]){
        var top = parseInt($("#paddleB").css("top"));
        $("#paddleB").css("top",top+5);
    }

    if (pingpong.pressedKeys[KEY.W]){
        var top = parseInt($("#paddleA").css("top"));
        $("#paddleA").css("top",top-5);
    }

    if (pingpong.pressedKeys[KEY.S]){
        var top = parseInt($("#paddleA").css("top"));
        $("#paddleA").css("top",top+5);
    }
}

function moveBall(){
    var playgroundHeight = parseInt($("#playground").css("height"));
    var playgroundWidth = parseInt($("#playground").css("width"));
    var ball = pingpong.ball;

    //  右边检测
    if (ball.x + ball.speed * ball.directionX > playgroundWidth-20){
       // 右边玩家失败，左边玩家得分
       ball.x = 250;
       ball.y = 100;
       $("#ball").css({
           "top":ball.y,
           "left":ball.x,
       });
       ball.directionX = -1;
       pingpong.scoreA++;
       $("#scoreA").html(pingpong.scoreA);
    }

    //  左边检测
    if (ball.x + ball.speed * ball.directionX < 0){
        ball.x = 250;
        ball.y = 100;
        $("#ball").css({
           "top":ball.y,
           "left":ball.x,
        });
        ball.directionX = 1;
        pingpong.scoreB++;
        $("#scoreB").html(pingpong.scoreB);
        
    }

    //  顶部检测
    if (ball.y + ball.speed * ball.directionY < 0){
        ball.directionY = 1;
    }

    //  底部检测
    if (ball.y + ball.speed * ball.directionY > playgroundHeight-20){
        ball.directionY = -1;
    }

    

    //  检测左边球拍
    var paddleAX = parseInt($("#paddleA").css("left")) + parseInt($("#paddleA").css("width"));
    var paddleAYTop = parseInt($("#paddleA").css("top"));
    var paddleAYBottom = parseInt($("#paddleA").css("top")) + parseInt($("#paddleA").css("height"));
    if(ball.x + ball.speed * ball.directionX < paddleAX){
        if (ball.y + ball.speed * ball.directionY > paddleAYTop && ball.y + ball.speed * ball.directionY < paddleAYBottom ){
            ball.directionX = 1;
        }
    }

    //   检测右侧球拍
    var paddleBX = parseInt($("#paddleB").css("left"));
    var paddleBYTop = parseInt($("#paddleB").css("top"));
    var paddleBYBottom = paddleBYTop + parseInt($("#paddleB").css("height"));
    var ballRudios = parseInt($("#ball").css("width")) / 2;
    if (ball.x + ballRudios + ball.speed * ball.directionX >= paddleBX){
        if (ball.y + ball.speed * ball.directionY >= paddleBYTop && ball.y + ball.speed * ball.directionY <= paddleBYBottom){
            ball.directionX = -1;
        }
    }

    ball.x += ball.speed * ball.directionX;
    ball.y += ball.speed * ball.directionY;

    $("#ball").css({
        "left":ball.x,
        "top":ball.y
    });


}