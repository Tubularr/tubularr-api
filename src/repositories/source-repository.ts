import * as sqliteDb from '../db/sqlite-driver';
import SourceDto from '../dtos/source-dto';

const sourcesTableName = 'sources';

export const getAllSources = async (): Promise<Array<SourceDto>> => {
  const results: Array<SourceDto> = await sqliteDb.getAllRowsFromTable(sourcesTableName);

  return results;
};

export const getSource = async (uuid: string): Promise<SourceDto> => {
  let query = `SELECT * FROM ${sourcesTableName} t WHERE t.uuid = '${uuid}'`;

  const result: SourceDto = await sqliteDb.get(query);

  return result;
};

export const insertSource = async (source: SourceDto): Promise<void> => {
  await sqliteDb.insertSource(source);
};

export const deleteSource = async (uuid: string): Promise<void> => {
  const deleteQuery = `uuid = "${uuid}"`;

  await sqliteDb.deleteFromTable(sourcesTableName, deleteQuery);
};

export const updateSource = async (uuid: string, source: SourceDto): Promise<void> => {
  const updateQuery = `uuid = "${uuid}"`;

  let query = `UPDATE ${sourcesTableName}`;

  const sourceKeys = Object.keys(source);

  for (let i = 0; i < sourceKeys.length; i++) {
    if (i === sourceKeys.length - 1) {
      // Remove trailing comma
      query = query.substring(0, query.length - 1);
    }

    if (!source[sourceKeys[i]]) {
      continue;
    }

    if (i === 0) {
      query = `${query} SET ${sourceKeys[i]} = "${source[sourceKeys[i]]}",`;
    } else {
      query = `${query} ${sourceKeys[i]} = "${source[sourceKeys[i]]}",`;
    }
  }

  query = `${query} WHERE ${updateQuery}`;

  await sqliteDb.update(query);
};
