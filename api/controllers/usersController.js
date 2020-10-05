const config = require('../config')
const User = require('../models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')


// Login
module.exports.login = [

  function(req, res) {

    // validate email and password are correct
    User.findOne({email: req.body.email}, function(err, user){
        if(err) {
            return res.status(500).json({
                message: 'Ошибка входа, повторите позже',
                error: err
            });
        }

        if (user === null) {
          return res.status(500).json({
            message: 'Пользователь с такой почтой не зарегистрирован'
          });
        }

        // compare submitted password with password inside db
        return bcrypt.compare(req.body.password, user.password, function(err, isMatched) {
          if(isMatched===true){
            if (!user.email.includes('@mail.ch')) {
              return res.json({
                user: {
                  _id: user._id,
                  email: user.email,
                  full_name: user.full_name
                },
                token: jwt.sign({_id: user._id, email: user.email, full_name: user.full_name}, config.authSecret) // generate JWT token here
              });
            }
            else {
              return res.status(500).json({
                message: 'Почта @mail.ch запрещена к использованию'
              });
            }
          }
          else{
            return res.status(500).json({
              message: 'Введен неверный логин или пароль'
            });
          }
        });
    });
  }
]

// Get User
module.exports.user = function(req, res) {
  var token = req.headers.authorization
  if (token) {
    // verifies secret and checks if the token is expired
    jwt.verify(token.replace(/^Bearer\s/, ''), config.authSecret, function(err, decoded) {
      if (err) {
        return res.status(401).json({message: 'unauthorized'})
      } else {
        return res.json({ user: decoded })
      }
    });
  }
  else{
    return res.status(401).json({message: 'unauthorized'})
  }
}



