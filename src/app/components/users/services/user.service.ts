import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import {MyUser, MyResponse} from '../models/user';
import { MessageService } from '../../../common/services/message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class UserService {

  constructor(private messageService: MessageService,  private http: HttpClient) { }
  private api_url = `${environment.appConfig.API_URL}`;
  private api_token = `${environment.HARD_TOKEN}`;
  private usersUrl = this.api_url + '/users';  // URL to web api
  private usersUlr2 = 'https://jsonplaceholder.typicode.com/users';


  private customHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('authtoken', this.api_token)
    .set('lang', 'es')
    .set('country', 'es');

  getUsers (): Observable<MyUser[]> {
    return this.http.get<MyResponse>(this.usersUrl,{headers: this.customHeaders})
      .map(res => res.data);
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

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }






  // Deprecated
  /*getUsers(): Observable<User[]> {
    // TODO: send the message _after_ fetching the users
    this.messageService.add('UserService: fetched users');
    return of(USERS);
  }*/

  /*getUser(id: number): Observable<User> {
    // TODO: send the message _after_ fetching the user
    this.messageService.add(`UserService: fetched user id=${id}`);
    return of(USERS.find(user => user.id === id));
  }*/
}
