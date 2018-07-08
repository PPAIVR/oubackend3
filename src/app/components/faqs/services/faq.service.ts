import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {environment} from "@env/environment";
import {MatSnackBar} from "@angular/material";
import {FaqResponse} from "@app/components/faqs/models/faqs";

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

  getFaqs(): Observable<FaqResponse> {
    return this.http.get<FaqResponse>(this.usersUrl, {headers: this.customHeaders});
  }
}
