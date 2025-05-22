/*!
 * Manager
 * Copyright(c) 2025 Jean Eric Razanapahendrena
 * MIT Licensed
 */
 
import fs from 'fs';
import path from 'path';

/**
 * constructor Manager
 * 
 * @param  {?string} parent
 */
function Manager(parent='') { 

  /**
   * Current path to working directory
   * 
   * @var  {string}
   */
  let _parent = !path.isAbsolute(parent) ? path.resolve(parent) : parent;
  
  /**
   * Copied path ready to paste.
   * @var  {null|string|Array}
   */
  let _copiedPath = null;
  
  /**
   * Cutted path ready to paste.
   * @var  {null|string|Array}
   */
  let _cuttedPath = null;
  
  /**
   * Creates file
   * 
   * @param  {string|object} data
   * @returns the created file pathname
   */
  this.createFile = async (fdata) => {
    let dataObj = {};
    
    if (typeof fdata === 'string') {
      dataObj.name = fdata;
    } else if (typeof fdata === 'object') {
      dataObj = fdata;
    }
    
    if (!dataObj.name) {
      throw new Error('The "data" object must contain "name" property.');
    }
    
    const pathname = _correctPath(dataObj.name);
    const file = fs.createWriteStream(pathname);
    
    if (dataObj.content) await file.write(dataObj.content);
    
    file.close();
    
    return pathname;
  }
  
  /**
   * Creates directory
   * 
   * @param  {string} dirname
   * @returns  {string} the path to the directory
   */
  this.createDir = async (dirname) => {
    // dirname must be of type string
    if (typeof dirname !== 'string')
      throw new TypeError('The "dirname" argument must be of type String');
    
    const pathname = _correctPath(dirname);
    
    if (!fs.existsSync(pathname)) {
      fs.mkdirSync(pathname);
    }
    
    return path.resolve(pathname);
  }
  
  /**
   * Changes current working directory
   * 
   * @param  {string} dirname
   * @returns  {string} the new path to directory
   */
  this.changeDir = async (dirname) => {
    const pathname = _correctPath(dirname);
    
    if (!fs.existsSync(pathname)) {
      this.createDir(pathname);
    }
    
    _parent = path.resolve(pathname);
    return _parent;
  }
  
  /**
   * Lists file(s) infos in directory
   * 
   * @param  {string} dirname (optional)
   * @returns  {Array<object>} list of the elements
   */
  this.listInfos = async (dirname='') => {
    const pathname = _correctPath(dirname);
    const filenames = fs.readdirSync(pathname);
    const fileInfos = [];
    
    for (let i in filenames) {
      const currPath = pathname + '/' + filenames[i];
      const fileInfo = await _getFileInfo(currPath);
      fileInfos.push(fileInfo);
    }
    
    return fileInfos;
  }
  
  /**
   * Removes directory
   * 
   * @param  {string} dirname
   * @retrns  {void}
   */
  this.removeDir = async (dirname) => {
    const pathname = _correctPath(dirname);
    fs.rmdirSync(pathname);
  }
  
  /**
   * Removes file
   * 
   * @param  {string} filename
   * @returns  {string} obsolete path
   */
  this.removeFile = async (filename) => {
    const pathname = _correctPath(filename);
    
    // removing file
    fs.unlinkSync(pathname);
    
    // obsolete path
    return pathname;
  }
  
  /**
   * Renames file or directory
   * 
   * @param  {string} filename
   * @param  {string} destFilename
   * @returns  {string|false} new path
   */
  this.rename = async (filename, destFilename) => {
    let source, dest;
    
    source = _correctPath(filename);
    dest = _correctPath(destFilename);
    
    if (fs.existsSync(dest)) {
      return false;
    }
    
    setTimeout(async () => {
      fs.renameSync(source, dest);
    }, 1000);
    
    return dest;
  }
  
  /**
   * Copies and pastes file or directory
   * 
   * @param  {string} filenames
   * @param  {string|Array} destDir
   */
  this.copyPaste = async (filenames, destDir) => {
    // is arg_1 a string
    if (typeof filenames === 'string') {
      // force it to be array
      filenames = [ filenames ];
    }
    
    // filenames is now an array
    filenames.forEach(filename => {
      let source, dest;
      
      console.log('filename', filename);
      source = _correctPath(filename);
      console.log('source', source);
      dest = _correctPath(destDir) + '/' + path.basename(source);
      
      fs.cpSync(source, dest, {
        recursive: true,
      });
    });
  }
  
  /**
   * Cuts and pastes file or directory
   * 
   * @param  {string} filename
   * @param  {string} targetDir
   */
  this.cutPaste = async (filenames, destDir) => {
    if (!fs.existsSync(destDir)) {
      this.createDir(destDir);
    }
    
    // is arg_1 a string ?
    if (typeof filenames === 'string') {
      const source = _correctPath(filenames);
      const dest = _correctPath(destDir) + '/' + path.basename(source);
      this.rename(source, dest);
      return;
    }
    
    // arg_1 is an array
    for (let i in filenames) {
      const source = _correctPath(filenames[i]);
      const dest = _correctPath(destDir) + '/' + path.basename(source);
      this.rename(source, dest);
    }
  }
  
  /**
   * Copies file or directory to paste it later
   * 
   * @param  {string|Array}
   */
  this.copy = async (filenames) => {
    // is arg of type string
    if (typeof filenames === 'string') {
      const pathname = _correctPath(filenames);
      
      _copiedPath = pathname;
      _cuttedPath = null;
      
      return _copiedPath;
    }
    
    // arg is an array
    
    let copiedPaths = [];
    
    for (let i in filenames) {
      const pathname = _correctPath(filenames[i]);
      copiedPaths.push(pathname);
    }
    
    _copiedPath = copiedPaths;
    _cuttedPath = null;
    
    return _copiedPath;
  }
  
  /**
   * Cuts file or directory to paste it later.
   * 
   * @param  {string|Array} filenames
   * @returns  {string|Array} the cutted path
   */
  this.cut = async (filenames) => {
    // is arg of type string ?
    if (typeof filenames === 'string') {
      const pathname = _correct(filenames);
      _cuttedPath = pathname;
      _copiedPath = nul
      
      return _cuttedPath;
    }
    
    // arg is array
    
    const cuttedPaths = [];
    for (let i in filenames) {
      const pathname = _correctPath(filenames[i]);
      cuttedPaths.push(pathname);
    }
    _cuttedPath = cuttedPaths;
    _copiedPath = null;
    
    return _cuttedPath;
  }
  
  /**
   * Pastes copied or cutted file(s) or directory(es).
   * 
   * @param  {string} dirname
   */
  this.paste = async (dirname='') => {
    if (_copiedPath) {
      this.copyPaste(_copiedPath, dirname);
    } else if (_cuttedPath) {
      this.cutPaste(_cuttedPath, dirname);
    }
  }
  
  /**
   * -- IMPORTANT --
   * 
   * The following methods simulate some linux commands
   */
   
  /**
   * Touches one or multiple files
   * 
   * Update access and modification times of files to current time.
   * If a file does not exist, a new empty file will be created.
   * 
   * @param  {string|Array<string>} filenames
   * @returns  {string|Array<string>} the touched filenames
   */
  this.touch = async (filenames) => {
    const now = new Date();
    
    if (typeof filenames === 'string') {
      filenames = [ filenames ];
    }
    
    for (let i in filenames) {
      const filename = filenames[i];
      const pathname = _correctPath(filename);
      
      if (await !fs.existsSync(pathname)) {
        await this.createFile(pathname);
        continue;
      }
      
      // file does not exist
      fs.utimesSync(pathname, now, now);
    }
    
    return filenames.length > 1 ? filenames : filenames[0];
  }
  
  /**
   * Creates directory(ies)
   * 
   * @param  {string|Array<string>} dirnames
   * @returns  {string|Array<string>} created dirs paths
   */
  this.mkdir = async (dirnames) => {
    if (typeof dirnames === 'string') {
      dirnames = [ dirnames ];
    }
    
    const crtDirs = []; // crrated dirs
    for (let i in dirnames) {
      const dir = this.createDir(dirnames[i]);
      crtDirs.push(dir);
    }
    
    return crtDirs.length > 1 ? crtDirs : crtDirs[0];
  }
  
  
  /**
   * Change current working directory
   * 
   * @param  {string} dirname
   * @returns  {string} new current directory
   */
  this.cd = async (dirname) => {
    const pathname = _correctPath(dirname);
    
    if (await !fs.existsSync(pathname)) {
      throw new Error(dirname + ': No such file or directory.');
    }
    
    const currDir = await this.changeDir(pathname);
    return currDir;
  }
  
  /**
   * List information about the files in a directory.
   * 
   * if arg specifies a file, this method gets the information about it.
   * 
   * @param  {?string} dirname
   * @returns  {object|Array<object>}
   */
  this.ls = async (dirname='') => {
    const pathname = _correctPath(dirname);
    const isDir = await _isDirectory(pathname);
    
    // if arg is a file and not a directory,
    // return the info of the file
    if (!isDir) {
      const filename = path.basename(pathname);
      const fileInfo = await _getFileInfo(pathname);
      
      return fileInfo;
    }
    
    // arg is realy a directory
    
    const fileLst = await this.listInfos(pathname);
    return fileLst;
  }
  
  /**
   * Remove directory(ies) if they are empty.
   * 
   * @param  {string|Array<string>}
   */
  this.rmdir = async (dirnames) => {
    if (typeof dirnames === 'string') {
      const pathname = _correctPath(dirnames);
      await this.removeDir(dirnames);
      
      return;
    }
    
    for (let i in dirnames) {
      const pathname = _correctPath(dirnames[i]);
      const exists = await _exists(pathname);
      if (exists) {
        await this.removeDir(pathname);
      }
    }
  }
  
  /**
   * Remove file(s)
   * 
   * @param  {string|Array<string>} filenames
   */
  this.rm = async (filenames) => {
    if (typeof filenames === 'string') {
      await this.removeFile(filenames);
      return;
    }
    
    for (let i in filenames) {
      await this.removeFile(filenames[i]);
    }
  }
  
  /**
   * Move source to directory.
   * 
   * @param  {string|Array<string>} source
   * @param  {string} destDir
   */
  this.mv = async (sources, destDir) => {
    await this.cutPaste(sources, destDir);
  }
  
  // Privates functions
  
  /**
   * Corrects path to be avoid errors
   * 
   * @param  {string} name
   * @returns  {string} the corrected pathname
   */
  function _correctPath(name) {
    let pathname;
    
    if (path.isAbsolute(name)) {
      pathname = name;
    } else {
      pathname = _parent + '/' + name;
    }
    
    return path.resolve(pathname);
  }
  
  /**
   * Verifies if a path is a directory.
   * 
   * @param  {string} pathname
   * @returns  {boolean}
   */
  async function _isDirectory(pathname) {
    const stats = await fs.statSync(pathname);
    return stats.isDirectory();
  }
  
  /**
   * Gets information about a file or directory.
   * 
   * @param  {string}
   * @returns  {object}
   */
  async function _getFileInfo(pathname) {
    const pathInfo = path.parse(pathname);
    const stats = await fs.statSync(pathname);
    const fileInfo = {
      ...pathInfo,
      size: stats.size,
      birthtime: stats.birthtimeMs,
      isDirectory: stats.isDirectory(),
    };
    
    return fileInfo;
  }
  
  /**
   * Verifies if file or directory exists.
   * 
   * @param  {string} pathname
   * @returns  {boolean}
   */
  async function _exists(pathname) {
    const exists = fs.existsSync(pathname);
    return exists;
  }
}

export default Manager;