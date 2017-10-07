module.exports = function (Handlebars) {
  'use strict';

  console.log("colors ran");

  Handlebars.registerHelper('kssColors', function (doc, block) {

    var output = [];
    var regex = /^(\S+)\s*:\s*(\S+)(?:\s*-\s*(.*))?$/gm;
    var test;

    console.log("color processed someting ",doc);

    while ((test = regex.exec(doc)) !== null) {

      this.color = {};
      this.color.name = test[1];
      this.color.desc = test[2];

      console.log(this.color);

      output.push(block.fn(this));
    }

    return output.join('');
  });
};
