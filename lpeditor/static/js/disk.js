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
var EVT_LOADING = 'loading';
var EVT_LOADED = 'loaded';
var EVT_DELETED = 'deleted';
var EVT_LOAD_ERROR = 'loaderror';
var EVT_LOADING_LIST = 'loadinglist';
var EVT_LOADED_LIST = 'loadedlist';
var EVT_LOAD_LIST_ERROR = 'loadlisterror';
var EVT_SAVING = "saving";
var EVT_SAVED = "saved";
var EVT_SAVE_ERROR = "saveerror";
var EVT_CREATED="created";
define(['listener'], function(Listener) {

    var DiskManager = {
        __listLoading: false,
        __saving: false,
        __loading: false,
        __deleting: false,
        __profileId:null,
        init:function(){
            this.listen(EVT_LOADED,this.onLoadedOrCreated,this);
            this.listen(EVT_CREATED,this.onLoadedOrCreated,this);
            return this;
        },
        onLoadedOrCreated:function(evt,evtObj,args){
            this.__profileId = args[1];
        },  
        /**
         * [load description]
         * @param  {[type]}   id       [description]
         * @param  {[type]}   silence  [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        load: function(id,silence,callback) {
            var self = this;
            if (self.__loading||!id) {
                if(callback){
                    return callback(new Error('id is needed'));
                }
                else return;
            }
            $.ajax({
                url: '/get',
                dataType: 'json',
                data:{id:id},
                type: 'post',
                beforeSend: function() {
                    self.__loading = true;
                    !silence&&self.trigger(EVT_LOADING);
                },
                complete: function() {
                    self.__loading = false;
                }
            }).done(function(data) {
                if (data&&!+data.status) {
                    var profile=data.data;

                    !silence&&self.trigger(EVT_LOADED, profile,id);
                    return callback&&callback(null,profile,id);

                } else {
                    !silence&&self.trigger(EVT_LOAD_ERROR);
                    return callback&&callback(new Error('加载失败'));
                }
            }).fail(function(jqXHR, status) {
                !silence&&self.trigger(EVT_LOAD_ERROR);
                return callback&&callback(new Error('加载失败'));
            });

            return this;
        },
        delete:function(id){
            var self = this;
            if (self.__deleting||!id) return;
            $.ajax({
                url: '/delete',
                dataType: 'json',
                data:{id:id},
                type: 'post',
                beforeSend: function() {
                    self.__deleting = true;
                },
                complete: function() {
                    self.__deleting = false;
                }
            }).done(function(data) {
                self.trigger(EVT_DELETED,id);
            }).fail(function(jqXHR, status) {
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
         * [getProfileId description]
         * @return {String}
         */
        getProfileId:function(){
            return this.__profileId;
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
                        self.trigger(EVT_CREATED, data,data.id);
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
    return DiskManager.init();
});