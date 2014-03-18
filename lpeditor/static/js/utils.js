/**
 * utils.js
 *
 * changelog
 * 2014-03-18[12:20:11]:created
 *
 * @info yinyong,osx-x64,UTF-8,10.129.175.199,js,/Volumes/yinyong/focus/lpeditor/static/js
 * @author yanni4night@gmail.com
 * @version 0.0.1
 * @since 0.0.1
 */
define([], function() {
    var Utils = {
        fireEvent: function(element, event) {
            if (document.createEventObject) {
                var evt = document.createEventObject();
                return element.fireEvent('on' + event, evt)
            } else {
                var evt = document.createEvent('HTMLEvents');
                evt.initEvent(event, true, true);
                return !element.dispatchEvent(evt);
            }
        },
        popwin: function(url) {
            if (!url) {
                return this;
            }

            var a = document.createElement('a');
            a.setAttribute('style', 'display:none');
            a.setAttribute('target', '_blank');
            a.setAttribute('href', url);
            document.body.appendChild(a);

            if (a.click) {
                a.click();
            } else {
                this.fireEvent(a, 'click');
            }
            document.body.removeChild(a);

            return this;
        }
    };
    return Utils;
});