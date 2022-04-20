var jquery = require("jquery");
window.$ = window.jQuery = jquery;
require("jquery-ui-dist/jquery-ui.min.js");
var Mustache = require('mustache');

$(function () {
    $.widget("q4.newWidget", {
        options: {
            text: "I will be randomized",
            template:'{{#.}}' + 
                        '<p>{{Headline}}</p>' +
                     '{{/.}}',
            beforeRender: function (e, data) {
            },                     
            onDestroy: function () {
                console.log('The widget has been destroyed');
            }
        },

        _create: function () {
            // this._on($('#clickMeButton'), {
                //     click: "randomizeText"
                // });
                var t = this;
                $.ajax({
                    type: "GET",
                    url: 'https://deltaclonesandbox.q4web.com/feed/PressRelease.svc/GetPressReleaseList?LanguageId=1&bodyType=0&pressReleaseDateFilter=3&categoryId=1cb807d2-208f-4bc3-9133-6a9ad45ac3b0&pageSize=-1&pageNumber=0&tagList=&includeTags=true&excludeSelection=1',
                    dataType: 'json'
                }).done(function(json){
                    console.log('fetch',json);
                    t.option({
                        data: json.GetPressReleaseListResult
                    })
                    // $('body').html(JSON.stringify(json));
                });
                // t._trigger('beforeRender', null, t.options.data)
                this._refresh();
        },

        randomizeText: function () {
            this.option({
                text: (Math.random() + 1).toString(36).substring(7)
            });
        },

        _refresh: function () {
            console.log('refresh', this.options.data);
            this._trigger('beforeRender', null, {data: this.options.data})

            $('#my-widget').html(Mustache.render(this.options.template, this.options.data));
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

    // $("#my-widget").newWidget({
    //     text: "Hello World"
    // });

    // $("#my-widget").newWidget('randomizeText');

    $('#my-widget').newWidget({
        beforeRender: function(e, data){
            console.log('before render', data);
            $.each(data.data, function(){
                console.log('this this', this);
                this.Headline = 'Headline: ' + this.Headline
            })

        }
    });
});