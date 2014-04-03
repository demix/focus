
//wan pingback
(function(){
    
    utils.pb.cl( utils.merge( utils.clone(STATS_CONFIG),{module:'pageend'}));
    
    
	var t_interval = setInterval(function(){
        var flash = utils.get('Flash_Target');
        if( flash.PercentLoaded() == 100 ){
            clearInterval(t_interval);
		    var end_time= +new Date();
		    var use_time=end_time - tstart;

            utils.pb.cl( utils.merge( utils.clone(STATS_CONFIG) , {
                module: 'flashend',
                tag: use_time,
                et: end_time,
                pt: use_time
            }) );
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

})();
