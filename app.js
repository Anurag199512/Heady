const express=require('express');
const func=require('./utils/addCategory');
const getData=require('./utils/getAllCategory');
const addProduct=require('./utils/addProduct');
const getDataByCategory =require('./utils/getDataByCategory');
const addChildCategory=require('./utils/addChildCategory');
const app=express();
const bodyParser = require("body-parser");

//addProduct('soap','s1111','s22222')
// addProduct('lux','s12')
// addProduct('cinthol','s1')

//func.addCategory('pharma');
//func.addCategory('pharma12','pha231');
//func.addCategory('sometihng');
getDataByCategory('s12');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//will display the current state of database
app.get('/',(req,res)=>{
    getData().then((data)=>{
        res.send(data);
    }).catch((error)=>{
        res.send(error);
    });
});


//to add a sub category in already added categories
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


//to add a child category in already added categories
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


app.listen(3000,()=>{
    console.log('Server listening on port 3000');
});
