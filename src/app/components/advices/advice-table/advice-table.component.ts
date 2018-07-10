import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {Advice} from '@app/components/advices/models/advices';
import {first} from 'rxjs/operators';
import {EmployeeConfirmDialogComponent} from '@app/components/employees/employee-confirm-dialog/employee-confirm-dialog.component';
import {HttpClient} from '@angular/common/http';
import {AdviceService} from '@app/components/advices/services/advice.service';
import {EventsService} from '@app/common/services/events.service';



@Component({
  selector: 'anms-advice-table',
  templateUrl: './advice-table.component.html',
  styleUrls: ['./advice-table.component.css']
})
export class AdviceTableComponent implements OnInit, OnChanges {
  @Input() advices: Advice[];

  // displayedColumns: string[] = ['id', 'question', 'response', 'buttons'];
  displayedColumns: string[] = ['id', 'question', 'buttons'];
  dataSource: MatTableDataSource<Advice>;
  result_dialog: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, private adviceService: AdviceService,
              public snackBar: MatSnackBar, public dialog: MatDialog, private eventsService: EventsService) {}

  ngOnInit() {
    this.adviceService.getItems().subscribe(data => {
      this.advices = data.data;
      this.dataSource = new MatTableDataSource(this.advices);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    const self = this;
    this.eventsService.on('refreshTable', function(data) {
      if ( data.item_type === 'advice' ) {
        self.refreshTable();
      }
    });
  }

  setForEdit(advice) {
    const item = {
      item_type: 'advice',
      data: advice,
      action: 'edit'
    };
    this.eventsService.broadcast('setMode', item);
  }

  setForAdd() {
    const item = {
      item_type: 'advice',
      data: null,
      action: 'add'
    };
    this.eventsService.broadcast('setMode', item);
  }

  doDelete(id) {
    const self = this;
    this.openDialog('Eliminar consejo', 'Estas seguro de que quieres eliminar el consejo?')
      .afterClosed()
      .subscribe(result => {
        this.result_dialog = result;
        if (result) {
          this.adviceService.deleteItem(id)
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
    if (changes.advices && !changes.advices.isFirstChange()) {
      this.dataSource = new MatTableDataSource(this.advices);
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

  /*ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }*/
  refreshTable() {
    this.adviceService.getItems().subscribe(resp => {
      this.advices = resp.data;
      this.dataSource = new MatTableDataSource(this.advices);
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
