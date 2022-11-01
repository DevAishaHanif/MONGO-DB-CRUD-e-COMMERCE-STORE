import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';





const productSchema = new mongoose.Schema({
    productName: String,
    productPrice: Number,
    currencyCode: String,
    numberOfSale: Number,
    rating: Number,
    isFreeShipping: Boolean,
    shopName: String,
    createdOn: {type: Date, default: Date.now },
});

const productModel  = mongoose.model('Product', productSchema);

let app = express();
app.use(express.json());
app.use(cors());

/////////////////////////  GET API ////////////////////////////////

app.get("/products" , async (req, res) =>{

    let result = await productModel
    .find({})
    .exec()
    .catch(e => {
      console.log("error in db: ", e);
      res.status(500).send({ message: "error in geeting all products"});
      return;
    })
    res.send({
      message: "all product success ",
      data : result
    });
});































////////////////////////// POST API //////////////////////////////

app.post("/product", async (req, res) => {

    let body = req.body;

    if (
        !body.productName
        || !body.productPrice
        || !body.currencyCode
        || !body.numberOfSale
        || !body.rating
        || !body.isFreeShipping
        || !body.shopName
    ) {
        res.status(400).send({
            message: `required field missing, all fields are required :
            productName
            productPrice
            currencyCode
            numberOfSale
            rating
            isFreeShipping
            shopName`
        })
        return;
    }
    
    let result = await productModel.create({
        productName: body.productName,
        productPrice:body. productPrice,
        currencyCode: body.currencyCode,
        numberOfSale: body.numberOfSale,
        rating: body.rating,
        isFreeShipping:body.isFreeShipping, 
        shopName: body.shopName,
    }).catch(e => {
          console.log("error in db:" , e);
          res.status(500).send({ message: "db error in saving products" });
    })

    console.log("result:",  result);
      res.send({ message: "product is added in database" });


});





































const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })




  ///////////////////////////////////////////////////////////////////////////
let dbURI = ('mongodb+srv://abc:abc@cluster0.zauilio.mongodb.net/socialMediaBase?retryWrites=true&w=majority');
mongoose.connect(dbURI);

// //////////////  MONGODB CONNECTED DISCONNECTED EVENTS /////////////////// 
mongoose.connection.on('connected', function() {
  console.log("MONGOOSE is connected");
});

mongoose.connection.on('disconnected', function() {
  console.log("MONGOOSE is disconnected");
});


mongoose.connection.on('error', function(err) {
  console.log("MONGOOSE connection error:", err);
  process.exit(1);
});

process.on('SIGINT', function() {
  console.log("APP is terminating");
  mongoose.connection.close(function() {
    console.log('MONGOOSE default connection closed');
    process.exit(0);
  });
});

//////////////////// MONGODB CONNECTED DISCONNECTED EVENTS ///////////////