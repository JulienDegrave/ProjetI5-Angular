import { Component, CUSTOM_ELEMENTS_SCHEMA, NgModule, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  isConnected : boolean = false;
  constructor(private authSr:AuthService)
  {
    
  }

  ngOnInit(): void 
  {
    this.isConnected = this.authSr.hasSessionId();
  }
  
}
