import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { EmployeeResponse } from '../models/employee';
import { Employee } from '../models/employee';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {environment} from '@env/environment';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {MatSnackBar} from '@angular/material';




@Injectable({
  providedIn: 'root',
})

export class EmployeeService {

  constructor(private http: HttpClient, public snackBar: MatSnackBar) { }
  private api_url = `${environment.appConfig.API_URL}`;
  private api_token = `${environment.HARD_TOKEN}`;
  private usersUrl = this.api_url + '/employees';  // URL to web api

  private customHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('authtoken', this.api_token)
    .set('lang', 'es')
    .set('country', 'es');

  public static log(message: string) {
    console.log(message);
  }

  getEmployees (): Observable<Employee[]> {
    return this.http.get<EmployeeResponse>(this.usersUrl, {headers: this.customHeaders})
      .map(res => res.data);
  }

  getEmployee (id): Observable<Employee> {
    return this.http.get<EmployeeResponse[]>(this.usersUrl + '/' + id, {headers: this.customHeaders}).map(res => res.data);
  }

  deleteEmployee (id): Observable<EmployeeResponse> {
    return this.http.delete<EmployeeResponse>(this.usersUrl + '/' + id, {headers: this.customHeaders});
  }

  updateEmployee (employee): Observable<any> {
    return this.http.put(this.usersUrl + '/' + employee.id, employee, { headers: this.customHeaders }).pipe(
      tap(() => {
        EmployeeService.log(`updated employee id=${employee.id}`);
        this.snackBar.open('Usuario actualizado con éxito.', 'cerrar', { duration: 2000});
      }),
      catchError(this.handleError<any>('updateEmployee'))
    );
  }
  addEmployee (employee): Observable<any> {
    return this.http.post(this.usersUrl , employee, { headers: this.customHeaders }).pipe(
      tap(() => {
        EmployeeService.log(`add employee id=${employee.id}`);
        this.snackBar.open('Usuario agregado con éxito.', 'cerrar', { duration: 2000});
      }),
      catchError(this.handleError<any>('addEmployee'))
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      this.snackBar.open('Error al actualizar: ' + error.message, 'cerrar', { duration: 2000});

      // TODO: better job of transforming error for user consumption
      EmployeeService.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
