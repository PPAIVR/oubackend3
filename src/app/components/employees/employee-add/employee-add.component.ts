import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Employee} from '../models/employee';
import {EmployeeLevels} from '../employee-detail/employee-detail.component';
import {first} from 'rxjs/operators';
import {EmployeeService} from '../services/employee.service';
import {Router} from '@angular/router';

@Component({
  selector: 'anms-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  @Output()
  clickBack = new EventEmitter<string>();
  employee: Employee;
  aux: any;
  levels: EmployeeLevels[] = [
    {value: '10', title: 'Super administrador'},
    {value: '5', title: 'Administrador'},
  ];

  clickBackEvent() {
    this.clickBack.emit('complete');
  }

  constructor(private employeeService: EmployeeService, public router: Router, public snackBar: MatSnackBar) {
    this.aux = {};
    this.employee = {} as Employee;
    this.clearForm();
  }

  ngOnInit() {
  }
  doSave() {
    if (this.employee.password !== this.aux.password_confirm) {
      return this.snackBar.open('Tus claves no coinciden', 'cerrar', {duration: 2000});
    }
    this.employeeService.addEmployee(this.employee)
      .pipe(first())
      .subscribe(
        data => {
          console.log('Added data:');
          console.log(data);
          // this.router.navigate(['employees']);
          this.goBack();
        },
        error => {
          this.snackBar.open('Error al salvar: ' + error.message, 'cerrar', {duration: 2000});
        });
  }
  goBack() {
    this.clickBackEvent();
    this.clearForm();
  }
  clearForm() {
    this.employee.username = '';
    this.employee.email = '';
    this.employee.employee_level = 0;
    this.employee.password = '';
    this.aux.password_confirmation = '';
  }
}
