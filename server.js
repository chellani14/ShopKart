const express = require('express')
const {
  db,
  Products,
  Vendors,Cart
} = require('./db')

const app = express()

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.use('/vendorsadd/productsadd',
  express.static(__dirname + '/public')
)
app.use('/vendorsadd',
  express.static(__dirname + '/vendorsfol')
)
app.use('/',
  express.static(__dirname + '/shoppingPage')
)
app.use('/cart',
  express.static(__dirname + '/Cart')
)
app.get('/shopping_Cart', async (req, res) => {

  const allProducts = await Products.findAll({
    include:Vendors
  })
  
  res.send(allProducts)
})

app.post('/shopping_Cart', async (req, res) => {

  try {
   
   
    const result = await Products.create({
      name: req.body.name,
      price: parseInt(req.body.price),
      Quantity:parseInt(req.body.Quantity)
      
    })
    const ven= await Vendors.findOne({
      where:{
        id:parseInt(req.body.vendorId)
      }
    })
    console.log(result)
    ven.addProducts(result)
    res.send({ success: true })
  } catch (e) {
    res.send({ success: false, err: e.message })
  }


})
app.delete('/shopping_Cart/:id', async (req, res) => {
 

 const delpro=await Products.destroy(
    {

      where: {
        id: req.params.id
      }

    })
})



//vendors



app.get('/vendorsPlace', async (req, res) => {

  const allvendors = await Vendors.findAll()
  res.send(allvendors)
})

app.post('/vendorsPlace', async (req, res) => {

  try {

    const result = await Vendors.create({
      name: req.body.name,
      contact_Number: parseInt(req.body.contact_Number)
    })
    res.send({ success: true })
  } catch (e) {
    console.log("exception "+e.message)
    res.send({ success: false, err: e.message })
  }


})
app.delete('/vendorsPlace/:id', async (req, res) => {
 
 const delpro=await Vendors.destroy(
    {
      where: {
        id: req.params.id
      }
    })

})

//cart


app.get('/cartPlace', async (req, res) => {

  const cartItems = await Cart.findAll({
    include:[Vendors,Products]
  })
    

  res.send(cartItems)
})


app.post('/cartPlace/:id', async (req, res) => {

  try {

    const Product = await Products.findOne({
      where:{
        id:parseInt((req.params.id))
      }
     
    })
       
      const result = await Cart.create({
        name: Product.name,
        price: parseInt(Product.price),
        Quantity:parseInt(Product.Quantity),
        ProductId:Product.id
      })
    res.send({ success: true })
    
  } catch (e) {
    console.log("exception "+e.message)
    res.send({ success: false, err: e.message })
  }


})

app.delete('/cartPlace/:id', async (req, res) => {
 
  const delpro=await Cart.destroy(
     {
       where: {
         id: req.params.id
       }
     })
 
 })
 
// Cart




db.sync()
  .then(() => {
    app.listen(8989)
  })
