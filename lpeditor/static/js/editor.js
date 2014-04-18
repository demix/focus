/**
 * editor.js
 *
 * changelog
 * 2014-03-05[15:57:31]:created
 * 2014-03-18[12:02:16]:fixed bug that children has no css change listener
 *
 * @info yinyong,osx-x64,UTF-8,10.129.172.32,js,/Volumes/yinyong/focus/lpeditor/static/js
 * @author yanni4night@gmail.com
 * @version 0.0.2
 * @since 0.0.1
 */
define(['setting', 'initializing', 'element', 'listener', 'disk', 'jquery-ui' /*draggable&resizable*/ ], function(Setting, Initializing, Element, Listener, DiskManager) {

    var $canvas = $('.canvas'),
        $previewStyle = $('#previewStyle');
    //todo:tidy
    function analyzeElement(ids, found, parent) {
        var self = this;
        var idArray = ids.split(',');

        idArray.forEach(function(id, index, ids) {
            var innerText = ('function' === typeof found.text) ? found.text(id, index) : (found.text || "");
            var props = {
                id: id
            }, css = {
                    'z-index': '', //every has to set z-index
                    position: 'absolute', //every element is absolute
                    display:'block'
                };

            if(/^input\-/.test(id)){
                css['background-color']='';
                css['background-position']='';
                css['border']='';
            }

            //Copy properties
            $.each((found.props || {}), function(k, v) {
                if ('function' === typeof v)
                    v = v(id, index);
                props[k] = v;
            });
            var tag = 'function' === typeof found.tag ? found.tag(id, index) : found.tag;
            var eleModel = new Element(tag || 'div', props, css, innerText);
            self.addElement(eleModel, parent, true);
            //copy css attributes
            $.each((found.css || {}), function(selector, selectorItems) {
                var isPrefix = false;
                if ('' === selector) {
                    selector = '';
                } else if ('>' === selector[0]) {
                    selector = selector.slice(1);
                } else if ('<' === selector[0]) {
                    isPrefix = false;
                    selector = selector.slice(1);
                }
                $.each(selectorItems, function(k, v) {
                    if ('function' === typeof v) {
                        v = v(id, index);
                    }
                    eleModel.setCss(k, v, selector, isPrefix, true);
                });
            });

            var children = ('function' === typeof found.children) ? found.children(id, index) : (found.children || {});
            $.each(children, function(ids, found) {
                analyzeElement.call(self, ids, found, eleModel);
            });
        });
    }

    function loadDefaultElements(draft) {
        var self = this,
            draft = draft || Initializing;
        for (var ids in draft) {
            var found = draft[ids];
            analyzeElement.call(self, ids, found);
        }

        return self;
    }

    var REFRESH_HTML = 1,
        REFRESH_CSS = 1 << 1;
    //Singleton Editor Object
    var Editor = {
        gElements: {},
        __mInitialized: false,
        __lastFocusElement: null,

        /**
         * [init description]
         * @return {[type]} [description]
         */
        init: function() {
            if (this.__mInitialized) {
                return this;
            }

            DiskManager.listen(EVT_LOADED, this.onDiskLoaded, this);

            //This event has to register before first draw
            this.listen('drawcomplete', this.onDrawComplete, this);

            this.load();

            //Just listen the following adding events.
            this.listen('elementadded', this.onElementAdded, this);
            this.listen('elementremoved', this.onElementRemoved, this);

            this.initEvt();

            this.__mInitialized = true;

            return this;
        },
        /**
         * [load description]
         * @param  {[type]} data [description]
         * @return {[type]}      [description]
         */
        load: function(data) {
            this.gElements = {};
            this.trigger('loading');
            loadDefaultElements.call(this, data);
            this.trigger('loaded');
            this.drawCanvas(REFRESH_HTML | REFRESH_CSS);
        },
        /**
         * [onDiskLoaded description]
         * @param  {[type]} evt
         * @param  {[type]} evtObj
         * @param  {[type]} args
         */
        onDiskLoaded: function(evt, evtObj, args) {
            var profile = args[0],
                id = args[1];
            this.load(profile.elements);
        },
        /**
         * [initEvt description]
         * @return {this}
         */
        initEvt: function() {
            var self = this;
            $canvas.delegate('*', 'mousedown', function(e) {
                self.selectElement(e.target.id);
            }).delegate('*', 'dblclick', function(e) {
                self.trigger('dblclick', e.target.id);
            });

            //Tab switch
            $(document).delegate('#tab-old-login', 'click', function(e) {
                $('#tab-old-login').addClass('on');
                $('#tab-new-reg').removeClass('on');
                $('#area-reg').hide();
                $('#area-login').show();
            }).delegate('#tab-new-reg', 'click', function(e) {
                $('#tab-old-login').removeClass('on');
                $('#tab-new-reg').addClass('on');
                $('#area-reg').show();
                $('#area-login').hide();
            });

            return self;
        },
        /**
         * [selectElement description]
         * @param  {[type]} focusElement [description]
         * @param  {[type]} silence      [description]
         * @return {[type]}              [description]
         */
        selectElement: function(focusElement, silence) {
            var ele;
            if (('string' === typeof focusElement) || focusElement instanceof String) {
                ele = this.getElementById(focusElement);
            } else {
                ele = focusElement;
            }

            if (ele) {
                !silence && this.trigger('focuschanged', this.__lastFocusElement, ele);
                Setting.get('showFocusElement') && this.__lastFocusElement && $(this.__lastFocusElement.mBaseSelector).removeClass('focus');
                this.__lastFocusElement = ele;
                Setting.get('showFocusElement') && $(ele.mBaseSelector).addClass('focus');
            }

            return ele;
        },
        /**
         * [getElementById description]
         * @param  {[type]} id   [description]
         * @param  {[type]} root [description]
         * @return {[type]}      [description]
         */
        getElementById: function(id, root) {
            var self = this;
            if (!id) return null;
            if (root && !(root instanceof Element)) {
                throw Error('root MUST BE null or an Element');
            }
            if (!root) {
                //search from gElements
                if (self.gElements[id]) {
                    return self.gElements[id];
                }
                for (var _id in self.gElements) {
                    var child = self.gElements[_id];
                    var v = self.getElementById(id, child);
                    if (v) {
                        return v;
                    }
                }

                return null;
            } else {
                //search from root
                if (id === root.getId()) {
                    return root;
                }

                ele = root.mChildren[id];
                if (ele) return ele;
                for (var _id in root.mChildren) {
                    var child = root.mChildren[_id];
                    var v = self.getElementById(id, child);
                    if (v) {
                        return v;
                    }
                }

                return null;
            }
        },
        /**
         * [generateCode description]
         * @param  {[type]} level [description]
         * @return {[type]}       [description]
         */
        generateCode: function(level) {
            var styleText = '',
                innerHtml = '';
            var levelNum = level | 0;
            $.each(this.gElements, function(id, ele) {
                if (undefined === level || REFRESH_HTML === (levelNum & REFRESH_HTML))
                    innerHtml += ele.html(false);
                if (undefined === level || REFRESH_CSS === (levelNum & REFRESH_CSS))
                    styleText += ele.style(true);
            });
            return {
                styleText: styleText,
                innerHtml: innerHtml
            }
        },
        /**
         * [drawCanvas description]
         * @param  {Integer} level
         */
        drawCanvas: function(level) {
            var code = this.generateCode(level);
            if (code.styleText) {
                $previewStyle.text(code.styleText);
                this.trigger('cssrefreshed');
            }
            if (code.innerHtml) {
                $canvas.html(code.innerHtml);
                this.trigger('drawcomplete');
            }

        },
        /**
         * [addElement description]
         * @param {[type]} ele [description]
         */
        addElement: function(ele, parent, silence) {
            var self = this;
            if (!(ele instanceof Element)) {
                throw Error('Only element could be added!');
            }
            var id = ele.getId();
            if (self.getElementById(id)) {
                throw Error('This element[' + id + '] has already added!')
            }

            if (parent) {
                parent.appendChild(ele);
            } else {
                ele.parent = null;
                self.gElements[id] = ele;
            }

            ele.listen('propchanged', self.onPropChanged, self);
            ele.listen('csschanged', self.onCssChanged, self);
            ele.listen('textchanged', self.onTextChanged, self);

            !silence && self.trigger('elementadded', ele);

            this.selectElement(ele, silence);

            return ele;
        },
        /**
         * [removeElementById description]
         * @param  {String} id
         * @return {Boolean}
         */
        removeElementById: function(id) {
            var self = this,
                ele;
            if (!id || !(ele = this.getElementById(id))) {
                console.warn('Element with ID[' + id + '] does not been found!');
                return false;
            }

            ele.dislisten('propchanged', self.onPropChanged);
            ele.dislisten('csschanged', self.onCssChanged);

            var deleted = ele.parent ? ele.parent.removeChild(ele) : (delete self.gElements[id]);
            if (deleted) {
                self.trigger('elementremoved', ele);
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
                throw Error('Only Element could be removed!');
            }
            return self.removeElementById[ele.getId()];
        },
        /**
         * [onPropChanged description]
         * @param  {[type]} evt
         * @param  {[type]} evtObj
         * @param  {[type]} args
         */
        onPropChanged: function(evt, evtObj, args) {
            //Don't need to re-create all elements.
            var id = evtObj.getId();
            if (~['selected', 'checked'].indexOf(args[0].key))
                $('#' + id).prop(args[0].key, !! args[0].newVal);
            else if ('' !== typeof args[0].newVal) {
                $('#' + id).attr(args[0].key, args[0].newVal);
            } else
                $('#' + id).removeAttr(args[0].key);
        },
        /**
         * [onCssChanged description]
         * @param  {[type]} evt
         * @param  {[type]} evtObj
         * @param  {[type]} args
         */
        onCssChanged: function(evt, evtObj, args) {
            //Here we re-render through generating new stylesheet.
            this.drawCanvas(REFRESH_CSS);

            $canvas.find('*').removeAttr('style');

            this.trigger('csschanged', evtObj);
        },
        /**
         * [onTextChanged description]
         * @param  {[type]} evt
         * @param  {[type]} evtObj
         * @param  {[type]} args
         */
        onTextChanged: function(evt, evtObj, args) {
            var id = evtObj.getId();
            $('#' + id).text(args[0].newVal);
        },
        /**
         * [onElementAdded description]
         * @param  {[type]} evt    [description]
         * @param  {[type]} evtObj [description]
         * @param  {[type]} args   [description]
         */
        onElementAdded: function(evt, evtObj, args) {
            this.drawCanvas(REFRESH_CSS | REFRESH_HTML);
        },
        /**
         * [onElementRemoved description]
         * @param  {[type]} evt
         * @param  {[type]} evtObj
         * @param  {[type]} args
         */
        onElementRemoved: function(evt, evtObj, args) {
            //Don't need to redraw
            //FIXME
            this.drawCanvas(REFRESH_HTML);
        },
        /**
         * [onDrawComplete description]
         * @param  {[type]} evt
         * @param  {[type]} evtObj
         * @param  {[type]} args
         * @return {[type]}
         */
        onDrawComplete: function(evt, evtObj, args) {
            var self = this;
            $canvas.find('a').not('[id^=tab]').click(function(e) {
                e.preventDefault();
                return false;
            });
            //draggable,resizeable
            $canvas.find('span,label,div,a,img,form').draggable({
                containment: "parent",
                stop: function(event, ui) {
                    var id = event.target.id;
                    var ele = self.getElementById(id);
                    if (!ele) {
                        console.warn('cannot find ID[' + id + '] which is dragging');
                    } else {
                        ele.setCss('left', ui.position.left + 'px', '', false, false);
                        ele.setCss('top', ui.position.top + 'px', '', false, false);
                    }
                }
            }).not('img').resizable({
                stop: function(event, ui) {
                    var id = event.target.id;
                    var ele = self.getElementById(id);
                    if (!ele) {
                        console.warn('cannot find ID[' + id + '] which is resizing');
                    } else {
                        ele.setCss('width', ui.size.width + 'px', '', false, false);
                        ele.setCss('height', ui.size.height + 'px', '', false, false);
                    }
                }
            });
        },
        /**
         * [getTreeJson description]
         * @return {Object}
         */
        getTreeJson: function() {
            var nodes = [];
            var getTreeNodes = function(root) {
                var node = {
                    id: root.getId(),
                    name: root.getId(),
                    children: []
                };
                $.each(root.mChildren, function(index, child) {
                    node.children.push(getTreeNodes(child));
                });
                return node;
            };
            $.each(this.gElements, function(index, ele) {
                nodes.push(getTreeNodes(ele));
            });
            return nodes;
        },
        /**
         * [dump description]
         * @return {[type]} [description]
         */
        dump: function() {
            var draft = {};
            $.each(this.gElements, function(key, ele) {
                draft[ele.getId()] = ele.toJSON();
            });

            return draft;
        }
    };
    $.extend(Editor, new Listener());
    return Editor.init();
});