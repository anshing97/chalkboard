var marked = require('marked');
var fs     = require('fs');

module.exports = function (Handlebars) {
  'use strict';

  console.log('registered content');

  Handlebars.registerHelper('kssContent', function (doc, block) {

    var output = [];
    var content = fs.readFileSync(doc,'utf8');

    this.content = {};
    this.content.html = marked(content)

    output.push(block.fn(this));

    return output.join('');
  });
};
