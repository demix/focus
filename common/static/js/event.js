define(function(){

    var subscribers = {};


    return{
        addEventListener: function(name,cb){
            if( !subscribers[name] ){
                subscribers[name] = [cb];
            }else{
                subscribers[name].push(cb);
            }
        },
        removeEventListener: function(name , cb){
            var subs = subscribers[name];
            if(!subs) return;
            
            subs.forEach(function(sub , i){
                if(sub == cb){
                    subs[i] = null;
                }
            } );
        },
        disposeEvent :  function(name){
            delete subscribers[name];
        },
        dispatchEvent: function(){
            var args = Array.prototype.slice.call(arguments);
            var name = args.shift();
            
            if( !subscribers[name] ) return;
            
            subscribers[name].forEach( function(sub) {
                if (sub) {
                    sub.apply(this, args);
                }
            });
            
        }
    
    };
});
