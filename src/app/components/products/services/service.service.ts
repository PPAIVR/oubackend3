import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {environment} from "@env/environment";
import {MatSnackBar} from "@angular/material";
import {ServiceResponse} from "@app/components/products/models/service";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient, public snackBar: MatSnackBar) {
  }

  private api_url = `${environment.appConfig.API_URL}`;
  private api_token = `${environment.HARD_TOKEN}`;
  private usersUrl = this.api_url + '/service';  // URL to web api


  private customHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('authtoken', this.api_token)
    .set('lang', 'es')
    .set('country', 'es');

  getServices(): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(this.usersUrl, {headers: this.customHeaders});
  }
}
