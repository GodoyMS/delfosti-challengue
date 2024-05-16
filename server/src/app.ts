import express, { Express } from 'express';
import { DelfostiChallengueServer } from '@bootstrap/setupServer.bootstrap';
import databaseConnection from '@bootstrap/setupDatabase.bootstrap';
import { config } from '@configs/configEnvs';

class Application {
   public initialize(): void {
      this.loadConfig();
      databaseConnection();
      const app: Express = express();
      const server: DelfostiChallengueServer = new DelfostiChallengueServer(app);
      server.start();
   }

   private loadConfig(): void {
      config.validateConfig();
   }
}

const application: Application = new Application();
application.initialize();


