// import { TaskUser } from "./taskUser";
let app = require("express");
const { Interface } = require("readline");
let http = require("http").Server(app);
let io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

let numberOfUsersOnline = 0;
const tasks = [
  { id: "LjSYV", name: "Task 1", usersOnlineInTask: 0 },
  { id: "zKyaa", name: "Task 2", usersOnlineInTask: 0 },
  { id: "HfQwQ", name: "Task 3", usersOnlineInTask: 0 },
  { id: "U7QXu", name: "Task 4", usersOnlineInTask: 0 },
  { id: "S7YOs", name: "Task 5", usersOnlineInTask: 0 },
  { id: "l6uID", name: "Task 6", usersOnlineInTask: 0 },
  { id: "dI8YL", name: "Task 7", usersOnlineInTask: 0 },
];

let taskInSocket = [];

io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} has connected`);

  let previousTaskIdUser;
  numberOfUsersOnline++;
  io.emit("numberOfUsersOnline", numberOfUsersOnline);
  io.emit("tasks", tasks);

  socket.on("numberOfUsersOnline", function () {
    numberOfUsersOnline += 50;
    console.log("odpalona numberOfUsersOnline");
  });

  socket.on("disconnect", function () {
    decrementUserOfTask(previousTaskIdUser);
    io.emit("tasks", tasks);
    numberOfUsersOnline--;
    io.emit('numberOfUsersOnline', numberOfUsersOnline);
    console.log("user disconnected");
  });

  const safeJoin = (currentTaskId) => {
    socket.leave(previousTaskIdUser);
    decrementUserOfTask(previousTaskIdUser);
    incrementUserOfTask(currentTaskId);

    socket.join(currentTaskId, () =>
      console.log(`Socket ${socket.id} joined task ${currentTaskId}`)
    );
    console.log("47\n");
    previousTaskIdUser = currentTaskId;
  };

  const decrementUserOfTask = (id) => {
    const tskInS = taskInSocket.find((taskS, index) =>
      taskS.task === id && taskS.socketId === socket.id
        ? taskInSocket.splice(index, 1)
        : console.log("true")
    );

    return tasks.map((task) => {
      return task.id === id && task.id === tskInS.task
        ? task.usersOnlineInTask--
        : task;
    });
  };

  const incrementUserOfTask = (id) => {
    if (taskInSocket.length == 0) {
      taskInSocket.push({ task: id, socketId: socket.id });
    }

    taskInSocket.find(
      (taskS) => taskS.task === id && taskS.socketId === socket.id
    )
      ? console.log("true")
      : taskInSocket.push({ task: id, socketId: socket.id });

    console.log("taskInSocket >");
    console.log(taskInSocket);
    return tasks.map((task) => {
      return task.id === id ? task.usersOnlineInTask++ : task;
    });
  };

  socket.on("getTask", (id) => {
    safeJoin(id);
    let task = tasks.find((tsk) => tsk.id === id);

    socket.emit("task", task);
    io.emit("tasks", tasks);
    console.log(tasks);
    console.log("tasks[id]: " + task);
    console.log("id: " + id);
  });

  socket.on("addTask", (tsk) => {
    // tasks[tsk.id] = tsk;
    tasks.push(tsk);
    safeJoin(tsk.id);
    io.emit("tasks", tasks);
    console.log(tasks);
    // io.emit("tasks", Object.keys(tasks));
    socket.emit("task", tsk);
  });
});

http.listen(5000, () => {
  console.log("started on port 5000");
});
