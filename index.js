const express = require('express');
const mongoose = require('mongoose');
// require('dotenv').config();\
const dotenv = require('dotenv');
const {Products} = require('./Products');
const { Tasks } = require('./Task');
// const {Task, Tasks} = require('./Task');
dotenv.config()
const app = express();
// const bodyParser = require('body-Parser')
// app.use(bodyParser.json());

const PORT = process.env.PORT || 7070;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

const connectdb = async()=>{
    await mongoose.connect(MONGO_URI,{useNewUrlParser:true, useUnifiedTopology:true,})
    .then(()=>{
        console.log("Connected to database")
    })
    .catch((error)=>{
        console.log("Unable to connect to database",error)
    });
};

connectdb();

// PRODUCT MANAGEMENT API

app.post('/products', async(req,res)=>{
    try {
        const product = new Products(req.body);
        await product.save();
        res.status(201).json(product)
    } catch (error) {
        res.status(400).json({error:error.message});
    }
});

app.get('/products', async(req,res)=>{
    const products = await Products.find();
    res.json(products);
});

app.get('/products/:id', async(req,res)=>{
    try {
        const product = await Products.findById(req.params.id);
        if (!product) return res.status(404).json({error:"Product not found"});
        res.json(product);
    } catch (error) {
        res.status(400).json({error:"Invalid Product ID"});
    }
});

// TASK MANAGEMENT API

app.post('/tasks', async(req,res)=>{
    try {
        const task = new Tasks(req.body);
        await task.save();
        res.status(201).json(task)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
});

app.get('/tasks', async(req,res)=>{
    const {completed} = req.query;
    let query = {};
    try {
        if (completed !== undefined) query.completed = completed === "true";
        // console.log(Tasks,'t')
        const tasks = await Tasks.find();
        if (!Tasks) {
            return res.status(500).json({ error: "Task model is not initialized" });
        }
        console.log("Task model:", Tasks);
        
        res.json(tasks);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

app.put("/tasks/:id", async(req,res)=>{
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true});
        if (!task) return res.status(404).json({error:"Task not found"});
        res.json(task);
    } catch (error) {
        res.status(400).json({error:"Invalid task ID"})
    }
});


// mongoose.connection.on("connected", () => {
//     console.log("MongoDB connected successfully");
// });

// mongoose.connection.on("error", (err) => {
//     console.error("MongoDB connection error:", err);
// });

// let products = [];
// let tasks = [];

// app.post('/products', async(req,res)=>{
//     const {name, description, price, category} = req.body;
//     if(!name || !category || price<=0){
//         return res.status(400).json({
//             error:'Enter the field correctly'
//         });
//     }

//     const product = {id: products.length+1, name, description, price, category};
//     products.push(product);
//     // products.save()
//     res.status(201).json(product);
// });

// app.get('/products',(req,res)=>{
//     res.json(products);
// });

// app.get('/products/:id',(req,res)=>{
//     const product = products.find(p => p.id === parseInt(req.params.id));
//     if(!product) return res.status(404).json({error:"product not found"});
//     res.json(products);
// });


app.listen(PORT,()=>{
    console.log(`Example app listening at http://localhost:${PORT}`);
});
