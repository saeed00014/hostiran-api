const { db } = require("../connect.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  const jwtKey = '5h9d608098b78d61cf5654965dab8b53632bf831dc6b43f29289411376ac12j78'
  const jwtExpirySeconds = 300
  const email = req.body.email
  const token = jwt.sign({ email }, jwtKey, {
    algorithm: "HS256"
  })

  const command = "INSERT INTO `users`(`firstName`, `lastName`, `email`, `username`, `days`, `mounths`, `years`, `gender`, `password`, `remember_token`) VALUES (?)"
  const values = [
    req.body.firstName,
    req.body.lastName, 
    req.body.email, 
    req.body.username, 
    req.body.days, 
    req.body.mounths, 
    req.body.years, 
    req.body.gender, 
    hashedPassword,
    token
  ]
  
  const signedUpUserEmail = "SELECT * FROM users where email = (?) "
  const signedUpUserUsername = "SELECT * FROM users where username = (?) "

  db.query(signedUpUserUsername, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    let ru = ''
    if(data[0]) {
      ru = 'repeated username'
    }
    db.query(signedUpUserEmail, [req.body.email], (err, data) => {
      if (err) return res.status(500).json(err);
      if(data[0] && ru) {
        return res.status(200).json({"re":'repeated email', "ru": ru})
      }
      if(data[0]) {
        return res.status(200).json({"re":'repeated email'})
      }
      if(ru) {
        return res.status(200).json({"ru": ru})
      }
      db.query(command, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        db.query(signedUpUserEmail, [req.body.email], (err, data) => {
          const { password, remember_token, ...others } = data[0]
          return res.status(200).json({"user": others, "token": remember_token});
        })
      }) 
    })
  })
}

const login = (req, res) => {
  const command = "SELECT * FROM users WHERE email = ?"
  const command2 = "UPDATE users SET `remember_token` = ? WHERE email = ?"
  const value = [req.body.email.toLowerCase()]
  const jwtKey = '5h9d608098b78d61cf5654965dab8b53632bf831dc6b43f29289411376ac12j78'
  const jwtExpirySeconds = 300
  const email = req.body.email
	const token = jwt.sign({ email }, jwtKey, {
    algorithm: "HS256"
	})
  
  db.query(command, [value], (err, data) => {
    if(err) return res.status(500).json(err);
    if(data[0]) {
      const checkPassword = bcrypt.compareSync(
        req.body.password,
        data[0].password
        )
        if(!checkPassword) {
          return res.status(400).json("Wrong password or username!");
        }
      }
      
      db.query(command2, [token, email], (err, data) => {
        db.query(command, [value], (err, data) => {
          if(err) return res.status(500).json(err);
          if(!data[0]) return res.status(500).json(err);
          const {password, remember_token, ...others} = data[0]
          return res.status(200).json({"user": others, "token": remember_token});
        })
      })
    })
  }
  
const logout = (req, res) => {
  const command = "UPDATE users SET `remember_token` = '' WHERE email = ?"
  db.query(command, [req.params[0]], (err, data) => {
    if(err) return res.status(500).json(err);
    if(data) return res.status(200).json('signed out');
  })
}

const validateToken = (req, res) => {
  const command = "SELECT * FROM users WHERE remember_token = ?"
  const value = [req.body.accessToken]
  db.query(command, [value], (err, data) => {
    if(err) return res.status(500).json(err);
    if(data[0]) {
      const {password, remember_token, ...others} = data[0]
      if(remember_token !== '' , others !== '') {
        return res.status(200).json({"user": others, "token": remember_token});
      }
    }
    if(!data[0]) return res.status(200).json('wrong username or password') 
  })
}

module.exports = {signup, login, logout, validateToken}