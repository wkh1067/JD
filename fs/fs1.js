(function () {
    var menuList = [{
        titles: ['家用电器'],
        content: {
            tabs: ['家电馆', '镇乡专卖店', '家电服务'],
            subs: [{
                title: '电视',
                items: ["曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件", "曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件", "曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件"]
            }, {
                title: '空调',
                items: ["壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新"]
            }]
        }
    }, {
        titles: ['手机', '运营商', '数码'],
        content: {
            tabs: ['手机'],
            subs: [{
                title: '手机',
                items: ["曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件"]
            }, {
                title: '手表',
                items: ["壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新"]
            }]
        }
    }, {
        titles: ['电脑', '办公'],
        content: {
            tabs: ['家电馆', '镇乡专卖店', '家电服务'],
            subs: [{
                title: '电视',
                items: ["曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件"]
            }, {
                title: '空调',
                items: ["壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新", "壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新", "壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新"]
            }]
        }
    }, {
        titles: ['家居', '家具', '家装', '厨具'],
        content: {
            tabs: ['家居', '镇乡专卖店', '家电服务'],
            subs: [{
                title: '电视',
                items: ["曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件"]
            }, {
                title: '空调',
                items: ["壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新", "壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新", "壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新"]
            }]
        }
    }];
    
    function renderMenuList(data) {
        var str = '';
        for (var i = 0; i < data.length; i++) {
            var item = data[i]
            str += `  <li>
               ${item.titles.map(function(title){return `<a href="#">${title}</a>`}).join('<span>/</span>')}
            </li>`
        }
        $('.fs-menu').html(str)
    }
    
    function renderMenuContent(data) {
        var tabsNav = $('<div class="tabs-nav"></div>');
        var cateDetail = $('<div class="cate-detail"></div>');
        data.tabs.forEach(function(tab) {
            $(`<a href="">${tab}
            <i class="iconfont">&#xe743;</i>
        </a>`).appendTo(tabsNav)
        })
        data.subs.forEach(function (sub) {
            var oDl = $('<dl class="cate-item"></dl>');
            $(`<dt>
            <a href="#">${sub.title}
                <i class="iconfont">&#xe743;</i>
            </a>
        </dt>`).appendTo(oDl)
            var oDD = $('<dd></dd>');
            sub.items.forEach(function (item) {
                $(`<a href="">${item}</a>`).appendTo(oDD)
            })
            oDl.append(oDD).appendTo(cateDetail)
        })
    
        $('.menu-content').empty().append(tabsNav).append(cateDetail)
    
    }
    renderMenuList(menuList)
    var timer = null;
    $('.fs-menu').on('mouseenter', 'li', function () {
        clearTimeout(timer)
        $(this).addClass('menu-item-on');
        $('.menu-content').show();
        var index = $(this).index();
        renderMenuContent(menuList[index].content)
    
    }).on('mouseleave', 'li', function () {
        $(this).removeClass('menu-item-on');
        timer = setTimeout(function () {
            $('.menu-content').hide() 
        }, 500)
    })

    $('.menu-content').mouseenter(function () {
        clearTimeout(timer)
    }).mouseleave(function () {
        timer = setTimeout(function () {
            $('.menu-content').hide() 
        }, 500)
    })
} ())