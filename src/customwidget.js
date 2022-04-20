var jquery = require("jquery");
window.$ = window.jQuery = jquery;
require("jquery-ui-dist/jquery-ui.min.js");
var Mustache = require("mustache");

// var data = {
//         apiKey: 'c34993dcba1942418d97656f3ed00979',
//         tagList: "tag1|tag2",
//         pageNumber: 3,
//         pageSize: 20,
//         includeTags: true,
//         pressReleaseDateFilter: 2,
//         bodyType: 3,
//         startDate: "2010/01/01",
//         endDate: "2010/12/31 06:00:00"
//     },

$(function () {
  $.widget("q4.pressWidget", {
    options: {
      //   type: "GET",
      //   url: "http://www.domain.com/feed/PressRelease.svc/GetPressReleaseList",
      //   data: {
      //     LanguageId: 1,
      //     // apiKey: 'c34993dcba1942418d97656f3ed00979',
      //     apiKey: "BF185719B0464B3CB809D23926182246",
      //     categoryId: "1cb807d2-208f-4bc3-9133-6a9ad45ac3b0",
      //     tagList: "tag1|tag2",
      //     pageNumber: 0,
      //     pageSize: -1,
      //     includeTags: true,
      //     pressReleaseDateFilter: 3,
      //     bodyType: 0,
      //     startDate: "2010/01/01",
      //     endDate: "2010/12/31 06:00:00",
      //   },
      //   // data: data,
      //   dataType: "json",
      //   // success: OnLoadPressReleaseListSuccess,
      //   error: function () {
      //     console.log("error");
      //   },
    },
    // _callApi: function () {
    //   return $.ajax({
    //     type: "GET",
    //     url: "https://deltaclonesandbox.q4web.com/feed/PressRelease.svc/GetPressReleaseList?LanguageId=1&bodyType=0&pressReleaseDateFilter=3&categoryId=1cb807d2-208f-4bc3-9133-6a9ad45ac3b0&pageSize=-1&pageNumber=0&tagList=&includeTags=true&excludeSelection=1",
    //     dataType: "json",
    //   }).done(function (json) {
    //     console.log(json);
    //     return json;
    //     // $("body").html(JSON.stringify(json));
    //   });
    // },
    _create: function () {
      var data = {};
      $.ajax({
        type: "GET",
        url: "https://deltaclonesandbox.q4web.com/feed/PressRelease.svc/GetPressReleaseList?LanguageId=1&bodyType=0&pressReleaseDateFilter=3&categoryId=1cb807d2-208f-4bc3-9133-6a9ad45ac3b0&pageSize=-1&pageNumber=0&tagList=&includeTags=true&excludeSelection=1",
        dataType: "json",
      }).done(function (json) {
        data = json;
        console.log(data);
      $("body").html(JSON.stringify(data));
    });
      //   console.log(data);
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

// $.ajax({
//     type: "GET",
//     url: 'https://deltaclonesandbox.q4web.com/feed/PressRelease.svc/GetPressReleaseList?LanguageId=1&bodyType=0&pressReleaseDateFilter=3&categoryId=1cb807d2-208f-4bc3-9133-6a9ad45ac3b0&pageSize=-1&pageNumber=0&tagList=&includeTags=true&excludeSelection=1',
//     dataType: 'json'
// }).done(function (json) {
//     console.log(json);
//     $('body').html(JSON.stringify(json));
// });
