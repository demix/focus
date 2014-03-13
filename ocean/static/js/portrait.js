define(['/common/static/js/event.js'],function(event){

    var target = null;
    var canvas = null;
    var imgtarget = null;
    var imgsource = null;
    var imgmovedirection = null; //0 can't move, 1 vertical , -1 horizon
    var minHeight,minWidth , shrinkPercent ;

    function bindEvent(){
        target.on('dragenter' , function(e){
            e.stopPropagation();
            e.preventDefault(); 
            $(this).addClass('hover');
        });
        target.on('dragover' , function(e){
            e.stopPropagation();
            e.preventDefault();
        });
        target.on('dragleave', function(e){
            e.stopPropagation();
            e.preventDefault();
            $(this).removeClass('hover');
        });
        target.on('drop', function(e){
            e.stopPropagation();
            e.preventDefault(); 
            $(this).removeClass('hover');

            

            var file = e.dataTransfer.files[0];
            if( file.type.indexOf('image') == -1 ){
                event.dispatchEvent('form:error', 'Wrong type file type.');
                return ;
            }
            event.dispatchEvent('form:noerror');

            var reader = new FileReader();

            reader.onload = function(e){
                renderImg(e.target.result);
            };
            reader.readAsDataURL(file);
        });
    }

    function getMousePosition(e){
        if( !imgmovedirection )return 0;
        if( imgmovedirection == 1 ) return e.clientY;
        if( imgmovedirection == -1 ) return e.clientX;
    };

    function bindImgEvent(){
        var begin , ori;
        var changePos = function(e){
            changeImgPosition(ori, begin , getMousePosition(e));
        };
        imgtarget.on('mousedown' , function(e){
            if( !imgmovedirection ) return;
            e.preventDefault();
            begin = getMousePosition(e);
            ori = parseInt(imgtarget.css( imgmovedirection == 1 ? 'top' :'left' ));
            $(document.body).on('mousemove' , changePos);
            $(document.body).on('mouseup' , function(){
                $(this).off('mousemove' , changePos);
            });
        });
    }

    function changeImgPosition(ori ,begin , end){
        if( !imgmovedirection ) return;
        var prop = imgmovedirection == 1? 'top' :'left';
        var finalPos = ori + end -begin;
        if( finalPos > 0 ) finalPos = 0;
        var maxPos = imgmovedirection == 1 ? ( imgtarget.height() - minHeight ) : (imgtarget.width() - minWidth);
        if( Math.abs(finalPos) > maxPos ) finalPos = -maxPos;
        imgtarget.css(prop , finalPos);
    };

    function getImgSize(img , callback){
        var image = new Image();

        image.onload = function(){
            callback(image.width , image.height);
        };

        image.src = img;
    }

    function getShrinkSize(width, height , callback){
        var shrinkWidth,shrinkHeight;
        if( width <= minWidth && height <= minHeight ){
            shrinkWidth = minWidth;
            shrinkHeight = minWidth * height/width;
            imgmovedirection = 0;
        }if( width/height < 1 ){
            shrinkWidth = minWidth;
            shrinkHeight = Math.round(shrinkWidth * height / width);
            imgmovedirection = 1;
        }else{
            shrinkHeight = minHeight;
            shrinkWidth = Math.round(shrinkHeight * width / height);
            imgmovedirection = -1;
        }
        shrinkPercent = width/shrinkWidth;
        callback(shrinkWidth,shrinkHeight);

    }

    function renderImg(img){
        imgsource = img;
        getImgSize(img,function(width , height){
            getShrinkSize(width , height , function(shrinkWidth,shrinkHeight){
                target.html( '<img src='+ img +' height="'+shrinkHeight+'" width="'+shrinkWidth+'" style="' 
                             + (imgmovedirection == 1 ? 'top:0;' : ( imgmovedirection==-1 ? 'left:0;' : '' ))
                             + '"/>');
                imgtarget = target.find('img');
                target.addClass('img');
                bindImgEvent();
            });
        });
    }

    function renderCanvas(){
        var canvas = document.createElement('canvas');
        canvas.height = minHeight;
        canvas.width = minWidth;

        if( !imgtarget )return;
        var size = {
            width: imgtarget.width(),
            height: imgtarget.height(),
            left: parseInt(imgtarget.css('left')) || 0,
            top: parseInt(imgtarget.css('top')) || 0
        };
        
        var context = canvas.getContext('2d');
        context.drawImage( imgtarget[0]  , shrinkPercent * Math.abs(size.left) , shrinkPercent * Math.abs(size.top) , shrinkPercent * minWidth , shrinkPercent * minHeight  , 0 , 0 , minWidth , minHeight);

        return canvas.toDataURL();

    }

    return {
        render: function($el){
            target = $el;
            canvas = target.parent().parent().find('canvas')[0];

            minWidth = target.width() - parseInt(target.css('border-left-width')) - parseInt(target.css('border-right-width'));
            minHeight = target.height() - parseInt(target.css('border-top-width')) - parseInt(target.css('border-bottom-width'));
            
            bindEvent();
                
            event.addEventListener('form:onbeforesubmit' , function(){
                var img = renderCanvas();
                if( img ){
                    target.parents('form').append('<input type="hidden" name="portrait" value="'+ img +'">');
                }
            });
                
        }
    };
});
