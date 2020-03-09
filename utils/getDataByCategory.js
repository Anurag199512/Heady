const mongodb=require('mongodb');
const Mongoclient=mongodb.MongoClient;

//connection parameter
const connectionUrl='mongodb+srv://client:client1234@cluster0-qlkny.mongodb.net/test?retryWrites=true&w=majority';
const databaseName='Heady';


function getDataByCategory(category_name){

    return new Promise((resolve,reject)=>{

    Mongoclient.connect(connectionUrl,{useUnifiedTopology:true},(error,client)=>{
        if(error)
            reject({"Error":"Cannot connect to the Mongo DB"});
        
        let db=client.db(databaseName); 
        let data={
            "products":[]
        };

        db.collection('Products').find({category:category_name}).toArray((error,response)=>{
             
            if(error)
                reject({"Error":"Not able to retrieve the ata from mongodb"});
                
            for(let ob of Object.entries(response))
                {
                    //console.log(Object.keys(ob[1])[1],ob[1][Object.keys(ob[1])[1]]);
                    data.products.push(ob[1][Object.keys(ob[1])[1]]);

                }
            resolve(data);
            
            });
        })
        
    })
}

module.exports=getDataByCategory;
