import { Component, OnInit } from '@angular/core';
import {Faq} from "@app/components/faqs/models/faqs";
import {LangService, Languages} from "@app/common/services/lang.service";
import {EventsService} from "@app/common/services/events.service";
import {FaqService} from "@app/components/faqs/services/faq.service";



@Component({
  selector: 'anms-faqs-add',
  templateUrl: './faqs-add.component.html',
  styleUrls: ['./faqs-add.component.css']
})
export class FaqsAddComponent implements OnInit {
  faq: Faq;
  langs: Languages[];
  lang_id: number;
  constructor(private langService: LangService, private eventsService: EventsService, private faqService: FaqService) {
    this.faq = {} as Faq;
    this.langs = this.langService.getLangs();
    this.faq.lang_id = 1;
  }
  ngOnInit() {
  }
  doSave() {
    const self = this;
    this.faqService.addItem(this.faq).subscribe(
      data => {
        console.log(data);
        self.eventsService.broadcast('refreshTable',{ item_type: 'faq'});
        self.eventsService.broadcast('setMode', { action: 'cancel' , item_type: 'faq'});
      }
    );
  }
  doCancel() {
    this.eventsService.broadcast('setMode', { action: 'cancel' , item_type: 'faq'});
  }

}
