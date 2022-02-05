const mainHost = '124.222.33.93';
export const port = 3000;
export const secret = 'bill';

export const mongodb = {
  dbpath: `mongodb://web:123456@${mainHost}:27017/data`,
  username: 'web',
  password: '123456',
}
export const img = {
  host: `http://${mainHost}/`
}