/**
 * dialog.js
 *
 * changelog
 * 2014-03-07[10:31:42]:created
 *
 * @info yinyong,osx-x64,UTF-8,10.129.172.32,js,/Volumes/yinyong-1/focus/lpeditor/static/js
 * @author yanni4night@gmail.com
 * @version 0.0.1
 * @since 0.0.1
 */
define(['local', 'jquery-ui'], function(LocalCache) {

    var DIALOG_CACHE_PREFIX = 'Dialog_';
    //global dialog z-index
    var gCurrentZindex = 1000;

    function Dialog(container, options) {
        if (this === window) return new Dialog(arguments);
        var opt = this.opt = {
            closer: '.closer',
            bar: '.bar',
            savedPosition: true
        };
        $.extend(opt, options || {});
        this.m$container = $(container);
        this.m$bar = this.m$container.find(opt.bar);
        this.m$closer = this.m$container.find(opt.closer);

        this.mCacheName = DIALOG_CACHE_PREFIX + String(container);

        if (this.opt.savedPosition) {
            var cacheJson = LocalCache.load(this.mCacheName) || {};
            (+cacheJson.left) && this.m$container.css('left', cacheJson.left + 'px');
            (+cacheJson.top) && this.m$container.css('top', cacheJson.top + 'px');
            (+cacheJson.width) && this.m$container.css('width', cacheJson.width + 'px');
            (+cacheJson.height) && this.m$container.css('height', cacheJson.height + 'px');
        }

        this.__bindEvent();
    }

    Dialog.prototype = {
        __bindEvent: function() {
            var self = this;
            if (this.__eventBinded) return this;

            //dialog top and draggable
            this.m$container.mousedown(function(e) {
                self.top();
            }).draggable({
                handle: self.opt.bar,
                containment: 'parent',
                snap: '.editor-content',
                stop: function(event, ui) {
                    self.__saveCache(ui.position);
                }
            }).resizable({
                minHeight: 150,
                minWidth: 150,
                stop: function(event, ui) {
                    self.__saveCache(ui.size);
                }
            });
            //dialog close
            this.m$closer.click(function(e) {
                self.hide();
            });

            this.__eventBinded = true;
            return this;
        },
        __saveCache: function(cache) {
            return LocalCache.update(this.mCacheName, cache);
        },
        top: function() {
            this.m$container.css('z-index', ++gCurrentZindex);
        },
        show: function() {
            this.m$container.show();
            return this;
        },
        hide: function() {
            this.m$container.hide();
            return this;
        },
        toggle: function() {
            this.m$container.toggle();
            return this;
        },
    };
    //**********************\\



    return Dialog;
});