const mongodb=require('mongodb');
const uuid=require('uuid');
const Mongoclient=mongodb.MongoClient;

//connection parameter
const connectionUrl='mongodb+srv://client:client1234@cluster0-qlkny.mongodb.net/test?retryWrites=true&w=majority';
const databaseName='Heady';


async function addCategory(categoryName,subCategoryName=''){
 
  
    if(subCategoryName.length==0){
        Mongoclient.connect(connectionUrl,{useUnifiedTopology:true},(error,client)=>{
            

            //if connection failes then return a error message
            if(error)
                {
                    //console.log(error)
                    return console.log("Cannot connect to the Mongo DB");
                }

            //connecting to the database
            let db=client.db(databaseName);    
           
            db.collection('Categories').insertOne({[categoryName]:{}})

            console.log('Category added');

        })
    }
    else{
        Mongoclient.connect(connectionUrl,{useUnifiedTopology:true},(error,client)=>{
            
            //if connection failes then return a error message
            if(error)
                {
                    //return console.log(error)
                    console.log("Cannot connect to the Mongo DB");
                }

            //connecting to the database
            let db=client.db(databaseName);    
           
            db.collection('Categories').find({[categoryName]:{$exists:true}}).toArray((error,response)=>{
                
                //checking if the product with the defined category is already present 
                let data;
            
                if(response.length==0){
                    db.collection('Categories').insertOne({[categoryName]:{id:uuid.v4(),[subCategoryName]:[]}});
                    console.log(`New category ${categoryName} added with subcategory ${subCategoryName}`);
                }
                else
                {
                    console.log('R',response)
                    for(let a in response[0][categoryName])
                    {
                        //console.log('t',response[0][categoryName][a])
                        data=response[0][categoryName][a];
                    }

                    data.push(subCategoryName);
                    
                    db.collection('Categories').update({[categoryName]:{$exists:true}},
                        {[categoryName]:{[subCategoryName]:data}},
                        (err,resp)=>{

                        if(err)
                            console.log('Not able to update',err)
                        else
                            console.log(`New subcategory ${subCategoryName} added to category ${categoryName}`);
                    
                    })                    
                }
            })
        })
    }

}


module.exports={
    addCategory:addCategory};
