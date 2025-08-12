export type HttpException = Error & {
  statusCode: number;
  message: string;
};
