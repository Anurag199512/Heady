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

        db.collection('Categories').find().toArray((error,response)=>{
            if(error)
                return console.log('Not able to retrieve the ata from mongodb');

            let data=[]
            for(let ob of Object.entries(response))
                {
                    console.log(Object.keys(ob[1])[1],ob[1][Object.keys(ob[1])[1]])
                    data.push({
                        "category_name":Object.keys(ob[1])[1],
                        "subcategory_name":ob[1][Object.keys(ob[1])[1]]
                        
                    })

                }
            resolve(data);
       });
       
    })
})
}

module.exports=getAllCategory;
