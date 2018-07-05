import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface DialogData {
  title: string;
  question: string;
  response: boolean;
}


@Component({
  selector: 'anms-employee-confirm-dialog',
  templateUrl: './employee-confirm-dialog.component.html',
  styleUrls: ['./employee-confirm-dialog.component.css']
})
export class EmployeeConfirmDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EmployeeConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.data.response = false;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  doDelete(): void {
    this.data.response = true;
    this.dialogRef.close(true);
  }

  doExit(): void {
    this.data.response = false;
    this.dialogRef.close(false);
  }

}
