(function () {

    var logoGb = $('.logo-bg');
    $('.logo').hover(function () {
        logoGb.fadeIn().removeClass('hover-out');
        if (logoGb.hasClass('hover-in')) {
            return false;
        }
        logoGb.css({
            // 重新的获取动图资源
            backgroundImage: 'url(http://img1.360buyimg.com/da/jfs/t1/31918/19/6335/274370/5c90a8beEefd9bfb9/e24970e34ce77262.gif?v=' + Math.random() + ')'
        }).addClass('hover-in').removeClass('animate-end')
        setTimeout(function () {
            // 当动画结束之后 添加上class 类名animate-end
            logoGb.addClass('animate-end')
            // 动画结束之后 只有鼠标hover出去之后才会消失
            $('.hover-out').fadeOut();
        }, 4000)

    }, function () {
        //  如果hover出去 并且当前的动画已经结束 则让logo消失
        $('.animate-end').fadeOut().removeClass('hover-in')
        // 当hover移除 添加hover-out类名 
        logoGb.addClass('hover-out')
    })


    var placeholdersData = ['小饼干', '仔仔面', '商务小布鞋']
    setInterval(function () {
        $('#search-inp').attr('placeholder', placeholdersData[Math.floor(Math.random() * 3)])
    }, 2000)

    window.renderList = function(data) {
        var str = '';
        data = data.result;
        for (var i = 0; i < data.length; i++) {
            str += `<li>${data[i][0]}</li>`
        }
        console.log(data)
        $('.search-list').html(str).show()
    }

    $('#search-btn').click(function() {
        var val = $('#search-inp').val();
        if (val) {
            $.ajax({
                url: 'https://suggest.taobao.com/sug',
                type: 'get',
                // code=utf-8&q=&_ksTS=1586944493434_505&callback=jsonp506&k=1&area=c2c&bucketid=1
                data: {
                    code: 'utf-8',
                    q: val,
                    callback: 'renderList'
                },
                dataType: 'jsonp'
            })
        }
    })
    var timer = null
    $('.search').mouseleave(function () {
        timer = setTimeout(function () {
            $('.search-list').hide()
        }, 500)
    }).mouseenter(function () {
        clearTimeout(timer);
    })
    var searchInpTimer = null;
    $('#search-inp').on('input', function() {
        clearTimeout(searchInpTimer)
        searchInpTimer = setTimeout(function() {
            $('#search-btn').click();
        }, 500)
    }).click(function () {
        clearTimeout(searchInpTimer)
        searchInpTimer = setTimeout(function() {
            $('#search-btn').click();
        }, 500)
    })
}())