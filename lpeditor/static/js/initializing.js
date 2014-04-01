/**
 * initializing.js
 *
 * changelog
 * 2014-03-05[13:45:06]:created
 *
 * @info yinyong,osx-x64,UTF-8,10.129.172.32,js,/Volumes/yinyong/focus/lpeditor/static/js
 * @author yanni4night@gmail.com
 * @version 0.0.1
 * @since 0.0.1
 */
define(['element'], function(Element) {
    //*******************label definition*******************\\
    var areaRegLabelsDefine = {
        tag: 'label',
        text: function(id) {
            switch (id) {
                case 'lbl-reg-user':
                    return '用户名：';
                case 'lbl-reg-captcha':
                    return '验证码：';
                case 'lbl-reg-pwd':
                    return '游戏密码：';
                case 'lbl-reg-rpwd':
                    return '确认密码：';
                case 'lbl-login-user':
                    return '用户名：';
                case 'lbl-login-pwd':
                    return '游戏密码：';
                case 'lbl-login-server':
                    return '游戏分区：';
                default:
                    throw Error('Unknown ID ' + id);
            }
        },
        props: {
            'class': 'lbl',
            'for': function(id) {
                return id.replace(/^lbl/, 'input')
            }
        },
        css: {
            '': {
                left: '50px',
                top: '5px',
                display: 'block',
                width: '73px',
                height: '20px',
                color: '#fff',
                'font-size': '14px',
                'font-family': ''
            }
        }

    };

    //*******************input definition*******************\\
    var areaRegInputsDefine = {
        tag: function(id) {
            return !!~id.indexOf('server') ? 'select' : 'input'
        },
        props: {
            value: '',
            autocomplete: 'off',
            disableautocomplete: '',
            'class': 'input',
            placeholder: '',
            type: function(id) {
                return !!~id.indexOf('pwd') ? 'password' : ( !! ~id.indexOf('server') ? '' : 'text')
            }
        },
        css: {
            '': {
                left: '120px',
                width: function(id, index) {
                    return 'input-reg-captcha' === id ? '80px' : '150px';
                },
                height: '20px',
                top: '5px',
                display: 'block'
            }
        }
    };

    //*******************tip definition*******************\\
    var areaRegTipsDefine = {
        tag: 'div',
        text: function(id, index) {
            if ('tip-login-user' === id) {
                return '请填写用户名';
            } else if ('tip-login-pwd' === id) {
                return '请填写密码';
            }
            return '提示信息,JS修改';
        },
        props: {
            'class': 'tip'
        },
        css: {
            '': {
                display: 'none',
                color: '#fff',
                width: '200px',
                height: '15px',
                left: '120px',
                'font-size': '12px',
                'font-family': '',
                top: '35px'
            }
        }
    };

    //Every key is a ID of an element.
    //In css,every key is a selector,empty string means ID is used by default;
    //selector starts with '>' means suffix,or '<' means prefix;
    //Other values are not supported.
    var initializingElementsConfig = {
        close: {
            tag: 'a',
            text: '',
            props: {
                href: '##'
            },
            css: {
                '': {
                    left: '373px',
                    top: '10px',
                    width: '18px',
                    height: '18px',
                    'background-color': '',
                    'background-image': 'url(http://img.wan.sogou.com/ufo/img/newnav/dialog3/yx.jpg)',
                    'background-repeat': '',
                    'background-position': ''
                },
                '>:hover': {
                    'background-color': '',
                    'background-image': '',
                    'background-position': ''
                }
            }

        },
        /*Tab*/
        'tab-new-reg,tab-old-login': {
            tag: 'a',
            text: function(id, index) {
                return index ? '老用户登录' : '新用户注册';
            },
            props: {
                href: '##',
                'class': function(id, index) {
                    return index ? 'tab' : 'tab on'
                }
            },
            css: {
                '': {
                    left: function(id) {
                        if ('tab-new-reg' === id) {
                            return '20px'
                        } else {
                            return '191px';
                        }
                    },
                    top: '63px',
                    width: '171px',
                    height: '33px',
                    color: '#fff',
                    display: 'block',
                    'text-decoration': 'none',
                    'font-size': '14px',
                    'font-family': '',
                    'background-color': '',
                    'line-height': '33px',
                    'text-align': 'center',
                    'background-repeat': 'no-repeat',
                    'background-image': 'url(http://s7.wan.sogou.com/cdn/image/2014/03/05/20140305211310_980.jpg)'
                },
                '>:hover': {
                    color: '',
                    'text-decoration': 'underline',
                    'background-color': '',
                    'background-image': ''
                },
                '>.on': {
                    color: '',
                    'text-decoration': '',
                    'background-color': '',
                    'background-image': 'url(http://s5.wan.sogou.com/cdn/image/2014/03/05/20140305211018_817.jpg)'
                }
            }
        },
        /*注册区域*/
        'area-reg,area-login': {
            tag: 'form',
            props: {

            },
            css: {
                '': {
                    display: function(id, index) {
                        return index ? 'none' : 'block';
                    },
                    width: '300px',
                    height: '160px',
                    left: '0px',
                    top: '100px'
                }
            },
            children: function(id, index) {
                var children = 'area-reg' === id ? {
                    'line-reg-user': {
                        tag: 'div',
                        text: '',
                        props: {},
                        css: {
                            '': {
                                left: '0px',
                                top: '0px',
                                width: '300px',
                                height: '50px'
                            }
                        },
                        children: {
                            'lbl-reg-user': areaRegLabelsDefine,
                            'input-reg-user': areaRegInputsDefine,
                            'tip-reg-user': areaRegTipsDefine
                        }
                    }, //line-reg-user
                    'line-reg-pwd': {
                        tag: 'div',
                        text: '',
                        props: {},
                        css: {
                            '': {
                                left: '0px',
                                top: '50px',
                                width: '300px',
                                height: '50px'
                            }
                        },
                        children: {
                            'lbl-reg-pwd': areaRegLabelsDefine,
                            'input-reg-pwd': areaRegInputsDefine,
                            'tip-reg-pwd': areaRegTipsDefine
                        }
                    }, //line-reg-pwd
                    'line-reg-rpwd': {
                        tag: 'div',
                        text: '',
                        props: {},
                        css: {
                            '': {
                                left: '0px',
                                top: '100px',
                                width: '300px',
                                height: '50px',
                                display:'block'
                            }
                        },
                        children: {
                            'lbl-reg-rpwd': areaRegLabelsDefine,
                            'input-reg-rpwd': areaRegInputsDefine,
                            'tip-reg-rpwd': areaRegTipsDefine
                        }
                    }, //line-reg-repwd
                    'line-reg-captcha': {
                        tag: 'div',
                        text: '',
                        props: {},
                        css: {
                            '': {
                                left: '0px',
                                top: '150px',
                                width: '300px',
                                height: '50px',
                                display:'none'
                            }
                        },
                        children: {
                            'lbl-reg-captcha': areaRegLabelsDefine,
                            'input-reg-captcha': areaRegInputsDefine,
                            'tip-reg-captcha': areaRegTipsDefine,
                            "img-captcha": {
                                tag: 'img',
                                props: {
                                    border: 0,
                                    title: '验证码',
                                    'data-src': '/reg/captcha?rnd=' + Date.now()
                                },
                                css: {
                                    '': {
                                        display: 'block',
                                        width: '80px',
                                        height: '30px',
                                        top: '5px',
                                        left: '220px'
                                    }
                                }
                            }
                        }
                    },
                    'tip-reg-protocol': {
                        tag: 'div',
                        text: '您必须认真阅读并同意《搜狗服务协议》',
                        props: {},
                        css: {
                            '': {
                                width: '250px',
                                height: '20px',
                                left: '100px',
                                top: '250px',
                                display: 'none',
                                color: '#fff',
                                'font-size': '12px',
                                'font-family': ''
                            }
                        }
                    },
                    'ckb-protocol': {
                        tag: 'input',
                        props: {
                            type: 'checkbox',
                            checked: true,
                            name: function(id) {
                                return id;
                            }
                        },
                        css: {
                            '': {
                                display: 'block',
                                left: '100px',
                                top: '230px'
                            }
                        }
                    },
                    'a-protocol': {
                        tag: 'a',
                        text: '《搜狗服务协议》',
                        props: {
                            href: 'https://account.sogou.com/static/agreement.html',
                            target: '_blank'
                        },
                        css: {
                            '': {
                                width: '140px',
                                height: '20px',
                                left: '235px',
                                top: '230px',
                                color: '#005EC8',
                                'font-size': '12px',
                                'font-family': '',
                                'text-decoration': 'underline'
                            },
                            '>:hover': {
                                color: '',
                                'text-decoration': ''
                            }
                        }
                    },
                    'txt-protocol': {
                        tag: 'label',
                        text: '我已仔细阅读并同意',
                        props: {
                            'for': 'ckb-protocol'
                        },
                        css: {
                            '': {
                                width: '110px',
                                height: '20px',
                                left: '120px',
                                top: '230px',
                                color: '#fff',
                                'font-size': '12px',
                                'font-family': ''
                            }
                        }
                    }
                } : {
                    'line-login-user': {
                        tag: 'div',
                        text: '',
                        props: {},
                        css: {
                            '': {
                                left: '0px',
                                top: '0px',
                                width: '300px',
                                height: '50px'
                            }
                        },
                        children: {
                            'lbl-login-user': areaRegLabelsDefine,
                            'input-login-user': areaRegInputsDefine,
                            'tip-login-user': areaRegTipsDefine
                        }
                    }, //line-login-user
                    'line-login-pwd': {
                        tag: 'div',
                        text: '',
                        props: {},
                        css: {
                            '': {
                                left: '0px',
                                top: '50px',
                                width: '300px',
                                height: '50px'
                            }
                        },
                        children: {
                            'lbl-login-pwd': areaRegLabelsDefine,
                            'input-login-pwd': areaRegInputsDefine,
                            'tip-login-pwd': areaRegTipsDefine
                        }
                    }, //line-login-pwd
                    'line-login-server': {
                        tag: 'div',
                        text: '',
                        props: {},
                        css: {
                            '': {
                                left: '0px',
                                top: '100px',
                                width: '300px',
                                height: '50px'
                            }
                        },
                        children: {
                            'lbl-login-server': areaRegLabelsDefine,
                            'input-login-server': areaRegInputsDefine,
                            'tip-reg-server': areaRegTipsDefine
                        }
                    } //line-login-server
                };
                /* var labels = index ? areaLoginLabels : areaRegLabels;
                var inputs = index ? areaLoginInputs : areaRegInputs;
                var tips = index ? areaLoginTips : areaRegTips;
                $.extend(children, labels);
                $.extend(children, inputs);
                $.extend(children, tips);*/

                return children;
            } //children
        },
        /*开始按钮*/
        'btn-start': {
            tag: 'a',
            text: '',
            props: {
                href: '##'
            },
            css: {
                '': {
                    left: '100px',
                    top: '270px',
                    width: '190px',
                    height: '47px',
                    'font-size': '20px',
                    'font-family': '',
                    'background-image': "url(http://img.wan.sogou.com/ufo/img/newnav/dialog3/nav_reg_start_btn.jpg)",
                    'background-color': ''
                },
                '>:hover': {
                    'background-image': "",
                    'background-color': ''
                }
            }
        },
        'area-3rd': {
            tag: 'div',
            css: {
                '': {
                    width: '404px',
                    height: '100px',
                    display: 'block',
                    left: '0',
                    top: '355px'
                }
            },
            children: {
                'txt-3rdlogin': {
                    tag: 'div',
                    text: '使用其他帐号登录',
                    props: {},
                    css: {
                        '': {
                            width: '100px',
                            height: '20px',
                            left: '10px',
                            top: '10px',
                            color: '#fff',
                            'font-size': '12px',
                            'font-family': ''
                        }
                    }
                },

                'trd-login-qq,trd-login-renren,trd-login-weibo': {
                    tag: 'a',
                    text: '',
                    props: {
                        href: '##',
                        'class': 'login3rd'
                    },
                    css: {
                        '': {
                            top: '40px',
                            left: function(id, index) {
                                return 30 + 75 * index + 'px';
                            },
                            width: '70px',
                            height: '25px',
                            'background-image': 'url(http://wan.sogou.com/images/qq-rr-wb-8.png)',
                            'background-position': function(id, index) {
                                var s = ['-17px -7px', '-21px -36px', '-23px -65px'];
                                return s[index];
                            },
                            'background-repeat': 'no-repeat',
                            'background-color': ''
                        },
                        '>:hover': {
                            'background-image': '',
                            'background-position': function(id, index) {
                                var s = ['-5px -98px', '-5px -129px', '-5px -157px'];
                                return s[index];
                            },
                            'background-color': ''
                        }
                    }
                }
            }
        }
    };
    Object.freeze(initializingElementsConfig);
    console.log(initializingElementsConfig)
    return initializingElementsConfig;

});