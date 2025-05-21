# manageio

A Node.js module that makes exploring files easier.

Whether you want to create a file explorer, automate browsing, or simply generate working template, this module makes it easy.

As soon as you instatiate a `Manager` object, it's like you just opened a file explorer. In fact, that's exactly what you're doing.

Here is an example of how to use it :

```js
const { Manager } = require('manageio');

(async () => {
  const manager = new Manager();
  
  await manager.createFile({
    name: 'example.file',
    content: 'Hello, world !',
  });
})();
```

## Installation

This module is available through [npm registry](https://www.npmjs.com).

```sh
$ npm install manageio
```

## Usage

```js
const { Manager } = require('manageio');

(async () => {
  const manager = new Manager('./path/to/working/directory');
  
  // your script here ....
})();
```

### Examples

##### Classic method

```js
const manager = new Manager('./example 1');

// creates directory
await manager.createDir('Folder 1');

// changes working directory (navigate to 'Folder 1')
await manager.changeDir('Folder 1');

// current working directory is now './example 1/Folder 1'

// creates a sub-directory in current working directory : './example 1/Folder 1/Subfolder'
await manager.createDir('Subfolder');

// creates an empty file in current working directory
await manager.createFile('example.file');
```

##### Linux commands simulation

```js
const manager = new Manager('./example 2');

// creates one or multiple directories with mkdir
await manager.mkdir([ 'Folder 1', 'Folder 2', 'Folder 3' ]);;

// creates a file if it doesn't exist yet.
await manager.touch('example.file');

// changes working directory ('./example 2' to './example 2/Folder 1').
await manager.cd('Folder 1');

// current working directory is now './example 2/Folder 1'

// creates multiple files in current working directory
await manager.touch([ 'file 1', 'file 2', 'file 3' ]);

// returns to parent directory ('./example 2')
await manager.cd('..');

// current directory is now './example 2'

// lists informations about files and directories in current working directory
const list = await manager.ls();
```

## Documentation

- [Create files](./doc/create-files.md)
- [Create directories](./doc/create-directories.md)
- [Change current working directory](./doc/change-directory.md)
- [Renaming](./doc/rename.md)
- [List informations](./doc/list-infos.md)
- [Copy, cut and paste](./doc/copy-cut-paste.md)
- [Remove files](./doc/remove-files.md)
- [Remove directories](./doc/remove-directories.md)

## License

MIT
