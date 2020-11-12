import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { AeComponentDocumentComponent } from './ae-component-document.component';
import { AeComponentViewComponent } from './ae-component-view/ae-component-view.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { AeTextContentComponent } from './ae-text-content/ae-text-content.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AeDynamicTableModule } from 'projects/ae-dynamic-table/src/public-api';

@NgModule({
  declarations: [AeComponentDocumentComponent, AeComponentViewComponent, AeTextContentComponent],
  imports: [
    CommonModule,
    HighlightModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    ClipboardModule
  ],
  exports: [AeComponentDocumentComponent, AeComponentViewComponent, AeTextContentComponent],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        lineNumbersLoader: () => import('highlightjs-line-numbers.js'), // Optional, only if you want the line numbers
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          css: () => import('highlight.js/lib/languages/css'),
          xml: () => import('highlight.js/lib/languages/xml'),
          json: () => import('highlight.js/lib/languages/xml')

        }
      }
    }
  ]
})
export class AeComponentDocumentModule {

  constructor() { }

}
