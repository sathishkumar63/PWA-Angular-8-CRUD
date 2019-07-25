import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { NewUserListComponent } from './new-user-list/new-user-list.component';

const routes: Routes = [
  {
    path: '', component: UsersComponent, children: [
      {
        path: '', children: [
          { path: 'userslist', component: UsersListComponent },
          { path: 'lists', component: NewUserListComponent },
          { path: '', component: NewUserListComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
