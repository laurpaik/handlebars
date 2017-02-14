[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Handlebars

## Prerequisites

-   [jQuery Dom](https://github.com/ga-wdi-boston/jquery-dom)
-   [HTML- CSS](https://github.com/ga-wdi-boston/html-css)

## Objectives

By the end of this, developers should be able to:

-   Create Handlebars templates to render JSON data from an API.
-   Read Handlebars templates for understanding.
-   Create nested handlebars paths.
-   Create handlebars partials.
-   Utilize `if` and `each` helpers when creating templates.

## Preparation

1.  [Fork and clone](https://github.com/ga-wdi-boston/meta/wiki/ForkAndClone)
    this repository.
1.  Install dependencies with `npm install`.

## What is Handlebars

Just a templating engine for JS.

But a little more:

*As noted in the introduction: Handlebars.js is a compiler built with JavaScript
that takes any HTML and Handlebars expression and compiles them to a JavaScript
function. This derived JavaScript function then takes one parameter, an
object—your data—and it returns an HTML string with the object properties’
values inserted (interpolated) into the HTML. So, you end up with a string
(HTML) that has the values from the object properties inserted in the relevant
places, and you insert the string on a page.*

[Javascript is Sexy: Handlebars](http://handlebarsjs.com/)

Handlebars Docs: (http://handlebarsjs.com/)

## Before handlebars

Suppose that we just queried our back-end, a song API, and received some data
in the form of a JSON string.
```JSON
[{"title":"Smells Like Teen Spirit","album":"Nevermind","artist":"Nirvana"},
{"title":"San Diego Serenade","album":"Heart of Saturday Night","artist":"Tom Waits"},
{"title":"Johnny B. Goode","album":"Chuck Berry Is on Top","artist":"Chuck Berry"},
{"title":"Come Together","album":"Abbey Road","artist":"The Beatles"},
{"title":"Hey Jude","album":"Revolution (B-side)","artist":"The Beatles"},
{"title":"Get Behind the Mule","album":"Mule Variations","artist":"Tom Waits"}]
```

Our front-end app might then parse that JSON and give us an array of JavaScript
objects, which we can then iterate through.

```javascript
data.forEach(function(song){
  // Do some action.
});
```

If we wanted to produce an `<li>` for each of these songs, and add them to a
`<ul>` with the id `songs`, we could do it like this:

```javascript
data.forEach(function(song){
  $("#songs").append("<li><h4>" + song.title + "</h4> By " + song.artist + ", from the album '<em>" + song.album + "</em>'</li>");
});
```

Alternatively, we could specify some string to represent all of the HTML we
want to add, and then add it to the `<ul>` in one fell swoop.

```javascript
let newHTML = "";
data.forEach(function(song){
  newHTML += "<li><h4>" + song.title + "</h4> By " + song.artist + ", from the album '<em>" + song.album + "</em>'</li>";
});
$("#songs").html(newHTML);
```

This approach has some advantages over the first - for instance, we don't need
to worry about clearing the contents of `$("#songs")` each time.

## Lab: Hands on with Handlebars

Handlebars and front end templating will make a whole lot more sense once you
have a chance to look at it.  In your squads discuss and consider the
following:

-   What is happening in the `scripts/index.js` file?
  - Requires all the files we need
  - Adds handlers for auth and book stuff to the site
    - pretty much an organizational thing
-   How many times is `book-listing.handlebars` run?
  - once, but the stuff inside {{log this}} and stuff gets run as many times as there are books
-   [Draw the order in which each separate file is accessed.](https://goo.gl/photos/J6cPsgmj6jhqFu8j7)
  - index.js --> books/events.js --> books/api.js --> feeds into books/ui.js... upon success we apply a template to data.books ... and then we append showBooksHtml to the content class.
-   Be able to explain in plain english what is happening. [Look at the commented out stuff!](https://github.com/laurpaik/handlebars/tree/training/assets/scripts/books/ui.js)
-   What happens if you move the line that defines `showBooksTemplate`?
  - I mean... it's defined up there and then used pretty much immediately, so our linter will yell at us and it won't be defined in getBooksSuccess because it reads top-down
-   Uncomment the line `{{> partial}}` from `book-listing.handlebars`, what does it do?
  - includes assets/scripts/templates/partial.handlebars into the loop
  - The little carrot in front of 'partial' is the syntax to call a partial
-   Experiment with `console.log()` and `debugger` to aid in your understanding.
  - it's .handlebars, not .js!
  - just say 'log' and it'll do the thing
  - Why do we use `data-id` to put the book id?
    - We want to guarantee uniqueness
    - When we do ids in HTML, we want to know EXACTLY what it is
    - When we do dynamic ids we do `data-id`!
    - usually it means the resource is the id!
    - we're in a loop, so `id=book` is dangerous lol
    - HTML won't tell you when stuff breaks!

Make sure to note any questions you come across and we'll go over them as a
class.

## Discussion: What was discovered

Continuing with what was learned in the previous lab let's discuss what you
discovered trying to answer the questions.

What do you think would happen if I tried to add an event handler to something
contained in my template before it was rendered?
- we have dynamic content
- You can use jQuery to use event delegation
- example:
```javascript
const logOwnId = (event) => {
  event.preventDefault();
  console.log($(event.target).data("id"));
};
```
and then under addHandlers:
``` js
$(".clickable").on("click", logOwnId);
```
- Where do we put it?
  - throw it in the ui.js file?
    - click event works, value doesn't show up
    - don't be messy
    - should prob throw it in the events.js file since that's where all the events are haha
  - clicks go from baby to parent
  - prevent bubbling? tell the parent element to click:
```javascript
$("#clickable").on("click", ".clickable", logOwnId);
```
  - we're applying a click event to the #content element for when any of its children with the class "clickable" gets clicked!
  - Listen to yo parents!
  - but now we have that bug that returns undefined in the console....
```javascript
  const logOwnId = (event) => {
    event.preventDefault();
    console.log($(event.target).parent().data("id"));
  };
```
  - use jQuery to traverse the DOM!
  - find the littlest child and go up from there until you find the id! :)

Why do you think we do not commonly use a static value for an HTML ID attribute in templates?

Let's look through the documentation and see if there is anyway we can improve
this code.

[Handlebars Helpers Documentation](http://handlebarsjs.com/builtin_helpers.html)

## Lab: Event Delegation

Using documentation and your squad, work on getting up the page

-   Refactor the `book-listing.handlebars` template so that the each book's
information is displayed within an `ul` with a `data-id` attribute.
-   Add a button called `Remove` as the last `li` for each book.
-   When a user clicks on the `Remove` button for any specific book, it should
hide the book's information
-   Add a prompt that checks if the user is sure they want to remove the book
  - We use event delegation when we need to add an event to elements that are not on the page!!!
  - look at the solution branch tbh
  - You're confused and you know it

## Challenge: API

The `Remove` button only removes the book from the page, not from the database.

- Make a `Delete` request to the API when the `Remove` button is clicked and
upon success it should remove the book from the page.

## Additional Resources

-   [Handlebars Docs](http://handlebarsjs.com/)
-   [Handlebars in Ten Minutes](http://tutorialzine.com/2015/01/learn-handlebars-in-10-minutes/)
-   [Javascript is Sexy: Handlebars](http://javascriptissexy.com/handlebars-js-tutorial-learn-everything-about-handlebars-js-javascript-templating/)

## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
