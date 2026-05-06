const http=require('http');
const fs=require('fs');
const eventEmitter=require('events');


let app=http.createServer((req,res)=>{
    if(req.url=="/"){
        res.writeHead(200,{"content-type":"text/html"});
        res.end(`<div>
                    <h3>Click  on the button to see the data</h3>
                    <a href='/fetchdata'>
                        <button>Fetch Data</button>
                    </a>
                </div>`
        )
    }

    else if(req.url==="/fetchdata"){
    fs.readFile("mock_data.json","utf-8",(err,data)=>{
        if(err){
            res.writeHead(404,{'content-type':'text/html'});
            res.end("<p style='color:red'>Error while fetching the data</p>");
        }
        else{
            const mock_data = JSON.parse(data);
            //const student=JSON.parse(data); for studentData.json
            //const students = parsedData.students;   

            let table = `
                <html>
                <head>
                    <style>
                        body{
                            text-align:center;
                        }
                        table{
                            border-collapse: collapse;
                            margin: 20px auto;
                            width: 80%;
                        }
                        th, td{
                            border: 1px solid black;
                            padding: 10px;
                        }
                        th{
                            background-color: orange;
                            font-weight: bold;
                        }
                    </style>
                </head>
                <body>
                    <h2>Employee Data</h2>
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>email</th>
                            <th>job title</th>
                        </tr>
                `;

            mock_data.forEach((employee) => {
            table += `
                <tr>
                    <td>${employee.id}</td>
                    <td>${employee.first_name}</td>
                    <td>${employee.last_name}</td>
                    <td>${employee.email}</td>
                    <td>${employee.job_title}</td>
                </tr>
            `;
        });

            table += `
                </table>
            </body>
            </html>
            `;

            res.writeHead(200,{"content-type":"text/html"});
            res.end(table);
        }
    });
}
    else{
        res.writeHead(404,{"content-type":"text/html"});
        res.end(`<h2>Page not found</h2>`);
    }
})

app.listen(8000,()=>{
    console.log("server started on port 8000");
});