# Remove directories

### `manager.removeDir(dirpath: string)`

Delete a directory if it is not empty.

```js
await manager.removeDir('My Folder');
```

### `manager.rmdir(dirpaths: string|Array<string>)`

Delete one or multiple directories if they are not empty.

```js
await manager.rmdir([ 'Folder 1', 'Folder 2' ]);
```
