const express = require("express");
const fs = require("fs");
const app = express();
const users = require("./mock_data.json");

const PORT = 8000;

//middle ware -say plugins
app.use(express.urlencoded({ extended: false }));

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const body = req.body;

    const user = users.find((user) => user.id === id);
    Object.assign(user, body);

    fs.writeFile("./mock_data.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "updated", user });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);

    const index = users.findIndex((user) => user.id === id);
    users.splice(index, 1);

    fs.writeFile("./mock_data.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "Deleted" });
    });
  });

//GET
/*
app.get('/api/users/:id',(req,res)=>{
    const id=Number(req.params.id);
    const user=users.find(user=>user.id===id);
    return res.json(user);
})
*/
//POST

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ id: users.length + 1, ...body });
  fs.writeFile("./mock_data.json", JSON.stringify(users), (err, data) => {
    return res.json({ Status: "success", id: users.length });
  });
});

app.listen(PORT, () => {
  console.log("Script started");
});
