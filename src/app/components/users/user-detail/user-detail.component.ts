import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Customer} from "@app/components/users/models/user";

@Component({
  selector: 'anms-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() customer: Customer;
  @Output() clickBack = new EventEmitter<string>();
  aux: any = {};


  constructor() { }

  ngOnInit() {
    this.aux.password_confirm = '';
  }





  clickBackEvent() {
    this.clickBack.emit('complete');
  }

  doSave() {

  }

  doDelete() {

  }

  goBack() {
    this.clickBackEvent();
  }


  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
