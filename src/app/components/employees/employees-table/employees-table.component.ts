import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import {EmployeeService} from '../services/employee.service';
import {Employee} from '../models/employee';


@Component({
  selector: 'anms-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css']
})
export class EmployeesTableComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }
  displayedColumns: string[] = ['id', 'username', 'email', 'level', 'token', 'buttons'];
  dataSource = new EmployeeDataSource(this.employeeService);

  ngOnInit() {
  }
}

export class EmployeeDataSource extends DataSource<any> {
  constructor(private employeeService: EmployeeService) {
    super();
  }
  connect(): Observable<Employee[]> {
    return this.employeeService.getEmployees();
  }
  disconnect() {}
}
