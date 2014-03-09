/**
 * topbar.js
 *
 * changelog
 * 2014-03-09[15:16:28]:created
 *
 * @info yinyong,osx-x64,UTF-8,192.168.1.105,js,/Volumes/yinyong-1/focus/lpeditor/static/js
 * @author yanni4night@gmail.com
 * @version 0.0.1
 * @since 0.0.1
 */
define([], function() {

    var MarkProto = {
        getDom: function() {
            return this.m$div;
        }
    };

    function Mark() {}
    Mark.prototype = MarkProto;

    var MacTopbar = {
        __mInitialized: false,
        __mMarks: [],
        /**
         * [init description]
         * @return {[type]}
         */
        init: function() {
            if (this.__mInitialized) {
                return this;
            }

            var $bar = this.m$bar = $('.topbar');
            var $mark = this.m$mark = $bar.find('.mark');

            this.__mInitialized = true;
            return this.initEvt();
        },
        /**
         * [initEvt description]
         * @return {[type]}
         */
        initEvt: function() {

            var self = this;

            return this;
        },
        /**
         * [addMark description]
         * @param {[type]} mark [description]
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
         * [playMenu description]
         * @param  {[type]} menus
         * @return {[type]}
         */
        playMenu: function(menus) {

        }
    };

    MacTopbar.init();

    //Show notify
    (function() {
        var notifyMark = new Mark();
        $.extend(notifyMark, {
            init: function() {
                this.m$div = $('<div/>', {
                    'class': 'item notify'
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
                    'title': '电池不可用'
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
                    var battery = navigator.battery || navigator.mozBattery;

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
                    if (undefined !== navigator.onLine) {

                        function displayOnlineStats() {
                            if (navigator.onLine) {
                                self.m$div.removeClass('off');
                            } else {
                                self.m$div.removeClass('on');
                            }
                        }
                        displayOnlineStats();
                        window.addEventListener('online', displayOnlineStats);
                        window.addEventListener('offline', displayOnlineStats);
                    }

                } catch (e) {}
            }
        });
        networkMark.init();
        MacTopbar.addMark(networkMark);
    })();

    return MacTopbar;
});