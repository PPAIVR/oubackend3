import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {environment} from '../../../../environments/environment';
import {MatSnackBar} from '@angular/material';
import {Advice, AdviceResponse} from '../models/advices';
import {EmployeeService} from '@app/components/employees/services/employee.service';
import {of} from 'rxjs/internal/observable/of';
import {Employee, EmployeeResponse} from '@app/components/employees/models/employee';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdviceService {
  constructor(private http: HttpClient, public snackBar: MatSnackBar) {
  }

  private api_url = `${environment.appConfig.API_URL}`;
  private api_token = `${environment.HARD_TOKEN}`;
  private usersUrl = this.api_url + '/advice';  // URL to web api


  private customHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('authtoken', this.api_token)
    .set('lang', 'es')
    .set('country', 'es');

  getItems(): Observable<AdviceResponse> {
    return this.http.get<AdviceResponse>(this.usersUrl, {headers: this.customHeaders});
  }

  getItem(id): Observable<Advice> {
    return this.http.get<any>(this.usersUrl + '/' + id, {headers: this.customHeaders}).map(res => res.data);
  }

  deleteItem(id): Observable<AdviceResponse> {
    return this.http.delete<AdviceResponse>(this.usersUrl + '/' + id, {headers: this.customHeaders});
  }

  updateItem(advice): Observable<any> {
    return this.http.put(this.usersUrl + '/' + advice.id, advice, {headers: this.customHeaders}).pipe(
      tap(() => {
        this.log(`updated advice id=${advice.id}`);
        this.snackBar.open('Consejo actualizado con éxito.', 'cerrar', {duration: 2000});
      }),
      catchError(this.handleError<any>('updateAdvice'))
    );
  }

  addItem(advice): Observable<any> {
    return this.http.post(this.usersUrl, advice, {headers: this.customHeaders}).pipe(
      tap(() => {
        this.log(`add advice id=${advice.id}`);
        this.snackBar.open('Consejo agregado con éxito.', 'cerrar', {duration: 2000});
      }),
      catchError(this.handleError<any>('addAdvice'))
    );
  }

  /** Log a UserService message with the MessageService */
  private log(message: string) {
    console.log('Message:' + message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
