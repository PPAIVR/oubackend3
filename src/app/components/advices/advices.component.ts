import { Component, OnInit } from '@angular/core';
import {Advice} from "@app/components/advices/models/advices";
import {AdviceService} from "@app/components/advices/services/advice.service";

@Component({
  selector: 'anms-advices',
  templateUrl: './advices.component.html',
  styleUrls: ['./advices.component.css']
})
export class AdvicesComponent implements OnInit {
  advices: Advice[];
  constructor(private adviceService: AdviceService) { }

  ngOnInit() {
    this.adviceService.getAdvices().subscribe(data => {
      console.log('¡data');
      console.log(data);
      this.advices = data.data;
    });
  }

}
