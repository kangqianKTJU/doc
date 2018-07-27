$(function(){

    var matchingGame = {};
    matchingGame.deck = [
        'cardAK','cardAK',
        'cardAQ','cardAQ',
        'cardAJ','cardAJ',
        'cardBK','cardBK',
        'cardBQ','cardBQ',
        'cardBJ','cardBJ',
    ];

    //  生成随机的字牌排列数组，sort()传入的必须是函数
    matchingGame.deck.sort(shuffle);

    //  复制纸牌容器
    for(var i = 0; i < 11; i++){
        $(".card:first-child").clone().appendTo("#cards");
    }
    $("#cards").children().each(function(index){
        $(this).css({
            "left":($("#this").width() + 100 ) * (index % 4),
            "top":($("#this").height() + 140 ) * Math.floor(index / 4)
        });

        var pattern = matchingGame.deck.pop();  //  删除并返回数组的最后一个元素
        $(this).find(".back").addClass(pattern);
        $(this).attr("data-pattern",pattern);
        $(this).click(selectCard);
    });
});

function shuffle(){
    return 0.5 - Math.random();
}

function selectCard(){
    if ($(".card-flipped").size() > 1){
        return;
    }
    $(this).addClass("card-flipped");
    if ($(".card-flipped").size() == 2){
        setTimeout(checkPattern, 700);
    }
}

function checkPattern(){
    if (isMatchPattren()){
        $(".card-flipped").removeClass("card-flipped").addClass("card-removed");
        $(".card-removed").bind("webkitTransitionEnd",removeTookCards);
    }else{
        $(".card-flipped").removeClass("card-flipped");
    }
}

function isMatchPattren(){
    var cards = $(".card-flipped");
    var pattern = $(cards[0]).data("pattern");
    var anonotherPattern = $(cards[1]).data("pattern");
    return (pattern == anonotherPattern);
}

function removeTookCards(){
    $(".card-removed").remove();
}