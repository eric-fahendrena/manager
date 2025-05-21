# Change current working directory

##### `manager.changeDir(dirpath: string): Promise<string>`

Changes current working directory. If the directory does not already exist, a new one will be created.

```js
const dirpath = await manager.changeDir('My Folder');
```

##### `manager.cd(dirpath: string): Promise<string>`

Works the same as `changeDir`, but this one throws an error if the directory doesn't exist.

```js
const dirpath = await manager.cd('My Folder');
```