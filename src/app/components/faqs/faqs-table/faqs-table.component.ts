import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Faq} from "@app/components/faqs/models/faqs";

@Component({
  selector: 'anms-faqs-table',
  templateUrl: './faqs-table.component.html',
  styleUrls: ['./faqs-table.component.css']
})
export class FaqsTableComponent implements OnInit {
  @Input() faqs: Faq[];

  displayedColumns: string[] = ['id', 'question','response', 'buttons'];
  dataSource: MatTableDataSource<Faq>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {}

  ngOnInit() {

    this.dataSource = new MatTableDataSource(this.faqs);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
