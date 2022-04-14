var jquery = require("jquery");
window.$ = window.jQuery = jquery;
require("jquery-ui-dist/jquery-ui.min.js");
var Mustache = require('mustache');

$(function () {
    $.widget("q4.newWidget", {
        options: {
            toRender: "",
        },

        _create: function () {
            var _ = this;
            $.ajax({
                type: "GET",
                url: 'https://deltaclonesandbox.q4web.com/feed/PressRelease.svc/GetPressReleaseList?LanguageId=1&bodyType=0&pressReleaseDateFilter=3&categoryId=1cb807d2-208f-4bc3-9133-6a9ad45ac3b0&pageSize=-1&pageNumber=0&tagList=&includeTags=true&excludeSelection=1',
                dataType: 'json'
            }).done(function (json) {
                _.option({
                    toRender: json.GetPressReleaseListResult
                });
            });
        },

        _render: function() {
            var _ = this;
            data = _.options.toRender;
            _._trigger('beforeRender', null, [data]);
            var template = (
                '{{#.}} ' +
                    '<p>{{Headline}}</p> ' +
                '{{/.}} '
            )
            var output = Mustache.render(template, data);
            $('#my-widget').html(output);
        },

        _destroy: function () {},

        _setOption: function (key, value) {
            this._super(key, value);
            if (key === "toRender") {
                this._render();
            }
        },

        _setOptions: function () {
            this._superApply(arguments);
        },

    });

    $("#my-widget").newWidget({
        beforeRender: function (e, data) {
            $.each(data, function(i, item) {
                item.Headline = "HEADLINE: " + item.Headline;
            }) 
        }
    });
});