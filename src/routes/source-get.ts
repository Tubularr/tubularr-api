import { Request, Response } from 'express';

import * as sourceRepository from '../repositories/source-repository';

export default async function sourceGet(req: Request, res: Response): Promise<void> {
  const response = {
    statusCode: 200,
    body: null
  };

  try {
    const uuid = String(req.query.uuid);

    response.body = await sourceRepository.getSource(uuid);
  } catch (error) {
    response.statusCode = 500;
    response.body = error;
  }

  res.status(response.statusCode).send(response.body);
}
