import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { PopUpComponent } from 'src/app/shared/pop-up/pop-up.component';


@Component({
  selector: 'app-add-tenant',
  templateUrl: './add-tenant.component.html',
  styleUrls: ['./add-tenant.component.css']
})
export class AddTenantComponent {

  title: string = ''


  addTenantForm!: FormGroup
  popName: any;
  popUpData: any;
  // edited
  getSecVal: string = ''
  checkedOrNot: boolean = false
  inputVal: string = ''

  getMainVal(val: string) {
    this.inputVal = val

    if (this.checkedOrNot === true) {
      this.getSecVal = val
    }
  }



  constructor(private fb: FormBuilder, private auth: AuthService, private popUp: MatDialog) {
    this.addTenantForm = this.fb.group({
      tenantName: ['', Validators.required],
      extensions: ['', [Validators.required, Validators.pattern("^[0-9]{5}$")]],
      dispatcher: ['', [Validators.required, Validators.pattern("^[0-9]{5}$")]],
      domainName: [''],
      server: [''],
      defaultAddress: [''],
      billingAddress: [''],
      status: false,
      checkbox: true
    })

  }
  ngOnInit(): void {
    this.sameAsDefault()
  }

  addTenant() {
    const data = this.addTenantForm.value;
    console.log(data);
    this.popName = data.tenantName
    this.popUpData = `The new tenant ${this.popName} successfully added to the tenant List`


    this.auth.addTenant(data).subscribe((res) => {
      if (res) {
        console.log(res);
        // this.addTenantForm.reset();
        this.popUp.closeAll()
        this.popUp.open(PopUpComponent, { height: '300px', width: '500px', data: { message: this.popUpData } });

      }
      else {
        console.log('error');

      }
    })
  }
  // sameAsDefault() {
  //   const data = this.addTenantForm.value;

  //   this.addTenantForm.patchValue({
  //     billingAddress : data.defaultAddress
  //   })
  // }
  //  sameAsDefault(event:any) {
  //   if(event.target.checked){

  //   }

  // edited
  sameAsDefault() {
    let checkBtn = document.getElementById('checkBox')
    checkBtn?.addEventListener("change", () => {
      if (this.checkedOrNot === true) {
        this.getSecVal = this.inputVal
        this.addTenantForm.controls['billingAddress'].disable()

      }
      else {
        this.addTenantForm.controls['billingAddress'].enable()

      }
    })
  }


}



