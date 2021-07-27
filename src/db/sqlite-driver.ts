import sqlite3 from 'sqlite3';
import { open as openDB } from 'sqlite';
import { v1 as uuid } from 'uuid';

let db;

export const open = async (dbLocation = '/tmp'): Promise<void> => {
  // open the database
  db = await openDB({
    filename: `${dbLocation}/database.db`,
    driver: sqlite3.Database
  });
};

export const close = async (): Promise<void> => {
  await db.close(); //TODO: Add error handling?
};

const createInitialTables = async (): Promise<void> => {
  await db.exec(`CREATE TABLE sources (
	  name TEXT,
    sourceKey TEXT,
    directory TEXT,
    format TEXT,
    indexSchedule TEXT,
    download INTEGER,
    createdOn TEXT,
    lastIndexedOn TEXT,
    sourceResolution TEXT,
    sourceVideoCodec TEXT,
    sourceAudioCodec TEXT,
    prefer60fps INTEGER,
    preferHdr INTEGER,
    sourceFileExtension TEXT,
    fallbackStrategy INTEGER,
    downloadThumbnails INTEGER,
    downloadNfo INTEGER,
    deleteSchedule TEXT,
    uuid TEXT
  )`);
};

export const getAllRowsFromTable = async (tableName: string): Promise<unknown[]> => {
  let result;

  try {
    result = await db.all(`SELECT * FROM ${tableName}`);
  } catch (error) {
    //TODO: Handle table doesn't exist error
    //TODO: Use actual logger
    console.error(error);
  }

  return result;
};

//TODO: Create source type
export const insertSource = async (source: any): Promise<void> => {
  try {
    await db.run(
      `INSERT INTO sources (
      name,
      sourceKey,
      directory,
      format,
      indexSchedule,
      download,
      createdOn,
      lastIndexedOn,
      sourceResolution,
      sourceVideoCodec,
      sourceAudioCodec,
      prefer60fps,
      preferHdr,
      sourceFileExtension,
      fallbackStrategy,
      downloadThumbnails,
      downloadNfo,
      deleteSchedule,
      uuid
    ) VALUES (
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?
    )`,
      source.name,
      source.sourceKey,
      source.directory,
      source.format,
      source.indexSchedule,
      source.download,
      source.createdOn,
      source.lastIndexedOn,
      source.sourceResolution,
      source.sourceVideoCodec,
      source.sourceAudioCodec,
      source.prefer60fps,
      source.preferHdr,
      source.sourceFileExtension,
      source.fallbackStrategy,
      source.downloadThumbnails,
      source.downloadNfo,
      source.deleteSchedule,
      uuid()
    );
  } catch (error) {
    //TODO: Use actual logger
    console.error(error);
  }
};
