const { GetFriendsForUID, GetChatForUIDs, saveChatMessage } = require("./ChatController");
const { GetUserWithUID } = require("./UserController");

const onlineUsers = [];

function getSocketForUID(UID) {
  return onlineUsers.find(user => user.UID === UID)?.socket;
}

function getUserForSocketID(socketId) {
  for (let i = 0; i < onlineUsers.length; i++) {
    console.log(onlineUsers[i].socket.id);
  }
  return onlineUsers.find(user => user.socket.id === socketId);
}

function getOnlineStatusForUID(UID) {
  return getSocketForUID(UID) != null;
}

function AllOnlineUsersExceptUID(exceptionUID, func) {
  for (let i = 0; i < onlineUsers.length; i++) {
    if(onlineUsers[i].UID != exceptionUID)
      func(onlineUsers[i]);
  }
}

const ChatSocketHelper = {
  onConnection(socketIO, app) {
    app.get(`/user/:UID1/chat/:UID2`, async (req, res)=>{
      const { UID1, UID2 } = req.params;
      const chat = await GetChatForUIDs(UID1, UID2);
      res.status(200).json({messages: chat.messages.reverse()});
    });

    app.get('/chats/:UID', async (req, res) => {
      const { UID } = req.params;
      console.log(`Fetching friends for ${UID}`);
      let users = await GetFriendsForUID(UID);
      users = users.map(user => ({
        UID: user.id, username: user.username, isOnline: getOnlineStatusForUID(user.id)
      }));
      res.status(200).json({ 'users': users });
    });

    socketIO.on('connection', (socket) => {
      console.log("New undefined connection (" + socket.id + ")");

      socket.on('identifyUser', (UID) => {
        console.log("Identified UID:", UID,"= socket:",socket.id);
        const user = GetUserWithUID(UID);
        if (user == null) {
          console.log("User with that UID was not found");
          //socket.disconnect();
          return;
        }

        const onlineUser = { UID, username: user.username, socket };
        onlineUsers.push(onlineUser)
        console.log("identified user:", onlineUser.username + "#" + onlineUser.UID);
        AllOnlineUsersExceptUID(UID, user => user.socket.emit('onUserOnline', UID));
        socket.emit("identifyUser", null);
      });

      socket.on('SendMessage', async (UID, targetUID, message) => {
        await saveChatMessage(UID, targetUID, message);
        console.log(`UID(${UID}) sent a message to UID(${targetUID}):`, message);
        const targetSocket = getSocketForUID(targetUID);
        if (!targetSocket) {
          console.log(`No socket was found for UID(${targetUID}), perhaps they are online`);
          return;
        }

        targetSocket.emit('ReceiveMessage', UID, message);
      });

      socket.on('typing', (UID, targetUID) => {
        const targetSocket = getSocketForUID(targetUID);
        if (!targetSocket) 
          return;
        targetSocket.emit('typing', UID); 
      });

      socket.on('stop-typing', (UID, targetUID) => {
        const targetSocket = getSocketForUID(targetUID);
        if (targetSocket == null) 
          return;
        targetSocket.emit('stop-typing', UID);
      });

      socket.on('disconnect', () => {
        console.log(`socket(${socket.id}) has disconnected`);
        const disconnectedUser = getUserForSocketID(socket.id);
        if (disconnectedUser == null)
          return;
        console.log(`Identified the socket, user UID is ${disconnectedUser.UID}`);
        let userIndex = -1;
        for(let i = 0;i<onlineUsers.length;i++){
          if (onlineUsers[i].UID === disconnectedUser.UID) {
            userIndex = i;
          } else {
            console.log("will notify UID", onlineUsers[i].UID);
            onlineUsers[i].socket.emit('onUserOffline', disconnectedUser.UID);
          }
        };
        if(userIndex != -1){
          onlineUsers.splice(userIndex, 1);
        }
      });
    })
  }

};

module.exports = { ChatSocketHelper };