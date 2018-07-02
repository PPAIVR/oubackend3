import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { MyUser } from '../models/user';

@Component({
  selector: 'anms-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'username', 'subscriptions', 'picture', 'buttons'];
  dataSource = new UserDataSource(this.userService);

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

}

export class UserDataSource extends DataSource<any> {
  constructor(private userService: UserService) {
    super();
  }
  connect(): Observable<MyUser[]> {
    return this.userService.getUsers();
  }
  disconnect() {}
}
