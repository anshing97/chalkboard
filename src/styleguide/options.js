const livingcss = {
  streamContext: true,
  sortOrder: [
    'Overview', 'Styles', 'Components'
  ],
};

const nunjucks = {
  path: 'src/styleguide/templates/partials/',
  envOptions: {
    autoescape: false
  }
};

const mergeJSON = {
  fileName: 'css.json',
  edit: (parsedJson, file) => {
      if (parsedJson.pageOrder) {
          delete parsedJson.pageOrder;
      }
      if (parsedJson.stylesheets) {
          delete parsedJson.stylesheets;
      }
      if (parsedJson.footerHTML) {
          delete parsedJson.footerHTML;
      }
      if (parsedJson.id) {
          delete parsedJson.id;
      }
      if (parsedJson.globalStylesheets) {
          delete parsedJson.globalStylesheets;
      }
      if (parsedJson.menuButtonHTML) {
          delete parsedJson.menuButtonHTML;
      }
      if (parsedJson.scripts) {
          delete parsedJson.scripts;
      }
      if (parsedJson.sections) {
          delete parsedJson.sections;
      }
      if (parsedJson.title) {
          delete parsedJson.title;
      }
      if (parsedJson.pages) {
          delete parsedJson.pages;
      }
      return parsedJson;
  },
};

module.exports = { livingcss, nunjucks, mergeJSON }



