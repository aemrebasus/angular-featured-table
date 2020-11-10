import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DynamicTableItem {
  name: string;
  id: number;
  extra: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DynamicTableItem[] = [
  { id: 1, name: 'Hydrogen', extra: 3 },
  { id: 2, name: 'Helium', extra: 3 },
  { id: 3, name: 'Lithium', extra: 3 },
  { id: 4, name: 'Beryllium', extra: 3 },
  { id: 5, name: 'Boron', extra: 3 },
  { id: 6, name: 'Carbon', extra: 3 },
  { id: 7, name: 'Nitrogen', extra: 3 },
  { id: 8, name: 'Oxygen', extra: 3 },
  { id: 9, name: 'Fluorine', extra: 3 },
  { id: 10, name: 'Neon', extra: 3 },
  { id: 11, name: 'Sodium', extra: 3 },
  { id: 12, name: 'Magnesium', extra: 3 },
  { id: 13, name: 'Aluminum', extra: 3 },
  { id: 14, name: 'Silicon', extra: 3 },
  { id: 15, name: 'Phosphorus', extra: 3 },
  { id: 16, name: 'Sulfur', extra: 3 },
  { id: 17, name: 'Chlorine', extra: 3 },
  { id: 18, name: 'Argon', extra: 3 },
  { id: 19, name: 'Potassium', extra: 3 },
  { id: 20, name: 'Calcium', extra: 3 },
];

/**
 * Data source for the DynamicTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DynamicTableDataSource extends DataSource<DynamicTableItem> {
  data: DynamicTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DynamicTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DynamicTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DynamicTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
