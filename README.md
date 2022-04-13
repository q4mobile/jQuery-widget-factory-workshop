# jQuery Widget Factory Workshop

## Motivation: Familiarize devs with the underlying technology behind Q4 Widgets

Q4 widgets are currently built with jQuery's [Widget Factory](https://jqueryui.com/widget/). To better understand this technology, you will re-implement common features found in Q4 Widgets using a starter app as an example.

To start, run `npm i` and then `npm run start` and on your browser open [localhost:1234](localhost:1234).

## Tasks:
1. Pull Data from a Q4 API

    [Sample AJAX request for press releases](https://jsfiddle.net/bhaagmarway/7901hov8/10/)

    To see other APIs: [Q4 Web API Docs](http://documentation.q4websystems.com/home)


2. Render the `Headline` of each item pulled with [mustachejs](https://jsfiddle.net/bhaagmarway/a4e5yurb/40/)
3. Create a `beforeRender` option (Use the _trigger method like in _destroy) 
4. Prepend "HEADLINE: " to all headlines with your `beforeRender` method
    Ex. "Cat Stuck on Bookshelf" to "HEADLINE: Cat Stuck on Bookshelf"
5. Add a `limit` option where you can pass a function to limit items rendered to `x` items
6. **Stretch Goal** - Create a filter (by year, tag, etc) and allow user to re-render items based on filter

Styling is not expected
