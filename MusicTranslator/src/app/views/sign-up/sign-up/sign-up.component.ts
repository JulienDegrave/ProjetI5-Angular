import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { UserService } from "src/app/services/user/user.service";

@Component({
  selector: 'app-sign-up',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  userData:any;
  //keyboard: Keyboard;
  value = "";
  constructor(private user: UserService) { }

  ngOnInit() {
    this.user.currentUserData.subscribe(userData => this.userData = userData)
  }
  
  signUp(data:any){
    
    this.user.changeData(data);
  }

  ngAfterViewInit() {
   
  }

  onChange = (input: string) => {
    this.value = input;
    console.log("Input changed", input);
  };





}