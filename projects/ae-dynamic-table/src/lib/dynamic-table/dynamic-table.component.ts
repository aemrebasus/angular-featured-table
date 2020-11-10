import { Clipboard } from '@angular/cdk/clipboard';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

export interface DynamicTableConfig {

  /**
   * This field allows the users to view only desired columns.
   */
  displayedColumns: string[];

  /**
   * This field allows users to modify the number of items shown at a time.
   */
  pageSizeOptions: number[];

  /**
   * When user click the item, it is copied to clipboard.
   * This delimeter is between the key and value.
   */
  clipboardDelimeter: string;

  /**
   * Snackbar configuration
   */
  snackbar: MatSnackBarConfig;



}

@Component({
  selector: 'ae-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
export class DynamicTableComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  /**
   * Table data source
   */
  dataSource: MatTableDataSource<any>;

  /**
   * The data to be shown.
   */
  @Input() data: { [key: string]: any }[] = [
    { id: 1, name: 'Ahmet Emrebas', title: 'Full Stack Engineer', skills: 'Angular, TypeScript, Angular Material, CSS, Java, Spring Boot 5, NodeJS, JavaScript' },
    { id: 2, name: 'Ahmet Emrebas', title: 'Full Stack Engineer', skills: 'Angular, TypeScript, Angular Material, CSS, Java, Spring Boot 5, NodeJS, JavaScript' },
    { id: 3, name: 'Ahmet Emrebas', title: 'Full Stack Engineer', skills: 'Angular, TypeScript, Angular Material, CSS, Java, Spring Boot 5, NodeJS, JavaScript' },
  ];




  /**
   * Generla configuration of this component.
   */
  @Input() config: DynamicTableConfig = {

    /**
     * This field allows the users to view only desired columns.
     */
    displayedColumns: ['id', 'name', 'title', 'skills'],

    /**
     * This field allows users to modify the number of items shown at a time.
     */
    pageSizeOptions: [5, 10, 15, 20, 25, 50, 100, 250],

    /**
     * When user click the item, it is copied to clipboard.
     * This delimeter is between the key and value.
     */
    clipboardDelimeter: '\t=> ',

    /**
     * Snackbar configuration
     */
    snackbar: {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    }


  };



  /**
   * data list for filter input.
   */
  mappedData: any;

  constructor(private clipboard: Clipboard, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.mappedData = this.dataSource.data.reduce((p, c) => {
      const p$ = p ? p : {};
      return [...Object.values(p$), ...Object.values(c)];
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }


  applyFilter(event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.dataSource.data, event.previousIndex, event.currentIndex);
    this.dataSource.data = [...this.dataSource.data];
  }

  /**
   * Copy item content by id to clip board.
   */
  copyItemContentToClipboardById(id: number): void {
    const rawdata = this.data.find(e => e.id === id);
    const textToCopy = JSON.stringify(rawdata)
      .replace(/,"/g, '\n')
      .replace(/{|}/g, '')
      .replace(/:/g, `${this.config.clipboardDelimeter}`)
      .replace(/"/g, '');

    this.clipboard.copy(textToCopy);

    this.snackBarFromComponent(JSON.stringify(rawdata));
  }

  /**
   * Display basic snackbar message.
   */
  displayMessage(message: string): void {
    this.snackBar.open(
      message,
      null,
      { ...this.config.snackbar }
    );
  }

  /**
   * Display snackbar message with component view.
   */
  snackBarFromComponent(message: string): void {
    clipboardTemplateMessage$ = JSON.parse(message);
    this.snackBar.openFromComponent(
      ClipboardTeamplateComponent,
      { ...this.config.snackbar }
    );
  }

}

/**
 * Global variable to store the message and pass it to the snackboar template.
 */
let clipboardTemplateMessage$;


@Component({
  selector: 'ae-78999991231',
  template: `
              <h3>Copied to Clipboard</h3>
              <hr>

              <table>
                    <tr *ngFor="let d of data">
                      <td style="padding-right:10px;">{{d[0] | titlecase}}</td>
                      <td> {{d[1]}}</td>
                    </tr>
              </table>
  `,
})
export class ClipboardTeamplateComponent {
  data = Object.entries(clipboardTemplateMessage$);
}

