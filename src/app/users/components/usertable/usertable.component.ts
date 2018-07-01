import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from "rxjs/index";
import { MyUser } from "../../models/user";

@Component({
  selector: 'anms-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css']
})
export class UsertableComponent implements OnInit {

  displayedColumns: string[] = ['id','username','subscriptions','picture','buttons'];
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
