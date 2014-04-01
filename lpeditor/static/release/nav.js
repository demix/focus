(function(){

    var addBookmark = function (rf,url) {
        rf=rf||999;
        url= url || 'http://wan.sogou.com';
        if(url.indexOf("?")!=-1){
                url+="&rf="+rf;
        }else{
            url+="?rf="+rf;
        }
        var title = '搜狗游戏中心';
        try{
            window.external.AddFavorite(url, title); // ie
        }catch(e){
            try{
                window.sidebar.addPanel(title, url, ''); // firefox
            }catch(e){
                // chrome
                var ctrl = (navigator.userAgent.toLowerCase()).indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL';
                alert('请按快捷键 ' + ctrl + ' + D 添加书签~');
            }
        }
    };


    utils.addEvent('Collect_Site','click',function(e){
        e.preventDefault();
        addBookmark('0201',window.location.href);
    });
    
    utils.addEvent("First_Page" , 'click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        if(window.navigator.userAgent.indexOf('MSIE 10')!=-1 || window.navigator.userAgent.indexOf('Firefox')!=-1 || window.navigator.userAgent.indexOf('Chrome')!=-1) {
            alert("您好，您的浏览器不支持直接设为首页，请使用浏览器菜单手动设置本站为首页，祝您使用愉快！");
            return false;
        } else {
            try{ 
                this.style.behavior='url(#default#homepage)';
                this.setHomePage(location.href);
            } catch(e){}
        }
    });


})();



(function(){

    var ggwrp = utils.get('LP_GG');
    var gginner = ggwrp.getElementsByTagName('div')[0];

    var t=0;
    var ggheight = 14 , currentmove = 0 , step = gginner.getElementsByTagName('a').length , currentstep = 1;

    var clonea = gginner.getElementsByTagName('a')[0].cloneNode();
    clonea.innerHTML = gginner.getElementsByTagName('a')[0].innerHTML;
    gginner.appendChild(clonea);
    var steptm = 4000;
    var moveGG;

    if( navigator.userAgent.toLowerCase().indexOf('msie') != -1 ){
        moveGG = function(){
            gginner.style.top = -ggheight*currentstep + 'px';
            currentstep++;
            if(currentstep>step){
                currentstep=1;
                gginner.style.top = 0;
            }
            setTimeout(moveGG,steptm);
        };
        
    }else{
    
        moveGG = function(){
            window.setTimeout(function(){
                if( currentmove*currentstep < ggheight * currentstep ){
                    currentmove++;
                    gginner.style.top = -currentmove-( ggheight* (currentstep-1) )  + 'px'; 
                    moveGG();
                }else{
                    currentstep++;
                    currentmove=0;
                    if( currentstep > step ){
                        currentstep = 1;
                        gginner.style.top = 0;
                    }
                    setTimeout(moveGG , steptm);
                }
            },20);
        };
    }
    setTimeout(moveGG,steptm);



})();



