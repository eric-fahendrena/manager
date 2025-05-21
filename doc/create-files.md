# Create files

### `manager.createFile(fdata: string|object): Promise<string>`

This creates a new file or overwrites an existing file.

```js
// creates new empty file
const fpath = await manager.createFile('example.file');

// create a file with content
const fpath2 = await manager.createFile({
  name: 'example.file',
  content: 'This is the file content !',
});
```

### `manager.touch(fnames: string|Array<string>): Promise<string|Array<string>>`

Updates access and modification times of file(s) to current time. If a file does not exist, an empty one will be created.
 
```js
// touches a file
const fpaths = await manager.touch('example.file');

// touches multiple files
const fpaths2 = await manager.touch([ 'example-1.file', 'example-2.file' ]);
```
