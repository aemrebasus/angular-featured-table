export const sampleOne = {
    HTML: '<ae-dynamic-table [data]="tableData1" [config]="tableConfig1"></ae-dynamic-table>',

    TS: `

        import { DynamicTableComponent, DynamicTableConfig } from 'projects/ae-dynamic-table/src/public-api';


        tableData1 = [
            { name: 'user 1', points: 30, position: 10 },
            { name: 'user 2', points: 12, position: 2 },
            { name: 'user 3', points: 23, position: 8 },
            { name: 'user 4', points: 33, position: 1 },
        ];

        tableConfig1: DynamicTableConfig = {
            clipboardDelimeter: ',',
            copyToClipboardOnClick: true,
            displayedColumns: ['name', 'points', 'position'],
            filterDatalistActive: true,
            name: 'score board',
            filteredColumns: ['name', 'points'],
            pageSizeOptions: [1, 2, 3, 10, 20, 30, 40, 100, 200],
            snackbar: {
                verticalPosition: 'top',
                horizontalPosition: 'right',
                duration: 1000
            },
            snackbarActive: true,
        };
    `
};


