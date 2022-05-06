import { Client } from 'basic-ftp';

const fileSend
= async (
  user: string,
  filename: string,
  fileStream: ReadableStream
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
    
    await client.uploadFrom(fileStream, `${user}/${filename}`);
    client.close();
  } catch (err) {
    console.log(err);
    client.close();
  }
};

const fileLoad = 
async (
  path: string,
  writeStream: WritableStream
): Promise<WritableStream> => {
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

export { fileSend, fileLoad };
