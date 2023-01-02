import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AddTenantComponent } from '../add-tenant/add-tenant.component';
import { EditTenantComponent } from '../edit-tenant/edit-tenant.component';

@Component({
  selector: 'app-inactive-tenant',
  templateUrl: './inactive-tenant.component.html',
  styleUrls: ['./inactive-tenant.component.css']
})
export class InactiveTenantComponent {

  constructor(private auth: AuthService, private popUp: MatDialog) {

    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
     totalItems : this.totalItems
    }

   }

  data: any = [];
  dtoptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject<any>()
  searchFilter:any

  orderHeader:string=''
  isDescOrder:boolean=true

  pagingConfig: any
  currentPage: number = 1
  itemsPerPage: number = 10
  totalItems : number = 0

  ngOnInit(): void {

    this.dtoptions = {
      pagingType: 'full_numbers',
      lengthChange: false,
      searching : false

    }
    this.fetchData();

    this.auth.reload.subscribe((_response) => {
       this.fetchData();
      // this.dtTrigger.next(null)
    });

  }

  sort(headerName:string){
    this.isDescOrder = !this.isDescOrder
    this.orderHeader = headerName
  }



  fetchData() {
    this.auth.getinActiveTenant().subscribe(
      (data: any) => {
        console.log(data);
        this.data = data.result;
        this.dtTrigger.next(null)

        console.log(this.data);
      },
      (error) => {
        console.log(error);
      }
    );
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

  openEditTenant(editId: any) {
    console.log(editId);
    this.popUp.open(EditTenantComponent, { width: '1000px', height: '500px', data: { dataKey: editId } });
  }
  openAddUser() {
    this.popUp.open(AddTenantComponent, { width: '1000px', height: '500px' });
  }
}
