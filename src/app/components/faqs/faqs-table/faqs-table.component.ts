import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {Faq} from '@app/components/faqs/models/faqs';
import {EventsService} from "@app/common/services/events.service";
import {HttpClient} from "@angular/common/http";
import {AdviceService} from "@app/components/advices/services/advice.service";
import {EmployeeConfirmDialogComponent} from "@app/components/employees/employee-confirm-dialog/employee-confirm-dialog.component";
import {first} from "rxjs/operators";
import {FaqService} from "@app/components/faqs/services/faq.service";

@Component({
  selector: 'anms-faqs-table',
  templateUrl: './faqs-table.component.html',
  styleUrls: ['./faqs-table.component.css']
})
export class FaqsTableComponent implements OnInit, OnChanges {
  @Input() faqs: Faq[];

  displayedColumns: string[] = ['id', 'question', 'buttons'];
  dataSource: MatTableDataSource<Faq>;
  result_dialog: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, private faqService: FaqService,
              public snackBar: MatSnackBar, public dialog: MatDialog, private eventsService: EventsService) {}

  ngOnInit() {
    this.faqService.getItems().subscribe(data => {
      this.faqs = data.data;
      this.dataSource = new MatTableDataSource(this.faqs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    const self = this;
    this.eventsService.on('refreshTable', function(data) {
      if ( data.item_type === 'faq' ) {
        self.refreshTable();
      }
    });

    this.dataSource = new MatTableDataSource(this.faqs);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  setForEdit(faq) {
    const item = {
      item_type: 'faq',
      data: faq,
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

  doDelete(id) {
    const self = this;
    this.openDialog('Eliminar faq', 'Estas seguro de que quieres eliminar la faq?')
      .afterClosed()
      .subscribe(result => {
        this.result_dialog = result;
        if (result) {
          this.faqService.deleteItem(id)
            .pipe(first())
            .subscribe(
              data => {
                this.snackBar.open('Consejo eliminado con éxito', 'cerrar', { duration: 2000});
                self.refreshTable();
              },
              error => {
                this.snackBar.open('Error al eliminar: ' + error.message, 'cerrar', { duration: 2000});
              });
        } else {
          this.snackBar.open('Operación cancelada.', 'cerrar', { duration: 2000});
        }
      });
  }

  openDialog(title, question) {
    return this.dialog.open(EmployeeConfirmDialogComponent, {
      width: '400px',
      data: {title: title, question: question}
    });
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

  refreshTable() {
    this.faqService.getItems().subscribe(resp => {
      this.faqs = resp.data;
      this.dataSource = new MatTableDataSource(this.faqs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
