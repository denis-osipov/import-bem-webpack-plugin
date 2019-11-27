// Plugin for imports dependencies for BEM-entities.

const path = require('path');
const Importer = require('./importer');

class ImportBemWebpackPlugin {
  constructor(options) {
    this.options = Object.assign({
      clear: false,
      create: true
    }, options);
  }

  apply(compiler) {
    // Import at startup
    compiler.hooks.entryOption.tap(
      'ImportBemWebpackPlugin',
      (context, entry) => {
        // Get paths
        if (!this.options.folders) {
          this.options.folders = [path.resolve(context, 'blocks')];
          this.options.folders = this.options.folders.concat(getFolders(context, entry));
        }

        this.Importer = new Importer(
          this.options.folders,
          this.options.clear,
          this.options.create);
        this.Importer.import();
      }
    );

    // Rewrite imports in watching mode
    compiler.hooks.invalid.tap(
      'ImportBemWebpackPlugin',
      (fileName, changeTime) => {
        // To simplify adding new files we need rewrite imports for each invalidation.
        this.Importer.import();
      }
    );
  }
}

function getFolders(context, entry) {
  // Get unique paths from entries
  const entryDirs = new Set();
  if (typeof entry === "string") {
    entryDirs.add(path.resolve(context, path.dirname(entry)));
  }
  else if (Array.isArray(entry)) {
    entry.forEach(file => {
      entryDirs.add(path.resolve(context, path.dirname(file)));
    });
  }
  else {
    for (point of Object.entries(entry)) {
      const [name, files] = point;
      if (typeof files === "string") {
        entryDirs.add(path.resolve(context, path.dirname(files)));
      }
      else {
        files.forEach(file => {
          entryDirs.add(path.resolve(context, path.dirname(file)));
        });
      }
    }
  }
  return Array.from(entryDirs);
}

module.exports = ImportBemWebpackPlugin;