import express from 'express';

import * as config from './config';

import sourcesGet from './routes/sources-get';
import sourceGet from './routes/source-get';
import sourcePost from './routes/source-post';
import sourceDelete from './routes/source-delete';
import sourcesPatch from './routes/source-patch';

const errorHandler = (err: Error, _request: express.Request, response: express.Response, next: express.NextFunction) => {
  console.error(err.stack); //TODO: Replace with actual logger
  response.status(500).send('The server made a boom boom :(');

  next();
};

const getLoggerForStatusCode = (statusCode: number) => {
  if (statusCode >= 500) {
    return console.error.bind(console);
  }

  if (statusCode >= 400) {
    return console.warn.bind(console);
  }

  return console.log.bind(console);
};

// Taken from https://brightinventions.pl/blog/http-request-logging-in-node/
//TODO: Add a correlation id to track the request/response
const requestLogger = (req, res, next: express.NextFunction) => {
  console.info(`${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`);

  const cleanup = () => {
    res.removeListener('finish', logFn);
    res.removeListener('close', abortFn);
    res.removeListener('error', errorFn);
  };

  const logFn = () => {
    cleanup();

    const logger = getLoggerForStatusCode(res.statusCode);

    logger(`${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`);
  };

  const abortFn = () => {
    cleanup();

    console.warn('Request aborted by the client');
  };

  const errorFn = err => {
    cleanup();

    console.error(`Request pipeline error: ${JSON.stringify(err)}`);
  };

  res.on('finish', logFn); // Successful pipeline (regardless of its response)
  res.on('close', abortFn); // Aborted pipeline
  res.on('error', errorFn); // Pipeline internal error

  next();
};

export const start = (): void => {
  const app = express();

  app.use(express.json());
  app.use(requestLogger);

  app.get('/sources', sourcesGet);
  app.get('/source', sourceGet);
  app.post('/source', sourcePost);
  app.delete('/source', sourceDelete);
  app.patch('/source', sourcesPatch);

  app.use(errorHandler);

  app.listen(config.server.port, () => {
    console.log(`Listening at http://localhost:${config.server.port}`);
  });
};
