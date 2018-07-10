import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Advice, AdviceLang} from '@app/components/advices/models/advices';
import {LangService, Languages} from '@app/common/services/lang.service';
import {EventsService} from '@app/common/services/events.service';
import {AdviceService} from '@app/components/advices/services/advice.service';

@Component({
  selector: 'anms-advice-detail',
  templateUrl: './advice-detail.component.html',
  styleUrls: ['./advice-detail.component.css']
})
export class AdviceDetailComponent implements OnInit, OnChanges {
  @Input() advice: Advice;
  advicelang: AdviceLang;
  langs: Languages[];
  lang_id: number;
  constructor(private langService: LangService, private eventsService: EventsService, private adviceService: AdviceService) {
    this.advice = {} as Advice;
    this.langs = this.langService.getLangs();
    this.advice.lang_id = 1;
  }
  ngOnInit() {
    this.advicelang = {} as AdviceLang;
  }
  doSave() {
    const self = this;
    const postData = {
      'advice': this.advice,
      'advicelang': this.advicelang
    };
    this.adviceService.updateItem(postData).subscribe(
      data => {
        console.log(data);
        self.eventsService.broadcast('refreshTable', { item_type: 'advice'});
        self.eventsService.broadcast('setMode', { action: 'cancel' , item_type: 'advice'});
      }
    );
  }
  doCancel() {
    this.eventsService.broadcast('setMode', { action: 'cancel' , item_type: 'advice'});
  }

  toggleLang(event) {
    const current_id = this.advice.id;
    this.adviceService.getItem(current_id, event.value).subscribe(res => {
      this.advice = res;
      if (res.commentlangs[0]) {
        this.advicelang = res.commentlangs[0];
      } else {
        this.advicelang = {} as AdviceLang;
        this.advicelang.lang_id = event.value;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.advice && changes.advice.firstChange) {
      console.log(changes.advice.currentValue);
      this.adviceService.getItem(changes.advice.currentValue.id, 1).subscribe(res => {
        this.advice = res;
        if (res.commentlangs[0]) {
          this.advicelang = res.commentlangs[0];
        } else {
          this.advicelang = {} as AdviceLang;
        }
      });
    }
  }

}
