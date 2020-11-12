// tslint:disable: no-unused-expression
import { Clipboard } from '@angular/cdk/clipboard';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, Subscription } from 'rxjs';


export interface DynamicTableConfig {

  /**
   * name of the entity/data etc that help us to store the state of this component based on the entity type.
   */
  name?: string;

  /**
   * This field allows the users to view only desired columns.
   */
  displayedColumns?: string[];

  /**
   * This field allows the user to select/deselect columns usering the filter button.
   */
  filteredColumns?: string[];
  /**
   * This field allows users to modify the number of items shown at a time.
   */
  pageSizeOptions?: number[];

  /**
   * When user click the item, it is copied to clipboard.
   * This delimeter is between the key and value.
   */
  clipboardDelimeter?: string;

  /**
   * When it is true, popup messages will be shown if any.
   */
  snackbarActive?: boolean;

  /**
   * Snackbar configuration
   */
  snackbar?: MatSnackBarConfig;

  /**
   * When it is true, clipboard copy will be active for table content.
   */
  copyToClipboardOnClick?: boolean;

  /**
   * Filter data list support
   */
  filterDatalistActive?: boolean;

}


export const DEFAULT_DYNAMICTABLE_CONFIG: DynamicTableConfig = {
  name: 'undefined',
  displayedColumns: ['id', 'name', 'title', 'skills'],
  filteredColumns: ['id', 'name', 'title', 'skills'],
  pageSizeOptions: [5, 10, 15, 20, 25, 50, 100, 250],
  clipboardDelimeter: '\t=> ',
  snackbarActive: true,
  snackbar: {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'bottom'
  },
  copyToClipboardOnClick: true,
  filterDatalistActive: true
};


export type GenObjectType = { id: number, [key: string]: any };

