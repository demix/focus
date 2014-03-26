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
     * @param {String} tagname
     * @param {Object} props
     * @param {Object} csses
     * @param {String} innerText
     */
    function Element(tagname, props, csses, innerText) {
        if (arguments.length < 2) {
            throw Error('Construct an element need as least TWO parameters!');
        }
        if (!/^[A-Za-z][\w\-]+$/.test(props.id)) {
            throw Error('Element need a legal ID property');
        }
        this.mTagName = String(tagname).toLowerCase();
        this.mNoClosure = !! ~noClosureTag.indexOf(this.mTagName);
        this.mInnerText = innerText || "";
        this.mProps = props;
        //has to own a ID
        this.mBaseSelector = '#' + this.mProps.id;

        this.mPrefixSelectors = {}; //like .on #id
        this.mSuffixSelectors = {
            '': (csses || {}) //default is kind of suffix selector
        }; //like #id.on

        this.mChildren = {};

        this.mParent = null;

        $.extend(this, new Listener());
    }

    var elementProto = {
        /**
         * [getId description]
         * @return {String}
         */
        getId: function() {
            return this.mProps.id;
        },
        /**
         * [equals description]
         * @param  {Element} ele
         * @return {Boolean}
         */
        equals: function(ele) {
            if (!(ele instanceof Element)) {
                return false;
            }

            if (ele === this) return true;

            if (ele.mProps.id && (ele.mProps.id === this.mProps.id))
                return true;
            return false;
        },
        /**
         * [setProps description]
         * @param {String} key
         * @param {String} value
         * @param {Booean} silence
         * @return {Boolean}
         */
        setProps: function(key, value, silence) {
            if (!key) return false;
            var oldVal = this.mProps[key];
            if (value === oldVal) return false;
            this.mProps[key] = value;
            (!silence) && this.trigger('propchanged', {
                key: key,
                oldVal: oldVal,
                newVal: value
            });
            return true;
        },
        /**
         * [setText description]
         * @param {[type]} text    [description]
         * @param {[type]} silence [description]
         */
        setText: function(text, silence) {
            var oldVal = this.mInnerText;
            if (text === oldVal) return false;
            this.mInnerText = text;
            (!silence) && this.trigger('textchanged', {
                oldVal: oldVal,
                newVal: text
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
        setCss: function(key, value, selector, isPrefix, silence) {
            var self = this;
            switch (arguments.length) {
                case 0:
                    throw Error('setCss requries one argument at least');
                case 1:
                    value = null;
                    selector = '';
                    isPrefix = false;
                    break;
                case 2:
                    selector = '';
                    isPrefix = false;
                    break;
                case 3:
                    isPrefix = false;
                    break;
            }
            //TODO filter value
            if (isPrefix && '' === selector) {
                isPrefix = false
            }
            var selectors = isPrefix ? this.mPrefixSelectors : this.mSuffixSelectors;
            if (!selectors[selector]) {
                (isPrefix ? self.addPrefixSelector : self.addSuffixSelector).call(self, selector);
            }
            var oldVal = selectors[selector][key];
            if (oldVal === value) return false;
            selectors[selector][key] = value;
            (!silence) && this.trigger('csschanged', {
                key: key,
                oldVal: oldVal,
                newVal: value
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
            if (/^[\w\-\+>\.:]+$/.test(selector) && !this.mSuffixSelectors[selector]) {
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
                        if (n)
                            cssText.push(m + ":" + n);
                    });
                    styleText += selector + '{' + cssText.join(';') + '}\n';
                });

                $.each(self.mChildren, function(index, child) {
                    styleText += child.style(true);
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
            var propsText = [],
                innerHtml = '';
            $.each(this.mProps, function(k, v) {
                v && propsText.push(k + '=\"' + v + '"');
            });
            propsText = propsText.join(' ');

            $.each(this.mChildren, function(index, child) {
                innerHtml += child.html(inlineCss);
            });

            return '<' + this.mTagName + ' ' + propsText + ' ' + (inlineCss ? ('style="' + this.style() + '"') : '') + (this.mNoClosure ? '/>' : ('>' + this.mInnerText + innerHtml + '</' + this.mTagName + '>'))
        },
        /**
         * [dom description]
         * @param  {Boolean} inlineCss
         * @return {jQuery DOM}
         */
        dom: function(inlineCss) {
            return $(this.html(inlineCss));
        },
        /**
         * [appendChildren description]
         * @param  {[type]} children [description]
         * @return {[type]}          [description]
         */
        appendChildren: function(children) {
            var self = this;
            ([]).forEach.call(children, function(child, index) {
                self.appendChild(child)
            });

            return this;
        },
        /**
         * [appendChild description]
         * @param  {[type]} child [description]
         * @return {[type]}       [description]
         */
        appendChild: function(child) {
            if (!(child instanceof Element)) {
                throw Error('child MUST BE an Element');
            }

            if (this.mChildren[child.getId()]) {
                console.warn('Child dumplicated');
                return this;
            }

            child.mParent = this;
            var oldPar = child.parent;
            if (oldPar) {
                oldPar.removeChild(child);
            }

            this.mChildren[child.getId()] = child;

            return this;
        },
        /**
         * [removeChild description]
         * @param  {[type]} child [description]
         * @return {[type]}       [description]
         */
        removeChild: function(child) {
            var self = this;
            if (!(child instanceof Element)) {
                throw Error('child MUST BE an Element');
            }

            var c = this.mChildren[child.getId()];
            if (!c) {
                console.warn('Element ' + child.getId() + " is not child!");
                return null;
            }
            c.mParent = null;
            delete this.mChildren[child.getId()];

            return c;
        },
        /**
         * [toJSON description]
         * @return {[type]} [description]
         */
        toJSON: function() {
            var self = this;
            var ret = {
                tag: self.mTagName,
                props: self.mProps,
                text: self.mInnerText,
                css: {},
                children: {}
            };

            $.each(self.mSuffixSelectors, function(key, sle) {
                ret.css[key?'>' + key:''] = sle;
            });

            $.each(self.mPrefixSelectors, function(key, sle) {
                ret.css['<' + key] = sle;
            });

            $.each(self.mChildren, function(key, sle) {
                ret.children[key] = sle.toJSON();
            });

            return ret;
        }
    };

    Element.prototype = elementProto;
    return Element;
});