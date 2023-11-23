const { db } = require("../connect.js");

const getFriends = (req, res) => {
  const command = "SELECT * FROM friends WHERE `user_id` = ?"
  
  db.query(command, [req.params[0]], (err, data) => {
    if(err) res.status(500).json('failed');
    return res.status(200).json(data);
  })
}

const getFollows = (req, res) => {
  const command = "SELECT * FROM friends "
  const user_id = req.params[0]

  db.query(command, (err, data) => {
    if(err) res.status(500).json('failed');
    const followers = []
    const followings = []
    data.map((friend) => {
      if(friend.user_id == user_id) {
        followers.push(friend)
      }
      if(friend.friend_id == user_id) {
        followings.push(friend)
      }
    })
    return res.status(200).json({"followers": followers.length, "followings": followings.length});
  })
}

const getFriend = (req, res) => {
  const command = "SELECT * FROM friends WHERE `user_id` = ? AND `friend_id` = ?"
  const user_id = req.params[0].split('/')[0].split('=')[0]
  const friend_id = req.params[0].split('/')[0].split('=')[1]
  db.query(command, [user_id, friend_id], (err, data) => {
    if(err) res.status(500).json('failed');
    return res.status(200).json(data);
  })
}
const sendFriend = (req, res) => {
  const command = "INSERT INTO friends(`user_id`, `friend_id`) values (?)"
  const command2 = "SELECT * FROM friends WHERE `user_id` = ? AND `friend_id` = ?"
  const values = [
    req.body.user_id,
    req.body.friend_id
  ]

  db.query(command, [values], (err, data) => {
    if(err) res.status(500).json('failed');
    db.query(command2, [req.body.user_id, req.body.friend_id], (err, data) => {
      return res.status(200).json(data);
    })
  })
}
const deleteFriend = (req, res) => {
  const command = "DELETE FROM friends WHERE friend_id = ?"
  
  db.query(command, [req.params[0]], (err, data) => {
    if(err) res.status(500).json('failed');
    return res.status(200).json(data);
  })
}

module.exports = {
  getFriends,
  getFollows,
  getFriend,
  sendFriend,
  deleteFriend
}