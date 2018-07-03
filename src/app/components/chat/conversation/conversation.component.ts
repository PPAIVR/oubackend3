import { Component, OnInit } from '@angular/core';
import {MessagingService} from '@app/components/chat/services/messaging.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

@Component({
  selector: 'anms-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  conversations: any;
  selectedConversation: any;
  text: string;
  events: Array<any> = [];
  constructor(private ms: MessagingService) { }
  buildConversationsArray(conversations) {
    const array = [];

    for (const conversation of conversations) {
      array.push(conversations[conversation]);
    }

    return array;
  }

  ngOnInit() {
    if (!this.ms.app) {
      // this.router.navigate(['/']);
    } else {
      this.ms.app.getConversations().then(conversations => {
        this.conversations = this.buildConversationsArray(conversations);
      });
    }
  }

  selectConversation(conversationId: string) {
    this.ms.app.getConversation(conversationId).then(conversation => {
        this.selectedConversation = conversation;

        Observable.from(conversation.events.values()).subscribe(
          event => {
            this.events.push(event);
          }
        );

        this.selectedConversation.on('text', (sender, message) => {
          this.events.push(message);
        });

        console.log('Selected Conversation', this.selectedConversation);
      }
    );
  }

  sendText(text: string) {
    this.selectedConversation.sendText(text).then(() => this.text = '');
  }
}
