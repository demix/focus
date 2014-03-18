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

    /**
     * Dialog super construct function.
     * @param {String} container
     * @param {Object} options
     */
    function Dialog(container, options) {
        var opt = this.opt = {
            closer: '.closer', //close button selector.
            bar: '.bar', //dialog top bar selector.
            name: '.name', //dialog title selector.
            content: '.content', //dialog content selector.
            saveStatus: true, //if status(position+size) needs to be saved.
            resizable: true ,//if it could be resizable.
            minHeight: 150,
            minWidth: 150
        };

        $.extend(opt, options || {});

        this.m$container = $(container);
        this.m$bar = this.m$container.find(opt.bar);
        this.m$closer = this.m$container.find(opt.closer);
        this.m$content = this.m$container.find(opt.content);
        this.m$name = this.m$container.find(opt.name);

        this.mCacheName = DIALOG_CACHE_PREFIX + String(container);

        //Try read the saved position and size.
        if (this.opt.saveStatus) {
            var cacheJson = LocalCache.load(this.mCacheName) || {};
            (+cacheJson.left > 0) && this.m$container.css('left', cacheJson.left + 'px');
            (+cacheJson.top > 0) && this.m$container.css('top', cacheJson.top + 'px');
            (+cacheJson.width > 0) && this.m$container.css('width', cacheJson.width + 'px');
            (+cacheJson.height > 0) && this.m$container.css('height', cacheJson.height + 'px');
        }

        this.__bindEvent();

        return this;
    }

    Dialog.prototype = {
        __eventBinded: false,
        /**
         * Inner binding event,just only once.
         * @return {[type]} [description]
         */
        __bindEvent: function() {
            var self = this;
            if (this.__eventBinded) return this;

            //dialogs have to be draggable
            self.m$container.mousedown(function(e) {
                //mouse down means to top layer
                self.tryTop();
            }).draggable({
                opacity:0.7,
                handle: self.opt.bar, //drag a dialog by only its bar
            //    containment: 'window',
                stop: function(event, ui) {
                    if(ui.position.left<0){
                        self.m$container.css('left',ui.position.left=0);
                    } if(ui.position.top<20){
                        self.m$container.css('top',ui.position.top=20);
                    }
                    //save last postion
                    self.__saveCache(ui.position);
                }
            });
            //dialogs may be resizable
            this.opt.resizable && this.m$container.resizable({
                minHeight: self.opt.minHeight,
                minWidth: self.opt.minWidth,
                stop: function(event, ui) {
                    //save last size
                    self.__saveCache(ui.size);
                }
            });
            //dialog close button
            this.m$closer.click(function(e) {
                self.toggle();
            });

            this.__eventBinded = true;
            return this;
        },
        /**
         * [title description]
         * @param  {[type]} title [description]
         * @return {[type]}       [description]
         */
        title:function(title){
            if(undefined===title){
                return this.m$name.text();
            }else{
                this.m$name.text(title);
                return this;
            }
        },
        /**
         * Inner save postion&size to local cache.
         * If saving is not set to true,it does nothing.
         * @param  {[type]} cache [description]
         * @return {[type]}       [description]
         */
        __saveCache: function(cache) {
            if (!this.opt.saveStatus) {
                return this;
            }
            return LocalCache.update(this.mCacheName, cache);
        },
        /**
         * 对话框置于最上层
         * @return {[type]} [description]
         */
        tryTop: function() {
            if (this.m$container.is(':visible')) {
                this.m$container.css('z-index', ++gCurrentZindex);
            }
        },
        /**
         * [show description]
         * @return {[type]} [description]
         */
        show: function() {
            this.m$container.show();
            this.tryTop();
            return this;
        },
        /**
         * [hide description]
         * @return {[type]} [description]
         */
        hide: function() {
            this.m$container.hide();
            return this;
        },
        /**
         * [toggle description]
         * @return {[type]} [description]
         */
        toggle: function() {
            var self = this;
            self.m$container.toggle('fast', function() {
                self.tryTop();
            });
            return this;
        }
    };
    return Dialog;
});