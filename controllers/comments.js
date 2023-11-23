const { db } = require("../connect.js");

const getComments = (req, res) => {
  const command = "SELECT * FROM comments WHERE post_id = (?)"
  const values = [req.params[0]]
  console.log(values)
  
  db.query(command, [values], (err, data) => {
    if(err) res.status(500).json('failed');
    return res.status(200).json(data);
  })
}

const getCommentsQ = (req, res) => {
  const command = "SELECT * FROM comments WHERE post_id = (?)"
  const values = [req.params[0]]
  
  db.query(command, [values], (err, data) => {
    if(err) res.status(500).json('failed');
    return res.status(200).json(data.length);
  })
}
const sendComment = (req, res) => {
  const command = "INSERT INTO `comments`(`text`, `post_id`, `user_id`) VALUES (?)"
  const command2 = "select * from comments where id=(SELECT LAST_INSERT_ID())"
  const values = [
    req.body.text,
    req.body.post_id,
    req.body.user_id
  ]

  db.query(command, [values], (err, data) => {
    db.query(command2, (err, data) => {
      if(err) res.status(500).json('failed to post comment');
      return res.status(200).json(data);
    })
  })
}
const deleteComment = (req, res) => {

}

module.exports = {
  getComments,
  getCommentsQ,
  sendComment,
  deleteComment
}