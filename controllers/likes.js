const { db } = require("../connect.js");

const getPostLikes = (req, res) => {
  const command = "SELECT * FROM likes WHERE `post_id` = ?"
  const user_id = req.params[0].split('/')[0].split('=')[0]
  const post_id = req.params[0].split('/')[0].split('=')[1]

  db.query(command, [post_id], (err, data) => {
    if(err) res.status(500).json('failed');
    const isMyLike =(data.find((like) => like.user_id == user_id) ? 1 : 0)
    return res.status(200).json({"quantity": data.length, "isMyLike": isMyLike});
  })
}

const sendLike = (req, res) => {
  const command = "INSERT INTO likes (`post_id`, `user_id`) values (?)"
  const values = [
    req.body.post_id,
    req.body.user_id
  ]
  
  db.query(command, [values], (err, data) => {
    req.body.targetUser_id
    return res.status(200).json('liked');
  })
}

const sendDisLike = (req, res) => {
  const command = "DELETE FROM likes WHERE `user_id` = ? AND `post_id` = ?"
  
  const user_id = req.params[0].split('/')[0].split('=')[0]
  const post_id = req.params[0].split('/')[0].split('=')[1]
  
  db.query(command, [user_id, post_id], (err, data) => {
    if(err) res.status(500).json('failed');
    return res.status(200).json('disliked');
  })
}

module.exports = {
  getPostLikes,
  sendLike,
  sendDisLike
}