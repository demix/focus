(function(){

    var utils = {
        get: function(node){
            return typeof node == 'string' ? document.getElementById(node): node;
        },
        cookie: {
            set: function(key,value,options){
                options = options || {};
                var expires = options.expires;
                if ('number' == typeof options.expires) {
                    expires = new Date();
                    expires.setTime(expires.getTime() + options.expires);
                }
                
                document.cookie =
                    key + "=" + encodeURIComponent(value)
                    + (options.path ? "; path=" + options.path : "; path=/")
                    + (expires ? "; expires=" + expires.toGMTString() : "")
                    + (options.domain ? "; domain=" + options.domain : "")
                    + (options.secure ? "; secure" : ''); 
            },
            get: function(key){
                var reg = new RegExp("(^| )" + key + "=([^;]*)(;|\x24)"),
                    result = reg.exec(document.cookie);
                
                if (result) {
                    return decodeURIComponent(result[2]) || null;
                }
                return null;
            }
        },
        queryToJson: function(url){
            var query   = url.substr(url.lastIndexOf('?') + 1),
                params  = query.split('&'),
                len     = params.length,
                result  = {},
                i       = 0,
                key, value, param;
            
            for (; i < len; i++) {
                if(!params[i]){
                    continue;
                }
                param   = params[i].split('=');
                key     = param[0];
                value   = param[1];
                
                result[key] = value;
            }
            
            return result;
        },
        jsonToQuery: function(json){
            var result = [];
            for( var key in json ){
                result.push(key + '=' + json[key]);
            }
            
            return result.join('&');
        },
        ajax: function(options){
            var request;
            if( window.XMLHttpRequest ){
                request = new XMLHttpRequest();
            }else{
                try{
                    request = new ActiveXObject('Msxml2.XMLHTTP');
                }catch(e){
                }
                if( !request ){
                    try{
                        request =  new ActiveXObject('Microsoft.XMLHTTP');
                    }catch(e){}
                }
            }

            request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status < 305){
                    var result = request.responseText;
                    try{ result = eval('(' + result + ')'); }catch(e){}
                    options.onsuccess && options.onsuccess(result);
                }else if( request.readyState == 4 && request.status >= 305 ){
                    options.onfailure && options.onfailure();
                }
            };


            request.open( (options.method && options.method.toUpperCase()) || 'GET' , options.url );

            ( options.method && options.method.toLowerCase() == 'post' ) &&
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            request.send( (options.method && (options.method.toLowerCase() == 'post')) ? options.data || '' : null );
        },
        dom:{
            show: function(node){
                node = utils.get(node);
                if(!node)return;
                node.style.display = 'block';
            },
            hide: function(node){
                node = utils.get(node);
                if(!node)return;
                node.style.display = 'none';
            },
            addClass: function(node,classname){
                node = utils.get(node);
                if(!node)return;
                var oldcn = node.className;
                if( oldcn.search(new RegExp('(^|\\s)'+ classname +'(\\s|$)')) == -1) {
                    node.className = oldcn + ' ' + classname;
                }
            },
            removeClass: function(node, classname){
                node = utils.get(node);
                if(!node)return;
                var oldcn = node.className;
                var searchIdx;
                if( (searchIdx=oldcn.search(new RegExp('(^|\\s)'+ classname +'(\\s|$)')) ) != -1) {
                    node.className = oldcn.substring(searchIdx , classname.length);
                }
                
            }
        },
        addEvent: function(node , type , callback){
            node = utils.get(node);
            if(!node)return;
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
    
    var LP_CONFIG = utils.queryToJson(location.search);
    

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
                utils.dom.show(dialog);
                utils.event.dispatchEvent('dialog:show');
            },
            hide: function(){
                utils.dom.hide(dialog);
            },
            togglePanel: function(id){
                if( id==this.current_panel ) return;
                
                utils.dom.removeClass(this.current_panel , 'on');
                utils.dom.addClass(id , 'on');
                
                utils.dom.hide('area-'+this.current_panel.split('-').pop());
                utils.dom.show('area-'+id.split('-').pop());
                
                this.current_panel = id;
                
            },
            tip: function(type,txt){
                var area = utils.get('tip-'+type);
                if( area && txt ){
                    area.innerHTML = txt;
                    utils.dom.show(area);
                }else{
                    utils.dom.hide(area);
                }
            }
        };
    }();


    var RegForm = function(){

        var root = utils.get('area-reg');

        var checknameexist = function(val , target , callback){
            if( typeof val == 'function' ){
                callback = val;
                val = utils.get('input-reg-user').value;
            }
            var area = utils.get('tip-reg-user');
            if( !area ) return;
            utils.ajax({
                url:'/reg/chkname.do?userid=' + val,
                onsuccess: function(data){
                    var issuccess = false ;
                    if( !+data ){
                        utils.dom.hide(area);
                        issuccess = true;
                    }else if( data == 20294 ){
                        area.innerHTML = '该邮箱已被注册';
                        utils.dom.show(area);
                    }else{
                        area.innerHTML = '邮箱检查失败，请稍后再试';
                        utils.dom.show(area);
                    }
                    callback && callback(issuccess);
                },
                onfailure: function(){
                    area.innerHTML = '邮箱检查失败，请稍后再试';
                    utils.dom.show(area);
                     callback && callback(false);
                }
            });
            return true;
        };

        var checkitem = function(target , asyncs){
            var type = target.id.split('-').pop();
            var value = target.value;
            if(check_methods[type]){
                var flag = true;
                var tip = utils.get('tip-reg-' + type);
                for(var i=0,l=check_methods[type].length; i<l; i++){
                    var func = check_methods[type][i][0],
                        msg = check_methods[type][i][1];
                    
                    if( typeof func == 'string' ){
                        func = new Function('val' , 'if('+func+')return true;');
                    }
                    if( check_methods[type][i][2] && asyncs instanceof Array ){
                        asyncs.push( func );
                        continue;
                    }
                    if( func(value , target) ){
                        if( tip ){
                            tip.innerHTML = msg;
                            tip.style.display = 'block';
                        }
                        flag = false;
                        break;
                    }
                }
                flag && (tip.style.display = 'none');
                return flag;
            }
            return true;
        };

        var check_methods = {
            user: [
                ['!val.length','请输入用户名'],
                ['val.length<4','不能少于4个字符'],
                ['val.length>16','不能超过16个字符'],
                ['!/^[A-Za-z]$/.test(val.slice(0,1))' , '必须以字母开头'],
                ['!/^[a-zA-Z]+[0-9a-zA-Z_\.\-]{3,15}$/.test(val)' , '您只能使用字母,数字以及“-”和“.”'],
                [ checknameexist , '' , true ]
            ],
            pwd:[
                ['!val.length','请输入密码'],
                ['val.length<6 || val.length>16','密码必须为6-16位！']
            ],
            rpwd:[
                ['!val.length' , '请确认密码'],
                [function(val){
                    if( utils.get('input-reg-pwd').value != utils.get('input-reg-rpwd').value )
                        return true;
                } , '两次输入不一致']
            ]
        };

        var checkprotocol = function(){
            var target = utils.get('ckb-protocol');
            if(!target)return true;

            if( !target.checked ){
                utils.dom.show('tip-reg-protocol');
                return false;
            }else{
                utils.dom.hide('tip-reg-protocol');
                return true;
            }
        };

        var onpostfailure = function(){
            
        };

        utils.event.addEventListener('blur:input.reg' , function(target){
            checkitem(target);
        });

        utils.event.addEventListener('press.enter:input.reg' , function(){
            if( Dialog.current_panel.indexOf('reg') == -1 )return;
            RegForm.check(function(){ 
                RegForm.submit();
            });
        });

        utils.event.addEventListener('click:ckb.protocol',function(target){
            checkprotocol();
        });

        utils.event.addEventListener('click:btn.start', function(){
            if( Dialog.current_panel.indexOf('reg') == -1 )return;
            RegForm.check(function(){ 
                RegForm.submit();
            });
        });
        
        return{
            check: function(callback){
                var inputs = root.getElementsByTagName('input');
                var flag = true;
                var asyncs = [];
                for( var i=0,l=inputs.length; i<l; i++ ){
                    flag = checkitem(inputs[i] , asyncs) && flag;
                }
                flag =  checkprotocol() && flag;
                
                if( !asyncs.length && flag ){
                    callback && callback();
                    return;
                }

                function handleAsync(){
                    if(asyncs.length){
                        var func = asyncs.shift();
                        func(function(result){
                            flag = flag && result;
                            handleAsync();
                        });
                    }else{
                        flag && callback && callback();
                    }
                }
                handleAsync();
            },
            submit: function(){
                var query = {
                    'userid': utils.get('input-reg-user').value,
                    'psw': utils.get('input-reg-pwd').value,
                    'source': LP_CONFIG.source || ''
                };
                query = utils.jsonToQuery(query);
                Dialog.tip('reg', '注册中...');

                utils.ajax({
                    method:'POST',
                    url:'/reg.do',
                    data: query,
                    onsuccess: function(status){
                        if( !+status ){
                            LandingPage.login(utils.get('input-reg-user').value , utils.get('input-reg-pwd').value , function(){ Dialog.tip('reg','系统繁忙'); } );
                        }else{
                            Dialog.tip('reg' , '系统繁忙，请稍后重试');
                        }
                    },
                    onfailure: function(){
                        Dialog.tip('reg' , '系统繁忙，请稍后重试');
                    }
                });
            }
        };
    }();

    var LoginForm = function(){
        var root = utils.get('area-login');
        var serverlistinited = false;

        if( utils.cookie.get('email') ){
            utils.get('input-login-user').value = utils.cookie.get('email');
        }


        function checkitem(target){
            var tipname = 'tip-login-' + target.id.split('-').pop();
            if( !target.value ){
                utils.dom.show(tipname);
                return false;
            }
            utils.dom.hide(tipname);
            return true;
        }

        function renderserverlist(data){
            var target = utils.get('input-login-server');
            if( !target )return;
            var frag=document.createDocumentFragment();
            for (var i = 0, len = data.length; i < len; i++) {
                var gameItem=data[i];
                var opt=document.createElement('option');
                opt.value=gameItem.sid;
                opt.innerHTML=gameItem.sid+'区';
                opt.selected = (LP_CONFIG.sid && gameItem.sid == LP_CONFIG.sid)? true:null;
                frag.appendChild(opt);
            }
            target.appendChild(frag);
            
        }

        utils.event.addEventListener('press.enter:input.reg' , function(){
            if( Dialog.current_panel.indexOf('login') == -1 )return;
            if(LoginForm.check()){
                LoginForm.submit();
            }
        });


        utils.event.addEventListener('click:btn.start', function(){
            if( Dialog.current_panel.indexOf('login') == -1 )return;
            if(LoginForm.check()){
                LoginForm.submit();
            }
        });

        utils.event.addEventListener('dialog:show', function(){
            if( !serverlistinited ){
                utils.ajax({
                    url:'show/server.do?gid='+ LP_CONFIG['gid'],
                    onsuccess: function(data){

                        renderserverlist(data);

                        serverlistinited = true;
                    }
                });
            }
        });
        return {
            check: function(){
                var inputs = root.getElementsByTagName('input');
                var flag = true;
                for( var i=0,l=inputs.length; i<l; i++ ){
                    flag = checkitem(inputs[i]) && flag;
                }
                return flag;
            },
            submit:function(){
                if( !window['PassportSC'] ){
                    Dialog.tip('login','系统繁忙，请稍后重试');
                    return;
                }
                Dialog.tip('login','登录中...');
                LandingPage.login(utils.get('input-login-user').value , utils.get('input-login-pwd').value , function(){ Dialog.tip('login','用户名或密码错误'); } );
            }
        };
    }();

    
    var LandingPage = function(){
        
        var uname;

        return{
            login: function(username , pwd , onfailure){
                uname = username;
                var now = this;
                PassportSC.loginHandle(username , pwd, 1 , utils.get('PassWrp') , onfailure , now.enter);

            },
            enter: function(){
				var url = LP_CONFIG.sid > 0 ? ('/play.do?gid=' + LP_CONFIG.gid + '&sid=' + LP_CONFIG.sid + '&source=' + LP_CONFIG.source) : ('/serverlist.do?gid=' + LP_CONFIG.gid);
				utils.cookie.set('email', uname + '@sogou.com' , {
                    expires: 365*24*60*60*1000
                });
				//actions.refStatic();
                
				location.href = url;
            }
        };
    }();


    window['showreg'] = function(){
        Mask.show();

        Dialog.show();
    };


    utils.addEvent(document, 'click' , function(e){
        if( e.target.tagName.toLowerCase() != 'input' ){
            e.preventDefault();
        }
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

(function(){

    var PassportSC = {
        'appid':1100,
        'redirectUrl': location.protocol + '//'+ location.hostname + (location.port? (':'+location.port) : '') +  '/static/jump.html'
    };
    
    window.PassportSC = PassportSC;
    var script = document.createElement('script');
    script.src = 'http://account.sogou.com/static/api/passport_cb.js';
    document.body.appendChild(script);
    var div = document.createElement('div');
    div.id="PassWrp";
    document.body.appendChild(div);


})();
