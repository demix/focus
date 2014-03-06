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
    //Every key is a ID of an element.
    //In css,every key is a selector,empty string means ID is used by default;
    //selector starts with '>' means suffix,or '<' means prefix;
    //Other values are not supported.
    var initializingElementsConfig = {
        close: {
            tag: 'a',
            text: '',
            props: {
                href: 'javascript:;'
            },
            css: {
                '': {
                    left: '373px',
                    top: '10px',
                    width: '18px',
                    height: '18px',
                    'background-color': '',
                    'background-image': 'url(http://img.wan.sogou.com/ufo/img/newnav/dialog3/yx.jpg)'
                },
                '>:hover': {
                    hoverCss: {
                        'background-color': '',
                        'background-image': ''
                    }
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
                href: 'javascript:;',
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
                    'text-decoration': 'none',
                    'font-size': '14px',
                    'font-family': '',
                    'background-color': '',
                    'line-height': '33px',
                    'text-align': 'center',
                    'background-repeat': 'no-repeat',
                    'background-image': function(id) {
                        switch (id) {
                            case 'tab-new-reg':
                                return 'url(http://s5.wan.sogou.com/cdn/image/2014/03/05/20140305211018_817.jpg)';
                            case 'tab-old-login':
                                return 'url(http://s7.wan.sogou.com/cdn/image/2014/03/05/20140305211310_980.jpg)'
                            default:
                                throw Error('Unknown ID ' + id);
                        }
                    }
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
                    'background-image': ''
                }
            }
        },
        /*注册区域*/
/*        'area-reg':{
            tag:'div',
            css:{
                '':{
                    width:'400px',
                    height:'200px',
                    left:0,
                    top:'200px'
                }
            }
        },*/
        /*标签*/
        'lbl-reg-user,lbl-reg-pwd,lbl-reg-rpwd,lbl-login-user,lbl-login-pwd,lbl-login-server': {
            tag: 'label',
            text: function(id) {
                switch (id) {
                    case 'lbl-reg-user':
                        return '用户名：';
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
            parent:function(id,index){
                return 
            },
            props: {
                'class': 'lbl',
                'for': function(id) {
                    return id.replace(/^lbl/, 'input')
                }
            },
            css: {
                '': {
                    display: function(id) {
                        return !!~id.indexOf('login') ? 'none' : 'block';
                    },
                    left: '50px',
                    top: function(id) {
                        switch (id) {
                            case 'lbl-reg-user':
                                return '124px';
                            case 'lbl-reg-pwd':
                                return '164px';
                            case 'lbl-reg-rpwd':
                                return '204px';
                            case 'lbl-login-user':
                                return '124px';
                            case 'lbl-login-pwd':
                                return '164px';
                            case 'lbl-login-server':
                                return '204px';
                        }
                    },
                    color: '#fff',
                    'font-size': '14px',
                    'font-family': ''
                }
            }
        },
        'input-reg-user,input-reg-pwd,input-reg-rpwd,input-login-user,input-login-pwd,input-login-server': {
            tag: 'input',
            props: {
                value: '',
                autocomplete: 'off',
                disableautocomplete: '',
                'class': 'input',
                type: function(id) {
                    return !!~id.indexOf('pwd') ? 'password' : ( !! ~id.indexOf('server') ? 'select' : 'text')
                }
            },
            css: {
                '': {
                    display: function(id) {
                        return !!~id.indexOf('login') ? 'none' : 'block';
                    },
                    left: '120px',
                    top: function(id) {
                        switch (id) {
                            case 'input-reg-user':
                                return '120px';
                            case 'input-reg-pwd':
                                return '160px';
                            case 'input-reg-rpwd':
                                return '200px';
                            case 'input-login-user':
                                return '120px';
                            case 'input-login-pwd':
                                return '160px';
                            case 'input-login-server':
                                return '200px';
                        }
                    },
                    width: '150px',
                    height: '20px'
                }
            }
        },
        'tip-reg-user,tip-reg-pwd,tip-reg-rpwd,tip-login-user,tip-login-pwd,tip-login-server,tip-login,tip-reg': {
            tag: 'div',
            text: '提示信息，修改文本无效',
            props: {
                'class': 'tip'
            },
            css: {
                '': {
                    display: function(id) {
                        return !!~id.indexOf('login') ? 'none' : 'block';
                    },
                    color: '#fff',
                    width: '200px',
                    height: '15px',
                    left: '120px',
                    'font-size': '12px',
                    'font-family': '',
                    top: function(id) {
                        switch (id) {
                            case 'tip-reg':
                                return '270px';
                            case 'tip-login':
                                return '270px';
                            case 'tip-reg-user':
                                return '146px';
                            case 'tip-reg-pwd':
                                return '186px';
                            case 'tip-reg-rpwd':
                                return '226px';
                            case 'tip-login-user':
                                return '146px';
                            case 'tip-login-pwd':
                                return '186px';
                            case 'tip-login-server':
                                return '226px';
                        }
                    }
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
                    top: '330px'
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
                    top: '330px',
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
                    width: '200px',
                    height: '20px',
                    left: '120px',
                    top: '330px',
                    color: '#fff',
                    'font-size': '12px',
                    'font-family': ''
                }
            }
        },
        /*开始按钮*/
        'btn-start': {
            tag: 'a',
            text: '',
            props: {
                href: 'javascript:;'
            },
            css: {
                '': {
                    left: '200px',
                    top: '350px',
                    width: '190px',
                    height: '47px',
                    'font-size': '20px',
                    'font-family': '',
                    'background-image': "",
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

        'qq-3rd-login,renren-3rd-login,weibo-3rd-login': {
            tag: 'a',
            text: '',
            props: {
                href: 'javascript:;',
                'class': 'login3rd'
            },
            css: {
                '': {
                    top: '40px',
                    left: function(id,index) {
                        return 30+75*index+'px'; 
                    },
                    width: '70px',
                    height: '25px',
                    'background-image': '',
                    'background-color': 'red'
                },
                '>:hover': {
                    'background-image': '',
                    'background-color': 'yellow'
                }
            }
        }
            }
        }
    };

    return initializingElementsConfig;

});