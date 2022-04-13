var jquery = require("jquery");
window.$ = window.jQuery = jquery;
require("jquery-ui-dist/jquery-ui.js");
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
            this._on($('#randomizeTextButton'), {
                click: "randomizeText"
            });
        },

        randomizeText: function () {
            this.option({
                text: (Math.random() + 1).toString(36).substring(7)
            });
        },

        _refresh: function () {
            console.log('Refreshed text:', this.options.text);
        },

        _destroy: function () {ß
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