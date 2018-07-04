import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EmployeeService} from '../services/employee.service';
import {Employee} from '../models/employee';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import { Location } from '@angular/common';
import Any = jasmine.Any;


@Component({
  selector: 'anms-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  @Input() employee: Employee;
  emp: Employee;
  aux: Any;
  EditEmployeeForm = new FormGroup ({
    id: new FormControl(),
    username: new FormControl(),
    email: new FormControl(),
    employee_level: new FormControl(),
    parent_id: new FormControl(),
    password: new FormControl(),
    password_confirmation: new FormControl()
  });

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute,
              private formBuilder: FormBuilder, private location: Location) { }

  ngOnInit() {
    this.aux = {};
    this.aux.password_confirmation = '';
    this.EditEmployeeForm = this.formBuilder.group({
      id: [],
      email: ['', Validators.required],
      username: ['', Validators.required],
      parent_id: [],
      employee_level: [],
      password: [],
      password_confirmation: []
    });
    this.getEmployee();
  }

  getEmployee(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployee(id)
      .subscribe( employee => {
        this.employee = employee;
        this.emp = employee;
        this.EditEmployeeForm.setValue(employee);
        }, error => { console.log(error); } );
  }

  onSubmit() {
    this.employeeService.updateEmployee(this.EditEmployeeForm.value)
      .pipe(first())
      .subscribe(
        data => {
          // this.router.navigate(['list-user']);
          console.log(data);
          console.log(this.EditEmployeeForm.value);
        },
        error => {
          alert(error);
        });
  }
  doSave() {
    this.employeeService.updateEmployee(this.employee)
      .pipe(first())
      .subscribe(
        data => {
          // this.router.navigate(['list-user']);
          console.log(data);
          console.log(this.EditEmployeeForm.value);
        },
        error => {
          alert(error);
        });
  }

  doDelete() {

  }

  goBack() {
    this.location.back();
  }

}



