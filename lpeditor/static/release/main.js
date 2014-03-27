(function(){

    var utils = {
        get: function(node){
            return typeof node == 'string' ? document.getElementById(node): node;
        },
        dom:{
            addClass: function(node,classname){
                node = utils.get(node);
                var oldcn = node.className;
                if( oldcn.search(new RegExp('(^|\\s)'+ classname +'(\\s|$)')) == -1) {
                    node.className = oldcn + ' ' + classname;
                }
            },
            removeClass: function(node, classname){
                node = utils.get(node);
                var oldcn = node.className;
                var searchIdx;
                if( (searchIdx=oldcn.search(new RegExp('(^|\\s)'+ classname +'(\\s|$)')) ) != -1) {
                    node.className = oldcn.substring(searchIdx , classname.length);
                }
                
            }
        },
        addEvent: function(node , type , callback){
            node = utils.get(node);
            var wrpfunc = function( cb){
                return function(e){
                    e = e || window.event;
                    if( !e.preventDefault ){
                        e.preventDefault = function(){
                            e.returnValue = false;
                        };
                    }
                    if( !e.stopPropagation ){
                        e.stopPropagation = function(){ e.cancelBubble = true; };
                    }
                    e.target = e.srcElement;
                    cb(e);
                };
            };
            callback = wrpfunc(callback);
            if(window.attachEvent){
                node.attachEvent('on' + type , callback);
            }else{
                node.addEventListener(type , callback , false);
            }
        },
        event: function(){
            var subscribers = {};
            return {
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
        }()
    };
    window['utils'] = utils;
    

    var Mask = function(){
        var node = utils.get('Mask');
        if(!node) return {show:function(){},hide:function(){}};

        var top = utils.get('Landing_Header') ? 41 : 0;
        node.style.top = top + 'px';


        var calHeight = function(){
            node.style.height = Math.max(document.documentElement.clientHeight , document.body.scrollHeight) - top + 'px';
        };

        utils.addEvent(window , 'resize', function(){
            calHeight();
        });
        utils.event.addEventListener('click:close', function(){
            Mask.hide();
        });
        
        return {
            show: function(){
                node.style.display = 'block';
                calHeight();
            },
            hide: function(){
                node.style.display = 'none';
            }
        };
    }();







    var Dialog = function(){
        var dialog = utils.get('lp-dialog');


        utils.event.addEventListener('click:close', function(){
            Dialog.hide();
        });
        utils.event.addEventListener('click:tab', function(target){
            Dialog.togglePanel(target.id);
        });


        return {
            current_panel: 'tab-new-reg',
            show: function(){
                dialog.style.display = 'block';
            },
            hide: function(){
                dialog.style.display = 'none';
            },
            togglePanel: function(id){
                if( id==this.current_panel ) return;
                
                utils.dom.removeClass(this.current_panel , 'on');
                utils.dom.addClass(id , 'on');
                
                utils.get('area-'+this.current_panel.split('-').pop()).style.display = 'none';
                utils.get('area-'+id.split('-').pop()).style.display = 'block';
                
                this.current_panel = id;
            }
        };
    }();


    var RegForm = function(){

        var root = utils.get('area-reg');

        utils.event.addEventListener('press.enter:input.reg' , function(){
            if(RegForm.check()){
                RegForm.submit();
            }
        });
        utils.event.addEventListener('blur:input.reg' , function(target){
            var type = target.id.split('-').pop();
            if(check_methods[type]){
                var flag = true;
                var tip = utils.get('tip-reg-' + type);
                for(var i=0,l=check_methods[type].length; i<l; i++){
                    var func = check_methods[type][i][0],
                        msg = check_methods[type][i][1];
                    
                    if( typeof func == 'string' ){
                        func = new Function('val' , 'if('+func+')return true;');
                    }
                    if( func(target.value) ){
                        tip.innerHTML = msg;
                        tip.style.display = 'block';
                        flag = false;
                        break;
                    }
                }
                flag && (tip.style.display = 'none');
                
            }
        });

        var check_methods = {
            user: [
                ['!val.length','请输入用户名'],
                ['val.length<4','不能少于4个字符'],
                ['val.length>16','不能超过16个字符'],
                ['!/^[A-Za-z]$/.test(val.slice(0,1))' , '必须以字母开头'],
                ['!/^[a-zA-Z]+[0-9a-zA-Z_\.\-]{3,15}$/.test(val)' , '您只能使用字母,数字以及“-”和“.”']
            ],
            pwd:[
                ['!val.length','请输入密码'],
                ['val.length<6 || val.length>16','密码必须为6-16位！']
            ],
            rpwd:[
                ['!val.length' , '请确认密码']
            ]
        };

        
        return{
            check: function(){
                
            },
            submit: function(){}
        };
    }();

    var LoginForm = function(){
        return {
            init: function(){
                utils.event.addEventListener('');
            }
        };
    }();



    window['showreg'] = function(){
        Mask.show();

        Dialog.show();
    };


    utils.addEvent(document, 'click' , function(e){
        e.preventDefault();
        var id = e.target.id;
        if( !id ) return;
        id = id.split('-');//as - splited propagation
        while( id.length ){
            utils.event.dispatchEvent( 'click:' + id.join('.') , e.target );
            id.pop();
        }
    });

    utils.addEvent(document , 'keyup', function(e){
        var id = e.target.id;
        var eventname;

        switch(+e.keyCode){
            case 13: eventname = 'enter';
            break;
        }

        id = id.split('-');
        while(id.length && eventname){
            utils.event.dispatchEvent('press.'+eventname + ':' + id.join('.') , e.target);
            id.pop();
        }
    });


    if( window.addEventListener ) {
        document.addEventListener('blur', function(e){
            var id = e.target.id;
            id = id.split('-');
            while(id.length ){
                utils.event.dispatchEvent('blur:' + id.join('.') , e.target);
                id.pop();
            }

        },true);
    }

})(); 
