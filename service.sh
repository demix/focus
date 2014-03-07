

if [ "x$1" == 'xstart' ];then
    if [ "x$2" == 'xall' ] || [ "x$2" == 'xcommon' ];then
        forever start -c 'node --harmony' common/index.js
    fi
    if [ "x$2" == 'xall' ] || [ "x$2" == 'xworkflow' ];then
        forever start -c 'node --harmony' workflow/index.js
    fi
    if [ "x$2" == 'xall' ] || [ "x$2" == 'xocean' ];then
        forever start -c 'node --harmony' ocean/index.js
    fi
elif [ "x$1" == 'xdebug' ];then
    if [ "x$2" == 'xall' ] || [ "x$2" == 'xcommon' ];then
        forever start -c 'node-dev --harmony' common/index.js
    fi
    if [ "x$2" == 'xall' ] || [ "x$2" == 'xworkflow' ];then
        forever start -c 'node-dev --harmony' workflow/index.js
    fi
    if [ "x$2" == 'xall' ] || [ "x$2" == 'xocean' ];then
        forever start -c 'node-dev --harmony' ocean/index.js
    fi
elif [ "x$1" == 'xstop' ];then
    if [ "x$2" == 'xall' ] || [ "x$2" == 'xcommon' ];then
        forever stop common/index.js
    fi
    if [ "x$2" == 'xall' ] || [ "x$2" == 'xworkflow' ];then
        forever stop workflow/index.js
    fi
    if [ "x$2" == 'xall' ] || [ "x$2" == 'xocean' ];then
        forever stop ocean/index.js
    fi
fi
