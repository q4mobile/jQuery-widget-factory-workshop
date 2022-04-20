var jquery = require("jquery");
const mustache = require("mustache");
window.$ = window.jQuery = jquery;
require("jquery-ui-dist/jquery-ui.min.js");
var Mustache = require("mustache");

$(function () {
  $.widget("q4.pressWidget", {
    options: {
        beforeRender: function (e, data) {
            $(data.GetPressReleaseListResult).each(function (index, item) {
                item.Headline = "HEADLINE: " + item.Headline;
            });
          },
    },
    _create: function () {
      var data = {};
      var o = this.options;
      var _ = this;
      $.ajax({
        type: "GET",
        url: "https://deltaclonesandbox.q4web.com/feed/PressRelease.svc/GetPressReleaseList?LanguageId=1&bodyType=0&pressReleaseDateFilter=3&categoryId=1cb807d2-208f-4bc3-9133-6a9ad45ac3b0&pageSize=-1&pageNumber=0&tagList=&includeTags=true&excludeSelection=1",
        dataType: "json",
      }).done(function (json) {
        data = json;
        _._trigger('beforeRender', null, data);

        _._renderHeadline(data.GetPressReleaseListResult);
      });
    },
    _renderHeadline: function (prListResult) {
      var ourBanana = '<div class="headline">' + "{{#.}}" + "<h2>{{Headline}}</h2>" + "{{/.}}" + "</div>";

      data = Mustache.render(ourBanana, prListResult);
      $("body").html(data);
    },

    _destroy: function () {},

    _setOption: function (key, value) {
      this._super(key, value);
    },
    _setOptions: function () {
      this._superApply(arguments);
    },
  });
  $("#my-widget").pressWidget({
    key: "value",
  });
});
