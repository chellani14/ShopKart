const Sequelize = require('sequelize')
const Op = Sequelize.Op

const db = new Sequelize({
  dialect: 'sqlite', // mysql, postgres, mssql
  storage: __dirname + '/shopping_cart.db'
  // database : '',
  // host: 'localhost',
  // username: '',
  // password: '',
  // port: ''
})

const Products = db.define('Products', {
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    primaryKey:true
    },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Quantity:{
      type:Sequelize.STRING,
      allowNull:false
  },
  price: {
    type: Sequelize.INTEGER,
    
  },

})
const Vendors=db.define('Vendors',{
  id:{
  type:Sequelize.INTEGER,
  autoIncrement:true,
  primaryKey:true
  },
  name:{
    type:Sequelize.STRING,
    allowNull:false
  },
  contact_Number:{
    type:Sequelize.INTEGER,
    allowNull:false
  }
  
})
const Cart=db.define('Cart',{
  
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
 
  price: {
    type: Sequelize.INTEGER,
    
  },

  Quantity:{
    type:Sequelize.INTEGER
   
  }
  
})
Vendors.hasMany(Products, {onDelete:'cascade'})
Products.belongsTo(Vendors)
Products.hasMany(Cart,{onDelete:'cascade'})
Cart.belongsTo(Products)


Cart.belongsTo(Vendors)
Vendors.hasMany(Cart)



exports=module.exports = {

  db, Products,Vendors,Cart
}

