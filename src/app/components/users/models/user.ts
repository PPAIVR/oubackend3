/**
 * Created by ramon on 1/07/18.
 */


export interface  Customer {
  id: number;
  username: string;
  password: string;
  email: string;
  employee_level: number;
  created_at: string;
  pictures: Picture[];
  type_one_points: number;
  type_two_points: number;
  url_foto_principal: string;
  url_qr_code: string;
  url_video: string;
  usersubscriptions: Usersubscriptions[];
  active_subscriptions: ActiveSubscriptions;

}

export interface CustomerResponse {
  message: boolean;
  data: Customer[];
  code: number;
  total: number;
}

export interface Picture {
  id: number;
  approval_status: number;
  position: number;
  url: string;
  validator_employee_id: number;
}

export interface Usersubscriptions {
  date_start: any;
  subscriptionsdata: any[];
}

export interface SubscriptionsData {
  id: number;
}

export interface ActiveSubscriptions {
  is_guest: boolean;
  is_is_new: boolean;
  is_normal: boolean;
  is_vip: boolean;
}

