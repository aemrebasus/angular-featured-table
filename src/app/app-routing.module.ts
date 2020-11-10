import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicTableComponent } from 'projects/ae-dynamic-table/src/lib/dynamic-table/dynamic-table.component';

const routes: Routes = [
  { path: '', component: DynamicTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
