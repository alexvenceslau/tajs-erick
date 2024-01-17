import Task from "./task.js";

const oneSecond = 1000;
const runInASec = new Date(Date.now() + oneSecond);
const runInTwSec = new Date(Date.now() + oneSecond * 2);
const runInThreeSec = new Date(Date.now() + oneSecond * 3);

const task = new Task();

task.save({
  name: "Task 1",
  dueAt: runInASec,
  fn: () => console.log("taks 1 executed"),
});
task.save({
  name: "Task 3",
  dueAt: runInTwSec,
  fn: () => console.log("taks 2 executed"),
});
task.save({
  name: "Task 1",
  dueAt: runInThreeSec,
  fn: () => console.log("taks 3 executed"),
});

task.run(oneSecond);
