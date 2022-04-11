# jQuery Widget Factory Workshop

## **Motivation:** Familiarize devs with the underlying technology behind Q4 Widgets

Q4 widgets currently use are built with jQuery's [Widget Factory](https://jqueryui.com/widget/)

Using a basic starter app, you will re-implement common features found in Q4 Widgets.

To start, run ``yarn run start`` and open localhost:1234.

## Tasks:
1. Pull Data from a Q4 API

    Sample Press Release Request: https://deltaclonesandbox.q4web.com/feed/PressRelease.svc/GetPressReleaseList?LanguageId=1&bodyType=0&pressReleaseDateFilter=3&categoryId=1cb807d2-208f-4bc3-9133-6a9ad45ac3b0&pageSize=-1&pageNumber=0&tagList=&includeTags=true&excludeSelection=1

    To see other APIs: [Q4 Web API Docs](http://documentation.q4websystems.com/home)


2. Render the pulled data with [mustachejs](https://github.com/janl/mustache.js/)
3. Create a `beforeRender` and `Complete` option
4. Add a `limit` option to render only x items max

Minimal styling is expect but is not the focus