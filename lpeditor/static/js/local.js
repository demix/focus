/**
  * local.js
  *
  * changelog
  * 2014-03-07[14:10:51]:created
  *
  * @info yinyong,osx-x64,UTF-8,10.129.172.32,js,/Volumes/yinyong-1/focus/lpeditor/static/js
  * @author yanni4night@gmail.com
  * @version 0.0.1
  * @since 0.0.1
  */
define([],function(){

    var LocalCache={
        /**
         * [load description]
         * @param  {[type]} key        [description]
         * @param  {[type]} defaultVal [description]
         * @return {[type]}            [description]
         */
        load:function(key,defaultVal){
            var cache =  localStorage.getItem(key)||"";
            try{
                return JSON.parse(cache)||defaultVal;
            }catch(e){
                return null;
            }
        },
        /**
         * [update description]
         * @param  {[type]} key [description]
         * @param  {[type]} val [description]
         * @return {[type]}     [description]
         */
        update:function(key,val){
                var cache = this.load(key)||{};
                $.extend(cache,val);
                return this.save(key,cache);
        },
        /**
         * [save description]
         * @param  {[type]} key [description]
         * @param  {[type]} val [description]
         * @return {[type]}     [description]
         */
        save:function(key,val){
         localStorage.setItem(key,JSON.stringify(val||{})); 
         return val;
        }
    };
    return LocalCache;
});