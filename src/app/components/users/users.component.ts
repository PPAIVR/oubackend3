import {Component, OnInit, ViewChild} from '@angular/core';
import {Customer} from "@app/components/users/models/user";
import {MatTabGroup} from "@angular/material";
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'anms-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  active_customer: Customer;
  @ViewChild(MatTabGroup) mattab: MatTabGroup;
  activate_detail = false;

  constructor() { }

  ngOnInit() {

  }

  // Event.
  changeTab(event) {
    this.mattab.selectedIndex = 0;
  }

  // Edit event
  activateUser(customer) {
    this.active_customer=customer;
    this.mattab.selectedIndex = 1;
    this.activate_detail = true;
  }

  onLinkClick(event: MatTabChangeEvent) {
    console.log('event => ', event);
    console.log('index => ', event.index);
    console.log('tab => ', event.tab);
    if(event.index!==1){
      this.active_customer = null;
      this.activate_detail = false;
    }
  }

}
