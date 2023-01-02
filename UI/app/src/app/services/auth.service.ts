import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private refreshPage = new Subject<void>

  get reload() {
    return this.refreshPage
  }
  // active users
  fetchData() {
    return this.http.get("http://localhost:3000/get")
  }
  addUser(data: any) {
    return this.http.post("http://localhost:3000/register", data).pipe(
      tap(() => {
        this.reload.next()
      })
    )
  }
  getinActiveUser() {
    return this.http.get("http://localhost:3000/inactive").pipe(
      tap(() => {
        this.reload.next()
      })
    )
  }
  getUser(id: any): Observable<any> {
    // let ids=id
    return this.http.get('http://localhost:3000/get/' + id)
  }
  updateUser(data: any, id: any) {
    return this.http.put('http://localhost:3000/update/' + id, data).pipe(
      tap(() => {
        this.reload.next()
      })
    )
  }

  // add tenant

  addTenant(data: any) {
    return this.http.post("http://localhost:3000/tenant", data).pipe(
      tap(() => {
        this.reload.next()
      })
    )
  }

  // GET active TENANT

  getTenant() {
    return this.http.get("http://localhost:3000/getTenant")
  }
  // GET INACTIVE TENANT
  getinActiveTenant() {
    return this.http.get("http://localhost:3000/getinActive")
  }

  editTenant(id: any): Observable<any> {
    return this.http.get("http://localhost:3000/tenant/" + id)
  }

  // update tenant
  updateTenant(data: any, id: any) {
    return this.http.put('http://localhost:3000/updateTenant/' + id, data).pipe(
      tap(() => {
        this.reload.next()
      })
    )
  }

}
