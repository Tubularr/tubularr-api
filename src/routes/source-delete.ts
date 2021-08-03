import { Request, Response } from 'express';

import * as sourceRepository from '../repositories/source-repository';

export default async function sourceDelete(req: Request, res: Response): Promise<void> {
  const response = {
    statusCode: 200,
    body: null
  };

  try {
    await sourceRepository.deleteSource(req.query.uuid);
  } catch (error) {
    response.statusCode = 500;
    response.body = error;
  }

  res.status(response.statusCode).send(response.body);
}
