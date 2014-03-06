/**
 * element.js
 *
 * changelog
 * 2014-03-04[19:06:21]:created
 *
 * @info yinyong,osx-x64,UTF-8,10.129.172.32,js,/Volumes/yinyong/lpeditor/js
 * @author yinyong@sogou-inc.com
 * @version 0.0.1
 * @since 0.0.1
 */
define(['listener'], function(Listener) {

    var noClosureTag = 'br,img,hr,link,meta,base,input'.split(',');
    
    /**
     * [Element description]
     * @param {[type]} tagname   [description]
     * @param {[type]} props     [description]
     * @param {[type]} csses     [description]
     * @param {[type]} innerText [description]
     */
    function Element(tagname, props, csses,innerText) {
        if(arguments.length<2){
            throw Error('Construct an element need as least TWO parameters!');
        }
        if(!/^[\w\-]+$/.test(props.id)){
            throw Error('Element need a legal ID property');
        }
        this.mTagName = String(tagname).toLowerCase();
        this.mNoClosure = !! ~noClosureTag.indexOf(this.mTagName);
        this.mInnerText = innerText||"";
        this.mProps = props;
        //has to own a ID
        this.mBaseSelector =  '#' + this.mProps.id;

        this.mPrefixSelectors = {}; //like .on #id
        this.mSuffixSelectors = {
            '': (csses || {})//default is kind of suffix selector
        }; //like #id.on

        

        $.extend(this,new Listener());
    }

    var elementProto = {
        /**
         * [getId description]
         * @return {String}
         */
        getId:function(){
            return this.mProps.id;
        },
        /**
         * [equals description]
         * @param  {Element} ele
         * @return {Boolean}    
         */
        equals:function(ele){
            if(!(ele instanceof Element)){
                return false;
            }

            if(ele===this)return true;

            if(ele.mProps.id&&(ele.mProps.id===this.mProps.id))
                return true;
            return false;
        },
        /**
         * [setProps description]
         * @param {String} key  
         * @param {String} value
         * @return {Boolean}
         */
        setProps:function(key,value){
            if(!key)return false;
            var oldVal =this.mProps[key];
            if(value===oldVal)return false;
            this.mProps[key]=value;
            this.trigger('propchanged',{
                key:key,
                oldVal:oldVal,
                newVal:value
            });
            return true;
        },
        /**
         * [setCss description]
         * @param {String}  key     
         * @param {String}  value   
         * @param {String}  selector
         * @param {Boolean} isPrefix
         */
        setCss: function(key,value, selector, isPrefix) {
            var self=this;
            switch(arguments.length){
                case 0:
                    throw Error('setCss requries one argument at least');
                case 1:
                    value=null;
                    selector='';
                    isPrefix=false;
                    break;
                case 2:
                    selector='';
                    isPrefix=false;
                    break;
                case 3:
                    isPrefix=false;
                    break;
            }
            //TODO filter value
            if(isPrefix&&''===selector){isPrefix=false}
            var selectors=isPrefix?this.mPrefixSelectors:this.mSuffixSelectors;
            if(!selectors[selector]){
                (isPrefix?self.addPrefixSelector:self.addSuffixSelector).call(self,selector);
            }
            var oldVal = selectors[selector][key];
            if(oldVal === value)return false;
            selectors[selector][key] = value;
            this.trigger('csschanged',{
                key:key,
                oldVal:oldVal,
                newVal:value
            });
            return true;
        },
        /**
         * [addPrefixSelector description]
         * @param {String} selector [description]
         */
        addPrefixSelector: function(selector) {
            if (/^[\w\-\+>\.:]+$/.test(selector) && !this.mPrefixSelectors[selector]) {
                this.mPrefixSelectors[selector] = {};
                return true;
            }
            return false;
        },
        /**
         * [addSuffixSelector description]
         * @param {String} selector [description]
         */
        addSuffixSelector: function(selector) {
            if (/^[\w\-\+>\.:]+$/.test(selector)  && !this.mSuffixSelectors[selector]) {
                this.mSuffixSelectors[selector] = {};
                return true;
            }
            return false;
        },

        /**
         * [style description]
         * @param  {Boolean} wrapped
         * @return {String}        
         */
        style: function(wrapped) {
            var self = this;
            if (wrapped) {
                var styleText = '';
                $.each(self.mSuffixSelectors, function(k, v) {
                    var selector = self.mBaseSelector + k,
                        cssText = [];
                    $.each(v, function(m, n) {
                        if(n)
                            cssText.push(m + ":" + n);
                    });
                    styleText += selector + '{' + cssText.join(';') + '}\n';
                });
                return styleText;
            } else {

                var cssesText = [];
                $.each(this.mSuffixSelectors[''], function(k, v) {
                    cssesText.push(k + ':' + v);
                });
                cssesText = cssesText.join(';');
                return cssesText;
            }
        },
        /**
         * [html description]
         * @param  {Boolean} inlineCss [description]
         * @return {HTMLString}           [description]
         */
        html: function(inlineCss) {
            var propsText = [];
            $.each(this.mProps, function(k, v) {
                propsText.push(k + '=\"' + v + '"');
            });
            propsText = propsText.join(' ');

            return '<' + this.mTagName + ' ' + propsText + ' ' + (inlineCss ? ('style="' + this.style() + '"') : '') + (this.mNoClosure ? '/>' : ('>' + this.mInnerText + '</' + this.mTagName + '>'))
        },
        /**
         * [dom description]
         * @param  {Boolean} inlineCss
         * @return {jQuery DOM}
         */
        dom: function(inlineCss) {
            return $(this.html(inlineCss));
        }
    };

    Element.prototype = elementProto;
    return Element;
});