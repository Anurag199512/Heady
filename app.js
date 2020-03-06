const express=require('express');
const func=require('./utils/addCategory')
const getData=require('./utils/getAllCategory')
const addProduct=require('./utils/addProduct')
const getDataByCategory =require('./utils/getDataByCategory')
const app=express();
getData();

// addProduct('soap','s1','s2')
// addProduct('lux','s12')
// addProduct('cinthol','s1')

//func.addCategory('pharma');
//func.addCategory('pharma12','pha231');
//func.addCategory('sometihng');
getDataByCategory('s12');

app.get('/',(req,res)=>{
    console.log('G',req.query.category);
    if(req.query.category && req.query.subCategory) 
        func.addCategory(req.query.category,req.query.subCategory);
    else  if(req.query.category)
        func.addCategory(req.query.category);

    res.send('helloa');
});

/*Sample request object 

1-if only category is getting added
    {

    }
2- if subcategory is required to be added along with category or subcategory is only being added
    {

    }
*/
app.post('/addCategory',(req,res)=>{
    
});

app.listen(3000,()=>{
    console.log('Server listening on port 3000');
});
