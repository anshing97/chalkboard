var marked = require('marked');
var fs     = require('fs');

module.exports = function (Handlebars) {
  'use strict';

  Handlebars.registerHelper('kssContent', function (doc, block) {

    var output = [];
    var markup = fs.readFileSync(doc,'utf8');

    this.content = {};
    this.content.html = marked(markup)

    output.push(block.fn(this));

    return output.join('');
  });
};
