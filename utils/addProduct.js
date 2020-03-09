const mongodb=require('mongodb');
const Mongoclient=mongodb.MongoClient;

//connection parameter
const connectionUrl='mongodb+srv://client:client1234@cluster0-qlkny.mongodb.net/test?retryWrites=true&w=majority';
const databaseName='Heady';

function addProduct(productName,price,category){
    
    return new Promise((resolve,reject)=>{
        if(productName=='' && category.length==0)
                reject('Please give both productName and category in the function addProduct.');
            else if(productName=='')
                reject('Please give value for productName in the function addProduct.');
            else if(category.length==0)
                reject('Please give value for category name for the given product');

            Mongoclient.connect(connectionUrl,{useUnifiedTopology:true},(error,client)=>{

                //if connection fail's then return a error message
                if(error)
                    {
                        reject("Cannot connect to the Mongo DB");
                    }

                //creating a database for our data
                let db=client.db(databaseName);    
                
                db.collection('Products').find({name:[productName],category:[category]}).toArray((error,response)=>{
                    
                    //checking if the product with the defined category is already present 
                    if(response.length==0){
                        db.collection('Products').insertOne({
                            'name':productName,
                            'price':price,
                            'category':category
                        });

                        resolve(`Product added with value name:${productName},price ${price} and category:${category}`);
                    }
                    else
                    {
                        reject({"Error":"Product with these values already present"});
                        
                    }
                })
            
            for(let cat in category) {   
            db.collection('Categories').find({name:cat}).toArray((error,response)=>{
                
                if(error)
                    {
                        reject({"Error":"Cannot connect to the Mongo DB"});
                    }
                //checking if the category do not exist in the list then only insert it in DB
                if(response.length==0){
                    db.collection('Categories').insertOne({[category[cat]]:{}})
                }
            })}
            
        })
    })
}

module.exports=addProduct;
