import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, first, map, startWith, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import { EmployeeService } from '../services/employee.service';
import { Employee, EmployeeResponse } from '../models/employee';
import {fromEvent} from 'rxjs/internal/observable/fromEvent';
import {EmployeeConfirmDialogComponent} from "@app/components/employees/employee-confirm-dialog/employee-confirm-dialog.component";

@Component({
  selector: 'anms-employees-table-paginated',
  templateUrl: './employees-table-paginated.component.html',
  styleUrls: ['./employees-table-paginated.component.css']
})
export class EmployeesTablePaginatedComponent implements OnInit, AfterViewInit {
  @Input() search;
  displayedColumns: string[] = ['id', 'username', 'email', 'created_at', 'buttons'];
  EmployeeHttpDao: EmployeeHttpDao | null;
  data: Employee[] = [];
  result_dialog: any;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('searchinput') input: ElementRef;

  constructor(private http: HttpClient, private employeeService: EmployeeService,
              public snackBar: MatSnackBar, public dialog: MatDialog) {}

  ngOnInit() {
    this.EmployeeHttpDao = new EmployeeHttpDao(this.http);

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
          return this.EmployeeHttpDao!.getEmployees(
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

    this.openDialog('Eliminar Administrador', 'Estas seguro de que quieres eliminar al administrador?')
      .afterClosed()
      .subscribe(result => {
        console.log('The dialog was closed');
        console.log('result dialog');
        console.log(result);
        this.result_dialog = result;
        if (result) {
          this.employeeService.deleteEmployee(id)
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

  openDialog(title, question) {
    const dialogRef = this.dialog.open(EmployeeConfirmDialogComponent, {
      width: '400px',
      data: {title: title, question: question}
    });
    return dialogRef;
  }

  executeSearch(criteria) {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.EmployeeHttpDao!.getEmployees(
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
}
export class EmployeeHttpDao {
  constructor(private http: HttpClient) {}
  getEmployees(sort: string, order: string, page: number, search: string): Observable<EmployeeResponse> {
    const api_url = `${environment.appConfig.API_URL}`;
    const api_token = `${environment.HARD_TOKEN}`;
    const usersUrl = api_url + '/employees';  // URL to web api
    const href = usersUrl;
    const requestUrl =
      `${href}?sort=${sort}&order=${order}&page=${page + 1}&search=${search}`;

    const customHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('authtoken', api_token)
      .set('lang', 'es')
      .set('country', 'es');
    return this.http.get<EmployeeResponse>(requestUrl, { headers: customHeaders });
  }
}
