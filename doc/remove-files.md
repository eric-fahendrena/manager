# Remove files

##### `manager.removeFile(fpath: string)`

Deletes file.

```js
await manager.removeFile('example.file');
```

##### `manager.rm(fpaths: string|Array<string>)`

Delete one or multiple files.

```js
await manager.rm([ 'example-1.file', 'example-2.file' ]);
```