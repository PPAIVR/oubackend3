import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LangService, Languages} from '@app/common/services/lang.service';
import {EventsService} from '@app/common/services/events.service';
import {FaqService} from '@app/components/faqs/services/faq.service';
import {Faq, FaqLang} from '@app/components/faqs/models/faqs';

@Component({
  selector: 'anms-faqs-detail',
  templateUrl: './faqs-detail.component.html',
  styleUrls: ['./faqs-detail.component.css']
})
export class FaqsDetailComponent implements OnInit, OnChanges {
  @Input() faq: Faq;
  faqlang: FaqLang;
  langs: Languages[];
  lang_id: number;
  constructor(private langService: LangService, private eventsService: EventsService, private faqService: FaqService) {
    this.faq = {} as Faq;
    this.langs = this.langService.getLangs();
    this.faq.lang_id = 1;
  }
  ngOnInit() {
    this.faqlang = {} as FaqLang;
  }
  doSave() {
    const self = this;
    const postData = {
      'faq': this.faq,
      'faqlang': this.faqlang
    };
    this.faqService.updateItem(postData).subscribe(
      data => {
        console.log(data);
        self.eventsService.broadcast('refreshTable', { item_type: 'faq'});
        self.eventsService.broadcast('setMode', { action: 'cancel' , item_type: 'faq'});
      }
    );
  }
  doCancel() {
    this.eventsService.broadcast('setMode', { action: 'cancel' , item_type: 'faq'});
  }

  toggleLang(event) {
    const current_id = this.faq.id;
    this.faqService.getItem(current_id, event.value).subscribe(res => {
      this.faq = res;
      if (res.faqlangs[0]) {
        this.faqlang = res.faqlangs[0];
      } else {
        this.faqlang = {} as FaqLang;
        this.faqlang.lang_id = event.value;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.faq && changes.faq.firstChange) {
      console.log(changes.faq.currentValue);
      this.faqService.getItem(changes.faq.currentValue.id, 1).subscribe(res => {
        this.faq = res;
        if (res.faqlangs[0]) {
          this.faqlang = res.faqlangs[0];
        } else {
          this.faqlang = {} as FaqLang;
        }
      });
    }
  }

}
