/**
 * editor.js
 *
 * changelog
 * 2014-03-05[15:57:31]:created
 *
 * @info yinyong,osx-x64,UTF-8,10.129.172.32,js,/Volumes/yinyong/focus/lpeditor/static/js
 * @author yanni4night@gmail.com
 * @version 0.0.1
 * @since 0.0.1
 */
define(['initializing', 'element'], function(Initializing, Element) {

    var $canvas=$('.canvas'),$previewStyle=$('#previewStyle')
    /**
     * 生成默认页面元素
     * @return {Array}
     */
    function loadDefaultElements() {
        var models = [];
        for (var ids in Initializing) {
            //元素ID以逗号分隔
            ids = ids.split(',');
            var found = Initializing[ids];
            //针对每个ID，生成Element
            //TODO，判断元素ID重复
            ids.forEach(function(id, index, ids) {
                var innerText = ('function' === typeof found.text) ? found.text(id,index) : (found.text || "");
                var props = {
                    id: id
                }, css = {position:'absolute'};
                //Copy properties
                $.each((found.props || {}), function(k, v) {
                    if ('function' === typeof v)
                        v = v(id,index);
                    props[k] = v;
                });
                var eleModel = new Element(found.tag, innerText, props, css);
                //copy css attributes
                $.each((found.css || {}), function(selector, selectorItems) {
                    var isPrefix = false;
                    if ('' === selector) {
                        selector = '';
                    } else if ('>' === selector[0]) {
                        selector = selector.slice(1)
                    } else if ('<' === selector[0]) {
                        isPrefix = false;
                        selector = selector.slice(1)
                    }
                    $.each(selectorItems, function(k, v) {
                        if ('function' === typeof v) v = v(id,index);
                        eleModel.setCss(k, v, selector, isPrefix);
                    });
                });

                models.push(eleModel);
            });
        }

        return models;
    }

    function drawCanvas(){
        var styleText='',innerHtml='';
        gElements.forEach(function(ele,index){
            styleText+=ele.style(true);
            innerHtml+=ele.html(false);
        });

        $canvas.html(innerHtml);
        $previewStyle.text(styleText);
    }
    //global
    var gElements=[];


    /**
     * Initialize editor
     * @return {[type]} [description]
     */
    function initEditor(){
        gElements = loadDefaultElements();
        drawCanvas();
    }

    return {
        init: function() {
            initEditor();
        }
    };
});