import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {environment} from "../../../../environments/environment";
import {MatSnackBar} from "@angular/material";
import {AdviceResponse} from "../models/advices";

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

  getAdvices(): Observable<AdviceResponse> {
    return this.http.get<AdviceResponse>(this.usersUrl, {headers: this.customHeaders});
  }
}
