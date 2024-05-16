import { Application, json, urlencoded, Request, Response, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';

//import cookieSession from 'cookie-session';
import Logger from 'bunyan';
import 'express-async-errors';
import HTTP_STATUS from 'http-status-codes';
import { config } from '@configs/configEnvs';
import { logger } from '@configs/configLogs';
import { IErrorResponse } from '@helpers/errors/errorResponse.interface';
import { CustomError } from '@helpers/errors/customError';
import applicationRoutes from '@interfaces/http/routes';
// import session from 'express-session';
import cookieSession from 'cookie-session';
const log: Logger = logger.createLogger('server');

export class DelfostiChallengueServer {
   private app: Application;

   constructor(app: Application) {
      this.app = app;
   }

   public start(): void {
      this.securityMiddleware(this.app);
      this.standardMiddleware(this.app);
      this.routesMiddleware(this.app);
      this.globalErrorHandler(this.app);
      this.startServer(this.app);
   }

   private securityMiddleware(app: Application): void {
      // Design pattern Synchronizer Token Pattern: https://medium.com/@kaviru.mihisara/synchronizer-token-pattern-e6b23f53518e

      app.use((req: Request, res: Response, next: NextFunction) => {
         res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Encoding, x-apollo-tracing',
         );

         res.header('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
         res.header('Access-Control-Allow-Headers', 'Accept, Content-Type, X-Requested-With, Range');
         next();
      });

      app.use(
         cookieSession({
            name: 'session',

            keys: [config.SECRET_KEY_ONE!, config.SECRET_KEY_TWO!],
            maxAge: 60 * 60 * 1000 * 24,
         }),
      );

      app.use(
         cors({
            origin: config.CLIENT_URL,
            credentials: true,
            optionsSuccessStatus: 200,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
            allowedHeaders: [
               'Authorization',
               'Content-Type',
               'Access-Control-Allow-Headers',
               'Access-Control-Allow-Methods',
            ],
         }),
      );

      app.use(hpp());
      app.use(helmet());
   }

   private standardMiddleware(app: Application): void {
      app.use(compression());
      app.use(json({ limit: '50mb' }));
      app.use(urlencoded({ extended: true, limit: '50mb' }));
   }

   private routesMiddleware(app: Application): void {
      applicationRoutes(app);
   }

   private globalErrorHandler(app: Application): void {
      app.all('*', (req: Request, res: Response) => {
         res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
      });

      app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
         log.error(error);
         if (error instanceof CustomError) {
            return res.status(error.statusCode).json(error.serializeErrors());
         }
         next();
      });
   }

   private async startServer(app: Application): Promise<void> {
      try {
         const httpServer: http.Server = new http.Server(app);
         //const socketIO: Server = await this.createSocketIO(httpServer);
         this.startHttpServer(httpServer);
         //this.socketIOConnections(socketIO);
      } catch (error) {
         log.error(error);
      }
   }

   private startHttpServer(httpServer: http.Server): void {
      log.info(`Server has started with process ${process.pid}.`);
      const PORT = Number(config.PORT) || 5000;
      httpServer.listen(PORT, () => {
         console.log(`Server listening on port ${PORT}`);
         log.info(`Server running at ${PORT}.`);
      });
   }



}
