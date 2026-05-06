const express=require('express');
const fs=require('fs');
const zlib=require('zlib');
const app=express();

app.use(express.urlencoded({extended:false}));
const WriteStream=fs.createWriteStream('./txt_file/demo.txt',{encoding:'utf-8'});
const gzip=zlib.createGzip();
const gzipStream=fs.createWriteStream('./txt_file/demo.txt.gz');
gzip.pipe(gzipStream);

function isPrime(n)
{
    if(n<=1) return false;
    for(let i=2;i*i<=n;i++)
    {
        if(n%i==0)
        {
            return false;
        }
    }
    return true;
}

app.get('/',(req,res)=>{
    res.send(
        `
        <h2>Check prime Number</h2>
        <form method='POST'>
            <input type='number' name='num' placeholder='Enter a number' required>
            <button type='submit'>Check</button>
        </form>
        `
    );
});

app.post('/',(req,res)=>{
    const num=Number(req.body.num);

    const result=isPrime(num)?
        `${num} is a Prime Number`:
        `${num} is NOT a Prime Number`;

        WriteStream.write(result+'\n');
        gzip.write(result);
        res.send(`
            <h2>${result}</h2>
            <a href="/">Check another number</a>
    `);
});

app.listen(8000,()=>{});