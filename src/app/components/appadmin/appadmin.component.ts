import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTabChangeEvent, MatTabGroup} from '@angular/material';
import {Faq} from '@app/components/faqs/models/faqs';
import {Advice} from '@app/components/advices/models/advices';
import {EventsService} from '@app/common/services/events.service';

@Component({
  selector: 'anms-appadmin',
  templateUrl: './appadmin.component.html',
  styleUrls: ['./appadmin.component.css']
})
export class AppadminComponent implements OnInit {
  editMode = false;
  addMode = false;
  activeFaq: Faq;
  activeAdvice: Advice;
  addType: string;
  @ViewChild(MatTabGroup) mattab: MatTabGroup;

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.setActionListeners();
  }

  setActionListeners() {
    const self = this;
    this.eventsService.on('setMode', function(data) {
      console.log(data);
      if (data.action === 'edit') {
        self.activateEditMode(data);
      }
    });
    this.eventsService.on('setMode', function(data) {
      console.log(data);
      if (data.action === 'edit') {
        self.activateEditMode(data);
      }
    });
  }

  activateEditMode(item) {
    console.log('Parent:');
    console.log(item);
    this.addMode = false;
    if (item.item_type === 'faq') {
      this.activeAdvice = null;
      this.activeFaq = item.data;
    } else {
      this.activeFaq = null;
      this.activeAdvice = item.data;
    }
    this.editMode = true;
    this.mattab.selectedIndex = 4;
  }

  activateAddMode(item) {
    console.log('Parent:');
    console.log(item);
    this.editMode = false;
    this.activeAdvice = null;
    this.activeFaq = null;
    if (item.item_type === 'faq') {
      this.addType = 'faq';
    } else {
      this.addType = 'faq';
    }
    this.addMode = true;
    this.mattab.selectedIndex = 5;
  }

  onLinkClick(event: MatTabChangeEvent) {
    console.log('event => ', event);
    console.log('index => ', event.index);
    console.log('tab => ', event.tab);
    if (event.index !== 4 && event.index !== 5) {
      this.addMode = false;
      this.editMode = false;
      this.activeFaq = null;
      this.activeAdvice = null;
    }
  }

}
