var jquery = require("jquery");
window.$ = window.jQuery = jquery;
require("jquery-ui-dist/jquery-ui.min.js");
var Mustache = require("mustache");

$(function () {
    $.widget("q4.newWidget", {
        options: {
            limit: 4,
            limitState: false,
            text: "I will be randomized",
            containerId: "new-container",
            dataObj: { items: [] },
            onDestroy: function () {
             },
        },
        _create: function () {
            this._refresh();
            this.getData();
            this._on($("#clickMeButton"), {
                click: "changeLimitState",
            });
        },
        getData: function () {
            var itemsObj = {};
            $.ajax({
                type: "GET",
                context: this,
                url: "https://deltaclonesandbox.q4web.com/feed/PressRelease.svc/GetPressReleaseList?LanguageId=1&bodyType=0&pressReleaseDateFilter=3&categoryId=1cb807d2-208f-4bc3-9133-6a9ad45ac3b0&pageSize=-1&pageNumber=0&tagList=&includeTags=true&excludeSelection=1",
                dataType: "json",
            }).done(function (json) {
                var headlineData = json.GetPressReleaseListResult.map(function (item) {
                    return { headline: item.Headline };
                });

                itemsObj = { items: headlineData };
                this.beforeRender(itemsObj);
                this.initialize(this.options.dataObj);
            });
        },
        beforeRender: function (itemsObj) {
            //we do our manipulation here
            limitObj = this.options.limitState ? itemsObj.items.slice(0, this.options.limit) : itemsObj.items;
            itemsObj = limitObj.map(function (item) {
                return { headline: `HEADLINE: ${item.headline}` };
            });
            this.options.dataObj.items = itemsObj;
        },
        initialize: function () {
            var template = `{{#items}}
                                    <p>{{headline}}</p>
                                {{/items}}`;

            var rendered = Mustache.render(template, this.options.dataObj);
            document.getElementById(this.options.containerId).innerHTML = rendered;
        },
        changeLimitState: function () {
             this.options.limitState = !this.options.limitState;
            this._refresh();
        }, 
        _refresh: function () {
            this.getData();
        }, 
        _destroy: function () {
            this._trigger("onDestroy");
        }, 
        _setOption: function (key, value) {
            if (key === "text") {
                value = value + " appendedText";
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
    });
});
