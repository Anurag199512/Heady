const mongodb=require('mongodb');
const Mongoclient=mongodb.MongoClient;

//connection parameter
const connectionUrl='mongodb+srv://client:client1234@cluster0-qlkny.mongodb.net/test?retryWrites=true&w=majority';
const databaseName='Heady';


function getDataByCategory(category_name){
    Mongoclient.connect(connectionUrl,{useUnifiedTopology:true},(error,client)=>{
        if(error)
            return  console.log("Cannot connect to the Mongo DB");
        
        let db=client.db(databaseName); 

        db.collection('Products').find({category:category_name}).toArray((error,response)=>{
            if(error)
                return console.log('Not able to retrieve the ata from mongodb');
            //console.log(response);
            console.log('T',response);

            for(let ob of Object.entries(response))
                {
                    //console.log(response[ob])
                    //console.log(ob[1].Object.keys(ob[1]))
                    console.log(Object.keys(ob[1])[1],ob[1][Object.keys(ob[1])[1]])
                }

        });
        
    })
}

module.exports=getDataByCategory;
