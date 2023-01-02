import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  isUser=false
  isTenant =false


  tenant(){
    this.isTenant = true
    this.isUser=false
  }
  user(){
    this.isUser =true
    this.isTenant= false
  }

}
