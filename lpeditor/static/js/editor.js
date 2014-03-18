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
define(['setting','initializing', 'element', 'listener', 'jquery-ui'], function(Setting,Initializing, Element, Listener) {

    var $canvas = $('.canvas'),
        $previewStyle = $('#previewStyle');
    //todo:tidy
    function analyzeElement(ids, found,parent) {
        var self = this;
        var idArray = ids.split(',');
      //  var ret = [];
        idArray.forEach(function(id, index, ids) {
            var innerText = ('function' === typeof found.text) ? found.text(id, index) : (found.text || "");
            var props = {
                id: id
            }, css = {
                    position: 'absolute' //every element is absolute
                };
            //Copy properties
            $.each((found.props || {}), function(k, v) {
                if ('function' === typeof v)
                    v = v(id, index);
                props[k] = v;
            });
            var eleModel = new Element(found.tag || 'div', props, css, innerText);
            self.addElement(eleModel,parent);
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
                    eleModel.setCss(k, v, selector, isPrefix);
                });
            });

            var children = ('function' === typeof found.children) ? found.children(id, index) : (found.children || {});
            $.each(children, function(ids, found) {
                /*var eles =*/ analyzeElement.call(self,ids, found,eleModel);
              //  eleModel.appendChildren(eles);
            });
         //   ret.push(eleModel);
            //fixme
           // eleModel.listen('csschanged',self.onCssChanged,self);
        });
      //  return ret;
    }

    function loadDefaultElements() {
        var self = this;
        for (var ids in Initializing) {
            var found = Initializing[ids];
          /*  var elements = */analyzeElement.call(self, ids, found);
          /*  elements.forEach(function(ele, index) {
                self.addElement(ele);
            });*/
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

            loadDefaultElements.call(this);
            //This event has to register before first draw
            this.listen('drawcomplete', this.onDrawComplete, this);
            this.drawCanvas(REFRESH_HTML | REFRESH_CSS);

            //Just listen the following adding events.
            this.listen('elementadded', this.onElementAdded, this);
            this.listen('elementremoved', this.onElementRemoved, this);

            this.initEvt();

            this.__mInitialized = true;

            return this;
        },
        /**
         * [initEvt description]
         * @return {this}
         */
        initEvt: function() {
            var self = this;
            $canvas.delegate('*', 'mousedown', function(e) {
                self.selectElement(e.target.id);
            });
                
            //Tab switch
            $(document).delegate('#tab-old-login','click',function(e){
                $('#area-reg').hide();
                $('#area-login').show();
            }).delegate('#tab-new-reg','click',function(e){
                $('#area-reg').show();
                $('#area-login').hide();
            });

            return self;
        },
        /**
         * [selectElement description]
         * @param  {String|Element} focusElement
         * @return {this}
         */
        selectElement:function(focusElement){
            var ele;
            if(('string'===typeof focusElement)||focusElement instanceof String){
                 ele = this.getElementById(focusElement);
            }else{
                ele = focusElement;
            }

            if(ele){
                    this.trigger('focuschanged', this.__lastFocusElement, ele);
                    Setting.showFocusElement&&this.__lastFocusElement&&$(this.__lastFocusElement.mBaseSelector).removeClass('focus');
                    this.__lastFocusElement  = ele;
                    Setting.showFocusElement&&$(ele.mBaseSelector).addClass('focus');
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
        addElement: function(ele, parent) {
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

            self.trigger('elementadded', ele);

            return ele;
        },
        /**
         * [removeElementById description]
         * @param  {String} id
         * @return {Boolean}
         */
        removeElementById: function(id) {
            var self = this,ele;
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
                throw Error('Only Element could be added!');
            }
            return self.removeElementById[ele.getId()];
        },
        /**
         * [onPropChanged description]
         * @param  {[type]} evt    [description]
         * @param  {[type]} evtObj [description]
         * @param  {[type]} args   [description]
         */
        onPropChanged: function(evt, evtObj, args) {
            this.drawCanvas(REFRESH_HTML);
        },
        /**
         * [onCssChanged description]
         * @param  {[type]} evt    [description]
         * @param  {[type]} evtObj [description]
         * @param  {[type]} args   [description]
         */
        onCssChanged: function(evt, evtObj, args) {
            this.drawCanvas(REFRESH_CSS);
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
            console.log(this.gElements);
            return this;
        }
    };
    $.extend(Editor, new Listener());
    return Editor.init().dump();
});