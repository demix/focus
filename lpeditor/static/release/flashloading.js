var uigs_para={uigs_productid:"wan",m:2,uigs_cookie:"source,hostid,landing_ref,yyid,gid,sid"};


(function(){
    var tstart = window['tstart'] = +new Date();
    var params   = location.href.substr(location.href.lastIndexOf('?') + 1).split('&'),
        len = params.length,param,i=0,
        result = {};
    for (; i < len; i++) {
        param   = params[i].split('=');
        result[param[0]] = param[1];
    }
    function gck(key){
        var reg = new RegExp("(^| )" + key + "=([^;]*)(;|\x24)"),
            result = reg.exec(document.cookie);
        if (result) {
            return decodeURIComponent(result[2]) || '';
        }
        return '';
    }

    new Image().src = 'http://pb.sogou.com/pv.gif?uigs_productid=ufo&ufoid=wan&ptype=landingpage&pcode=new&rdk='
        + (+new Date())
        + '&img=ct.gif&gid=' + (result.gid||'')
        +'&fid=' + (result.fid ||'')
        +'&sid=' + (result.sid||'')
        +'&source=' + (result.source||'')
        +'&pid=' + (result.pid ||'')
        +'&yyid=' + gck('yyid')
        +'&hostid=' + gck('hostid')
        +'&landing_ref=' + encodeURIComponent( document.referrer)
        +'&suid=' + gck("SUID")
        +'&lastdomain='+ gck('lastdomain') 
        +'&suv='+ gck('SUV') 
        +'&cemail='+ gck('email')
        +'&module=head';

    uigsPB('nav-load-begin_nav-source-'+result.source);

    var ffuncname = 'ff' + (+new Date());
    var flashonload = function(){
        window[ffuncname] = null;
        delete window[ffuncname];
    };
    window[ffuncname] = flashonload;


    document.write('<embed height="{{fheight}}" pluginspage="http://www.adobe.com/go/getflashplayer" {% if fwidth <=1000 %}src="http://p5.wan.sogoucdn.com/cdn/flash/2014/07/09/20140709160527_226.swf"{%else%}src="http://p7.wan.sogoucdn.com/cdn/flash/2014/05/13/20140513183020_816.swf"{%endif%} type="application/x-shockwave-flash" width="{{fwidth}}" wmode="opaque" quality="high" allowscriptaccess="always" id="Flash_Target" flashvars="flashurl='+ encodeURIComponent('{{flashUrl}}') +'&loadfunc='+ ffuncname +'" >');



})();


