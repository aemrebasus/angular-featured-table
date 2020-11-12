import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AeDynamicTableModule } from 'projects/ae-dynamic-table/src/public-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AeComponentDocumentModule } from 'projects/ae-component-document/src/public-api';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AeDynamicTableModule,
    AeComponentDocumentModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    FontAwesomeModule,
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: function () { return import('highlight.js/lib/core'); },
        lineNumbersLoader: function () { return import('highlightjs-line-numbers.js'); }, // Optional, only if you want the line number}s
        languages: {
          typescript: function () { return import('highlight.js/lib/languages/typescript'); },
          css: function () { return import('highlight.js/lib/languages/css'); },
          xml: function () { return import('highlight.js/lib/languages/xml'); },
          json: function () { return import('highlight.js/lib/languages/xml'); }
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
