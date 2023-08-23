const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Mimic the db using array
let blogList=[];

//Get list of all blogs
app.get('/blogs',(req,res) => {
    return res.status(200).json({
        data:blogList,
        success:true,
    });
});

//Create a blog
app.post('/blogs',(req,res) => {
    blogList.push({
        title:req.body.title,
        description:req.body.description,
        id:Math.floor(Math.random()*100),
    });
    return res.status(201).json({
        success:true,
    });
});

//Get a particular blog
app.get('/blogs/:blogId',(req,res) => {
    const blog = blogList.filter((blog) => blog.id == req.params.blogId);

    return res.status(200).json({
        data:blog,
        success:true,
    });
});

//Delete a particular blog
app.delete('/blogs/:blogId',(req,res) => {
    blogList = blogList.filter((blog) => blog.id != req.params.blogId);
    return res.status(200).json({
        success:true,
    });
});

//Update a blog
app.patch('/blogs/:blogId',(req,res)=>{
    let result = blogList.find((blog) => blog.id == req.params.blogId);
    Object.assign(result,req.body);
    return res.status(200).json({
        success:true,
    });
});

app.listen(PORT,function process(){
    console.log("Server running on port ",PORT);
});