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

    var noClosureTag = 'br,img,hr,link,meta,base,input'.toLowerCase().split(',');
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
        this.mProps = this._filterProps(props || {});
        this.mCsses = this._filterProps(csses || {});
    }

    var elementProto = {

        /**
         * Use browser to validate property value.
         * @param  {[type]} propName [description]
         * @return {[type]}          [description]
         */
        _filterProp: function(propName, propVal) {
            if (!propName||!O.isString(propName) || !propVal)
                return false;
           var tmpEle=$('<'+this.mTagName+'/>').attr(propName,propVal);
           tmpEle.appendTo($(document.body));
            propVal=tmpEle.attr(propName);
            tmpEle.remove();

            return propVal;
        },        
        /**
         * Use browser to validate css value.
         * @param  {[type]} propName [description]
         * @param  {[type]} propVal  [description]
         * @return {[type]}          [description]
         */
        _filterCss: function(propName, propVal) {
            if (!propName||!O.isString(propName) || !propVal)
                return false;
           var tmpEle=$('<'+this.mTagName+'/>').css(propName,propVal);
           tmpEle.appendTo($(document.body));

            propVal=tmpEle.css(propName);
            tmpEle.remove();
            return propVal;
        },
        /**
         * [_filterProps description]
         * @param  {[type]} props [description]
         * @return {Boolean|Object}       [description]
         */
        _filterProps: function(props) {
            var self = this;
            if (!$.isPlainObject(props)) return {};
            $.each(props, function(k, v) {
                var vv;
                if (false === (vv = self._filterProp(k, v))) {
                    delete props[k];
                } else {
                    props[k] = vv;
                }
            });

            return props;
        },

        /**
         * [style description]
         * @param  {[type]} wrapper [description]
         * @return {[type]}         [description]
         */
        style: function(wrapper) {
            if (wrapper && !this.mProps.id) {
                return '';
            }
            var cssesText = [];
            $.each(this.mCsses, function(k, v) {
                cssesText.push(k + ':' + v);
            });
            cssesText = cssesText.join(';');
            if (wrapper)
                return '#' + this.mProps.id + '{' + cssesText + '}';
            else return cssesText;
        },
        /**
         * [html description]
         * @param  {[type]} inlineCss [description]
         * @return {[type]}           [description]
         */
        html: function(inlineCss) {
            var propsText = [];
            $.each(this.mProps,function(k,v){
                propsText.push(k + '=\"' + v + '"');
            });
            propsText = propsText.join(' ');

            return '<' + this.mTagName + ' ' + propsText + ' ' + (inlineCss ? ('style="' + this.style() + '"') : '') + (this.mNoClosure ? '/>' : ('>' + this.mInnerText +'</' + this.mTagName + '>'))
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