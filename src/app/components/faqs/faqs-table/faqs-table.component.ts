import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Faq} from '@app/components/faqs/models/faqs';
import {EventsService} from "@app/common/services/events.service";

@Component({
  selector: 'anms-faqs-table',
  templateUrl: './faqs-table.component.html',
  styleUrls: ['./faqs-table.component.css']
})
export class FaqsTableComponent implements OnInit, OnChanges {
  @Input() faqs: Faq[];

  displayedColumns: string[] = ['id', 'question','response', 'buttons'];
  dataSource: MatTableDataSource<Faq>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Output()
  activateEditMode = new EventEmitter<any>();

  setFaqForEdit(advice) {
    const item = {
      item_type: 'advice',
      data: advice
    };
    this.activateEditMode.emit(item);
  }
  constructor(private eventsService: EventsService) {}

  ngOnInit() {

    this.dataSource = new MatTableDataSource(this.faqs);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  setForEdit(advice) {
    const item = {
      item_type: 'faq',
      data: advice,
      action: 'edit'
    };
    this.eventsService.broadcast('setMode', item);
  }

  setForAdd() {
    const item = {
      item_type: 'faq',
      data: null,
      action: 'add'
    };
    this.eventsService.broadcast('setMode', item);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.faqs && !changes.faqs.isFirstChange()) {
      this.dataSource = new MatTableDataSource(this.faqs);
    }

    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        const change = changes[propName];
        // console.dir(change);
        if (change.isFirstChange()) {
          // console.log(`first change: ${propName}`);
        } else {
          // console.log(`prev: ${change.previousValue}, cur: ${change.currentValue}`);
        }
      }
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
