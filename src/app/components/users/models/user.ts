/**
 * Created by ramon on 1/07/18.
 */

export interface  MyUser {
  username: string;
}

export interface MyResponse {
  message : boolean;
  data: MyUser[];
  code: number;
}
