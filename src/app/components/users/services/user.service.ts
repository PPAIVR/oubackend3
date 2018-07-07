import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import {CustomerResponse, Customer} from '../models/user';
import { MessageService } from '@app/common/services/message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { environment } from '@env/environment';
import {catchError, tap} from "rxjs/operators";
import {MatSnackBar} from "@angular/material";

@Injectable({
  providedIn: 'root',
})

export class UserService {

  constructor(private messageService: MessageService,  private http: HttpClient, public snackBar: MatSnackBar) { }
  private api_url = `${environment.appConfig.API_URL}`;
  private api_token = `${environment.HARD_TOKEN}`;
  private usersUrl = this.api_url + '/users';  // URL to web api


  private customHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('authtoken', this.api_token)
    .set('lang', 'es')
    .set('country', 'es');

  getCustomers (): Observable<Customer[]> {
    return this.http.get<CustomerResponse>(this.usersUrl, {headers: this.customHeaders})
      .map(res => res.data);
  }

  getCustomer (id): Observable<Customer> {
    return this.http.get<CustomerResponse[]>(this.usersUrl + '/' + id, {headers: this.customHeaders}).map(res => res.data);
  }

  deleteCustomer (id): Observable<CustomerResponse> {
    return this.http.delete<CustomerResponse>(this.usersUrl + '/' + id, {headers: this.customHeaders});
  }

  updateCustomer (customer): Observable<any> {
    return this.http.put(this.usersUrl + '/' + customer.id, customer, { headers: this.customHeaders }).pipe(
      tap(() => {
        this.log(`updated customer id=${customer.id}`);
        this.snackBar.open('Cliente actualizado con éxito.', 'cerrar', { duration: 2000});
      }),
      catchError(this.handleError<any>('updateCustomer'))
    );
  }
  addCustomer (customer): Observable<any> {
    return this.http.post(this.usersUrl , customer, { headers: this.customHeaders }).pipe(
      tap(() => {
        this.log(`add customer id=${customer.id}`);
        this.snackBar.open('Cliente agregado con éxito.', 'cerrar', { duration: 2000});
      }),
      catchError(this.handleError<any>('addCustomer'))
    );
  }



  /** Log a UserService message with the MessageService */
  private log(message: string) {
    this.messageService.add('UsersService: ' + message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
