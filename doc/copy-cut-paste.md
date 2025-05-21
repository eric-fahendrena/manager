# Copy, cut and paste

##### `manager.copy(fpaths: string|Array<string>)`

Copies file(s) or directory(ies) for later pasting (see `manager.paste`).

```js
// single file
await manager.copy('example.file');

// multiple files
await manager.copy([ 'example-1.file', 'example-2.file' ]);
```

##### `manager.cut(fpaths: string|Array<string>)`

Cuts file(s) or directory(ies) for later pasting (see `manager.paste`).

```js
// single file
await manager.cut('example.file');

// multiple files
await manager.cut([ 'example-1.file', 'example-2.file' ]);
```

##### `manager.paste(dirpath: ?string)`

Pastes copied or cutted file(s) or directory(ies).

```js
// in current directory
await manager.copy('example.file');
await manager.cd('My Folder'); // change current working directory
await manager.paste();

// in a specified directory
await manager.cut('example.file');
await manager.paste('My Folder');
```

##### `manager.copyPaste(sources: string|Array<string>, destDir: string)`

Copies and pastes file(s) or directory(ies).

```js
await manager.copyPaste('example.file', './Folder');
```

##### `manager.cutPaste(sources: string|Array<string>, destDir: string)`

Cuts and pastes file(s) or directory(ies).

```js
await manager.cutPaste('example.file', './Folder');
```

##### `manager.mv(sources: string|Array<string>, destDir)`

Works the same as `cutPaste`.

```js
await manager.mv('example.file', 'My Folder');
```
