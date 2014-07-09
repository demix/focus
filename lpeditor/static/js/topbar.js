/**
 * topbar.js
 *
 * changelog
 * 2014-03-09[15:16:28]:created
 * 2014-06-26[08:39:26]:removed DialogPublish
 * 
 * @author yanni4night@gmail.com
 * @version 0.0.2
 * @since 0.0.1
 */
define(['draft','dialog','dialog-save','setting'], function(DraftManager,Dialog,DialogSave,Setting) {

    //mark right
    function Mark() {}
    Mark.prototype = {
        getDom: function() {
            return this.m$div;
        }
    };

    //Menu left
    function Menu() {}
    Menu.prototype = {
        getDom: function() {
            return this.m$div;
        }
    };

    //Top bar
    var MacTopbar = {
        __mInitialized: false,
        __mMarks: [],
        __mMenus: [],
        m$bar:null,
        m$mark:null,
        m$menu:null,
        /**
         * [init description]
         * @return {this}
         */
        init: function() {
            if (this.__mInitialized) {
                return this;
            }

            var $bar = this.m$bar = $('.topbar');
            var $mark = this.m$mark = $bar.find('.mark');
            var $menu = this.m$menu = $bar.find('.menu');

            this.__mInitialized = true;
            this.initEvt();

            return this;
        },
        /**
         * [initEvt description]
         * @return {this}
         */
        initEvt: function() {

            var self = this;

             $('.home').click(function(e){
                self.m$bar.show();
                setTimeout(function(){
                    $(e.target).hide();
                },500);
             });

            return self;
        },
        /**
         * [addMark description]
         * @param {Mark} mark
         */
        addMark: function(mark) {
            if (!mark instanceof Mark) {
                throw Error('mark has to be a Mark instance.');
            }

            this.m$mark.prepend(mark.getDom());
            this.__mMarks.push(mark);
            return this;
        },
        /**
         * [addMenu description]
         * @param {Menu} menu
         */
        addMenu:function(menu){
            if(!menu instanceof Menu){
                throw Error('menu has to be a Menu instance.');
            }
            this.m$menu.append(menu.getDom());
            this.__mMenus.push(menu);
            return this;
        },
        /**
         * [playMenu description]
         * @param  {[type]} menus
         * @return {[type]}
         * @todo menu depends on app or dialog
         */
        playMenu: function(menus) {

        },
        toggle:function(){
            this.m$bar.toggle(arguments);
        }
    };

    MacTopbar.init();

    //Show notify
    (function() {
        var notifyMark = new Mark();
        $.extend(notifyMark, {
            init: function() {
                var $notify = this.m$div = $('<div/>', {
                    'class': 'item notify',
                    'title':'隐藏菜单栏'
                });

                $notify.click(function(e) {
                    $('.home').show();
                    setTimeout(function() {
                       MacTopbar.toggle(false);
                    },300);
                });
            }
        });
        notifyMark.init();
        MacTopbar.addMark(notifyMark);
    })();
    //Show time
    (function() {
        var timeMark = new Mark();
        $.extend(timeMark, {
            init: function() {
                var self = this;
                self.m$div = $('<div/>', {
                    'class': 'item'
                });
                self.mWorker = new Worker('/static/js/mark-time.js');
                self.mWorker.onmessage = function(event) {
                    if (event.data) {
                        self.m$div.text(event.data);
                    }
                };
            }
        });
        timeMark.init();
        MacTopbar.addMark(timeMark);
    })();
    //Show battery
    (function() {
        var batteryMark = new Mark();
        $.extend(batteryMark, {
            init: function() {
                var self = this;
                self.m$div = $('<div/>', {
                    'class': 'item battery',
                    'title': '电池状态未知'
                });

                self.batteryRun();

                return this;
            },
            /**
             * [batteryRun description]
             * @return {[type]} [description]
             */
            batteryRun: function() {
                var self = this;
                try {
                    var battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery || navigator.msBattery;

                    function displayBatteryStats() {
                        if (battery.charging) {
                            self.switchStatus('charging');
                        } else {
                            self.switchStatus(+battery.level);
                        }
                    }
                    if (battery) {
                        displayBatteryStats();
                        battery.addEventListener("chargingchange", displayBatteryStats, false);
                        // battery.addEventListener("chargingtimechange", displayBatteryStats, false);
                        // battery.addEventListener("dischargingtimechange", displayBatteryStats, false);
                        battery.addEventListener("levelchange", displayBatteryStats, false);
                    }
                } catch (e) {
                    console.error(e)
                }
            },
            /**
             * [switchStatus description]
             * @param  {[type]} status [description]
             * @return {[type]}        [description]
             */
            switchStatus: function(status) {
                if ('number' === typeof status) {
                    switch (true) {
                        case 1 <= status:
                            this.switchIcon('level-full', '电池已充满');
                            break;
                        case 0.75 <= status:
                            this.switchIcon('level-100', '剩余电量:' + 100 * status + '%');
                            break;
                        case 0.5 <= status:
                            this.switchIcon('level-75', '剩余电量:' + 100 * status + '%');
                            break;
                        case 0.25 <= status:
                            this.switchIcon('level-50', '剩余电量:' + 100 * status + '%');
                            break;
                        case 0.1 <= status:
                            this.switchIcon('level-25', '剩余电量:' + 100 * status + '%');
                            break;
                        default:
                            this.switchIcon('level-empty', '请插入电源线');
                    }
                } else {
                    switch (status) {
                        case 'charging':
                            this.switchIcon('level-charging');
                            break;
                        default:
                            ;
                    }
                }

                return this;
            },
            /**
             * [switchIcon description]
             * @param  {[type]} classname [description]
             * @param  {[type]} title     [description]
             * @return {[type]}           [description]
             */
            switchIcon: function(classname, title) {
                this.m$div.removeClass(function(n) {
                    return /^level\-/.test(n)
                }).addClass(classname).attr('title', title || '');
                return this;
            }
        });
        batteryMark.init();
        MacTopbar.addMark(batteryMark);
    })();

    //network mark
    (function() {
        var networkMark = new Mark();
        $.extend(networkMark, {
            init: function() {
                this.m$div = $('<div/>', {
                    'class': 'item network'
                });
                this.runNetwork();
                return this;
            },
            runNetwork: function() {
                var self = this;
                try {
                        function displayOnlineStats() {
                            if (true===navigator.onLine) {
                                self.m$div.removeClass('off').addClass('on').attr('title','在线');
                            } else {
                                self.m$div.removeClass('on').addClass('off').attr('title','离线');
                            }
                        }
                        displayOnlineStats();
                        window.addEventListener('online', displayOnlineStats);
                        window.addEventListener('offline', displayOnlineStats);
                } catch (e) {}
            }
        });
        networkMark.init();
        MacTopbar.addMark(networkMark);
    })();


    //Draft menu
    (function(){
        var draftMenu = new Menu();
        $.extend(draftMenu,{
            init:function(){
                this.m$div =$('<a href="javascript:;" class="item save-draft">保存为草稿</a>');
                this.initEvt();
                return this;
            },
            initEvt:function(){
                this.m$div.click(function(e){
                    DraftManager.saveDraft()
                });
            }
        });
        draftMenu.init();
        MacTopbar.addMenu(draftMenu);
    })();

    //reorder dialogs menu
    (function(){
        var reOrderDialogsMenu = new Menu();
        $.extend(reOrderDialogsMenu,{
            init:function(){
                this.m$div =$('<a href="javascript:;" class="item reorder-dialogs">整理对话框</a>');
                this.initEvt();
                return this;
            },
            initEvt:function(){
                this.m$div.click(function(e){
                    Dialog.reArrange();
                });
            }
        });
        reOrderDialogsMenu.init();
        MacTopbar.addMenu(reOrderDialogsMenu);
    })();
 //save profile menu
    (function(){
        var saveProfileMenu = new Menu();
        $.extend(saveProfileMenu,{
            init:function(){
                this.m$div =$('<a href="javascript:;" class="item save-profile">同步到服务器</a>');
                this.initEvt();
                return this;
            },
            initEvt:function(){
                this.m$div.click(function(e){
                    DialogSave.toggle();
                });
            }
        });
        saveProfileMenu.init();
        MacTopbar.addMenu(saveProfileMenu);
    })();

    return MacTopbar;
});