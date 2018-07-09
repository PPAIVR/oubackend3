import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import {CustomerResponse, Customer} from '../models/user';
import {EmployeeConfirmDialogComponent} from "@app/components/employees/employee-confirm-dialog/employee-confirm-dialog.component";
import {environment} from "@env/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MatDialog, MatPaginator, MatSnackBar, MatSort} from "@angular/material";

import { of as observableOf} from 'rxjs';

import {merge} from "rxjs/index";
import {catchError, debounceTime, distinctUntilChanged, first, map, startWith, switchMap, tap} from 'rxjs/operators';
import {fromEvent} from 'rxjs/internal/observable/fromEvent';

@Component({
  selector: 'anms-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  @Input() search;
  displayedColumns: string[] = ['id', 'username', 'email', 'subscriptions', 'city', 'online', 'created_at','buttons'];
  CustomerHttpDao: CustomerHttpDao | null;
  data: Customer[] = [];
  result_dialog: any;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('searchinput') input: ElementRef;

  @Output()
  setActiveUser = new EventEmitter<Customer>();

  setUserForEdit(customer) {
    this.setActiveUser.emit(customer);
  }

  constructor(private http: HttpClient, private userService: UserService,
              public snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {

    this.CustomerHttpDao = new CustomerHttpDao(this.http);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.paginator._intl.nextPageLabel = 'Página siguiente';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.itemsPerPageLabel = 'Elementos por página';

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.CustomerHttpDao!.getCustomers(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.search);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total;

          return data.data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }

  ngAfterViewInit() {

    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          console.log('Executing search');
          console.log(this.search);
          this.executeSearch(this.search);
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.executeSearch(this.search);
        })
      )
      .subscribe();
  }

  doDelete(id) {

    this.openDialog('Eliminar cliente', 'Estas seguro de que quieres eliminar al cliente?')
      .afterClosed()
      .subscribe(result => {
        console.log('The dialog was closed');
        console.log('result dialog');
        console.log(result);
        this.result_dialog = result;
        if (result) {
          this.userService.deleteCustomer(id)
            .pipe(first())
            .subscribe(
              data => {
                this.snackBar.open('Cliente eliminado con éxito', 'cerrar', { duration: 2000});
              },
              error => {
                this.snackBar.open('Error al eliminar: ' + error.message, 'cerrar', { duration: 2000});
              });
        } else {
          this.snackBar.open('Operación cancelada.', 'cerrar', { duration: 2000});
        }
      });
  }

  doBlock(id) {

    this.openDialog('Bloquear cliente', 'Estas seguro de que quieres bloquear al cliente?')
      .afterClosed()
      .subscribe(result => {
        console.log('The dialog was closed');
        console.log('result dialog');
        console.log(result);
        this.result_dialog = result;
        if (result) {
          this.userService.blockCustomer(id)
            .pipe(first())
            .subscribe(
              data => {
                this.snackBar.open('Cliente bloqueado con éxito', 'cerrar', { duration: 2000});
              },
              error => {
                this.snackBar.open('Error al bloquear: ' + error.message, 'cerrar', { duration: 2000});
              });
        } else {
          this.snackBar.open('Operación cancelada.', 'cerrar', { duration: 2000});
        }
      });
  }

  doUnblock(id) {

    this.openDialog('Eliminar cliente', 'Estas seguro de que quieres eliminar al cliente?')
      .afterClosed()
      .subscribe(result => {
        console.log('The dialog was closed');
        console.log('result dialog');
        console.log(result);
        this.result_dialog = result;
        if (result) {
          this.userService.deleteCustomer(id)
            .pipe(first())
            .subscribe(
              data => {
                this.snackBar.open('Cliente eliminado con éxito', 'cerrar', { duration: 2000});
              },
              error => {
                this.snackBar.open('Error al eliminar: ' + error.message, 'cerrar', { duration: 2000});
              });
        } else {
          this.snackBar.open('Operación cancelada.', 'cerrar', { duration: 2000});
        }
      });
  }



  executeSearch(criteria) {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.CustomerHttpDao!.getCustomers(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.search);
        }),
        map(data => {
          console.log('data');
          console.log(data);
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total;

          return data.data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the OU API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }




  openDialog(title, question) {
    const dialogRef = this.dialog.open(EmployeeConfirmDialogComponent, {
      width: '400px',
      data: {title: title, question: question}
    });
    return dialogRef;
  }

}

export class CustomerHttpDao {
  constructor(private http: HttpClient) {}
  getCustomers(sort: string, order: string, page: number, search: string): Observable<CustomerResponse> {
    const api_url = `${environment.appConfig.API_URL}`;
    const api_token = `${environment.HARD_TOKEN}`;
    const usersUrl = api_url + '/users';  // URL to web api
    const href = usersUrl;
    const requestUrl =
      `${href}?sort=${sort}&order=${order}&page=${page + 1}&search=${search}`;

    const customHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('authtoken', api_token)
      .set('lang', 'es')
      .set('country', 'es');
    return this.http.get<CustomerResponse>(requestUrl, { headers: customHeaders });
  }
}
