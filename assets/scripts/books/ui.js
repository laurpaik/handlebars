'use strict';

// showBooksTemplate requires the book-listing.handlebars
// handlebars.js returns the template as a function that can accept
// an object that represents the data the template needs
const showBooksTemplate = require('../templates/book-listing.handlebars');

// getBooksSuccess gets run once it gets some data
// like if the event is successful
// takes the data and applies a template
const getBooksSuccess = (data) => {
  console.log(data);

  // showBooksHtml is a string of HTML that is made up
  // of the template showBooksTemplate and the data.books objects
  // here we're calling the function, passing in the books object
  let showBooksHtml = showBooksTemplate({ books: data.books });

  // selects the content element and appends new HTML into it
  $('.content').append(showBooksHtml);
}; //This is where the handlebars take place! cool

const clearBooks = () => {
  $('.content').empty();
};

const failure = (error) => {
  console.error(error);
};

module.exports = {
  getBooksSuccess,
  clearBooks,
  failure,
};
