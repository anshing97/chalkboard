const livingcss = {
  streamContext: true,
  sortOrder: [
    'Overview', 'Styles', 'Components'
  ],
};

const nunjucks = {
  path: 'src/styleguide/templates/',
  envOptions: {
    autoescape: false
  }
};

module.exports = { livingcss, nunjucks }



