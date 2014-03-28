define(function(){
    

    return {
        overrideLinks: function(backboneIns){
            if(!backboneIns)
                return;
            $(document).on('click', 'a', function(e){
                var overrideflag = $(e.target).parents('*[data-overridelink]');
                if(overrideflag && overrideflag.data('overridelink')){
                    e.preventDefault();
                    backboneIns.navigate($(e.target).attr('href') , {trigger:true});
                }
            });
        }
    };
});
