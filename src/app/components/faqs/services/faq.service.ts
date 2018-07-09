import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {environment} from '@env/environment';
import {MatSnackBar} from '@angular/material';
import {FaqResponse} from '@app/components/faqs/models/faqs';
import {Advice, AdviceResponse} from '@app/components/advices/models/advices';
import {of} from 'rxjs/internal/observable/of';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  constructor(private http: HttpClient, public snackBar: MatSnackBar) {
  }

  private api_url = `${environment.appConfig.API_URL}`;
  private api_token = `${environment.HARD_TOKEN}`;
  private usersUrl = this.api_url + '/faq';  // URL to web api


  private customHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('authtoken', this.api_token)
    .set('lang', 'es')
    .set('country', 'es');

  getItems(): Observable<FaqResponse> {
    return this.http.get<FaqResponse>(this.usersUrl, {headers: this.customHeaders});
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
        this.snackBar.open('Faq actualizada con éxito.', 'cerrar', {duration: 2000});
      }),
      catchError(this.handleError<any>('updateAdvice'))
    );
  }

  addItem(advice): Observable<any> {
    return this.http.post(this.usersUrl, advice, {headers: this.customHeaders}).pipe(
      tap(() => {
        this.log(`add advice id=${advice.id}`);
        this.snackBar.open('Faq agregada con éxito.', 'cerrar', {duration: 2000});
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
