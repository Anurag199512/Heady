const mongodb=require('mongodb');
const uuid=require('uuid');
const Mongoclient=mongodb.MongoClient;

//connection parameter
const connectionUrl='mongodb+srv://client:client1234@cluster0-qlkny.mongodb.net/test?retryWrites=true&w=majority';
const databaseName='Heady';


async function addChildCategory(categoryName,subCategoryName,child_category){
 
  return new Promise((resolve,reject)=>{
        Mongoclient.connect(connectionUrl,{useUnifiedTopology:true},(error,client)=>{
            
            //if connection fail's then return a error message
            if(error)
                {
                    reject({"error":"Cannot connect to the Mongo DB"});
                }

            //connecting to the database
            let db=client.db(databaseName);    
           
            db.collection('Categories').find({[categoryName]:{$exists:true}}).toArray((error,response)=>{
             
                if(response.length>0)
                {
                        if(!response[0][categoryName][subCategoryName]){
                            db.collection('Categories').insertOne({[categoryName]:{[subCategoryName]:{id:uuid.v4(),child_categories:[child_category]}}});

                            resolve({"Success":`New category ${categoryName} added with subcategory ${subCategoryName}`});
                        }
                        else
                        {
                            response[0][categoryName][subCategoryName].child_categories.push(child_category);
                            
                            db.collection('Categories').update({[categoryName]:{$exists:true}},
                                {[categoryName]:response[0][categoryName]},
                                (err,resp)=>{

                                if(err)
                                    reject({"error":"Not able to add sub sub category in the DB"})
                                else
                                    resolve({"Success":`New child category ${child_category} added to sub category ${subCategoryName}`});
                            
                            })                    
                        }
                }
                else{
                    reject({"error":"Parent category is not present.Add that category first"})
                }
            })
        })
    })//end of promise
}


module.exports= addChildCategory;
