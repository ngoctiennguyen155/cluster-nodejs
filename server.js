const app = require("./app");

const cluster = require("cluster");
const http = require("http");
const os = require("os");

if (cluster.isMaster) {
  const numberWorkers = os.cpus().length;
  console.log(`Master cluster setting up ${numberWorkers}`);

  for (let i = 0; i < numberWorkers; i++) {
    cluster.fork();
  }
  cluster.on("online", function (worker) {
    console.log(`Worker ${worker.process.pid} is online`);
  });
  cluster.on("exit", function (worker, code, signal) {
    console.log(
      `Worker ${worker.process.pid} died with code ${code} and signal ${signal}`
    );
    console.log("Start a new worker");
    cluster.fork();
  });
} else {
  const server = http.createServer(app);
  const port = process.env.PORT || 8080;
  server.listen(port, () => {
    console.log(
      `Process ${process.pid} is listening to all incoming requrests on port ${port}`
    );
  });
}
