import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-inactive-user',
  templateUrl: './inactive-user.component.html',
  styleUrls: ['./inactive-user.component.css']
})
export class InactiveUserComponent implements OnInit {


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
  searchFilter : any
  orderHeader : string = ''
  isDescOrder : boolean = true
  pagingConfig: any

  currentPage: number = 1
  itemsPerPage: number = 10
  totalItems : number = 0

  ngOnInit(): void {


    this.fetchData();
    this.auth.reload.subscribe((_response) => {
      //  this.fetchData();


    });

  }


  fetchData() {
    this.auth.getinActiveUser().subscribe(
      (data: any) => {
        // console.log(data);
        this.data = data.result;


      },
      (error) => {
        console.log(error);
      }
    );
  }
  sort(headerName : string){
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

  openEditUser(editId: any) {
    console.log(editId);
    this.popUp.open(EditComponent, { width: '1000px', height: '500px', data: { dataKey: editId } });
  }
  openAddUser() {
    this.popUp.open(AddUserComponent, { width: '1000px', height: '500px' });
  }

}
