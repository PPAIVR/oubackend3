import {Component, Input, OnInit} from '@angular/core';
import {Usersubscriptions} from '../models/usersubscriptions';
import {ThemePalette} from '@angular/material';
import {ActiveSubscriptions} from "../models/usersubscriptions";

const SUBSCRIPTION_NORMAL = 1;
const SUBSCRIPTION_VIP = 2;

export interface SubColor {
  type: string;
  date_start: any;
  date_end: any;
  color: ThemePalette;
}

export interface ActiveSub {
  type: string;
  color: ThemePalette;
}

@Component({
  selector: 'anms-user-subscriptions',
  templateUrl: './user-subscriptions.component.html',
  styleUrls: ['./user-subscriptions.component.css']
})
export class UserSubscriptionsComponent implements OnInit {
  @Input() usersubscriptions: ActiveSubscriptions;
  subs: any = {};
  constructor() { }

  ngOnInit() {
    console.log(this.usersubscriptions);
    if(this.usersubscriptions.is_vip == true){
      this.subs.type = 'VIP';
      this.subs.color = 'warn';
    }else if(this.usersubscriptions.is_normal == true){
      this.subs.type = 'Normal';
      this.subs.color = 'accent';
    }else{
      this.subs.type = 'Ninguna';
      this.subs.color = 'primary';
    }
  }


}
