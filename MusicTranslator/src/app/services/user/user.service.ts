import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class UserService {
  private userDataSource = new BehaviorSubject({login : '', password : ''});
  currentUserData = this.userDataSource.asObservable();
  constructor() { }
  changeData(newUserData:any) {
    this.userDataSource.next(newUserData)
  }
}