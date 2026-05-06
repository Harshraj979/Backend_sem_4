const fs=require('fs');
/*
fs.writeFile('./contacts.txt',"This is the content need to be written",(err)=>{
    if(err){
        console.error("Error while writting in the file");
    }else{
        console.log("Content written in the file");
    }
});
*/
/*
fs.readFile('./contacts.txt',"utf-8",(err,result)=>{
    if(err){
        console.error("Error while reading the file");
    }
    else{
        console.log("Content of the file is:",result);
        fs.writeFile('./contacts_copy.txt',result,(err)=>{
            if(err){
                console.error("Error while writing in the copy file");
            }else{
                console.log("Content copied to the new file");
            }
        });
    }
});
*/

Marks=
[
    {
        name:"Ayush",
        Marks:"90",
        Email:"myEmail@abc.com"
    }
]


fs.writeFile('./student.json',JSON.stringify(Marks,null,2),(err)=>{
    if(err){
        console.error("Error while writing in the student.json file");
    }else{
        console.log("Content written in student.json file");
        fs.readFileSync('./student.json',"utf-8",(err,result)=>{
            if(err){
                console.error("Error while reading the student.json file");
            }else{
                console.log("Content of student.json is:",result);
            }
        });
    }
});