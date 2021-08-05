import { Request, Response } from 'express';

import * as sourceRepository from '../repositories/source-repository';

export default async function sourcesGet(req: Request, res: Response): Promise<void> {
  const sources = await sourceRepository.getAllSources();

  res.send(sources);
}
