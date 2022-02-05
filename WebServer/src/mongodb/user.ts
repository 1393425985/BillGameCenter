import { ObjectId } from 'mongodb';
import { User, UserModel } from './schema/user';
import connect from './mongo';
import {UserType} from '@@@/user';

// 新增
export const save = async (info: Partial<UserType.Model>) => {
  try {
    await connect();
    const user = new User({ _id: new ObjectId(), ...info });
    const saveUser = await user.save();
    return saveUser;
  } catch (error) {
    return undefined;
  }
};

export const findOne = async (info: Partial<UserType.Model>) => {
  try {
    await connect();
    const user = await User.findOne(info);
    return user;
  } catch (error) {
    return undefined;
  }
};
export const updateOne = async (id: string, info: Partial<UserType.Model>) => {
  try {
    const user = await User.updateOne({ _id: id }, info);
    if (user) {
      const newUser = await findOne({ _id: id });
      return newUser;
    } else {
      return undefined;
    }
  } catch (error) {
    return undefined;
  }
};

// 级联查询
// export const fetchStudentDetail = async (ctx, next) => {
//     // 利用populate来查询关联info的数据
//     const students = await Student.find({})
//         .populate({
//             path: 'info',
//             select: 'hobby height weight',
//         })
//         .exec();
//     if (students.length) {
//         ctx.body = {
//             success: true,
//             student: students,
//         };
//     } else {
//         ctx.body = {
//             success: false,
//         };
//     }
// };
