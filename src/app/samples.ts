export const sampleOne = {
  HTML: '<ae-dynamic-table [data]="tableData1" [config]="DEFAULT_DYNAMICTABLE_CONFIG"></ae-dynamic-table>',

  TS: `

        import { DynamicTableConfig } from 'projects/ae-dynamic-table/src/public-api';

        data:{[key:string]:any}[] = [
            {"id":1,"name":"Ahmet Emrebas","title":"Full Stack Engineer","skills":"Angular, TypeScript, Angular Material, CSS, Java, Spring Boot 5, NodeJS, JavaScript"},
            {"id":2,"name":"Ahmet Emrebas","title":"Full Stack Engineer","skills":"Angular, TypeScript, Angular Material, CSS, Java, Spring Boot 5, NodeJS, JavaScript"},
            {"id":3,"name":"Ahmet Emrebas","title":"Full Stack Engineer","skills":"Angular, TypeScript, Angular Material, CSS, Java, Spring Boot 5, NodeJS, JavaScript"}
        ]

        DEFAULT_DYNAMICTABLE_CONFIG: DynamicTableConfig = {
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
            filterDatalistActive: true,
            downloadButtons: true,
            filterColumnsButton: true,
            searchbarActive: true,
            toolbar: true
          };
    `
};


