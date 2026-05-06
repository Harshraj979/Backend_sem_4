const express=require('express');
const app=express();
const helmet=require('helmet');
app.use(helmet());
//role based access control (RBAC)
const users={
    harsh: {role:'admin'},
    john: {role:'teacher'},
    jane: {role:'student'},
};

const permissions={
    admin: ['dashboard','bills','profile'],
    teacher: ['dashboard','profile'],
    student:['profile'],
};

const getUsers=(req,res,next)=>{
    const username=req.query.username;
    if(!username || !users[username]){
        return res.send('User not found');
    }
    req.user=users[username];
    next();
}

const checkAccess=(req,res,next)=>{
    const user=req.user;
    const page=req.path.substring(1);
    if(permissions[user.role].includes(page)){
        next();
    }
    else{
        return res.send('Access denied');
    }
}

app.get('/dashboard',getUsers,checkAccess,(req,res)=>{
    res.send('Welcome to the dashboard');
});
app.get('/bills',getUsers,checkAccess,(req,res)=>{
    res.send('This is the bills page');
});
app.get('/profile',(req,res)=>{
    res.send('This is your profile');
});
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})