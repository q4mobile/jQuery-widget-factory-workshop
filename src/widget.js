var jquery = require("jquery");
window.$ = window.jQuery = jquery;
require("jquery-ui-dist/jquery-ui.min.js");
var Mustache = require("mustache");

$(function () {
  $.widget("q4.newWidget", {
    options: {
      toRender: "",
      onDestroy: function () {
        console.log("The widget has been destroyed");
      },
      beforeRender: function (event, data) {
          console.log('data', data);
        this._trigger();
      },
    },

    _create: function () {
      var _ = this;
      $.ajax({
        type: "GET",
        url: "https://deltaclonesandbox.q4web.com/feed/PressRelease.svc/GetPressReleaseList?LanguageId=1&bodyType=0&pressReleaseDateFilter=3&categoryId=1cb807d2-208f-4bc3-9133-6a9ad45ac3b0&pageSize=-1&pageNumber=0&tagList=&includeTags=true&excludeSelection=1",
        dataType: "json",
      }).done(function (json) {
        _.option({
          toRender: json.GetPressReleaseListResult,
        });
      });
    },

    _render: function () {
      var _ = this;
      var toRender = _.options.toRender;
      var template = "{{#.}}" + "<h2>{{Headline}}</h2>" + "{{/.}}";

      console.log(toRender)
      var limit = toRender.length;
      limit =2
        if(limit>0&& limit<=toRender.length)

       for(var i =0;i< limit;i++){
           var temp = toRender[i].Headline;
           toRender[i].Headline = "Headline: " + temp;
       }

      var output = Mustache.render(template, toRender);
      $("#my-widget").html(output);
    },

    _refresh: function () {},

    _destroy: function () {
      this._trigger("onDestroy");
    },

    _setOptions: function () {
      this._superApply(arguments);
      this._refresh();
    },

    _setOption: function (key, value) {
      this._super(key, value);
      if (key === "toRender") {
        this._render();
      }
    },
  });

  $("#my-widget").newWidget({
    key: "value",
  });
});
