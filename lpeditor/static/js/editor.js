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
define(['initializing', 'element', 'listener', 'jquery-ui'], function(Initializing, Element, Listener) {

    var $canvas = $('.canvas'),
        $previewStyle = $('#previewStyle');

    function loadDefaultElements() {
        var self = this;
        for (var ids in Initializing) {
            //id(s) splited with ','
            ids = ids.split(',');
            var found = Initializing[ids];
            //generate element by ids
            //todo:check dumplated
            ids.forEach(function(id, index, ids) {
                var innerText = ('function' === typeof found.text) ? found.text(id, index) : (found.text || "");
                var props = {
                    id: id
                }, css = {
                        position: 'absolute'//every element is absolute
                    };
                //Copy properties
                $.each((found.props || {}), function(k, v) {
                    if ('function' === typeof v)
                        v = v(id, index);
                    props[k] = v;
                });
                var eleModel = new Element(found.tag, props, css, innerText);

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
                        if ('function' === typeof v) v = v(id, index);
                        eleModel.setCss(k, v, selector, isPrefix);
                    });
                });
                eleModel.listen('propchanged', self.onPropChanged, self);
                eleModel.listen('csschanged', self.onCssChanged, self);
                self.addElement(eleModel);
            });
        }

        return self;
    }

    var REFRESH_HTML = 1,
        REFRESH_CSS = 1 << 1;
    //Singleton Editor Object
    var Editor = {
        gElements: {},
        __mInitialized: false,
        /**
         * [init description]
         * @return {[type]} [description]
         */
        init: function() {
            if (this.__mInitialized) return this;

            loadDefaultElements.call(this);
            //This event has to register before first draw
            this.listen('drawcomplete', this.onDrawComplete, this);
            this.drawCanvas(REFRESH_HTML | REFRESH_CSS);

            //Just listen the following adding events.
            this.listen('elementadded', this.onElementAdded, this);
            this.listen('elementremoved', this.onElementRemoved, this);
            this.__mInitialized = true;

            return this;
        },
        /**
         * [getElementById description]
         * @return {[type]} [description]
         */
        getElementById: function(id) {
            if (!id) return null;
            var ele = this.gElements[id];
            if (!ele) return null;
            return ele;
        },
        /**
         * [drawCanvas description]
         * @param  {Integer} level
         */
        drawCanvas: function(level) {
            var styleText = '',
                innerHtml = '';
            level = level | 0;
            $.each(this.gElements, function(id, ele) {
                if (REFRESH_HTML === (level & REFRESH_HTML))
                    innerHtml += ele.html(false);
                if (REFRESH_CSS === (level & REFRESH_CSS))
                    styleText += ele.style(true);
            });
            if (styleText) {
                $previewStyle.text(styleText);
            }
            if (innerHtml) {
                $canvas.html(innerHtml);
                this.trigger('drawcomplete');
            }

        },
        /**
         * [addElement description]
         * @param {[type]} ele [description]
         */
        addElement: function(ele) {
            var self = this;
            if (!(ele instanceof Element)) {
                throw Error('Only element could be added!');
            }
            var id = ele.getId();
            if (this.gElements[id]) {
                throw Error('This element[' + id + '] has already added!')
            }

            this.gElements[id] = ele;

            this.trigger('elementadded', ele);
        },
        /**
         * [removeElementById description]
         * @param  {String} id
         * @return {Boolean}
         */
        removeElementById: function(id) {
            if (!id || !this.gElements[id]) {
                console.warn('Element with ID[' + id + '] does not been found!');
                return false;
            }

            var ele = this.gElements[id],
                deleted = delete this.gElements[id];
            if (deleted) {
                this.trigger('elementremoved', ele);
            }
            return deleted;
        },
        /**
         * [removeElement description]
         * @param  {[type]} ele [description]
         * @return {[type]}     [description]
         */
        removeElement: function(ele) {
            var self = this;
            if (!(ele instanceof Element)) {
                throw Error('Only Element could be added!');
            }
            return this.removeElementById[ele.getId()];
        },
        /**
         * [onPropChanged description]
         * @param  {[type]} evt    [description]
         * @param  {[type]} evtObj [description]
         * @param  {[type]} args   [description]
         */
        onPropChanged: function(evt, evtObj, args) {
            console.log(evt, evtObj, args);
            this.drawCanvas(REFRESH_HTML);
        },
        /**
         * [onCssChanged description]
         * @param  {[type]} evt    [description]
         * @param  {[type]} evtObj [description]
         * @param  {[type]} args   [description]
         */
        onCssChanged: function(evt, evtObj, args) {
            console.log(evt, evtObj, args);
            this.drawCanvas(REFRESH_CSS);
        },
        /**
         * [onElementAdded description]
         * @param  {[type]} evt    [description]
         * @param  {[type]} evtObj [description]
         * @param  {[type]} args   [description]
         */
        onElementAdded: function(evt, evtObj, args) {
            console.log(evt, evtObj, args);
            this.drawCanvas(REFRESH_CSS | REFRESH_HTML);
        },
        /**
         * [onElementRemoved description]
         * @param  {[type]} evt    [description]
         * @param  {[type]} evtObj [description]
         * @param  {[type]} args   [description]
         */
        onElementRemoved: function(evt, evtObj, args) {
            console.log(evt, evtObj, args);
            this.drawCanvas(REFRESH_HTML);
        },
        /**
         * [onDrawComplete description]
         * @param  {[type]} evt    [description]
         * @param  {[type]} evtObj [description]
         * @param  {[type]} args   [description]
         * @return {[type]}        [description]
         */
        onDrawComplete: function(evt, evtObj, args) {
            console.log(evt, evtObj, args);
            var self = this;
            //todo
            //draggable,resizeable
            $canvas.find('*').draggable({
                containment: "parent",
                stop: function(event, ui) {
                    var id = event.target.id;
                    var ele = self.getElementById(id);
                    if (!ele) {
                        console.warn('cannot find ID[' + id + '] which is dragging');
                    } else {
                        ele.setCss('left', ui.position.left + 'px', '', false, true);
                        ele.setCss('top', ui.position.top + 'px', '', false, true);
                    }
                }
            }).resizable({
                stop: function(event, ui) {
                    var id = event.target.id;
                    var ele = self.getElementById(id);
                    if (!ele) {
                        console.warn('cannot find ID[' + id + '] which is resizing');
                    } else {
                        ele.setCss('width', ui.size.width + 'px', '', false, true);
                        ele.setCss('height', ui.size.height + 'px', '', false, true);
                    }
                }
            });
        },
        /**
         * [dump description]
         * @return {[type]} [description]
         */
        dump: function() {
            console.log(this.gElements);
        }
    };
    $.extend(Editor, new Listener());
    return Editor;
});