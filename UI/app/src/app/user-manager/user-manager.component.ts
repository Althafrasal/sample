import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { AddUserComponent } from './add-user/add-user.component';
import { EditComponent } from './edit/edit.component';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css'],
})


export class UserManagerComponent implements OnInit {


  constructor(private auth: AuthService, private popUp: MatDialog) {

    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
     totalItems : this.totalItems
    }
  }

  data: any = [];
  active: any = [];
  form = false;
  message: string = '';
  isToggled = true;
  nonActive = false;
  Active = true;
  dtoptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject<any>()
  searchFilter: any
  orderHeader: string = ''
  isDescOrder: boolean = true
  pagingConfig: any

  currentPage: number = 1
  itemsPerPage: number = 10
  totalItems : number = 0


  ngOnInit(): void {

    this.fetchData();
    this.auth.reload.subscribe((_response) => {
      this.fetchData();

    });

  }
  sort(headerName: string) {
    this.isDescOrder = !this.isDescOrder
    this.orderHeader = headerName

  }
  fetchData() {
    this.auth.fetchData().subscribe(
      (data: any) => {
        console.log(data);
        this.data = data.result;
        console.log(this.data);

      },
      (error) => {
        console.log(error);
        // alert(error)
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



  openAddUser() {
    this.popUp.open(AddUserComponent, { width: '1000px', height: '500px' });
  }
  openEditUser(editId: any) {
    console.log(editId);
    this.popUp.open(EditComponent, { width: '1000px', height: '500px', data: { dataKey: editId } });
  }

}
