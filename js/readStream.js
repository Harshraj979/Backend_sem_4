const fs = require('fs');

let readStream = fs.createReadStream('/txt_file/log.txt', 'utf-8',start=0,end=1);
readStream.on('data', (chunk) => {
    console.log(chunk);
    console.log(chunk.length);
});
readStream.on('error', (err) => {
    console.log("Error while reading the file");
    console.log(err);
});
readStream.on('end', () => {
    console.log("Finished reading the file");
});