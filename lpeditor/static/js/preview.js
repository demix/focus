/**
 * preview.js
 *
 * changelog
 * 2014-03-18[12:13:23]:created
 * 2014-06-26[08:21:55]:preview including setting
 *
 * @author yanni4night@gmail.com
 * @version 0.0.2
 * @since 0.0.1
 */
define(['editor', 'canvas','setting'], function(Editor, Canvas,Setting) {

  $('<form/>', {
    id: 'preview_form',
    target: "_blank",
    method: 'post',
    action: '/preview'
  }).css({
    display: 'none'
  }).append(
    $('<textarea/>', {
      id: "preview_config",
      name: 'config',
      value: ""
    })
  ).appendTo($(document.body));

  return function() {
    var code = Editor.generateCode();
    $('#preview_config').val(JSON.stringify($.extend({
      css:code.styleText,
      html:Canvas.getCanvasHTML(true)+ code.innerHtml+"</div></div>"
    },Setting.toJSON())));
    $('#preview_form')[0].submit();
  };
});