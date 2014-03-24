/**
 * dialog-disk.js
 *
 * changelog
 * 2014-03-24[15:37:17]:created
 *
 * @info yinyong,osx-x64,UTF-8,10.129.164.209,js,/Volumes/yinyong/focus/lpeditor/static/js
 * @author yanni4night@gmail.com
 * @version 0.0.1
 * @since 0.0.1
 */
define(['dialog', 'disk'], function(Dialog, DiskManager) {

    var diskDialog = new Dialog('#dialog-disk', {

    });

    $.extend(diskDialog, {
        init: function() {
            this.m$content.text('加载中......');

            DiskManager.listen(EVT_LOADED_LIST, this.onListLoaded, this);

            DiskManager.listen(EVT_CREATED, this.onModified, this);
            DiskManager.listen(EVT_SAVED, this.onModified, this);

            this.loadList();
            this.initEvt();
            return this;
        },
        initEvt: function() {
            this.m$content.delegate('li', 'dblclick', function(e) {

                var id = $(e.target).attr('data-id');
                if (id) {
                    DiskManager.load(id);
                }
            });
            return this;
        },
        /**
         * [loadList description]
         * @return {[type]} [description]
         */
        loadList: function() {
            DiskManager.list();
            return this;
        },
        onModified: function(evt, evtObj, args) {
            this.loadList();
        },
        onListLoaded: function(evt, evtObj, args) {
            var self = this,
                listArr = args[0];
            self.m$content.empty();
            listArr && listArr.forEach(function(item, index) {
                var id = item[0].replace(/\.json$/, '');
                self.m$content.append('<li data-id="' + id + '">' + id + '/' + item[1] + '</li>');
            });
            return this;
        },
    });

    return diskDialog.init();
});