import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";

export interface SubsData {
  id: number,
  type: string;
  type_id: number;
  start: string;
  end: string;
}




@Component({
  selector: 'anms-user-subs-table',
  templateUrl: './user-subs-table.component.html',
  styleUrls: ['./user-subs-table.component.css']
})
export class UserSubsTableComponent implements OnInit {
  @Input() subscriptions: any[];
  subsdata: SubsData[] = [];
  displayedColumns: string[] = ['id', 'type', 'type_id', 'start', 'end', 'buttons'];
  dataSource: MatTableDataSource<SubsData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {}

  ngOnInit() {

    this.subscriptions.forEach(value => {
      console.log(value);
      this.subsdata.push(
        {
          id:value.id,
          type: value.subscriptiondata.description,
          type_id: value.subscription_id,
          start:value.date_start,
          end:value.date_end
        }
      );
    });

    this.dataSource = new MatTableDataSource(this.subsdata);

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
