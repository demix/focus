/**
 * listener.js
 *
 * changelog
 * 2014-03-06[10:46:03]:created
 *
 * @info yinyong,osx-x64,UTF-8,10.129.172.32,,/Volumes/yinyong/focus/lpeditor/static/js
 * @author yanni4night@gmail.com
 * @version 0.0.1
 * @since 0.0.1
 */
define([], function() {

  function Listener() {
    var mls = this.__mListeners = [];
    /**
     * [listen description]
     * @param  {[type]} evt        [description]
     * @param  {[type]} callbackfn [description]
     * @param  {[type]} thisArg    [description]
     * @return {[type]}            [description]
     */
    this.listen = function(evt, callbackfn, thisArg) {
      if ('function' !== typeof callbackfn) {
        throw Error('callbackfn MUST BE a function:', callbackfn);
      }
      if (mls.some(function(item, index) {
        return (evt === item.evt) && (item.callbackfn === callbackfn)
      })) {
        console.warn('dulplicated listener', callbackfn);
        return false;
      }
      mls.push({
        evt: evt,
        callbackfn: callbackfn,
        thisArg: thisArg
      });
      return true;
    };
    /**
     * [dislisten description]
     * @return {[type]} [description]
     */
    this.dislisten = function(evt, callbackfn){
      mls.forEach(function(item, index) {
        if ((evt === item.evt) && (item.callbackfn === callbackfn)) {
          mls.splice(index,1);
          return this;
        }
      });

      return this;
    };
    /**
     * [trigger description]
     * @param  {String} evt
     * @param  {Object...} args
     */
    this.trigger = function(evt, args) {
      var self = this,
        _args = ([]).slice.call(arguments, 1);
      mls.forEach(function(item, index) {
        if (evt === item.evt) {
          item.callbackfn.call(item.thisArg, evt, self, _args);
        }
      });

      return this;
    };
  }

  return Listener;

});