@Component({
  selector: 'ae-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
export class DynamicTableComponent implements AfterViewInit, OnInit, OnDestroy {


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  /**
   * @Output when user click on an intem in the table, this emitter emits the id of the item.
   */
  @Output() selected = new EventEmitter<GenObjectType>();

  /**
   * Table data source
   */
  dataSource: MatTableDataSource<any>;

  /**
   * The last item that user clicked on.
   */
  selectedItem: Subject<GenObjectType> = new Subject();
  selectedItem$: GenObjectType;

  /**
   * The last item as string that user clicked on
   */
  selectedItemAsText: Subject<string> = new Subject();
  selectedItemAsText$: string;

  /**
   * @Input The data to be shown.
   */
  @Input() data: { [key: string]: any }[] = [
    { id: 1, name: 'Ahmet Emrebas', title: 'Full Stack Engineer', skills: 'Angular, TypeScript, Angular Material, CSS, Java, Spring Boot 5, NodeJS, JavaScript' },
    { id: 2, name: 'Ahmet Emrebas', title: 'Full Stack Engineer', skills: 'Angular, TypeScript, Angular Material, CSS, Java, Spring Boot 5, NodeJS, JavaScript' },
    { id: 3, name: 'Ahmet Emrebas', title: 'Full Stack Engineer', skills: 'Angular, TypeScript, Angular Material, CSS, Java, Spring Boot 5, NodeJS, JavaScript' },
  ];


  /**
   * @Input Generla configuration of this component.
   */
  @Input() config: DynamicTableConfig = DEFAULT_DYNAMICTABLE_CONFIG;


  /**
   * data list for filter input.
   */
  mappedData: any;


  /**
   * The current item that user move the mouse over
   */
  hoveredItem: any;


  // =======================================================Life Cycle========================================

  /**
   * Store all RXJS subscriptions.
   */
  subscriptions: Subscription[] = [];

  constructor(private clipboard: Clipboard, private snackbar: MatSnackBar) {

  }


  ngOnInit(): void {

    this.config = {
      ...DEFAULT_DYNAMICTABLE_CONFIG,
      ...this.config
    };

    this.dataSource = new MatTableDataSource(this.data);

    this.mappedData = this.dataSource.data.reduce((p, c) => {
      const p$ = p ? p : {};
      return [...Object.values(p$), ...Object.values(c)];
    });

    // Subscribing all events.
    this.subscribeEvents();

  }

  subscribeEvents(): void {
    this.subscriptions.push(

      // When item selected/clicked
      this.selectedItem.subscribe(updated => {
        this.selectedItem$ = updated;
        this.selectedItemAsText.next(this.toText(updated));
      }),

      // When item selected clicked
      this.selectedItemAsText.subscribe(updated => {
        this.selectedItemAsText$ = updated;

        // If clipboard activated in the configuration, copy the item content to clipboard.
        this.isClipboardActive() && this.copyItemContentToClipboard();

        // If snackbar is activated in the configuration, display the item content as a Popup message.
        this.isSnackbarActive() && this.snackbarMessage();

      })

    );
  }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }


  /**
   * @important unsubscribe all the subsriptions.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  // =======================================================Life Cycle========================================

  applyFilter(event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * When item is dropped on table.
   */
  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.dataSource.data, event.previousIndex, event.currentIndex);
    this.dataSource.data = [...this.dataSource.data];
  }

  dropFilterSelect(event): void {
    moveItemInArray(this.config.displayedColumns, event.previousIndex, event.currentIndex);
    moveItemInArray(this.config.filteredColumns, event.previousIndex, event.currentIndex);
    this.config.displayedColumns = [...this.config.displayedColumns];
    this.config.filteredColumns = [...this.config.filteredColumns];
  }


  /**
   * When user click the table row, this method runs.
   * if the copyToCLipboardOnCLick is active, the item value will be copied to clipboard
   * Also the item object will be emitted to parent component.
   */
  clickedTheTableRow(id: number): void {
    const item$$ = this.getItemById(id);
    this.selectedItem.next(item$$);
    this.selectedItemAsText.next(this.toText(item$$));
  }

  /**
   * When user mouser enter the table row, run this method.
   * Set the hovered item to the hoverItem
   */
  mouseenterAction(event, id: number): void {
    // TODO
    // this.hoveredItem = this.data.find(e => e.id === id);
    // console.log(event);
    // console.log(id);
  }


  /**
   * Copy item content by id to clip board if it is subscribed (clipboard should be activeted in cofiguration)
   */
  copyItemContentToClipboard(): void {
    this.clipboard.copy(this.selectedItemAsText$);
  }

  /**
   * Prepare the data for copy
   */
  toText(data: GenObjectType): string {
    return JSON.stringify(data)
      .replace(/,"/g, '\n')
      .replace(/{|}/g, '')
      .replace(/:/g, `${this.config.clipboardDelimeter}`)
      .replace(/"/g, '');
  }

  /**
   * Get item from the data list by id
   */
  getItemById(id: number): any {
    return this.data.find(e => e.id === id);
  }


  snackbarMessage(): void {
    clipboardTemplateMessage$ = this.selectedItem$;
    this.snackbar.openFromComponent(ClipboardTeamplateComponent);
  }

  /**
   * When user clicks on the filter list, it remains open. the default action is close.
   * We do not want to close the list because user might select multiple item from the list.
   */
  clickedFilterList(event): void {
    event.preventDefault();
  }


  toCSV(): void {
    let csvData = 'data:text/csv;charset=utf-8;,';
    this.getFilteredData()
      .forEach(d => {
        csvData += Object.values(d).join(',') + '\n';
      });
    csvData = encodeURI(csvData);
    window.open(csvData);
  }

  toJSON(): void {
    let jsonData = 'data:text/csv;charset=utf-8,';
    jsonData += JSON.stringify(this.getFilteredData());
    jsonData = encodeURI(jsonData);
    window.open(jsonData);
  }

  getFilteredData(): { [key: string]: any }[] {
    return this.data.map(e => {
      const obj = {};
      this.config.filteredColumns.forEach(f => {
        obj[f] = e[f];
      });
      return obj;
    });
  }

  isSnackbarActive(): boolean { return this.config.snackbarActive; }
  isClipboardActive(): boolean { return this.config.copyToClipboardOnClick; }

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

