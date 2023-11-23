const { db } = require("../connect.js");

const getPosts = (req, res) => {
  const command = "SELECT * FROM posts"

  db.query(command, (err, data) => {
    if(err) res.status(500).json("failed to get posts")
    res.status(200).json(data)
  })
}

const getPost = (req, res) => {
  const command = "SELECT * FROM posts WHERE user_id = ?"

  db.query(command, [[req.params[0]]], (err, data) => {
    if(err) res.status(500).json("failed to get posts")
    res.status(200).json(data)
  })
}

const sendPost = (req, res) => {
  const command = "INSERT INTO posts (`user_id`, `text`, `media`, `likes`) value (?)"
  const command2 = "select * from posts where id=(SELECT LAST_INSERT_ID())"

  const values = [
    req.body.user_id,
    req.body.text,
    req.body.imageAdrress,
    req.body.like
  ]

  db.query(command, [values], (err, data) => {
    if(err) res.status(500).json("failed to post post")
    db.query(command2, (err, data) => {
      res.status(200).json(data)
    })
  })
}

const deletePost = (req, res) => {
  const command = "DELETE FROM posts WHERE id = (?)"
  const value = [req.params[0]]

  db.query(command, [value], (err, data) => {
    if(err) res.status(500).json("failed to post post")
    res.status(200).json(data)
  })
}

module.exports = {
  getPosts,
  getPost,
  sendPost,
  deletePost
}