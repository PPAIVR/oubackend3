import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { EmployeeResponse } from '../models/employee';
import { Employee } from '../models/employee';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {environment} from '@env/environment';
import {catchError, tap} from 'rxjs/operators';
import Any = jasmine.Any;
import {of} from 'rxjs/internal/observable/of';




@Injectable({
  providedIn: 'root',
})

export class EmployeeService {

  constructor(private http: HttpClient) { }
  private api_url = `${environment.appConfig.API_URL}`;
  private api_token = `${environment.HARD_TOKEN}`;
  private usersUrl = this.api_url + '/employees';  // URL to web api


  private customHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('authtoken', this.api_token)
    .set('lang', 'es')
    .set('country', 'es');

  getEmployees (): Observable<Employee[]> {
    return this.http.get<EmployeeResponse>(this.usersUrl, {headers: this.customHeaders})
      .map(res => res.data);
  }

  getEmployee (id): Observable<Employee> {
    return this.http.get<EmployeeResponse[]>(this.usersUrl + '/' + id, {headers: this.customHeaders}).map(res => res.data);
  }

  updateEmployee (employee): Observable<Any> {
    return this.http.put(this.usersUrl + '/' + employee.id, employee, { headers: this.customHeaders }).pipe(
      tap(_ => this.log(`updated employee id=${employee.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  private log(message: string) {
    console.log(message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
