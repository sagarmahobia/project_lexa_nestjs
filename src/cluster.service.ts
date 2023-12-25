import { Injectable, Scope } from "@nestjs/common";

const cluster = require("cluster");
import * as process from "node:process";

const numCPUs = process.env.PORT || "2";

@Injectable()
export class ClusterService {
  static clusterize(callback: Function): void {
    if (cluster.isMaster) {
      console.log(`MASTER SERVER (${process.pid}) IS RUNNING `);

      for (let i = 0; i < Number.parseInt(numCPUs); i++) {
        cluster.fork();
      }

      cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
      });
    } else {
      callback();
    }
  }
}

