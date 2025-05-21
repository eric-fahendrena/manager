# Rename file or directory

##### `manager.rename(fpath: string, dest: string): Promise<string|false>`

Renames the file or directory. This returns `false` if `dest` argument specifies an existing path.

```js
const newPath = await manager.rename('example.file', 'new-name.file');
```
