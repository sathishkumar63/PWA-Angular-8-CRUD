import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared-modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { NewUserListComponent } from './new-user-list/new-user-list.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [UsersComponent, UsersListComponent, NewUserListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    DataTablesModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
