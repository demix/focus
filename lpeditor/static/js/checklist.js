/**
 * checklist.js
 *
 * changelog
 * 2014-03-08[18:14:04]:created
 * 2014-03-24[18:35:10]:removed dep on jQuery
 *
 * @info yinyong,osx-x64,UTF-8,192.168.1.105,js,/Volumes/yinyong-1/focus/lpeditor/static/js
 * @author yanni4night@gmail.com
 * @version 0.0.1
 * @since 0.0.1
 */
define(['local'], function(LocalCache) {
    var $bg = document.getElementsByClassName('startup')[0];
    var $login = $bg.getElementsByClassName('login')[0];
    var $loginIcon = $login.getElementsByClassName('icon')[0];
    var $starting = $bg.getElementsByClassName('starting')[0];
    var $list = $bg.getElementsByClassName('list')[0];
    var ua = navigator.userAgent;
    var CHECKING_LIST_VERSION = 0x0810;
    var KEY_CHECKLIST = 'Checklist';
    var isSafari7 = /AppleWebKit/.test(ua) && /Version\/7/.test(ua) && /Apple\sComputer/.test(navigator.vendor);

    /**
     * Output to emulate console window.
     * @param  {String} msg
     */
    function __console(msg) {
        if (msg) {
            var li = document.createElement('li');
            li.innerHTML = '&gt; ' + String(msg);
            $list.appendChild(li);
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
        ['jQuery', window.jQuery, 1],
        ['navigator.onLine', undefined !== navigator.onLine, 0],
        ['window.localStorage', !! window.localStorage, 1],
        ['window.XMLHttpRequest', !! window.XMLHttpRequest, 1],
        ['window.console', !! (window.console && console.error && console.log && console.warn), 1],
        ['Date.now()', !! Date.now, 1],
        ['background-size:cover',
            function() {
                //safari does not have CSS object
                return isSafari7 || CSS.supports('background-size', 'cover');
            },
            0
        ],
        ['calc',
            function() {
                //safari does not have CSS object
                return isSafari7 || (CSS.supports('height', '-webkit-calc(100% - 10px)') || CSS.supports('height', '-moz-calc(100% - 10px)') || CSS.supports('height', 'calc(100% - 10px)'))
            },
            0
        ],
        ['Adobe flash',
            function() {

                if (window.ActiveXObject) {
                    try {
                        new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                        return true;
                    } catch (e) {
                        return !!navigator.plugins['Shockwave Flash'];
                    }
                } else {
                    return !!navigator.mimeTypes['application/x-shockwave-flash'];
                }
            },
            1
        ],
        ['Array.isArray()', !! Array.isArray, 1],
        ['Array.prototype.forEach', !! Array.prototype.forEach, 1],
        ['Array.prototype.some', !! Array.prototype.some, 1],
        ['Array.prototype.every', !! Array.prototype.every, 1],
        ['Array.prototype.reduce', !! Array.prototype.reduce, 1],
        ['Array.prototype.filter', !! Array.prototype.filter, 1],
        ['Array.prototype.indexOf', !! Array.prototype.indexOf, 1],
        ['String.prototype.trim', !! String.prototype.trim, 1],
        ['Object.freeze', !! Object.freeze, 1],
        ['Object.seal', !! Object.seal, 1],
        ['Object.keys', !! Object.keys, 1],
        ['window.Worker', !! window.Worker, 1],
        ['Laptop screen size', screen.width > 550, 1],
        ['Not handheld device', !/(android|ipad|iphone)/i.test(navigator.userAgent), 1]
    ];

    var totalLenth = expirments.length;

    $login.addEventListener('click', function(e) {
        $bg.style.display = 'none';
    }, false);

    var checkingInter, fault = 0;

    function startCheck(callbackfn) {
        var clistCache = LocalCache.load(KEY_CHECKLIST);
        //we need check again when updated or a week later,or when I change the version.
        if (!~location.search.indexOf('check=force') && clistCache && ua == clistCache.ua && (+new Date - clistCache.timestamp < 7 * 24 * 3600 * 1000) && CHECKING_LIST_VERSION == clistCache.version) {
            //This version of current browser has been checked
            $starting.innerText = "点击进入";
            $starting.style.display = 'block';
            $loginIcon.style.display = 'block';
            return ('function' === typeof callbackfn) && callbackfn(true);
        }
        //Need to check immediatly
        $list.style.display = 'block';
        __console('正在为第一次运行做检查......')

        checkingInter = setInterval(function() {
            var pair = expirments.shift();
            if (pair) {
                fault += !check(pair[0], pair[1]);
            } else {
                //checking complete.

                __console('完成检查 ' + totalLenth + ' 项,发现 ' + fault + ' 个错误.');

                if (0 === fault) {
                    //No faults,then show then entrence
                    $list.style.display = 'none';
                    $starting.innerText = "点击进入";
                    $starting.style.display = 'block';
                    $loginIcon.style.display = 'block';

                    //and save the result
                    LocalCache.update(KEY_CHECKLIST, {
                        version: CHECKING_LIST_VERSION,
                        ua: ua,
                        timestamp: +new Date
                    });
                } else {
                    __console('<font color=red>宿主环境不满足启动条件.</font> 关闭隐私/无痕模式，或查看<a href="http://www.google.cn/intl/zh-CN/chrome/browser/"><font color=yellow>解决方案</font></a>');
                }
                //notify what ever
                ('function' === typeof callbackfn) && callbackfn(!fault);

                clearInterval(checkingInter);
            }
        }, 1000);
    }

    return {
        start: function(callbackfn) {
            window.addEventListener('load' ,function() {
                startCheck(callbackfn);
            },false);
        }
    };
});