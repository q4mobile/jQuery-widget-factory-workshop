var jquery = require("jquery");
window.$ = window.jQuery = jquery;
require("jquery-ui-dist/jquery-ui.min.js");
var Mustache = require('mustache');

$(function () {
    $.widget("q4.newWidget", {
        options: {
            text: "I will be randomized",
            onDestroy: function () {
                console.log('The widget has been destroyed');
            }
        },

        _create: function () {
            this._refresh();
            this._on($('#clickMeButton'), {
                click: "randomizeText"
            });
        },

        randomizeText: function () {
            this.option({
                text: (Math.random() + 1).toString(36).substring(7)
            });
        },

        _refresh: function () {
            $('#my-widget').html('<p>' + this.options.text + '</p>')
        },

        _destroy: function () {
            this._trigger('onDestroy');
        },
        
        _setOption: function (key, value) {
            if (key === "text") {
                value = value + " appendedText"
            }
            this._super(key, value);
        },

        _setOptions: function () {
            this._superApply(arguments);
            this._refresh();
        },

    });

    $("#my-widget").newWidget({
        text: "Hello World"
    });

    $("#my-widget").newWidget('randomizeText');
});