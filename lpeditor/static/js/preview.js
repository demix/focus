/**
 * preview.js
 *
 * changelog
 * 2014-03-18[12:13:23]:created
 *
 * @info yinyong,osx-x64,UTF-8,10.129.175.199,js,/Volumes/yinyong/focus/lpeditor/static/js
 * @author yanni4night@gmail.com
 * @version 0.0.1
 * @since 0.0.1
 */
define(['editor', 'canvas','utils'], function(Editor, Canvas,Utils) {

  $('<form/>', {
    id: 'preview_form',
    target: "_blank",
    method: 'post',
    action: '/preview'
  }).css({
    display: 'none'
  }).append(
    $('<textarea/>', {
      id: "preview_css",
      name: 'css',
      value: ""
    })
  ).append(
    $('<textarea/>', {
      id: "preview_html",
      name: 'html',
      value: ""
    })
  ).appendTo($(document.body));

  return function() {
    var code = Editor.generateCode();
    $('#preview_css').val(code.styleText);
    $('#preview_html').val(Canvas.getCanvasHTML()+ code.innerHtml+"</div>");
    $('#preview_form')[0].submit();
  };
});