var jquery = require("jquery");
window.$ = window.jQuery = jquery;
require("jquery-ui-dist/jquery-ui.min.js");
var Mustache = require('mustache');


$(function () {
    async function fetchPressReleases() {
        $.ajax({
            type: "GET",
            url: 'https://deltaclonesandbox.q4web.com/feed/PressRelease.svc/GetPressReleaseList?LanguageId=1&bodyType=0&pressReleaseDateFilter=3&categoryId=1cb807d2-208f-4bc3-9133-6a9ad45ac3b0&pageSize=-1&pageNumber=0&tagList=&includeTags=true&excludeSelection=1',
            dataType: 'json'
          }).done(function(json){
              console.log(json);
            $('body').html(JSON.stringify(json));
          });
    }

    $.widget("q4.newWidget", {
        options: {
            text: "I will be randomized",
            siteCode: 'deltaclonesandbox',
            onDestroy: function () {
                console.log('The widget has been destroyed');
            }
        },

        _create: function () {
            let siteCode = this.option('siteCode')
            this._fetchPressReleases(siteCode);
            this._refresh();
            this._on($('#clickMeButton'), {
                click: "randomizeText"
            });
        },

        _fetchPressReleases: function (siteCode) {
            $.ajax({
                type: "GET",
                url: `https://${siteCode}.q4web.com/feed/PressRelease.svc/GetPressReleaseList?LanguageId=1&bodyType=0&pressReleaseDateFilter=3&categoryId=1cb807d2-208f-4bc3-9133-6a9ad45ac3b0&pageSize=-1&pageNumber=0&tagList=&includeTags=true&excludeSelection=1`,
                dataType: 'json'
            }).done(function(json){
                console.log(json);
                // json is the response data
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
        text: "Hello World",
        siteCode: 'studioclassic2018na1'
    });

    $("#my-widget").newWidget('randomizeText');
});