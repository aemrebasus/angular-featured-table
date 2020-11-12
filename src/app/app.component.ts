import { Component } from '@angular/core';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { DynamicTableComponent } from 'ae-dynamic-table';
import { AeComponentDocument } from 'projects/ae-component-document/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-featured-table';
  docInput: AeComponentDocument = {
    name: 'Table Component',
    sample: {
      name: 'Dynamic Table Component',
      HTML: `<a href="?name=Ahmet">Hello there</a>`,
      TS: 'const a = 100;',
      component: DynamicTableComponent,
    },
    description: 'This component allows user to create professional tables to present and analyze data.'
  };
}
