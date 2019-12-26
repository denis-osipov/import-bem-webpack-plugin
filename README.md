# import-bem-webpack-plugin
Imports dependencies for BEM entities using info from Pug-files. It allows to use or remove blocks in other blocks or pages and don't care about importing dependencies.

For example, if you have block `myBlock1` and decide to use in its Pug-file your other block `myBlock2` (as mixin, `extends` keyword or just adding class to some html-element), files of `myBlock2` will be imported in corresponding files of `myBlock1` (importing code will be injected to files).

If imported block `myBlock2` has more file types than `myBlock1`, missing files will be created (by default, can be configured with `create` option). If you remove code using other block from Pug-file, importing code will be removed from all files. Files created by plugin can be also removed in this case (option `clear`).

## Installation
Run

```
npm install import-bem-webpack-plugin
```

to add it to `dependencies` section (if you want to use it in production for some reason) or

```
npm install --save-dev import-bem-webpack-plugin
```

to add it to `devDependencies` section of your `package.json` (most likely you should choose this option).

To uninstall **import-bem-webpack-plugin** run

```
npm uninstall --save import-bem-webpack-plugin
```

or

```
npm uninstall --save-dev import-bem-webpack-plugin
```

respectively.

## Usage
Require plugin and then use it at the first place in `plugin` section of your webpack configuration:

```JS
// webpack.config.js

const ImportBemWebpackPlugin = require('import-bem-webpack-plugin');

module.exports = {
  plugins: [
    new ImportBemWebpackPlugin({
      folders: [
        'path/to/first/folder',
        'path/to/second/folder'
      ]
    })
  ]
```

**import-bem-webpack-plugin** gets several options:

  - `folders` - array of folders to scan (required)
  - `clear` - boolean, `true` if deletion of empty files is desired (optional, defaults to `false`)
  - `create` - boolean, `true` if creation of missing files is desired (optional, defaults to `true`)

## File structure approach

**import-bem-webpack-plugin** works only for [**nested** file structure approach](https://en.bem.info/methodology/filestructure/#nested) for BEM projects:

  - Each block corresponds to a single directory.

  - The code of modifiers and elements is stored in separate files.

  - The files of modifiers and elements are stored in separate directories.

  - The block directory is the root directory for the subdirectories of its elements and modifiers.

  - Names of element directories begin with a double underscore (__).

  - Names of modifier directories begin with a single underscore (_).