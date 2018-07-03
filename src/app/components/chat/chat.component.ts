import { Component, OnInit } from '@angular/core';
import {$WebSocket, WebSocketSendMode} from 'angular2-websocket/angular2-websocket';

@Component({
  selector: 'anms-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  ws = new $WebSocket('ws://127.0.0.1:8080');
  constructor() { }

  ngOnInit() {

    // msg login
    const login = '{"type":"login","user_id":298,"ckey":"8e7a1c3f83e3b56549236625be317121"}';



    this.ws.onMessage((msg: MessageEvent) => {
      console.log('onMessage ', msg.data);
    }, {
      autoApply: false
    });

// set received message stream
    this.ws.getDataStream().subscribe(
      (msg) => {
        console.log('next', msg.data);
        this.ws.close(false);
      },
      (msg) => {
        console.log('error', msg);
      },
      () => {
        console.log('complete');
      }
    );

// send with default send mode (now default send mode is Observer)
    this.ws.send(login).subscribe(
      (msg) => {
        console.log('next', msg.data);
      },
      (msg) => {
        console.log('error', msg);
      },
      () => {
        console.log('complete');
      }
    );


    try {
      this.ws.send('by default, this will never be sent, because Observer is cold.');
      this.ws.send('by default, this will be sent, because Observer is hot.').publish().connect();
    } catch (e) {
      console.log('Exception catch1');
      console.log(e.message);
    }

    this.ws.setSend4Mode(WebSocketSendMode.Direct);
    this.ws.send('{"text":"hola direct"}');

    this.ws.send('{"text":"hola promise"}', WebSocketSendMode.Promise).then(
      (T) => {
        console.log('is send');
      },
      (T) => {
        console.log('not send');
      }
    );

    try {
      this.ws.send('{"text":"hola observer"}').subscribe(
        (msg) => {
          console.log('next', msg.data);
        },
        (msg) => {
          console.log('error', msg);
        },
        () => {
          console.log('complete');
        }
      );
    } catch (e) {
      console.log('Exception catch2');
      console.log(e.message);
    }

    // this.ws.close(false);    // close
    // this.ws.close(true);    // close immediately

  }



}
