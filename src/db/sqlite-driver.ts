import sqlite3 from 'sqlite3';
import { open as openDB } from 'sqlite';
import { v1 as uuid } from 'uuid';

let db;

export const open = async (dbLocation = '/tmp'): Promise<void> => {
  db = await openDB({
    filename: `${dbLocation}/database.db`,
    driver: sqlite3.Database
  });
};

export const close = async (): Promise<void> => {
  await db.close(); //TODO: Add error handling?
};

//TODO: Run this if the initial table doesn't exit
export const createInitialTables = async (): Promise<void> => {
  //TODO: Also create indexes (use if not exists)
  await db.exec(`CREATE TABLE IF NOT EXISTS sources (
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
    downloadSubtitles INTEGER,
    subtitleLanguage TEXT,
    uuid TEXT
  )`);

  await db.exec(`CREATE TABLE IF NOT EXISTS media_metadata (
    name TEXT,
    parentUuid TEXT,
    uuid TEXT
  )`);

  await db.exec(`CREATE TABLE IF NOT EXISTS queue (
    name TEXT,
    parentUuid TEXT,
    url TEXT,
    uuid TEXT
  )`);
};

export const getAllRowsFromTable = async (tableName: string) => {
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
      downloadSubtitles,
      subtitleLanguage,
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
      source.downloadSubtitles,
      source.subtitleLanguage,
      uuid()
    );
  } catch (error) {
    //TODO: Use actual logger
    console.error(error);
  }
};

export const deleteFromTable = async (tableName: string, query: string): Promise<void> => {
  try {
    await db.exec(
      `DELETE FROM ${tableName}
      WHERE ${query};`
    );
  } catch (error) {
    //TODO: Handle table doesn't exist error
    //TODO: Use actual logger
    console.error(error);
  }
};

export const update = async (updateQuery: string): Promise<void> => {
  try {
    await db.exec(updateQuery);
  } catch (error) {
    //TODO: Handle table doesn't exist error
    //TODO: Use actual logger
    console.error(error);
  }
};
