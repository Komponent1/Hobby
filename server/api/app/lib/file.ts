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
      user: process.env.FILE_USER,
      password: process.env.FILE_PASSWORD,
      /* scure: true */
    });
    await client.ensureDir(user)
    await client.remove(filename);
    await client.close();
  } catch(err) {
    console.log('ERROR LOG(file)', err);
    console.log('관리자 호출 요구' /* call administer... */)
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
      user: process.env.FILE_USER,
      password: process.env.FILE_PASSWORD,
      /* scure: true */
    });
    await client.ensureDir(user)
    await client.uploadFrom(fileStream, `${filename}`);
    await client.close();
  } catch (err) {
    console.log('ERROR LOG(file)', err);
    client.close();
    throw ({
      code: 500,
      msg: 'FTP server error'
    })
  }
};

const load
= async (
  path: string,
  writeStream: Writable
): Promise<void> => {
  const client = new Client();
  client.ftp.verbose = true;
  try {
    await client.access({
      host: 'fileserver',
      user: process.env.FILE_USER,
      password: process.env.FILE_PASSWORD,
      /* scure: true */
    });
    const [ dir, filename ] = path.split('/');
    await client.ensureDir(dir)
    await client.downloadTo(writeStream, filename);
    await client.close();
  } catch (err) {
    console.log('ERROR LOG(file)', err);
    client.close();
    throw ({
      code: 500,
      msg: 'FTP server error'
    })
  }
}

export default { send, load, del };
