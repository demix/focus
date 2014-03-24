/**
 * disk.js
 *
 * changelog
 * 2014-03-24[16:25:09]:created
 *
 * @info yinyong,osx-x64,UTF-8,10.129.164.209,js,/Volumes/yinyong/focus/lpeditor/static/js
 * @author yanni4night@gmail.com
 * @version 0.0.1
 * @since 0.0.1
 */
//looks stupid!!!
const EVT_LOADING = 'loading';
const EVT_LOADED = 'loaded';
const EVT_LOAD_ERROR = 'loaderror';
const EVT_LOADING_LIST = 'loadinglist';
const EVT_LOADED_LIST = 'loadedlist';
const EVT_LOAD_LIST_ERROR = 'loadlisterror';
const EVT_SAVING = "saving";
const EVT_SAVED = "saved";
const EVT_SAVE_ERROR = "saveerror";
const EVT_CREATED="created";
define(['listener'], function(Listener) {

    var DiskManager = {
        __listLoading: false,
        __saving: false,
        __loading: false,
        init:function(){
            this.listen(EVT_LOADED,this.onLoaded,this);
            return this;
        },
        onLoaded:function(){

        },
        /**
         * [load description]
         * @param  {[type]} id [description]
         * @return {[type]}    [description]
         */
        load: function(id) {
            var self = this;
            if (self.__loading||!id) return;
            $.ajax({
                url: '/get',
                dataType: 'json',
                data:{id:id},
                type: 'post',
                beforeSend: function() {
                    self.__loading = true;
                    self.trigger(EVT_LOADING);
                },
                complete: function() {
                    self.__loading = false;
                }
            }).done(function(data) {
                if (data&&!+data.status) {
                    try{
                        var profile=JSON.parse(data.data);
                        self.trigger(EVT_LOADED, profile,id);
                    }catch(e){
                    self.trigger(EVT_LOAD_ERROR);
                    }
                } else {
                    self.trigger(EVT_LOAD_ERROR);
                }
            }).fail(function(jqXHR, status) {
                self.trigger(EVT_LOAD_ERROR);
            });

            return this;
        },
        /**
         * [list description]
         * @return {[type]} [description]
         */
        list: function() {
            var self = this;
            if (self.__listLoading) return;
            $.ajax({
                url: '/list',
                dataType: 'json',
                type: 'post',
                beforeSend: function() {
                    self.__listLoading = true;
                    self.trigger(EVT_LOADING_LIST);
                },
                complete: function() {
                    self.__listLoading = false;
                }
            }).done(function(data) {
                if (Array.isArray(data.data)) {
                    self.trigger(EVT_LOADED_LIST, data.data);
                } else {
                    self.trigger(EVT_LOAD_LIST_ERROR);
                }
            }).fail(function(jqXHR, status) {
                self.trigger(EVT_LOAD_LIST_ERROR);
            });

            return this;
        },
        /**
         * [save description]
         * @param  {[type]} id   [description]
         * @param  {[type]} data [description]
         * @return {[type]}      [description]
         */
        save: function(id, data) {
            var self = this;
            if (self.__saving) return;
            $.ajax({
                url: '/save',
                data: {
                    id:id,
                    payload: data
                },
                dataType: 'json',
                type: 'post',
                beforeSend: function() {
                    self.__saving = true;
                    self.trigger(EVT_SAVING);
                },
                complete: function() {
                    self.__saving = false;
                }
            }).done(function(data) {
                if (data&&!+data.status) {
                    if(data.created)
                        self.trigger(EVT_CREATED, data.id);
                    else
                        self.trigger(EVT_SAVED, data.id);
                } else {
                    self.trigger(EVT_SAVE_ERROR);
                }
            }).fail(function(jqXHR, status) {
                self.trigger(EVT_SAVE_ERROR);
            });

            return this;
        }
    };

    $.extend(DiskManager, new Listener());
    return DiskManager;
});