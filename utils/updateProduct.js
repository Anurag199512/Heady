const mongodb=require('mongodb');
const Mongoclient=mongodb.MongoClient;
const ObjectID = require('mongodb').ObjectID;

//connection parameter
const connectionUrl='mongodb+srv://client:client1234@cluster0-qlkny.mongodb.net/test?retryWrites=true&w=majority';
const databaseName='Heady';

function updateProduct(id,newName,newPrice){
    
    return new Promise((resolve,reject)=>{
            if(id==''||!id)
                reject('Please give both productName and category in the function addProduct.');
            
            Mongoclient.connect(connectionUrl,{useUnifiedTopology:true},(error,client)=>{

                //if connection fail's then return a error message
                if(error)
                    {
                        reject("Cannot connect to the Mongo DB");
                    }

                //creating a database for our data
                let db=client.db(databaseName);    

                db.collection('Products').find({"_id":ObjectID(id)}).toArray((error,response)=>{
                    if(response.length==0){
                        reject({"error":"the given product is not available"})
                    }
                })

                if(newName && newPrice)
                {
                    db.collection('Products').update({_id:ObjectID(id)},{name:newName,price:newPrice},(err,response)=>{

                        if(err)
                            reject({"error":"Not able to update the specific product"})
                        else
                            resolve({"Success":`Product details are updated successfully.`});
                    })

                }
                else if(newName)
                {
                    db.collection('Products').update({_id:ObjectID(id)},{$set:{name:newName}},(err,response)=>{

                        if(err)
                            reject({"error":"Not able to update the specific product"})
                        else
                            resolve({"Success":`Product details are updated successfully.`});
                    })

                }
                else if(newPrice)
                {
                    db.collection('Products').update({_id:ObjectID(id)},{$set:{price:newPrice}},(err,response)=>{

                        if(err)
                            reject({"error":"Not able to update the specific product"})
                        else
                            resolve({"Success":`Product details are updated successfully.`});
                    })

                }
        })
    })
}

module.exports=updateProduct;
