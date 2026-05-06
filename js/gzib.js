const zlib=require('zlib');
const fs=require('fs');

const readStream=fs.createReadStream('log.txt','utf-8');
const writeStream=fs.createWriteStream('log.txt.gz');

let gzip=zlib.createGzip();
readStream.pipe(gzip).pipe(writeStream);

console.log('File compressed successfully');

// now reverse the process

const readStream2=fs.createReadStream('log.txt.gz');
const writeStream2=fs.createWriteStream('log1.txt');

let gunzip=zlib.createGunzip();
readStream2.pipe(gunzip).pipe(writeStream2);

console.log('File decompressed successfully');