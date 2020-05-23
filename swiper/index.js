(function() {
    /**
     * @param {Object} opt  轮播图对象数据
     * @param {Element} wrap 要添加轮播图的元素
     */
    function Slider(opt, wrap) {
        this.wrap = wrap;
        // list 存储的是轮播图图片集合（img标签或者其他dom标签）
        this.list = opt.list || [];
        this.listLength = this.list.length;
        this.width = opt.width || wrap.width();
        this.height = opt.height || wrap.height();
        this.type = opt.type || "fade";
        // 设置是否显示左右按钮  如果没有传递这个属性则默认显示  显示的值为true
        this.showChangeBtn =
            opt.showChangeBtn || opt.showChangeBtn == undefined
                ? true
                : opt.showChangeBtn;
        this.showSpotBtn =
            opt.showSpotBtn || opt.showSpotBtn == undefined
                ? true
                : opt.showSpotBtn;
        this.autoTime = opt.autoTime || 5000;
        this.isAuto = opt.isAuto || opt.isAuto == undefined ? true : opt.isAuto;
        this.nowIndex = 0;
        this.isAnimate = false;
        this.timer = null;
        this.init = function() {
            // 初始化轮播图结构样式行为的工作
            // 1. 轮播图结构的构建
            this.createDom();
            // 2. 初始化样式
            this.initStyle();
            // 3. 绑定事件
            this.bindEvent();
            if (this.isAuto) {
                this.autoChange();
            }
        };
    }
    // 创建轮播图结构
    Slider.prototype.createDom = function() {
        var sliderWrapper = $('<div class="my-swiper-wrapper"></div>');
        var sliderContent = $('<ul class="my-swiper-list"></ul>');
        var leftBtn = $('<div class="my-swiper-btn my-swiper-lbtn">&lt;</div>');
        var rightBtn = $(
            '<div class="my-swiper-btn my-swiper-rbtn">&gt;</div>'
        );
        var spotDiv = $('<div class="my-swiper-spots"></div>');
        // 将轮播图内容插入到结构中
        for (var i = 0; i < this.list.length; i++) {
            $('<li class="my-swiper-item"></li>')
                .append(this.list[i])
                .appendTo(sliderContent);
            $("<span></span>").appendTo(spotDiv);
        }
        if (this.type == "animate") {
            $('<li class="my-swiper-item"></li>')
                .append($(this.list[0]).clone())
                .appendTo(sliderContent);
        }
        sliderWrapper
            .append(sliderContent)
            .append(leftBtn)
            .append(rightBtn)
            .append(spotDiv)
            .appendTo(this.wrap)
            .addClass("my-swiper-" + this.type);
    };
    Slider.prototype.initStyle = function() {
        // 设置轮播图的大小
        $(".my-swiper-wrapper", this.wrap)
            .css({
                width: this.width,
                height: this.height
            })
            .find(".my-swiper-item")
            .css({
                width: this.width,
                height: this.height
            });
        // 如果是淡入淡出效果的话
        if (this.type == "fade") {
            $(".my-swiper-item", this.wrap)
                .hide()
                .eq(this.nowIndex)
                .show();
        } else if (this.type == "animate") {
            $(".my-swiper-list", this.wrap).css({
                width: this.width * (this.listLength + 1)
            });
        }

        if (!this.showChangeBtn) {
            $(".my-swiper-btn", this.wrap).hide();
        } else {
            $(".my-swiper-btn", this.wrap).show();
        }
        if (!this.showSpotBtn) {
            $(".my-swiper-spots", this.wrap).hide();
        } else {
            $(".my-swiper-spots", this.wrap).show();
        }
        // 设置小圆点的样式
        $(".my-swiper-spots > span", this.wrap)
            .eq(this.nowIndex)
            .addClass("active");
    };

    Slider.prototype.bindEvent = function() {
        var self = this;
        // 点击左侧按钮
        $(".my-swiper-lbtn", this.wrap).click(function() {
            if (self.isAnimate) {
                return false;
            }
            self.isAnimate = true;
            // 如果当前图片的索引值为0 则点击左侧按钮的时候显示最后一张图片  索引值为listLength - 1
            if (self.nowIndex == 0) {
                if (self.type == "animate") {
                    $(".my-swiper-list", self.wrap).css({
                        left: -self.width * self.listLength
                    });
                }
                self.nowIndex = self.listLength - 1;
            } else {
                self.nowIndex--;
            }
            self.change();
        });
        $(".my-swiper-rbtn", this.wrap).click(function() {
            if (self.isAnimate) {
                return false;
            }
            self.isAnimate = true;
            // 如果当前图片的索引值为最后一张图片的索引值  则点击右侧按钮的时候显示第一张图片 索引值为0
            if (self.type == "fade" && self.nowIndex == self.listLength - 1) {
                self.nowIndex = 0;
            } else if (
                self.type === "animate" &&
                self.nowIndex == self.listLength
            ) {
                $(".my-swiper-list", this.wrap).css({
                    left: 0
                });
                self.nowIndex = 1;
            } else {
                self.nowIndex++;
            }
            self.change();
        });

        $(".my-swiper-wrapper", this.wrap)
            .mouseenter(function() {
                clearInterval(self.timer);
            })
            .mouseleave(function() {
                if (self.isAuto) {
                    self.autoChange();
                }
            });
        $(".my-swiper-spots > span", this.wrap).mouseenter(function() {
            if (self.isAnimate) {
                return false;
            }
            self.isAnimate = true;
            self.nowIndex = $(this).index();
            self.change();
        });
    };
    // 样式上的切换
    Slider.prototype.change = function() {
        var self = this;
        // 如果是淡入淡出的动画 则为所有的轮播内容添加动画效果 上一张图片淡出  当前图片淡入
        if (this.type == "fade") {
            $(".my-swiper-item", this.wrap)
                .fadeOut()
                .eq(this.nowIndex)
                .fadeIn(function() {
                    self.isAnimate = false;
                });
        } else if (this.type == "animate") {
            $(".my-swiper-list", this.wrap).animate(
                {
                    left: -this.width * this.nowIndex
                },
                function() {
                    self.isAnimate = false;
                }
            );
        }
        // 切换小圆点
        // nowIndex === listLength   代表的是当前是后面的第一张图片  需要让第0个小原点显示样式
        $(".my-swiper-spots > span", this.wrap)
            .removeClass("active")
            .eq(this.nowIndex % this.listLength)
            .addClass("active");
    };

    Slider.prototype.autoChange = function() {
        var self = this;
        this.timer = setInterval(function() {
            $(".my-swiper-rbtn", self.wrap).click();
        }, this.autoTime);
    };
    $.fn.extend({
        swiper: function(options) {
            var obj = new Slider(options, this);
            obj.init();
        }
    });
})();
