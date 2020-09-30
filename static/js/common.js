var countdown = 3;

function setTime(obj) {
    if (countdown == 0) {
        obj.prop('disabled', false);
        obj.css({ color: "#10C4A7" });
        obj.text("重新发送");
        countdown = 60;
        return;
    } else {
        obj.prop('disabled', true);
        obj.css({ color: "#A7ABAA" });
        obj.text("已发送 (" + countdown + "s)");
        countdown--;
    }
    setTimeout(function() { setTime(obj) }, 1000);
}
$('.getCode').click(function() {
    console.log(11)
    var obj = $(this);
    setTime(obj);
});
$('.admin').on('keyup',function(){
    if($('.admin').val()){
        $('.number').show();
    }else{
        $('.number').hide();
    }
    if($('.admin').val() && $('.password').val()){
        $('.goToNext,.btn,.btn1').css('background','#10C4A7FF')
    }else{
        $('.goToNext,.btn,.btn1').css('background','#93E4D7FF')
    }
});
$('.textWord').on('keyup',function(){
    if($('.textWord').val()){
        $('.word').show();
    }else{
        $('.word').hide();
    }

});
$('.password').on('keyup',function(){
    if($('.admin').val() && $('.password').val()){
        $('.goToNext,.btn,.btn1').css('background','#10C4A7FF')
    }else{
        $('.goToNext,.btn,.btn1').css('background','#93E4D7FF')
    }
});
$('.textCode').on('keyup',function(){
    if($('.textCode').val()){
        $('.code').show();
    }else{
        $('.code').hide();
    }

});
$('.number').on('click',function(){
    $('.admin').val('');
    $('.number').hide();
})
$('.word').on('click',function(){
    $('.password').val('');
    $('.word').hide();
})
$('.code').on('click',function(){
    $('.password').val('');
    $('.code').hide();
})
$('.change').on('click',function(){
    window.location.href = './reset.html'
})
$('.goToNext').on('click',function(){
    var reg = /^\d{11}$/
    if(reg.test($('.admin').val()) && $('.password').val()==123){
        window.location.href = './coupons.html'
    }else{
        $('.remind').show();
        setTimeout(function(){
            $('.remind').hide();
        },1000)
    }
    
})

$('.goCode').on('click',function(){
    $('.password').hide();
    $('.textCode').show();
    $('.getCode').show();
    $('.goToCode').hide();
    $('.goToWord').show();
    $('.number').hide();
    $('.word').hide();
    $('.code').hide();
    $('.goToNext,.btn,.btn1').css('background','#93E4D7FF');
    $('.admin').val('');
})
$('.goWord').on('click',function(){
    $('.password').show();
    $('.textCode').hide();
    $('.getCode').hide();
    $('.goToCode').show();
    $('.goToWord').hide();
    $('.number').hide();
    $('.word').hide();
    $('.code').hide();
    $('.goToNext,.btn,.btn1').css('background','#93E4D7FF');
    $('.admin').val('');
})
$('.btn').on('click',function(){
    var reg = /^\d{11}$/,
        reg1 = /^\d{6}$/;
    if(reg.test($('.admin').val()) && reg1.test($('.password').val())){
        $('.reset').hide();
        $('.setting1').show();
        $('.btn').hide();
        $('.btn1').show();
    }else{
        $('#remind').show();
        setTimeout(function(){
            $('#remind').hide();
        },1000)
    }
})

$('.btn1').on('click',function(){
    if($('.password').val().length >= 6 && $('.password').val().length <= 16){
        $('#remind1').show();
        setTimeout(function(){
            window.location.href = './login.html'
        },1000)
    }else{
        $('#remind2').show();
        setTimeout(function(){
            $('#remind2').hide();
        },1000)
    }
})

