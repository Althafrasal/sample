import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from 'src/app/shared/pop-up/pop-up.component';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  addUserForm: FormGroup;
  data: any = []
  popName : any
  popUpData : any


  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router , private reactiveForm:ReactiveFormsModule,private popUp: MatDialog) {

    this.addUserForm = this.fb.group({
      fullName: ['',Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phonenumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      userName: [],
      editTenant:false,
      delete: false,
      status:false,
      password: []
    })
  }

  addUser() {
    const data = this.addUserForm.value
    console.log(data);

    this.popName = data.userName
    this.popUpData = `The new user ${this.popName} successfully added to the User List`

    this.auth.addUser(data).subscribe((res) => {
      if (res) {
        console.log(res);
        // this.addUserForm.reset();
        this.popUp.closeAll()
        this.popUp.open(PopUpComponent,{height :'300px',width :'500px', data : {message : this.popUpData}});
      }
      else {
        console.log('error');

      }
    })

  }
}
