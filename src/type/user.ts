export interface IUserProfile {
  phone: string;
  password: string;
  fullname: string;
  birthday: string;
  gender: EGender;
}

export enum EGender {
  M = "M",
  F = "F",
}
