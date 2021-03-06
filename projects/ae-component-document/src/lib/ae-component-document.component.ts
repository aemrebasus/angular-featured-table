import { Component, Input, OnInit } from '@angular/core';
import { AeComponentView } from './ae-component-view/ae-component-view.component';

export interface ComponentInput {
  name: string;
  type: string;
  description: string;
}

export interface SingleComponent {
  name: string;
  componentHTML: string;
  componentTS: string;
  componentInputs: ComponentInput[];
  componentEvents: ComponentInput[];
}

export interface AeComponentDocument {

  name?: string;
  moduleName?: string;
  sample?: AeComponentView;

  /**
   * List of ...
   */
  componentExamples?;

  description?: string;

}

@Component({
  selector: 'ae-component-document',
  templateUrl: './ae-component-document.component.html',
  styleUrls: ['./ae-component-document.component.css']

})
export class AeComponentDocumentComponent implements OnInit {

  @Input() input: AeComponentDocument = {
    name: 'Component Name',
    moduleName: `import {AeDynamicTableModule} from 'ae-dynamic-table';`,
    sample: {
      name: 'Test Name',
      HTML: '<h1>Test TS<h1>',
      CSS: '.test-css{ color:red}',
      TS: 'const testTS = 100;'
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

}
