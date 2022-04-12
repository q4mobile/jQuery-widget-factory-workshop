var jquery = require("jquery");
window.$ = window.jQuery = jquery; // notice the definition of global variables here
require("jquery-ui-dist/jquery-ui.js");
var Mustache = require('mustache');

$(function () {
    // the widget definition, where "q4" is the namespace,
    // "newWidget" the widget name
    $.widget("q4.newWidget", {
        // default options
        options: {
            text: "I will be randomized"
        },

        // The constructor
        _create: function () {
            /// console logging "text" that is passed in as an option
            this._refresh();

            // create a button
            this.logRandomTextButton = $("<button>", {
                    text: "Log Text",
                    "class": "logRandomText button",
                })
                .appendTo(this.element)
                .button();

            // Bind click event on the "randomizeText" button to randomize the "text" option
            this._on(this.logRandomTextButton, {
                // run function "randomizeText" when button is clicked
                click: "randomizeText"
            });
        },

        // a public method that can be triggered outside of the widget
        /// changes the option, "text", to a random string
        randomizeText: function () {
            this.option({
                text: (Math.random() + 1).toString(36).substring(7)
            });
        },

        // Events bound via _on are removed automatically
        // revert other modifications here
        _destroy: function () {
            // removing the button element
            this.logRandomText.remove();
        },

        // _setOptions is called with a hash of all options that are changing
        // Update widget with updated options with _refresh
        _setOptions: function () {
            // _super and _superApply handle keeping the right this-context
            this._superApply(arguments);
            this._refresh();
        },

        // _setOption is called for each individual option that is changing
        _setOption: function (key, value) {
            if ( key === "text" ) {
                value = value + " appendedText"
            }
            this._super(key, value);
        },

        // Called in _create and _setOptions
        // updates widget based on changes in options
        _refresh: function () {
            console.log('Refreshed text:', this.options.text);
        },
    });

    // Initialize with default options
    $("#my-widget").newWidget({
        text: "Hello World"
    });
    
});