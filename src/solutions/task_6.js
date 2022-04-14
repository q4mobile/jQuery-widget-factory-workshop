var jquery = require("jquery");
window.$ = window.jQuery = jquery;
require("jquery-ui-dist/jquery-ui.js");
var Mustache = require('mustache');

$(function () {
    $.widget("q4.newWidget", {
        options: {
            data: "",
            toRender: "",
            limit: 0,
            showLimitItems: false,
        },

        _create: function () {
            var _ = this;

            $('#clickMeButton').attr("disabled", true).text('Loading...');

            $.ajax({
                type: "GET",
                url: 'https://deltaclonesandbox.q4web.com/feed/PressRelease.svc/GetPressReleaseList?LanguageId=1&bodyType=0&pressReleaseDateFilter=3&categoryId=1cb807d2-208f-4bc3-9133-6a9ad45ac3b0&pageSize=-1&pageNumber=0&tagList=&includeTags=true&excludeSelection=1',
                dataType: 'json'
            }).done(function (json) {
                _.option({
                    data: json.GetPressReleaseListResult,
                    toRender: json.GetPressReleaseListResult
                });
                
                _._on($('#clickMeButton'), {
                    click: "_toggleFilterData"
                });

                $('#clickMeButton').attr("disabled", false).text('Toggle Limit');
            });
        },

        _toggleFilterData: function () {
            var _ = this,
                limit = _.options.limit,
                showLimitItems = !_.options.showLimitItems,
                data = _.options.data;

            _.option({
                showLimitItems: showLimitItems,
                toRender: limit !== 0 && showLimitItems ? data.slice(0, limit) : data
            });
        },

        _render: function () {
            var _ = this,
                toRender = _.options.toRender;

            _._trigger('beforeRender', null, [toRender]);

            var template = (
                '{{#.}} ' +
                    '<p>{{Headline}}</p> ' +
                '{{/.}} '
            )
            var output = Mustache.render(template, toRender);
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
            $.each(data, function (i, item) {
                item.Headline = "HEADLINE: " + item.Headline;
            })
        },
        limit: 2,
    });
});