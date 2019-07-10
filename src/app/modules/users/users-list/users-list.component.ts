import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../../core/service/api.service';
import { environment } from '../../../../environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../dialog/confirmation-dialog/confirmation-dialog.component';
import { EditDialogComponent } from '../../../dialog/edit-dialog/edit-dialog.component';
import { CdkDragStart, CdkDropList, CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragHandle } from '@angular/cdk/drag-drop';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  @ViewChild('table', { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  usersEndPoint: any;
  allUsers: any = {
    id: String,
    first_name: String,
    last_name: String,
    email: String,
    DOB: String
  };
  displayedColumns: string[] = ['Id', 'First Name', 'Last Name', 'Email', 'Date of Birth', 'Action'];
  dataSource: MatTableDataSource<any>;
  loading: boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  constructor(public data: ApiService, public router: Router, public dialog: MatDialog, private breakpointObserver: BreakpointObserver) {
    this.usersEndPoint = environment.apiRoutes;
  }

  ngOnInit() {
    this.getAllUsers();
  }

  public getAllUsers() {
    this.loading = true;
    this.data.getDataX(this.usersEndPoint.userLists).subscribe((result) => {
      this.allUsers = result;
      this.loading = false;
      // console.log(this.allUsers);
      this.dataSource = new MatTableDataSource(this.allUsers);
      // console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, (err) => {
      this.loading = false;
      // console.log(err);
      this.data.openSnackBar('Error loading users list.', '', 'bg-danger');
    });
  }
  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  public openDeleteDialog(deleteUser): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: 'auto',
      data: `Are you sure want to delete ${deleteUser.first_name} ${deleteUser.last_name} ?`
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.data.deleteDataX(this.usersEndPoint.deleteUser + '/' + deleteUser.id).subscribe((res) => {
          this.getAllUsers();
          this.data.openSnackBar(`${res.first_name} ${res.last_name} deleted successfully`, '', 'bg-success');
        }, (err) => {
          // console.log(err);
          this.data.openSnackBar('Internal server, Please try again', '', 'bg-danger');
        });
      }
    });
  }
  public openEditDialog(editUser = { id: '', first_name: '', last_name: '', DOB: '' }): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: 'auto',
      data: { editUser }
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (typeof (result) !== 'undefined') {
        result.id = editUser.id ? editUser.id : '';
        // result.DOB = this.formatDate(result.DOB);
        result.id !== '' ? this.editUser(result) : this.addUser(result);
      }
    });
  }
  public editUser(userVal) {
    this.loading = true;
    this.data.putDataX(userVal, this.usersEndPoint.updateUser + '/' + userVal.id).subscribe((res) => {
      this.getAllUsers();
      this.data.openSnackBar(`${res.first_name} ${res.last_name} updated successfully`, '', 'bg-success');
    }, (err) => {
      this.loading = false;
      // console.log(err);
      this.data.openSnackBar('Internal server, Please try again', '', 'bg-danger');
    });
  }
  public addUser(userVal) {
    this.loading = true;
    this.data.postDataX(userVal, this.usersEndPoint.updateUser).subscribe((res) => {
      this.getAllUsers();
      this.data.openSnackBar(`${res.first_name} ${res.last_name} added successfully`, '', 'bg-success');
    }, (err) => {
      this.loading = false;
      // console.log(err);
      this.data.openSnackBar('Internal server, Please try again', '', 'bg-danger');
    });
  }
  // public formatDate(date) {
  //   const dateObj = new Date(date + 'T00:00:00');
  //   return new Intl.DateTimeFormat('en-US').format(dateObj);
  // }
  public dropTable(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.allUsers, event.previousIndex, event.currentIndex);
    this.table.renderRows();
  }
  public dragStarted(event: CdkDragDrop<any[]>) {
  }
  public dragEnded(event: CdkDragDrop<any[]>) {
  }
}
