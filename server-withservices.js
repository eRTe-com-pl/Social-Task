let app = require("express");
let http = require("http").Server(app);
let io = require("socket.io")(http,{
    cors: {
        origin: "*"
    }
});
let numberOfUsersOnline = 0;

io.on("connection", socket => {
  // Log whenever a user connects
  console.log("user connected");


  numberOfUsersOnline++;
  io.emit('numberOfOnlineUsers', numberOfUsersOnline);
  
  socket.on('numberOfUsersOnline', function() {

  })

  // Log whenever a client disconnects from our websocket server
  socket.on("disconnect", function() {
    numberOfUsersOnline--;
    console.log("user disconnected");
  });

  // When we receive a 'message' event from our client, print out
  // the contents of that message and then echo it back to our client
  // using `io.emit()`
  socket.on("messagea", message => {
    console.log("Message Received: " + message);
    io.emit("message", { type: "new-message", text: message });
  });

  // we don’t want to let one client edit multiple task at the same time

  let previousId;

  const safeJoin = currentId => {
    socket.leave(previousId);
    socket.join(currentId, () => console.log(`Socket ${socket.id} joined task ${currentId}`));
    previousId = currentId;
  };

  socket.on("getDoc", docId => {
    safeJoin(docId);
    socket.emit("document", documents[docId]);
  });

});

// Initialize our websocket server on port 5000
http.listen(5000, () => {
  console.log("started on port 5000");
});