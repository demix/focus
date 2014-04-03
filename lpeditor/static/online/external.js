
//wan pingback
(function(){
    
    utils.pb.cl( utils.merge( utils.clone(STATS_CONFIG),{module:'pageend'}));
    
    
	var t_interval = setInterval(function(){
        var flash = utils.get('Flash_Target');
        if( flash.PercentLoaded && flash.PercentLoaded() == 100 ){
            clearInterval(t_interval);
		    var end_time= +new Date();
		    var use_time=end_time - tstart;

            utils.pb.cl( utils.merge( utils.clone(STATS_CONFIG) , {
                module: 'flashend',
                tag: use_time,
                et: end_time,
                pt: use_time
            }) );
		    uigsPB('nav-load-end_nav-source-'+STATS_CONFIG['source']);
            
        }
    },50);
	setTimeout(function(){clearInterval(t_interval);},5000*60);


    utils.addEvent(window , 'beforeunload' , function(){

        var staytime = (+new Date()) - tstart;
        utils.pb.cl( utils.merge( utils.clone(STATS_CONFIG) , {
            module: 'staytime',
            tag: staytime > 30* 1000 ? 'g3': 'l3',
            t: staytime
        } ) );

        
    });

    utils.addEvent(document, 'click', function(e){
        var el = e.target;
        if( el.tagName.toLowerCase() == 'a' && el.getAttribute('stat') ){
			var location_num = $(this).attr('stat'),
			ref = document.referrer,
			hostid = '';
			uigsPB('m2_stat_click_' + el.getAttribute('stat') + '_' + '' + '_' + encodeURIComponent(document.referer) + '_');

        }
    });

})();
