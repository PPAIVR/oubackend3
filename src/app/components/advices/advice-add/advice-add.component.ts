import { Component, OnInit } from '@angular/core';
import {Advice} from '@app/components/advices/models/advices';
import {LangService, Languages} from "@app/common/services/lang.service";
import {EventsService} from "@app/common/services/events.service";
import {AdviceService} from "@app/components/advices/services/advice.service";



@Component({
  selector: 'anms-advice-add',
  templateUrl: './advice-add.component.html',
  styleUrls: ['./advice-add.component.css']
})
export class AdviceAddComponent implements OnInit {
  advice: Advice;
  langs: Languages[];
  lang_id: number;
  constructor(private langService: LangService, private eventsService: EventsService, private adviceService: AdviceService) {
    this.advice = {} as Advice;
    this.langs = this.langService.getLangs();
    this.advice.lang_id = 1;
  }
  ngOnInit() {
  }
  doSave() {
    const self = this;
    this.adviceService.addItem(this.advice).subscribe(
      data => {
        console.log(data);
        self.eventsService.broadcast('refreshTable',{ item_type: 'advice'});
        self.eventsService.broadcast('setMode', { action: 'cancel' , item_type: 'advice'});
      }
    );
  }
  doCancel() {
    this.eventsService.broadcast('setMode', { action: 'cancel' , item_type: 'advice'});
  }

}
