var jquery = require("jquery");
window.$ = window.jQuery = jquery; // notice the definition of global variables here
require("jquery-ui-dist/jquery-ui.js");
require("mustache")

$(function () {
    // the widget definition, where "q4" is the namespace,
    // "colorize" the widget name
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
            this.logRandomText = $("<button>", {
                    text: "Log Text",
                    "class": "logRandomText button is-primary",
                })
                .appendTo(this.element)
                .button();

            // Bind click events on the changer button to the random method
            this._on(this.logRandomText, {
                // run function "randomizeText" when button is clicked
                click: "randomizeText"
            });
        },

        // Called when created, and later when changing options
        _refresh: function () {
            console.log('Refreshed text:', this.options.text);
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
        // always refresh when changing options
        _setOptions: function () {
            // _super and _superApply handle keeping the right this-context
            this._superApply(arguments);
            console.log('_setOptions - arguments:', arguments)
            this._refresh();

        },

        // _setOption is called for each individual option that is changing
        _setOption: function (key, value) {
            console.log('_setOption - key:', key);
            console.log('_setOption - value:', value);
            this._super(key, value);
        }
    });

    // Initialize with default options
    $("#my-widget").newWidget({
        text: "Hello World"
    });
});