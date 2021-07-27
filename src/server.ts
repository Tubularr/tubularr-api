import express from 'express';

import * as config from './config';

const errorHandler = (err: Error, _request: express.Request, response: express.Response, next: express.NextFunction) => {
  console.error(err.stack); //TODO: Replace with actual logger
  response.status(500).send('The server made a boom boom :(');

  next();
};

export const start = (): void => {
  const app = express();

  //TODO: Put routes before error handling

  app.use(errorHandler);

  app.listen(config.server.port);
};
