$('.service_list').on('mouseenter', '.service_frame ', function () {
    $('.service_pop').css({
        transform: 'translateY(-100%)'
    })
    $('.service_frame_on').removeClass('service_frame_on')
    $(this).addClass('service_frame_on')
    $('.service_frame:not(.service_frame2)').css({
        marginTop: -40
    })
    if ($(this).hasClass('service_frame2')) {
        $(this).css({
            marginTop: -55
        })
    }
})

$('.close-btn').click(function () {
    $('.service_pop').css({
        transform: 'translateY(0%)'
    })
    $('.service_frame_on').removeClass('service_frame_on')
    $('.service_frame').css({
        marginTop: 0
    })
})