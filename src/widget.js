var jquery = require("jquery");
window.$ = window.jQuery = jquery;
require("jquery-ui-dist/jquery-ui.min.js");
var Mustache = require('mustache');
$(function () {
    $.widget("q4.newWidget", {
        options: {
        },
        _create: function () {
        },
        _destroy: function () {
        },
        
        _setOption: function (key, value) {
            this._super(key, value);
        },
        _setOptions: function () {
            this._superApply(arguments);
        },
    });
    $("#my-widget").newWidget({
        key: "value"
    });
});