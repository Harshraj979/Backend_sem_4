const zlib=require('zlib');

let data='this is a data';
zlib.gzip(data,(err,buffer)=>{
    if(err){
        console.log("Error while compressing the data");
    }
    else{
        console.log("data compressed successfully\n",buffer.toString());
        zlib.gunzip(buffer,(err,originalData)=>{
            if(err){
                console.log("Error while decompressing the data");
            }
            else{
                console.log("data decompressed successfully\n",originalData.toString());
            }
        })
    }
})