import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit 
{

  constructor() {

  }
  
  ngOnInit(): void {
    
  }

  public setSessionId(id: string) {
    localStorage.setItem('session_id', id);
  }

  public hasSessionId(): boolean {
    return localStorage.getItem('session_id') != null;
  }

  public getSessionId(): string {
    var id = localStorage.getItem('session_id');
    if(id == null) {
      id = ''
    }
    return id;
  }

  public logout() {
    localStorage.removeItem('session_id');
    location.reload();
  }
}