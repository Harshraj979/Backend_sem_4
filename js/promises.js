/*
const myPromise = new Promise((resolve, reject) => {
    let success = true;
    if(success){
        resolve("Task completed successfully");
    }else{
        reject("Task failed");
    }
});

myPromise
.then((result)=>{
    console.log(result);
})
.catch((error)=>{
    console.log(error);
});
*/
/*
let x = 4;
let y = 3;
let result = x + y;

async function fetchalldata(){
    let fetchdata = await fetch('https://jsonplaceholder.typicode.com/todos');
    console.log(await fetchdata.json());
}

fetchalldata()

console.log(result);
*/
/*
let x = 2;
let y = 3;
let result = x + y;

fetch('https://jsonplaceholder.typicode.com/todos')
    .then((data) => data.json())
    .then((jsonData) => console.log(jsonData))
    .catch((error) => console.log(error));

console.log(result);
*/