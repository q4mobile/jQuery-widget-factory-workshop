var jquery = require("jquery");
window.$ = window.jQuery = jquery;
require("jquery-ui-dist/jquery-ui.min.js");
var Mustache = require('mustache');

$(function () {
    $.widget("q4.newWidget", {
        options: {
            toRender: "",
            limit: 0,
            showLimitItems: false,
            beforeRender: function() {},
        },

        _create: function () {
            var _ = this;
            _._getData();

            this._on($('#clickMeButton'),{
                click: '_toggleFilterData'
            });
        },

        _getData: function (limit=-1){

            var _ = this;
            $('#clickMeButton').attr("disabled", true).text('Loading...');

            $.ajax({
                type: "GET",
                url: 'https://deltaclonesandbox.q4web.com/feed/PressRelease.svc/GetPressReleaseList?LanguageId=1&bodyType=0&pressReleaseDateFilter=3&categoryId=1cb807d2-208f-4bc3-9133-6a9ad45ac3b0&pageSize=' + limit + '&pageNumber=0&tagList=&includeTags=true&excludeSelection=1',
                dataType: 'json'
            }).done(function (json) {
                _.option({
                    toRender: json.GetPressReleaseListResult
                });
                
                $('#clickMeButton').attr("disabled", false).text('Toggle Limit');
            });
        },

        _toggleFilterData: function () {
            var _ = this,
                limit = _.options.limit,
                showLimitItems = !_.options.showLimitItems
            
            var newLimit = limit !== 0 && showLimitItems ? limit : -1

            _.option({
                showLimitItems: showLimitItems
            });

            console.log(_.options.showLimitItems);

            _._getData(newLimit);
        },


        _render: function() {
            var _ = this;
            data = _.options.toRender;

            // if (_.options.limit > 0){
            //     data = data.slice(0, _.options.limit);
            // }

            console.log(data);
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
        limit: 4,
        beforeRender: function (e, data) {
            $.each(data, function(i, item) {
                item.Headline = i+" HEADLINE: " + item.Headline;
            }) 
        }
    });
});