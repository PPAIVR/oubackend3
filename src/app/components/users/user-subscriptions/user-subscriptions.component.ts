import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Usersubscriptions} from '../models/usersubscriptions';
import {ThemePalette} from '@angular/material';

const SUBSCRIPTION_NORMAL = 1;
const SUBSCRIPTION_VIP = 2;

export interface SubColor {
  type: string;
  date_start: any;
  date_end: any;
  color: ThemePalette;
}

@Component({
  selector: 'anms-user-subscriptions',
  templateUrl: './user-subscriptions.component.html',
  styleUrls: ['./user-subscriptions.component.css']
})
export class UserSubscriptionsComponent implements OnInit {
  @Input() usersubscriptions: Usersubscriptions[];
  subs: SubColor[] = [];
  raw_subs = [];
  constructor() { }



  ngOnInit() {
    this.raw_subs = this.usersubscriptions;
    this.prepareSubs();
  }

  prepareSubs() {
    this.raw_subs.forEach(function(value, index) {
      const color = 'warn';
      const _sub = {
        date_start: value.date_start,
        date_end: value.date_end,
        type: value.subscriptiondata.description,
        color: 'primary'
      };
      this.subs.push(_sub);
    }, this);
  }



  /*ngOnChanges(changes) {
    console.log('Changes');
    console.log(changes.data);
  }*/

}
