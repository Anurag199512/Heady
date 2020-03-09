const express=require('express');
const func=require('./utils/addCategory');
const getData=require('./utils/getAllCategory');
const addProduct=require('./utils/addProduct');
const getDataByCategory =require('./utils/getDataByCategory');
const addChildCategory=require('./utils/addChildCategory');
const updateProduct=require('./utils/updateProduct');
const getProductDetails=require('./utils/getProductDetails');

const app=express();
const bodyParser = require("body-parser");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.get('/getProductDetails',(req,res)=>{
    getProductDetails().then((data)=>{
        res.send(data);
    }).catch((error)=>{
        res.send(error);
    });
});





//task 1 -to add a sub category in already added categories
app.post('/addCategory',(req,res)=>{
    if(req.body.name && req.body.subcategory)
        {
            func.addCategory(req.body.name,req.body.subcategory).then((data)=>{
            res.send(data);
            }).catch((error)=>{
                res.send(error);
            });
        }
    else if(req.body.name)
        {
            func.addCategory(req.body.name).then((data)=>{
            res.send(data);
            }).catch((error)=>{
                res.send(error);
            });
        }
    else{
        res.send({"error":"Provide the value of name for the category"})
    }    
});


//task 1 -to add a child category in already added categories
app.post('/addChildCategory',(req,res)=>{
    if(req.body.name && req.body.subcategory  && req.body.childCategory)
        {
            addChildCategory(req.body.name,req.body.subcategory,req.body.childCategory).then((data)=>{
            res.send(data)
            }).catch((error)=>{
                res.send(error)
            });
        }
    else{
        res.send({"error":"Provide the value of name for the category and the subcategory to add the child category"})
    }    
});

//task 2- add a product and map it to different categories
app.post('/addProduct',(req,res)=>{

    if(req.body.name && req.body.price && req.body.category.length>0)
        {
            addProduct(req.body.name,req.body.price,req.body.category).then((data)=>{
            res.send(data);
            }).catch((error)=>{
                res.send(error);
            });
        }
    else{
        res.send({"error":"Provide all the values in proper req format "})
    }    
});

//task 3- will display the current state of database to return all the category and child category
app.get('/',(req,res)=>{
    getData().then((data)=>{
        res.send(data);
    }).catch((error)=>{
        res.send(error);
    });
});

//task 4- will display the all the products having the mentioned category
app.get('/categoryData',(req,res)=>{
    getDataByCategory(req.body.category).then((data)=>{
        res.send(data);
    }).catch((error)=>{
        res.send(error);
    });
});

//task 5
app.post('/updateProduct',(req,res)=>{

    if(req.body.id)
        {
            updateProduct(req.body.id,req.body.name,req.body.price).then((data)=>{
                res.send(data);
            }).catch((error)=>{
                res.send(error);
            });
        }
    else{
        res.send({"error":"Provide all the values in proper req format "})
    }    
});



app.listen(3000,()=>{
    console.log('Server listening on port 3000');
});
