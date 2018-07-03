import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import { DataSource } from '@angular/cdk/collections';
import { EmployeeService } from '../services/employee.service';
/*import { Employee, EmployeeResponse } from '../models/employee';*/

@Component({
  selector: 'anms-employees-table-paginated',
  templateUrl: './employees-table-paginated.component.html',
  styleUrls: ['./employees-table-paginated.component.css']
})
export class EmployeesTablePaginatedComponent implements OnInit {
  displayedColumns: string[] = ['id', 'username', 'email'];
  EmployeeDatabase: EmployeeHttpDao | null;
  EmployeeDataSource: EmployeeDataSource | null;
  data: Employee[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,private employeeService: EmployeeService) {}

  ngOnInit() {
    this.EmployeeDatabase = new EmployeeHttpDao(this.http);
    this.EmployeeDataSource = new EmployeeDataSource(this.employeeService);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          /*return this.EmployeeDatabase!.getRepoIssues(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);*/
          return this.employeeService.getEmployees2();
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
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }
}

export interface EmployeeResponse {
  data: Employee[];
  count: number;
}

export interface Employee {
  id: number;
  username: string;
  email: string;
  employee_level: number;
}

/** An example database that the data source uses to retrieve data for the table. */
export class EmployeeHttpDao {
  constructor(private http: HttpClient) {}

  getRepoIssues(sort: string, order: string, page: number): Observable<EmployeeResponse> {
    const api_url = `${environment.appConfig.API_URL}`;
    const api_token = `${environment.HARD_TOKEN}`;
    const usersUrl = api_url + '/employees';  // URL to web api
    const href = usersUrl;
    const requestUrl =
      `${href}?sort=${sort}&order=${order}&page=${page + 1}`;

  const customHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('authtoken', api_token)
      .set('lang', 'es')
      .set('country', 'es');


    return this.http.get<EmployeeResponse>(requestUrl, { headers: customHeaders });
  }
}

export class EmployeeDataSource extends DataSource<any> {
  constructor(private employeeService: EmployeeService) {
    super();
  }
  connect(): Observable<Employee[]> {
    return this.employeeService.getEmployees2();
  }
  disconnect() {}
}

