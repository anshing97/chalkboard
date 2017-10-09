module.exports = function (Handlebars) {
  'use strict';

  Handlebars.registerHelper('kssColors', function (doc, block) {

    var output = [];
    var regex = /^(\S+)\s*:\s*(\S+)(?:\s*-\s*(.*))?$/gm;
    var test;

    while ((test = regex.exec(doc)) !== null) {

      this.color = {};
      this.color.name = test[1];
      this.color.desc = test[2];

      output.push(block.fn(this));
    }

    return output.join('');
  });
};
