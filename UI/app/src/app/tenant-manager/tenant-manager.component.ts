import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AddTenantComponent } from './add-tenant/add-tenant.component';
import { EditTenantComponent } from './edit-tenant/edit-tenant.component';
@Component({
  selector: 'app-tenant-manager',
  templateUrl: './tenant-manager.component.html',
  styleUrls: ['./tenant-manager.component.css']
})
export class TenantManagerComponent {


  data: any = []
  active: any = []
  form = false
  message: string = ''
  isToggled = true;
  nonActive = false;
  Active = true;

  orderHeader: string = ''
  isDescOrder: boolean = true

  pagingConfig: any
  currentPage: number = 1
  itemsPerPage: number = 10
  totalItems : number = 0

  // dtoptions: DataTables.Settings = {}
  // dtTrigger: Subject<any> = new Subject<any>()

  searchFilter: any

  constructor(private auth: AuthService, private popUp: MatDialog) {

    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
     totalItems : this.totalItems
    }

  }

  ngOnInit(): void {

    // this.dtoptions = {
    //   pagingType: 'full_numbers',
    //   lengthChange: false,
    //   searching: false
    // }

    this.fetchData()
    this.getActiveUser()
    this.auth.reload.subscribe(_response => {
      this.fetchData()
    })

  }
  fetchData() {
    this.auth.getTenant().subscribe((data: any) => {
      console.log(data);
      this.data = data.result
      // this.dtTrigger.next(null)

      console.log(this.data);

    }, (error) => {
      console.log(error);
      // alert(error)
    })
  }



  sort(headerName: string) {
    this.isDescOrder = !this.isDescOrder
    this.orderHeader = headerName
  }
  onTableDataChange(event: any) {
    this.pagingConfig.currentPage = event
    this.fetchData()
  }
  onTableSizeChange(event: any): void {
    this.pagingConfig.itemsPerPage = event.target.value
    this.pagingConfig.currentPage = 1
    this.fetchData()
  }



  openAddTenant() {
    this.popUp.open(AddTenantComponent, { width: '1000px', height: '600px' });
  }
  openEditTenant(editId: any) {
    this.popUp.open(EditTenantComponent, { width: '1000px', height: '600px', data: { dataKey: editId } })
  }

  getActiveUser() {
    this.auth.fetchData().subscribe((res: any) => {
      console.log(res);
      this.active = res.result
      console.log(this.active);

    })
  }



}


