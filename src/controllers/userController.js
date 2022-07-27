const mysql = require("../db/connection");
const bcrypt = require("bcrypt");
const QUERIES = require("../util/queries");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.userCreate = async (req, res, next) => {
  try {
    const user = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, parseInt(process.env.SALT)),
    };
    const query = QUERIES.USER.createUserQuery;
    const result = await mysql.getConnection((err, conn) => {
      if (err) {
        console.log(err);
        return;
      } else {
        conn.query(query, [user.email, user.password]);
        mysql.releaseConnection(conn);
      }
    });
    res.status(200).json({
      message: "User Created",
      email: `${user.email}`,
      password: `${user.password}`,
      result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "ERROR",
      error: error,
    });
  }
};

exports.LogIn = async (req, res, next) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
     await mysql.getConnection((err, conn) => {
      if (err) {
        console.log(err);
        return;
      } else {
        const query = QUERIES.USER.findUserForComparePassword;
        conn.query(query, [user.email], (err, results, fields) => {
          if (err) {
            return err;
          } else {
            console.log(user.password, results[0].password);
            const comparison = bcrypt.compareSync(
              user.password,
              results[0].password
            );
            console.log(comparison)
            if (comparison) {
              const token = jwt.sign(
                {
                  userId: results[0].userId,
                  email: results[0].email,
                },
                process.env.JWT_KEY,
                {
                  expiresIn: "1h",
                }
              );
              return res.status(200).send({
                message: 'Autenticado com sucesso',
                token: token
            })
            }
          }
         ;
        });
        mysql.releaseConnection(conn);
      }

    });
    
  } catch (err) {
    console.log(err);
  }
};
