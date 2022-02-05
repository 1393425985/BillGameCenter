import { APIType } from "./api";
export namespace UserType {
  export type Model = {
    _id: any;
    name: string;
    tel: string;
    pwd: string;
    gender: 1 | 0;
    createdAt: Date;
  };
  export type Jwt = Pick<UserType.Model, "tel" | "name" | "pwd"> & {
    id: string;
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
