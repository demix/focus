/**
 * Element.js
 *
 * changelog
 * 2014-03-04[19:06:21]:created
 *
 * @info yinyong,osx-x64,UTF-8,10.129.172.32,js,/Volumes/yinyong/lpeditor/js
 * @author yinyong@sogou-inc.com
 * @version 0.0.1
 * @since 0.0.1
 */
define([], function() {

    var noClosureTag = 'br,img,hr,link,meta,base,input'.split(',');
    /**
     * [Element description]
     * @param {[type]} tagname   [description]
     * @param {[type]} innerText [description]
     * @param {[type]} props     [description]
     * @param {[type]} csses     [description]
     */
    function Element(tagname, innerText, props, csses) {
        this.mTagName = (tagname || 'div').toLowerCase();
        this.mNoClosure = !! ~noClosureTag.indexOf(this.mTagName);
        this.mInnerText = innerText;
        this.mProps = props || {};

        this.mBaseSelector = ('#' + this.mProps.id) || this.mTagName;

        this.mPrefixSelectors = {}; //like .on #id
        this.mSuffixSelectors = {
            '': (csses || {})//default is kind of suffix selector
        }; //like #id.on
    }

    var elementProto = {
        /**
         * [setProps description]
         * @param {[type]} key   [description]
         * @param {[type]} value [description]
         */
        setProps:function(key,value){
            if(!key)return false;
            this.mProps[key]=value;
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
            selectors[selector][key]=value;

            return true;
        },
        /**
         * [addPrefixSelector description]
         * @param {[type]} selector [description]
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
         * @param {[type]} selector [description]
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
         * @param  {Boolean} wrapped [description]
         * @return {[type]}         [description]
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
         * @param  {[type]} inlineCss [description]
         * @return {[type]}           [description]
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
         * @param  {[type]} inlineCss [description]
         * @return {[type]}           [description]
         */
        dom: function(inlineCss) {
            return $(this.html(inlineCss));
        }
    };

    Element.prototype = elementProto;
    return Element;
});