import mongoose from 'mongoose';
import * as config from '../utils/config';
// 同步引入 info model和 studen model

let mongoStatus = false;
const connect = async () => {
  if (mongoStatus) {
    return 1;
  } else {
    return new Promise<any>((resolve, reject) => {
      mongoose.set('debug', true);
      mongoose.connect(config.mongodb.dbpath);
      mongoose.connection.on('disconnected', () => {
        mongoStatus = false;
        reject();
      });
      mongoose.connection.on('error', (err) => {
        mongoStatus = false;
        reject();
      });
      mongoose.connection.once('open', async () => {
        mongoStatus = true;
        resolve(1);
      });
    }).then(
      () => {},
      () => {
        mongoStatus = false;
        console.log('连接数据库失败');
        throw new Error();
      },
    );
  }
};
export default connect;
