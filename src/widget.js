var jquery = require("jquery");
window.$ = window.jQuery = jquery;
require("jquery-ui-dist/jquery-ui.min.js");
var Mustache = require('mustache');


$(function () {

    $.widget("q4.newWidget", {
        options: {
            text: "I will be randomized",
            siteCode: 'deltaclonesandbox',
            limit: 2,
            itemData:[],
            onDestroy: function () {
                console.log('The widget has been destroyed');
            },
            beforeRender: function(data){
                console.log(data);
                //return data;
            }
        },

        _create: function () {
            let siteCode = this.option('siteCode')
            this._fetchPressReleases(siteCode);
            // this._renderHeadlines(json)
            this._refresh();
            this._on($('#clickMeButton'), {
                click: "randomizeText"
            });
        },

        _fetchPressReleases: function (siteCode) {
            var widget = this;
           return $.ajax({
                type: "GET",
                url: `https://${siteCode}.q4web.com/feed/PressRelease.svc/GetPressReleaseList?LanguageId=1&bodyType=0&pressReleaseDateFilter=3&categoryId=1cb807d2-208f-4bc3-9133-6a9ad45ac3b0&pageSize=-1&pageNumber=0&tagList=&includeTags=true&excludeSelection=1`,
                dataType: 'json'
            }).done(function(json){
                // json is the response data
                widget.option({
                    itemData:json.GetPressReleaseListResult
                });
            });
        },

        _renderHeadlines: function(){
            
            var pressReleases=this.options.itemData;
            var limit = this.options.limit;
            if (limit != 0){
                pressReleases.length = this.options.limit;
            }

            this.options.beforeRender(pressReleases);
            var headlineTemplate=(
                '{{#.}}'+
                '<p>{{Headline}}</p>'+
                '{{/.}}'

            )
            console.log({yas:this})
            var headlineOutput=Mustache.render(headlineTemplate,pressReleases);
            //$('body').html(headlineOutput);
            $(this.element).html(headlineOutput);
            console.log(pressReleases);
    
        },

        randomizeText: function () {
            this.option({
                text: (Math.random() + 1).toString(36).substring(7)
            })
        },

        toggleLimit: function () {

        },
        
        _refresh: function () {
            //$('#my-widget').html('<p>' + this.options.text + '</p>')
            // this._renderHeadlines();
        },

        _destroy: function () {
            this._trigger('onDestroy');
        },
        
        _setOption: function (key, value) {
            if (key === "text") {
                value = value + " appendedText"
            }
            this._super(key, value);
            if (key === "itemData") {

                this._renderHeadlines();
            }
        },

        _setOptions: function () {
            this._superApply(arguments);
            this._refresh();
        },

    });

    $("#my-widget").newWidget({
        text: "Hello World",
        siteCode: 'studioclassic2018na1',
        limit: 2,
        beforeRender:function(data){
            console.log(data);
            $.each(data,function(i,v){
                v.Headline = "HEADLINE: " + v.Headline;
            })
        }
    });

    $("#my-widget").newWidget('randomizeText');
});