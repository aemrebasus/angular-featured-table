import { Component } from '@angular/core';
import { DynamicTableComponent, DynamicTableConfig } from 'projects/ae-dynamic-table/src/public-api';
import { AeComponentDocument } from 'projects/ae-component-document/src/public-api';
import { sampleOne } from './samples';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-featured-table';
  docInput: AeComponentDocument = {
    name: 'Table Component',
    moduleName: `import { AeDynamicTableModule } from 'ae-dynamic-table';`,
    sample: {
      name: 'Sample table component',
      HTML: sampleOne.HTML,
      TS: sampleOne.TS,
      component: DynamicTableComponent,
    },
    description: `Build easy and quick tables.`,
    componentExamples: [
      {}
    ]
  };
}
