//implement a node js program that reads multiple files asynchrnously merges their content and saves the result in single output file using promises and async,await

const fs=require('fs');
async function mergeFiles(){
    try{
        const data1=await fs.readFile("file1.txt","utf-8");
        const data2=await fs.readFile("file2.txt","utf-8");
        const data3=await fs.readFile("file3.txt","utf-8");
        const mergedContent=data1+data2+data3+"\n";
        await fs.writeFile("output.txt",mergedContent);
        console.log("File merged successfully");
    }
    catch(err){
        System.out.println("Error",err);
    }
}
mergeFiles();
