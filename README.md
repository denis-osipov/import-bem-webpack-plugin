# import-bem-webpack-plugin
Imports dependencies for BEM entities using info from Pug-files.

## Installation
Run

```
npm install import-bem-webpack-plugin
```

or

```
npm install --save-dev import-bem-webpack-plugin
```

to add it to your `package.json`.


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