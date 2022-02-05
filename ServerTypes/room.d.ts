import { APIType } from "./api";
export namespace RoomType {
  export type Model = {
    _id: any;
    name: string;
    online: boolean;// 无有上帝
    mode: 1|2; // 1 道具赛  2 随机
    roles:[number,number,number,number,number,number], //上帝 狼人 预言家 平民 女巫 猎人
    gamers:string[];
    pwd?: string;
  };

}

export namespace UserService {
  export type RegisterParams = Pick<
    UserType.Model,
    "tel" | "name" | "pwd" | "gender"
  >;
  export type RegisterRs = APIType.format<{
    token: string;
    info: UserType.Model;
  }>;
  export type LoginParams = Partial<
    Pick<UserType.Model, "tel" | "pwd"> & {
      token: string;
    }
  >;
  export type LoginRs = APIType.format<{
    token: string;
    info: UserType.Model;
  }>;
  export type LogoutRs = APIType.format;
  export type UserInfoRs = APIType.format<{
    info: Pick<UserType.Model, "_id" | "name" | "gender">;
  }>;
}
