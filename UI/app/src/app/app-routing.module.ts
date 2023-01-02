import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PopUpComponent } from './shared/pop-up/pop-up.component';
import { InactiveTenantComponent } from './tenant-manager/inactive-tenant/inactive-tenant.component';
import { TenantManagerComponent } from './tenant-manager/tenant-manager.component';
import { AddUserComponent } from './user-manager/add-user/add-user.component';
import { EditComponent } from './user-manager/edit/edit.component';
import { InactiveUserComponent } from './user-manager/inactive-user/inactive-user.component';
import { UserManagerComponent } from './user-manager/user-manager.component';

const routes: Routes = [
  {path : '',component:LoginComponent},
  {path: 'userManager',component : UserManagerComponent},
  {path : 'addUser', component:AddUserComponent},
  {path:'update/:id',component:EditComponent},
  {path : 'home',component: HomeComponent},
  {path : 'tenantManager',component:TenantManagerComponent},
  {path : 'inactiveUser', component : InactiveUserComponent},
  {path : 'inactiveTenant', component : InactiveTenantComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
