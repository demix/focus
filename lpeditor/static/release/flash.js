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

})();

document.write('<embed height="{%if bigFlash==1%}700{%else%}600{%endif%}" flashvars="" pluginspage="http://www.adobe.com/go/getflashplayer" src="{{flashUrl}}" type="application/x-shockwave-flash" width="{%if bigFlash==1%}1400{%else%}1000{%endif%}" wmode="opaque" quality="high" allowscriptaccess="always" id="Flash_Target">');


