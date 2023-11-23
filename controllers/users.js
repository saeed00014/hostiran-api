const { db } = require("../connect.js");

const getUsers = (req, res) => {
  const command = "SELECT * FROM users"
  db.query(command, (err, data) => {
    return res.status(200).json(data);
  })
}

const getOneUser = (req, res) => {
  const command = "SELECT * FROM users WHERE id = ?"
  const values = [
    req.params[0]
  ]
  db.query(command, [values], (err, data) => {
    return res.status(200).json(data);
  })
}

const getFillterUser = (req, res) => {
  const command = "SELECT * FROM users"
  db.query(command, (err, data) => {
    const result = []
    if(data) {
      data.map((user) => {
        if(user.username.includes(req.params[0])) {
          result.push(user)
        }
      })
    }
    return res.status(200).json(result);
  })
}

const putAvatarUser = (req, res) => {
  const command = "UPDATE users SET `avatar` = ? WHERE `id` = ?"

  db.query(command, [req.body.image, req.params[0]], (err, data) => {
    if(err) res.status(500).json('failed');
    res.status(200).json('avatar added');
  })
}

module.exports = {
  getUsers,
  getOneUser,
  getFillterUser,
  putAvatarUser,
}