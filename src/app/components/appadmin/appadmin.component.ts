import { Component, OnInit } from '@angular/core';
import {Advice} from "@app/components/advices/models/advices";
import {AdviceService} from "@app/components/advices/services/advice.service";

@Component({
  selector: 'anms-appadmin',
  templateUrl: './appadmin.component.html',
  styleUrls: ['./appadmin.component.css']
})
export class AppadminComponent implements OnInit {
  advices: Advice[];
  constructor(private adviceService: AdviceService) { }

  ngOnInit() {
    this.adviceService.getAdvices().subscribe(data => {
      this.advices = data.data;
    });
  }

}
