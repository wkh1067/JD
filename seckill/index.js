var countDownCount = new Date('2020-04-16 20:00:00')
setInterval(function () {
    var countTime = countDownCount.getTime() - new Date().getTime();
    var hour = Math.floor(countTime / 1000 / 60 / 60);
    var minute = Math.floor(countTime / 1000 / 60 % 60);
    var second = Math.floor(countTime / 1000 % 60);
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (minute < 10) {
        minute = '0' + minute;
    }
    if (second < 10) {
        second = '0' + second;
    }
    $('.timmer__unit--hour').text(hour);
    $('.timmer__unit--minute').text(minute);
    $('.timmer__unit--second').text(second)

}, 1000) 


$('.seckill-list').swiper({
    list: $('.seckill-wrapper-item'),
    width: 800,
    height: 260,
    showSpotBtn: false,
    type: 'animate'
})
$('.seckill-brand').swiper({
    list: $('.seckill-brand-item'),
    width:200,
    height:260,
    showChangeBtn: false,
    autoTime: 2000
})