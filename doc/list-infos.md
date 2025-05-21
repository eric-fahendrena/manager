# List element informations in a directory

### `manager.listInfos(dirname: ?string): Promise<Array<object>>`

Lists element informations in a directory. If `dirnames` argument is not specified, the element informations of the current working directory will be returned.
This generates an error if argument is not a directory.

```js
const infoList = await manager.listInfos('My Folder');
```

### `manager.ls(dirname: ?string): Promise<object|Array<object>>`

Works the same as `listInfos`, but if the argument is a file, this one returns the file's information instead of generating an error.

```js
const infoList = await manager.ls('My Folder');
```
