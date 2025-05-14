import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AgGridModule } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';
import { FillFormDialogComponent } from './admin/fill-form-dialog/fill-form-dialog.component';

@NgModule({
  declarations: [
    UserDashboardComponent,
    FillFormDialogComponent
  ],
  imports: [
    CommonModule,
    AgGridModule,
    RouterModule
  ]
})
export class UserModule { }
