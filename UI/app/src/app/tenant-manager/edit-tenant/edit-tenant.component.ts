import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { PopUpComponent } from 'src/app/shared/pop-up/pop-up.component';


@Component({
  selector: 'app-edit-tenant',
  templateUrl: './edit-tenant.component.html',
  styleUrls: ['./edit-tenant.component.css']
})
export class EditTenantComponent {

  editTenantForm !: FormGroup
  id: any;
  popName: any;
  popUpData:any

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public datas: any, private auth: AuthService, private popUp: MatDialog) {

    this.editTenantForm = this.fb.group({

      tenantName: ['', Validators.required],
      extensions: ['', Validators.required],
      dispatcher: ['', Validators.required],
      domainName: [],
      server: [],
      defaultAddress: [],
      billingAddress: [],
      status:false,

    })
  }
  ngOnInit() {

    console.log(this.datas);
    this.id = this.datas.dataKey
    this.auth.editTenant(this.id).subscribe((res) => {
      console.log(res);
      this.editTenantForm.patchValue({
        tenantName: res.data[0].TenantName,
        status:res.data[0].status,
        extensions: res.data[0].No_Of_extensions,
        dispatcher: res.data[0].dispatcher,
        domainName: res.data[0].DomainName,
        server: res.data[0].server,
        defaultAddress: res.data[0].default_address,
        billingAddress: res.data[0].billing_address,

      })

    })
  }
  sameAsDefault() {
    const data = this.editTenantForm.value;
    this.editTenantForm.patchValue({
      billingAddress: data.defaultAddress
    })
  }
  editTenant() {
    this.auth.updateTenant(this.editTenantForm.value, this.id).subscribe((res) => {
      // console.log(res);
      this.popName = this.editTenantForm.value.tenantName
      this.popUpData = `The tenant data for ${this.popName} updated successfully`


      if (res) {
        console.log(res);
        // this.editTenantForm.reset();
        this.popUp.closeAll()
        this.popUp.open(PopUpComponent, { height: '300px', width: '500px', data: { message:this.popUpData  } });

        // alert('new tenant added')
      }
      else {
        console.log('error');

      }

    })

  }

}




