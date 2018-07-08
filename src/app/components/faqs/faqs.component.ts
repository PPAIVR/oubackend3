import { Component, OnInit } from '@angular/core';
import {FaqService} from "@app/components/faqs/services/faq.service";
import {Faq} from "@app/components/faqs/models/faqs";

@Component({
  selector: 'anms-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {
  faqs: Faq[];
  constructor(private faqService: FaqService) { }

  ngOnInit() {
    this.faqService.getFaqs().subscribe(data => {
      this.faqs = data.data;
    });
  }

}
