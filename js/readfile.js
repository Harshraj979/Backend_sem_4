const fs=require('fs');

/*
fs.readFile('./image.png',"",(err,data)=>{
    if(err){
        console.log("Error in reading the file");
    }else{
        console.log("Contents of the file are:",data);
    }
})
*/

try {
    const result=fs.readFileSync('./contact.txt',"utf-8");
    console.log(result);
} catch (error) {
    console.log("File doesn't exist");
}