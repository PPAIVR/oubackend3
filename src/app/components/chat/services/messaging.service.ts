import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const ConversationClient: any = null;
const GATEWAY_URL = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  public client: any;
  public app: any;

  constructor(private http: HttpClient) {}
  initialize() {
    this.client = new ConversationClient(
      {
        debug: false
      }
    );
  }

  public getUserJwt(username: string): Promise<any> {
    return this.http.get(GATEWAY_URL + 'jwt/' + username + '?admin=true').toPromise().then((response: any) => response.user_jwt);
  }

}
