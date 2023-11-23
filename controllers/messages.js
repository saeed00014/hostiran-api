const { db } = require("../connect.js");

const getMessages = (req, res) => {
  const commandGetAllChatMessages = "SELECT * FROM messages WHERE chat_id = ?"
  const commandFindChat = "SELECT * FROM `chats` WHERE user_id = ?  AND targetUser_id = ?"
  const commandFindChat2 = "SELECT * FROM `chats` WHERE targetUser_id = ?  AND user_id = ?"
  const user_id = req.params[0].split('/')[0].split('=')[0]
  const targetUser_id = req.params[0].split('/')[0].split('=')[1]
  
  db.query(commandFindChat, [[user_id], [targetUser_id]], (err, data) => {
    if(err) res.status(500).json("failed to get messages")
    const chat1 = data
    db.query(commandFindChat2, [[user_id], [targetUser_id]], (err, data) => {
    if(err) res.status(500).json("failed to get messages")
    console.log(chat1, data)
     if(chat1[0] || data[0]) {
       if(data[0]) {
         const chat_id = data[0].id
         console.log(targetUser_id, user_id)
         db.query(commandGetAllChatMessages, [[chat_id]], (err, data) => {
           if(err) res.status(500).json("failed to get messages")
           res.status(200).json(data)
         })
       }
       if(chat1[0]) {
         const chat_id = chat1[0].id
         console.log(targetUser_id, user_id)
         db.query(commandGetAllChatMessages, [[chat_id]], (err, data) => {
           if(err) res.status(500).json("failed to get messages")
           res.status(200).json(data)
         })
       }
     }
    })
  })
}

const sendMessage = (req, res) => {
  const commandFindChat = "SELECT * FROM `chats` WHERE user_id = ?  AND targetUser_id = ?"
  const commandFindChat2 = "SELECT * FROM `chats` WHERE targetUser_id = ?  AND user_id = ?"
  const commandMakeChat = "INSERT INTO `chats`( `user_id`, `targetUser_id` ) VALUES (?)"
  const commandMakeMessage = "INSERT INTO `messages`( `user_id`, `chat_id`, `text` ) VALUES (?)"
  const commandGetAllChatMessages = "SELECT * FROM messages WHERE chat_id = ?"
  const valuesFindChat = [
    req.body.user_id,
    req.body.targetUser_id
  ]

  db.query(commandFindChat, [[req.body.user_id], [req.body.targetUser_id]], (err, data) => {
    if(err) res.status(500).json("failed to get messages")
    const chat1 = data
    db.query(commandFindChat2, [[req.body.user_id], [req.body.targetUser_id]], (err, data) => {
    if(err) res.status(500).json("failed to get messages")
    console.log(chat1, data)
     if(!chat1[0] && !data[0]) {
       if(!data[0]) {
         db.query(commandMakeChat, [valuesFindChat], (err, data) => {
           if(err) res.status(500).json('failed');
           db.query(commandFindChat, [req.body.user_id, req.body.targetUser_id, req.body.user_id, req.body.targetUser_id], (err, data) => {
             if(err) res.status(500).json('failed');
             if(data) {
               const chat_id = data[0].id
               db.query(commandMakeMessage, [[req.body.user_id, chat_id, req.body.text]], (err, data) => {
               if(err) res.status(500).json('failed');
               db.query(commandGetAllChatMessages, [[chat_id]], (err, data) => {
                 if(err) res.status(500).json('failed');
                 res.status(200).json(data[0]);
               })
             })
           }
         })
       })}
     }
     
     if(chat1[0] || data[0]) {
      if(chat1[0]) {
        const chat_id = chat1[0].id
        db.query(commandMakeMessage, [[req.body.user_id, chat_id, req.body.text]], (err, data) => {
          if(err) res.status(500).json('failed');
            db.query(commandGetAllChatMessages, [[chat_id]], (err, data) => {
              if(err) res.status(500).json('failed');
              res.status(200).json(data[data.length - 1]);
            })
        })
      }
      if(data[0]) {
        const chat_id = data[0].id
        db.query(commandMakeMessage, [[req.body.user_id, chat_id, req.body.text]], (err, data) => {
          if(err) res.status(500).json('failed');
            db.query(commandGetAllChatMessages, [[chat_id]], (err, data) => {
              if(err) res.status(500).json('failed');
              res.status(200).json(data[data.length - 1]);
            })
        })
      }
      }
    })
  })
}
const deleteMessage = (req, res) => {

}

module.exports = {
  getMessages,
  sendMessage,
  deleteMessage
}