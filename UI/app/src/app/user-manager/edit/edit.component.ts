import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopUpComponent } from 'src/app/shared/pop-up/pop-up.component';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  editUserForm !: FormGroup
  // data: any = []
  popName: any
  popUpData: any;


  constructor(private fb: FormBuilder, private auth: AuthService, private route: ActivatedRoute, private router: Router, private popUp: MatDialog, @Inject(MAT_DIALOG_DATA) public datas: any
  ) {
    this.editUserForm = this.fb.group({
      fullName: [],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phonenumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      userName: [],
      editTenant: false,
      deleteTenant: false,
      status: false,
      password: []
    })

  }
  id: any
  ngOnInit() {
    console.log(this.datas);
    this.id = this.datas.dataKey
    this.auth.getUser(this.id).subscribe((res) => {
      console.log(res);
      this.editUserForm.patchValue({
        fullName: res.data[0].fullName,
        email: res.data[0].email,
        phonenumber: res.data[0].phonenumber,
        userName: res.data[0].userName,
        editTenant: res.data[0].editTenant,
        deleteTenant: res.data[0].deleteTenant,
        status: res.data[0].status,
        password: res.data[0].password

      })

    })

  }

  updateUser() {
    this.auth.updateUser(this.editUserForm.value, this.id).subscribe((res) => {

      this.popName = this.editUserForm.value.fullName
      this.popUpData = `The user data for ${this.popName} updated successfully`

      console.log(res);
      this.popUp.closeAll()
      this.popUp.open(PopUpComponent, { height: '300px', width: '500px', data: { message: this.popUpData } });

    })

  }
}
