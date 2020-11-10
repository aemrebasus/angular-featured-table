import { NgModule } from '@angular/core';
import { AeDynamicTableComponent } from './ae-dynamic-table.component';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [AeDynamicTableComponent, DynamicTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    DragDropModule
  ],
  exports: [AeDynamicTableComponent, DynamicTableComponent]
})
export class AeDynamicTableModule { }
