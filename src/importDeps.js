const Importer = require('./importer');

const importer = new Importer(['./src/blocks', './src/pages'], true, true);
importer.import();