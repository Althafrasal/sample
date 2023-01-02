import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AddUserComponent } from './user-manager/add-user/add-user.component'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatDialogModule } from '@angular/material/dialog';
import { EditComponent } from './user-manager/edit/edit.component';
import { HeaderComponent } from './header/header.component';
import { TenantManagerComponent } from './tenant-manager/tenant-manager.component';
import { HomeComponent } from './home/home.component';
import { EditTenantComponent } from './tenant-manager/edit-tenant/edit-tenant.component';
import { AddTenantComponent } from './tenant-manager/add-tenant/add-tenant.component';
import { MatTableModule } from '@angular/material/table';
import { DataTablesModule } from 'angular-datatables';
import { InactiveUserComponent } from './user-manager/inactive-user/inactive-user.component';
import { InactiveTenantComponent } from './tenant-manager/inactive-tenant/inactive-tenant.component';
import { PopUpComponent } from './shared/pop-up/pop-up.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserManagerComponent,
    AddUserComponent,
    EditComponent,
    HeaderComponent,
    TenantManagerComponent,
    HomeComponent,
    EditTenantComponent,
    AddTenantComponent,
    InactiveUserComponent,
    InactiveTenantComponent,
    PopUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, MatSlideToggleModule, HttpClientModule, FormsModule,
    ReactiveFormsModule, BrowserAnimationsModule, MatDialogModule, MatTableModule, DataTablesModule, Ng2SearchPipeModule,
     OrderModule,NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
