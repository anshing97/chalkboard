module.exports = function (Handlebars) {
  'use strict';

  console.log('registered content');

  Handlebars.registerHelper('kssContent', function (doc, block) {

    var output = [];

    this.content = {};
    this.content.html = '<h1>Hello there</h1>'

    output.push(block.fn(this));

    return output.join('');
  });
};
