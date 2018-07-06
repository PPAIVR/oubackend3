import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTabGroup} from '@angular/material';

@Component({
  selector: 'anms-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  @ViewChild(MatTabGroup) mattab: MatTabGroup;

  constructor() { }

  ngOnInit() {
  }

  // Event.
  changeTab(event) {
    this.mattab.selectedIndex = 0;
  }

}
