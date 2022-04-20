var jquery = require("jquery");
window.$ = window.jQuery = jquery;
require("jquery-ui-dist/jquery-ui.min.js");
var Mustache = require('mustache');
$(function () {
    $.widget("q4.newWidget", {
        options: {
        },
        _create: function () {
            const headlineData = this._callApi();
            
            // console.log(headlineData)
        },
        _destroy: function () {
        },

        _callApi: function () {
            var headlineArr = [];
               $.ajax({
                type: "GET",
                url: 'https://deltaclonesandbox.q4web.com/feed/PressRelease.svc/GetPressReleaseList?LanguageId=1&bodyType=0&pressReleaseDateFilter=3&categoryId=1cb807d2-208f-4bc3-9133-6a9ad45ac3b0&pageSize=-1&pageNumber=0&tagList=&includeTags=true&excludeSelection=1',
                dataType: 'json'
              }).done(function(json){
                  console.log(json)
                //   debugger
                //   json.GetPressReleaseListResult.forEach(item => headlineArr.push(item.Headline));
              });
              return headlineArr;
        },

        _render: function (data) {
            
            var template = (
                '<p>My burrito contains:</p> ' +
                '<ul> ' +
                    '{{#burritoToppings}} ' +
                    '<li>{{.}}</li> ' +
                    '{{/burritoToppings}} ' +
                '</ul> '
            )
            
            var output = Mustache.render(template, data);
            
            $('#target').html(output);

        },


        
        _setOption: function (key, value) {
            this._super(key, value);
        },
        _setOptions: function () {
            this._superApply(arguments);
        },
    });
    $("#my-widget").newWidget({
        key: "value"
    });
});