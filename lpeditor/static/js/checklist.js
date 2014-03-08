/**
 * checklist.js
 *
 * changelog
 * 2014-03-08[18:14:04]:created
 *
 * @info yinyong,osx-x64,UTF-8,192.168.1.105,js,/Volumes/yinyong-1/focus/lpeditor/static/js
 * @author yanni4night@gmail.com
 * @version 0.0.1
 * @since 0.0.1
 */
define(['local'], function(LocalCache) {
    var $bg = $('.startup');
    var $login = $bg.find('.login');
    var $loginIcon = $login.find('.icon');
    var $starting = $bg.find('.starting');
    var $list = $bg.find('.list');
    var ua = navigator.userAgent;
    var CHECKING_LIST_VERSION = 0x0810;
    var KEY_CHECKLIST = 'Checklist';
    var isSafari7 = /AppleWebKit/.test(ua)&&/Version\/7/.test(ua)&&/Apple\sComputer/.test(navigator.vendor);

    /**
     * Output to emulate console window.
     * @param  {String} msg
     */
    function __console(msg) {
        if (msg) {
            $list.append($('<li/>').html('&gt; ' + String(msg)));
        }
    }
    /**
     * Check one item.
     * @param  {String}   name
     * @param  {Function} fn
     * @return {Boolean}
     */
    function check(name, fn) {
        var result = false;
        if (!name || undefined === fn) return;
        try {
            if ('function' === typeof fn) {
                result = !! fn();
            } else {
                result = !! fn;
            }
        } catch (e) {
            result = false;
        }

        __console(name + ' ------&gt; ' + (result ? '<font>pass</font>' : '<font color=blue>fail</font>'));
        return result;
    };
    //checking items
    var expirments = [
        ['window.localStorage', !! window.localStorage],
        ['window.console', !! (window.console && console.error && console.log && console.warn)],
        ['Date.now()', !!Date.now],
        ['background-size:cover',
            function() {
                //safari does not have CSS object
                return isSafari7||CSS.supports('background-size', 'cover');
            }
        ],
        ['calc',
            function() {
                //safari does not have CSS object
                return isSafari7||(CSS.supports('height', '-webkit-calc(100% - 10px)') || CSS.supports('height', '-moz-calc(100% - 10px)') || CSS.supports('height', 'calc(100% - 10px)'))
            }
        ],
        ['Adobe flash',
            function() {
                return navigator.mimeTypes['application/x-shockwave-flash'];
            }
        ],
        ['Array.isArray()', !!Array.isArray],
        ['Array.prototype.forEach', !! Array.prototype.forEach],
        ['Array.prototype.some', !! Array.prototype.some],
        ['Array.prototype.every', !! Array.prototype.every],
        ['Array.prototype.reduce', !! Array.prototype.reduce],
        ['Array.prototype.filter', !! Array.prototype.filter],
        ['Array.prototype.indexOf', !! Array.prototype.indexOf],
        ['String.prototype.trim', !! String.prototype.trim],
        ['Object.freeze', !! Object.freeze],
        ['Object.seal', !! Object.seal],
        ['Object.keys', !! Object.keys],
        ['window.Worker', !! window.Worker],
        ['Laptop screen size', screen.width > 550],
        ['Not handheld device', !/(android|ipad|iphone)/i.test(navigator.userAgent)]
    ];

    var totalLenth= expirments.length;

    $login.click(function(e) {
        $bg.hide();
    });

    var checkingInter, fault = 0;

    function startCheck(callbackfn) {
        var clistCache = LocalCache.load(KEY_CHECKLIST);
        //we need check again when updated or a week later,or when I change the version.
        if (clistCache && ua == clistCache.ua && (Date.now()-clistCache.timestamp<7*24*3600*1000) &&CHECKING_LIST_VERSION == clistCache.version) {
            //This version of current browser has been checked
            $starting.text("点击进入").show();
            $loginIcon.show();
            return ('function' === typeof callbackfn) && callbackfn(true);
        }
        //Need to check immediatly
        $list.show();
        __console('正在为第一次运行做检查......')

        checkingInter = setInterval(function() {
            var pair = expirments.shift();
            if (pair) {
                fault += !check(pair[0], pair[1]);
            } else {
                //checking complete.

                __console('完成检查 '+totalLenth+' 项,发现 ' + fault + ' 个错误.');

                if (0 === fault) {
                    //No faults,then show then entrence
                    $list.fadeOut('slow', function(e) {
                        $starting.text("点击进入").show();
                        $loginIcon.show();
                    });
                    //and save the result
                    LocalCache.update(KEY_CHECKLIST, {
                        version: CHECKING_LIST_VERSION,
                        ua: ua,
                        timestamp: +new Date
                    });
                }else{
                    __console('<font color=red>宿主环境不满足启动条件.</font> 查看<a href="http://www.google.cn/intl/zh-CN/chrome/browser/"><font color=yellow>解决方案</font></a>');
                }
                //notify what ever
                ('function' === typeof callbackfn) && callbackfn(!fault);

                clearInterval(checkingInter);
            }
        }, 1000);
    }

    return {
        start: function(callbackfn) {
            $(document).ready(function() {
                startCheck(callbackfn);
            });
        }
    };
});