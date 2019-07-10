import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { ApiService } from '../../core/service/api.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  userForm: FormGroup;
  // minDate: Date = new Date();
  // maxDate: Date = new Date();
  constructor(public formBuilder: FormBuilder, public data: ApiService, public dialogRef: MatDialogRef<EditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public userdata: any) {
    this.userForm = this.createUserForm();
    // this.maxDate.setFullYear(this.maxDate.getFullYear() - 10);
    // this.minDate.setFullYear(this.minDate.getFullYear() - 50);
  }

  ngOnInit() {
  }

  public createUserForm(): FormGroup {
    const editUser = this.userdata.editUser;
    return this.formBuilder.group({
      first_name: [editUser.first_name ? editUser.first_name : null,
      Validators.compose([Validators.required, Validators.pattern(this.data.namePattern),
      Validators.maxLength(20)])],
      last_name: [editUser.last_name ? editUser.last_name : null,
      Validators.compose([Validators.required, Validators.pattern(this.data.namePattern),
      Validators.maxLength(20)])],
      email: [editUser.email ? editUser.email : null,
      Validators.compose([Validators.required, Validators.pattern(this.data.emailPattern)])],
      DOB: [editUser.DOB ? editUser.DOB : new Date(), Validators.required]
    });
  }

  /* Date */
  public date(e) {
    const convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.userForm.get('DOB').setValue(convertDate);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
