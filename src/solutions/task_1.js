var jquery = require("jquery");
window.$ = window.jQuery = jquery;
require("jquery-ui-dist/jquery-ui.js");
var Mustache = require('mustache');

$(function () {
    $.widget("q4.newWidget", {
        options: {},

        _create: function () {
            $.ajax({
                type: "GET",
                url: 'https://deltaclonesandbox.q4web.com/feed/PressRelease.svc/GetPressReleaseList?LanguageId=1&bodyType=0&pressReleaseDateFilter=3&categoryId=1cb807d2-208f-4bc3-9133-6a9ad45ac3b0&pageSize=-1&pageNumber=0&tagList=&includeTags=true&excludeSelection=1',
                dataType: 'json'
            }).done(function (json) {
                console.log(json);
                $('#my-widget').html(JSON.stringify(json));
            });
        },

        _destroy: function () {},

        _setOption: function (key, value) {
            this._super(key, value);
        },

        _setOptions: function () {
            this._superApply(arguments);
        },

    });

    $("#my-widget").newWidget({});
});