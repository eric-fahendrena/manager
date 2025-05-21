# Create directories

##### `manager.createDir(dirname: string): Promise<string>`

Creates a directory if it does not already exist.

```js
const dirpath = await manager.createDir('New Folder');
```

##### `manager.mkdir(dirnames: string|Array<string>): Promise<string|Array<string>>`

Creates directory(ies) if they do not already exist.

```js
// creates a directory
const dirpath = await manager.mkdir('New Folder');

// creates multiple directories
const dirpaths = await manager.mkdir([ 'New Folder 1', 'New Folder 2' ]);
```
