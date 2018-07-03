import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { EmployeeResponse } from '../models/employee';
import { Employee } from '../models/employee';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { environment } from '../../../../environments/environment';

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
    return this.http.get<EmployeeResponse>(this.usersUrl,{headers: this.customHeaders})
      .map(res => res.data);
  }

}
