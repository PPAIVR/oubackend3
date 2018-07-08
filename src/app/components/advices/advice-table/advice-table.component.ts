import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Advice} from "@app/components/advices/models/advices";


@Component({
  selector: 'anms-advice-table',
  templateUrl: './advice-table.component.html',
  styleUrls: ['./advice-table.component.css']
})
export class AdviceTableComponent implements OnInit {
  @Input() advices: Advice[];

  displayedColumns: string[] = ['id', 'question','response','buttons'];
  dataSource: MatTableDataSource<Advice>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {}

  ngOnInit() {

    this.dataSource = new MatTableDataSource(this.advices);



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
