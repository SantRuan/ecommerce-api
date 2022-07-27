const mysql = require('../db/connection');
const QUERIES = require('../util/queries');
const query = require('../util/queries')
const path = require('path')
exports.createProduct = async (req, res, next) => {
  try {
    const product = {
      name: req.body.name,
      price: req.body.price,
      productImage: req.file.path,
    };
    console.log(product.productImage)
    await mysql.getConnection((err, conn) => {
      if(err){
        return err
      }
        conn.query(query.PRODUCT.insertingProduct,[product.name, product.price, product.productImage])
        
        mysql.releaseConnection(conn);

        return res.status(200).send({
          message : 'Produc Created',
          product : product
        })
       
      }
    )}catch (err) {
    console.log(e);
  }

  console.log(req.user);
};

exports.getProduct = async (req, res, next) =>{
  const id = req.body.id 

  try{
    await mysql.getConnection((err, conn)=>{
      if(err){
        return err
      }
      conn.query(QUERIES.PRODUCT.findProductById, id, (err, results, fields)=>{
        if(err){
          return err
        }else{
         return res.status(200).json({
          message: "The product was found",
          product: results
          })
        }

      })
      mysql.releaseConnection(conn);
    })
  }catch(error){
    return error
  }

}

exports.getImage = async (req, res, next)=>{
  const id = req.body.id 
  try{
    await mysql.getConnection((err, conn)=>{
      if(err){
        return err
      }
      conn.query(QUERIES.PRODUCT.findProductById, id, (err, results, fields)=>{
        if(err){
          return err
        }else{
        var filename = path.join(results[0].productImage)
         return res.status(200).sendFile(__dirname.split('controllers')[0] + filename)
        }

      })
    })
    mysql.releaseConnection(conn);
  }catch(error){
    return error
  }


}

exports.modifyProduct = async (req, res, next) => {
  const id = req.body.id
  const params = {
    name : req.body.name,
    price : req.body.price 
  } 
  try{
    await mysql.getConnection((err, conn)=>{
      if(err){
        return err
      }
      conn.query(QUERIES.PRODUCT.modifyingProduct, [params.name, params.price, id], (err, results, fields)=>{
        if(err){
          return err
        }else{
        console.log("acessou")
        return res.status(200).send({
          message: "Product Updated Successfully",
          results
        })
        }

      })
    })
    mysql.releaseConnection(conn);
  }catch(error){
    return error
  }
 
};

exports.deleteProduct = (req, res, next) => {
  console.log("Deletou um produto");
};

exports.allProducts = (req, res, next) => {
  console.log("Visualizou todos os produtos");
};
