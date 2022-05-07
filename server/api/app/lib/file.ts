import { Readable, Writable } from 'stream';
import { Client } from 'basic-ftp';

const del
= async (
  user: string,
  filename: string
): Promise<void> => {
  const client = new Client();
  client.ftp.verbose = true;
  try {
    await client.access({
      host: 'fileserver',
      user: 'test',
      password: 'test',
      /* scure: true */
    });
    await client.ensureDir(user)
    await client.remove(filename);
  } catch(err) {
    console.log('wi~' /* call administer... */)
    client.close();
  }
}

const send
= async (
  user: string,
  filename: string,
  fileStream: Readable
): Promise<void> => {
  const client = new Client();
  client.ftp.verbose = true;
  try {
    await client.access({
      host: 'fileserver',
      user: 'test',
      password: 'test',
      /* scure: true */
    });
    await client.ensureDir(user)
    await client.uploadFrom(fileStream, `${filename}`);
    client.close();
  } catch (err) {
    console.log(err);
    client.close();
  }
};

const load
= async (
  path: string,
  writeStream: Writable
): Promise<Writable> => {
  const client = new Client();
  client.ftp.verbose = true;
  try {
    await client.access({
      host: 'fileserver',
      user: 'test',
      password: 'test',
      /* scure: true */
    });
    await client.downloadTo(writeStream, path);
    return writeStream;
  } catch (err) {
    console.log(err);
    client.close();
  }
}

export { send, load, del };
