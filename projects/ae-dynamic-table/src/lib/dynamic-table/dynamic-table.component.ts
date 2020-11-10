import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DynamicTableDataSource } from './dynamic-table-datasource';

@Component({
  selector: 'ae-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
export class DynamicTableComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  dataSource: DynamicTableDataSource;

  /**
   * The data to be shown.
   */
  @Input() data: { [key: string]: any }[] = [
    { id: 1, name: 'Ahmet Emrebas', title: 'Full Stack Engineer', skills: 'Angular, TypeScript, Angular Material, CSS, Java, Spring Boot 5, NodeJS, JavaScript' }
  ];

  /**
   * This field allows the users to view only desired columns.
   */
  @Input() displayedColumns = ['id', 'name', 'title', 'skills'];

  /**
   * This field allows users to modify the number of items shown at a time.
   */
  @Input() pageSizeOptions = [5, 10, 15, 20, 25, 50, 100, 250];

  ngOnInit(): void {
    this.dataSource = new DynamicTableDataSource();
    this.dataSource.data = this.data;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
