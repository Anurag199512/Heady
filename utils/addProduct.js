const mongodb=require('mongodb');
const Mongoclient=mongodb.MongoClient;

//connection parameter
const connectionUrl='mongodb+srv://client:client1234@cluster0-qlkny.mongodb.net/test?retryWrites=true&w=majority';
const databaseName='Heady';

function addProduct(productName,...category){
    
if(productName=='' && category.length==0)
            return console.log('\nPlease give both productName and category in the function addProduct.');
        else if(productName=='')
            return console.log('\nPlease give value for  productName in the function addProduct.');
        else if(category.length==0)
            return console.log('\nPlease give value for  category name for the given product');

        Mongoclient.connect(connectionUrl,{useUnifiedTopology:true},(error,client)=>{

            //if connection failes then return a error message
            if(error)
                {
                    return console.log("Cannot connect to the Mongo DB");
                }

            //creating a database for our data
            let db=client.db(databaseName);    
            
            db.collection('Products').find({name:[productName],category:[category]}).toArray((error,response)=>{
                
                //checking if the product with the defined category is already present 
                if(response.length==0){
                    db.collection('Products').insertOne({
                        'name':productName,
                        'category':category
                    });

                    console.log(`Product added with value name:${productName} and category:${category}`);
                }
                else
                {
                    console.log('Product with these values already present');
                    
                }
            })
           
        db.collection('Categories').find({name:category}).toArray((error,response)=>{
            
            //checking if the category do not exist in the list then only insert it
            if(response.length==0){
                db.collection('Categories').insertOne({[category]:{}})
                //db.collection('category').insertOne({'name':category});
            }
        })
         
    })
}

module.exports=addProduct;
