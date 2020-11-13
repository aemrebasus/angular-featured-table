import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { ClipboardModule } from '@angular/cdk/clipboard';


import { AeComponentDocumentComponent } from './ae-component-document.component';
import { AeComponentViewComponent } from './ae-component-view/ae-component-view.component';
import { AeTextContentComponent } from './ae-text-content/ae-text-content.component';

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
  providers: []
})
export class AeComponentDocumentModule {

  constructor() { }

}
