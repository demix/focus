/**
 * ping.js
 *
 * changelog
 * 2014-03-07[21:24:50]:created
 *
 * @info yinyong,osx-x64,UTF-8,10.129.172.32,js,/Volumes/yinyong-1/focus/lpeditor/static/js
 * @author yanni4night@gmail.com
 * @version 0.0.1
 * @since 0.0.1
 */
define([], function() {

  var targetUrl = "http://10.11.202.231/~yinyong/ping/ping.php?product=lpeditor&";

  var Ping = {
    /**
     * [__send description]
     * @param  {[type]} search [description]
     * @return {[type]}        [description]
     */
    __send: function(search) {
      var img = new Image();
      img.src = targetUrl + search;
      return this;
    },
    /**
     * [send description]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    send: function(data) {
      var ret = [];
      if (!data) return;
      if (Array.isArray(data)) {
        data.forEach(function(item, index) {
          ret.push(encodeURIComponent(String(item)));
        });
      } else if ($.isPlainObject(data)) {
        $.each(data || {}, function(key, value) {
          ret.push(encodeURIComponent(key) + '=' + encodeURIComponent(String(value)));
        });
      } else {
        ret.push('msg=' + encodeURIComponent(String(data)));
      }
      return this.__send(ret.join('&'));
    }
  };

  //live time
  $(window).on('beforeunload', function() {
    try {
      var __loadtime = window.performance.now();
      Ping.send({
        livetime: Math.round(__loadtime)
      });
    } catch (e) {}
  });

  //send pv
  $(document).ready(function(e) {
    var pvinfo = {
      stamp:+new Date,
      ua: navigator.userAgent,
      search: location.search,
      fullscreen: +(document.webkitFullscreenEnabled || document.mozFullscreenEnabled || document.oFullscreenEnabled || document.msFullscreenEnabled || document.fullscreenEnabled),
      platform: navigator.platform,
      screen: [screen.width, screen.height].join('x'),
      referrer: document.referrer || "",
      cookie: +navigator.cookieEnabled,
      localstorage: + !! window.localStorage,
      touch: + !! window.TouchEvent,
      notification: + !! window.webkitNotifications,
      drag: +('ondrag' in window),
      worker: + !! window.Worker,
      flex: +!!(window.CSS && CSS.supports && (CSS.supports('display', '-webkit-flex') || CSS.supports('display', '-webkit-box') || CSS.supports('display', 'flex')))
    };
    try {
      $.extend(pvinfo, {
        memory: Math.round(window.performance.memory.usedJSHeapSize / 1024 / 1024)
      });
    } catch (e) {}
    Ping.send(pvinfo)
  });

  return Ping;
});