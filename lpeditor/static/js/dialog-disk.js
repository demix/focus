/**
 * dialog-disk.js
 *
 * changelog
 * 2014-03-24[15:37:17]:created
 * 2014-06-17[22:58:26]:delete
 *
 * @info yinyong,osx-x64,UTF-8,10.129.164.209,js,/Volumes/yinyong/focus/lpeditor/static/js
 * @author yanni4night@gmail.com
 * @version 0.0.2
 * @since 0.0.1
 */
define(['dialog', 'disk', 'utils'], function(Dialog, DiskManager, Utils) {

    var diskDialog = new Dialog('#dialog-disk', {

    });

    $.extend(diskDialog, {
        init: function() {
            // this.m$content.text('加载中......');

            DiskManager.listen(EVT_LOADED_LIST, this.onListLoaded, this);
            DiskManager.listen(EVT_LOADED, function() {
                this.toast('加载成功', true, 3000);
            }, this);

            DiskManager.listen(EVT_LOAD_ERROR, function() {
                this.toast('加载失败', false, 3000);
            }, this);

            DiskManager.listen(EVT_CREATED, this.onModified, this);
            DiskManager.listen(EVT_SAVED, this.onModified, this);
            DiskManager.listen(EVT_DELETED, this.onDeleted, this);

            this.loadList();
            this.initEvt();
            return this;
        },
        initEvt: function() {
            var self = this;

            self.m$content.delegate('a.load', 'click', function(e) {
                e.preventDefault();
                var id = $(e.target).attr('data-id');
                id && DiskManager.load(id);
            }).delegate('a.delete', 'click', function(e) {
                e.preventDefault();
                var id = $(e.target).attr('data-id');
                id && DiskManager.delete(id);
                /*clearTimeout(timeout);
                timeout = setTimeout((function(){
                    return function(){
                          self.toast('双击条目加载对应存档',true,4000);
                    };
                })(),300);*/
            });
            return self;
        },
        /**
         * [loadList description]
         * @return {[type]} [description]
         */
        loadList: function() {
            DiskManager.list();
            return this;
        },
        onDeleted: function(evt, evtObj, args) {
            this.loadList();
        },
        onModified: function(evt, evtObj, args) {
            this.loadList();
        },
        onListLoaded: function(evt, evtObj, args) {
            var self = this,
                listArr = args[0];
            self.m$content.find('tbody').empty();
            listArr && listArr.forEach(function(item, index) {
                var id = item[0].replace(/\.json$/, '');
                self.m$content.find('tbody').append('<tr><td>' + (1 + index) + '</td><td>' + item[1] + '</td><td>' + Utils.formatDate(id) + '</td><td><a href="#" class="load" data-id="' + id + '">Load</a></td><td><a href="#" class="delete" data-id="' + id + '">Delete</a></td></tr>');
                //                self.m$content.find('tbody').append('<li data-id="' + id + '">'+(1+index)+'. ' + Utils.formatDate(id) + '/' + item[1] + '</li>');
            });
            return this;
        },
    });

    return diskDialog.init();
});