export class User {
  id: number;
  email: string;
  username: string;
  gender: string;
  parent_id?: any;
  name: string;
  authtoken: string;
  lastname: string;
  subscription_id: number;
  is_active: number;
  url_foto_principal: string;
  url_video: string;
  lang: string;
  country: string;
  weight: number;
  height: number;
  age: number;
  latitud: number;
  longitud: number;
  city: string;
  incognito: boolean;
  online: boolean;
  num_messages_received: number;
  num_favorite_received: number;
  num_blink_received: number;
  num_gift_received: number;
  num_views_received: number;
  type_one_points: number;
  type_two_points: number;
  nfriends: number;
  nfriends2: number;
  subscription: number;
  url_qrcode: string;
  firstname: string;
  location?: any;
  pictures: Picture[];
  wallet?: any;
  usersubscriptions: Usersubscription[];

}

export class Picture {
  id: number;
  url: string;
  is_cover: number;
  position: number;
  approval_date?: any;
  approval_status: number;
  validator_employee_id?: any;
}

export class  Subscriptiondata {
  id: number;
  description: string;
  price_monthly: number;
  price_3_months: number;
  price_6_months: number;
  currency_id: number;
  subscriptiontype_id: number;
}

export class Usersubscription {
  id: number;
  user_id: number;
  subscription_id: number;
  newsubscription_id: number;
  date_start: string;
  date_end: string;
  subscriptiondata: Subscriptiondata;
}






