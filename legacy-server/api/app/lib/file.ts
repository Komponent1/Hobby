import { Readable, Writable } from 'stream';
import { Client } from 'basic-ftp';
import { ERROR } from '.';

const connect = async () => {
  const client = new Client();
  client.ftp.verbose = true;
  await client.access({
    host: 'fileserver',
    user: process.env.FILE_USER,
    password: process.env.FILE_PASSWORD,
    /* scure: true */
  });
  
  return client;
};

const del
= async (
  user: string,
  filename: string
): Promise<void> => {
  let client = null;
  
  try {
    client = await connect();
    await client.ensureDir(user)
    await client.remove(filename);
    await client.close();
  } catch(err) {
    client?.close();
    ERROR.fileError(err);
  }
}

const send
= async (
  user: string,
  filename: string,
  fileStream: Readable
): Promise<void> => {
  let client = null;
  try {
    client = await connect();
    await client.ensureDir(user)
    await client.uploadFrom(fileStream, `${filename}`);
    await client.close();
  } catch (err) {
    client?.close();
    ERROR.fileError(err);
  }
};

const load
= async (
  path: string,
  writeStream: Writable
): Promise<void> => {
  let client = null;
  try {
    const [ dir, filename ] = path.split('/');
    client = await connect();
    await client.ensureDir(dir)
    await client.downloadTo(writeStream, filename);
    await client.close();
  } catch (err) {
    ERROR.fileError(err);
  }
}

export default { send, load, del };
