import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EmployeeService} from '../services/employee.service';
import {Employee} from '../models/employee';
import {FormBuilder} from '@angular/forms';
import {first} from 'rxjs/operators';
import { Location } from '@angular/common';
import {EmployeeConfirmDialogComponent} from '../employee-confirm-dialog/employee-confirm-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';

export interface EmployeeLevels {
  value: string;
  title: string;
}

@Component({
  selector: 'anms-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  @Input() employee: Employee;
  emp: Employee;
  aux: any;
  result_dialog: boolean;
  levels: EmployeeLevels[] = [
    {value: '10', title: 'Super administrador'},
    {value: '5', title: 'Administrador'},
  ];

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute,
              private formBuilder: FormBuilder, private location: Location, public dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.aux = {};
    this.aux.password_confirmation = '';
    this.getEmployee();
  }

  getEmployee(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployee(id)
      .subscribe( employee => {
        this.employee = employee;
        this.emp = employee;
      }, error => { console.log(error); } );
  }

  doSave() {
    if(this.employee.password !== this.aux.password_confirm){
      return this.snackBar.open('Tus claves no coinciden', 'cerrar', { duration: 2000});
    }
    this.employeeService.updateEmployee(this.employee)
      .pipe(first())
      .subscribe(
        data => {
          // this.router.navigate(['list-user']);
          console.log('Updated data:');
          console.log(data);
        },
        error => {
          this.snackBar.open('Error al salvar: ' + error.message, 'cerrar', { duration: 2000});
        });
  }

  doDelete() {

    this.openDialog('Eliminar Administrador', 'Estas seguro de que quieres eliminar al administrador?')
      .afterClosed()
      .subscribe(result => {
        console.log('The dialog was closed');
        console.log('result dialog');
        console.log(result);
        this.result_dialog = result;
        if (result) {
          this.employeeService.deleteEmployee(this.employee.id)
            .pipe(first())
            .subscribe(
              data => {
                this.snackBar.open('Usuario eliminado con éxito', 'cerrar', { duration: 2000});
              },
              error => {
                this.snackBar.open('Error al eliminar: ' + error.message, 'cerrar', { duration: 2000});
              });
        } else {
          this.snackBar.open('Operación cancelada.', 'cerrar', { duration: 2000});
        }
      });
  }

  goBack() {
    this.location.back();
  }

  openDialog(title, question) {
    const dialogRef = this.dialog.open(EmployeeConfirmDialogComponent, {
      width: '400px',
      data: {title: title, question: question}
    });
    return dialogRef;
  }



}



