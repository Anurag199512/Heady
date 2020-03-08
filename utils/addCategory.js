const mongodb=require('mongodb');
const uuid=require('uuid');
const Mongoclient=mongodb.MongoClient;

//connection parameter
const connectionUrl='mongodb+srv://client:client1234@cluster0-qlkny.mongodb.net/test?retryWrites=true&w=majority';
const databaseName='Heady';


async function addCategory(categoryName,subCategoryName=''){
 
  return new Promise((resolve,reject)=>{
    if(subCategoryName.length==0){
        Mongoclient.connect(connectionUrl,{useUnifiedTopology:true},(error,client)=>{
            

            //if connection fail's then return a error message
            if(error)
                {
                    
                    reject({"error":"Cannot connect to the Mongo DB"});
                }

            //connecting to the database
            let db=client.db(databaseName);    
           
            db.collection('Categories').insertOne({[categoryName]:{}})

            resolve({"Success":`Category ${categoryName} added as main category`});

        })
    }
    else{
        Mongoclient.connect(connectionUrl,{useUnifiedTopology:true},(error,client)=>{
            
            //if connection fail's then return a error message
            if(error)
                {
                    reject({"error":"Cannot connect to the Mongo DB"});
                }

            //connecting to the database
            let db=client.db(databaseName);    
           
            db.collection('Categories').find({[categoryName]:{$exists:true}}).toArray((error,response)=>{
                
                //checking if the product with the defined category is already present 
                let data={};
            
                if(response.length==0){
                    db.collection('Categories').insertOne({[categoryName]:{[subCategoryName]:{id:uuid.v4(),child_categories:[]}}});
                    resolve({"Success":`New category ${categoryName} added with subcategory ${subCategoryName}`});
                }
                else
                {
                   response[0][categoryName][subCategoryName]={id:uuid.v4(),child_categories:[]};
 
                    db.collection('Categories').update({[categoryName]:{$exists:true}},
                        {[categoryName]:response[0][categoryName]},
                        (err,resp)=>{

                        if(err)
                            reject({"error":"Not able to add sub sub category in the DB"})
                        else
                            resolve({"Success":`New subcategory ${subCategoryName} added to category ${categoryName}`});
                    
                    })                    
                }
            })
        })
    }
})
}


module.exports={
    addCategory:addCategory};
