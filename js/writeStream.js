const fs = require('fs');

const writeStream = fs.createWriteStream('output.txt', {
    encoding: 'utf-8'
});
let content="Hello my name is harsh raj\n"
writeStream.write(content);
writeStream.write("Learning streams in Node.js\n");

writeStream.end(()=>{
    fs.createReadStream('output.txt', 'utf-8')
        .on('data',chunk=>{
            console.log(chunk);
    });
});

writeStream.on('finish', () => {
    console.log("All data successfully written to file.");
});

writeStream.on('error', (err) => {
    console.log("Error:", err.message);
});