const mongodb=require('mongodb');
const Mongoclient=mongodb.MongoClient;

//connection parameter
const connectionUrl='mongodb+srv://client:client1234@cluster0-qlkny.mongodb.net/test?retryWrites=true&w=majority';
const databaseName='Heady';


function getAllCategory(){
return new Promise((resolve,reject)=>{
       Mongoclient.connect(connectionUrl,{useUnifiedTopology:true},(error,client)=>{
        if(error)
            reject({"Error":"Cannot connect to the Mongo DB"});
        
        let db=client.db(databaseName); 

        db.collection('Products').find().toArray((error,response)=>{
            if(error)
                reject('Not able to retrieve the ata from mongodb');

            resolve(response);
       });
       
    })
})
}

module.exports=getAllCategory;
