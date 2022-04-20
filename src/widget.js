var jquery = require("jquery");
window.$ = window.jQuery = jquery;
require("jquery-ui-dist/jquery-ui.min.js");
var Mustache = require('mustache');

$(function () {
    $.widget("q4.newWidget1", {
        options: {
            returnedData: "",
            limit:-1, // -1 in the api request means no limit to items. Will be used as default if none passed
            showLimit: false
        },

        _create: function () { //runs once
            var _ = this;
            var o = this.options;
            
            console.log ('%c Available through "this" keyword in widget: ' , 'background: #222; color: #bada55', _) // Check the console to see what else we can access within this widget instance

            _._requestData(o.limit); // initial state of widget. We will call requestData later to update
            _._on($('#clickMeButton'), {"click": _._toggleShowLimit}); // setting up widget event listener
        },

        _requestData: function(limit){
            var _ = this
                        
            $.ajax({
                type: "GET",
                // api endpoint below accepts various query parameters, one of which is '&pageSize=' and allows us to restrict number of returned items. Let's just use this and pass 'limit' variable
                url: 'https://deltaclonesandbox.q4web.com/feed/PressRelease.svc/GetPressReleaseList?LanguageId=1&bodyType=0&pressReleaseDateFilter=3&categoryId=1cb807d2-208f-4bc3-9133-6a9ad45ac3b0&pageSize=' + limit + '&pageNumber=0&tagList=&includeTags=true&excludeSelection=1',
                dataType: 'json'
              }).done(function(data){
                _.option({
                    returnedData: data.GetPressReleaseListResult
                })
              });
        },

        // THIS IS NOT NEEDED WHEN WE CAN CHANGE 'LIMIT' QUERY STRING IN API REQUEST
        // _limitItems: function(data){
        //     var _ = this;
        //     var o = this.options;
        //     var limit = o.limit;

        //     return data.slice(0, limit)
        // },

        _toggleShowLimit: function(){
            var _ = this;
            var o = this.options;
            var limit = o.limit; 
            var showLimit = o.showLimit;

            var updatedLimit = showLimit ? limit : -1; // var to pass to requestData method... show limit or all (-1)? 

            _.option({
                showLimit : !showLimit // toggle showLimit to opposite of current state and set option for next time we click button and call this method
            });

            _._requestData(updatedLimit); //load widget again, passing new limit
        },

        _render: function (){

            var _ = this;
            var o = this.options;
            var zeData = o.returnedData;
            // var zeData2 = _._limitItems(zeData) <--- not needed anymore. We can pass untouched data

            var template = (
                '{{#.}}' +
                    '<h2>{{Headline}}</h2>' +
                '{{/.}}' 
            )
           
            _._trigger('beforeRender', null, [zeData]);

            var output = Mustache.render(template, zeData)
            
            // $("#my-widget-1").html(output); <--- avoid hardcoding selectors in widget
            $(_.element).html(output); // we can dynamically access container widget was called on using 'this' keyword
        },

        _destroy: function () {
            this._trigger('onDestroy');
        },
        
        _setOption: function (key, value) {
            var _ = this

            _._super(key, value);

            if (key === "returnedData"){
                _._render(); // returnedData option updated above so let's run render method
            }

        },

        _setOptions: function () {
            var _ = this
            _._superApply(arguments);
        },

    });

    $("#my-widget-1").newWidget1({
        limit: 5,
        beforeRender: function(e, data){
            $.each(data, function(ind, item){
                item.Headline = "HEADLINE: " + item.Headline
            })
        }
    }
    );
});