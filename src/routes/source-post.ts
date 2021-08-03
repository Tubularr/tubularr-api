import { Request, Response } from 'express';
import { validateOrReject } from 'class-validator';

import * as sourceRepository from '../repositories/source-repository';
import SourceDto from '../dtos/source-dto';

export default async function sourcePost(req, res: Response): Promise<void> {
  const response = {
    statusCode: 201,
    body: null
  };

  try {
    const source = new SourceDto();

    source.name = req.body.name;
    source.sourceKey = req.body.sourceKey;
    source.directory = req.body.directory;
    source.format = req.body.format;
    source.indexSchedule = req.body.indexSchedule;
    source.download = req.body.download;
    source.createdOn = req.body.createdOn;
    source.lastIndexedOn = req.body.lastIndexedOn;
    source.sourceResolution = req.body.sourceResolution;
    source.sourceVideoCodec = req.body.sourceVideoCodec;
    source.sourceAudioCodec = req.body.sourceAudioCodec;
    source.prefer60fps = req.body.prefer60fps;
    source.preferHdr = req.body.preferHdr;
    source.sourceFileExtension = req.body.sourceFileExtension;
    source.fallbackStrategy = req.body.fallbackStrategy;
    source.downloadThumbnails = req.body.downloadThumbnails;
    source.downloadNfo = req.body.downloadNfo;
    source.deleteSchedule = req.body.deleteSchedule;
    source.downloadSubtitles = req.body.downloadSubtitles;
    source.subtitleLanguage = req.body.subtitleLanguage;

    await validateOrReject(
      source,
      {
        forbidUnknownValues: true
      }
    );

    await sourceRepository.insertSource(source);
  } catch (error) {
    response.statusCode = 500;
    response.body = error;
  }

  res.status(response.statusCode).send(response.body);
}
