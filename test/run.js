const Importer = require('../src/importer');

const importer = new Importer(['./test/blocks'], true, true);
importer.import();