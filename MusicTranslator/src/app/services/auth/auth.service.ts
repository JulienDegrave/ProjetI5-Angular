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
    //return "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJhOXBnOUw4SjVaOHFsVEJTUE1Pb0lJTUVfUnBsQ09jRnpvQ2d5NENMY2dvIn0.eyJleHAiOjE2ODEwNTc4NTAsImlhdCI6MTY4MTA1MDY1MCwianRpIjoiYTI3ZTY1NGMtMDc0NC00OTkzLWI4NDktNGZmOTM5NTM0Nzc0IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9TcHJpbmdCb290S2V5Y2xvYWNrIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjM4MDU2NzIwLTQ4ZjEtNDU1My1hMjIzLTliYWRkNDM0MTMwZSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImxvZ2luLWFwcCIsInNlc3Npb25fc3RhdGUiOiI0ODlkNjQ1OC0zMjA5LTRkNTItOTM0Ni0wNTViOTU4ZWUzYzAiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1zcHJpbmdib290a2V5Y2xvYWNrIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInVzZXIiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiI0ODlkNjQ1OC0zMjA5LTRkNTItOTM0Ni0wNTViOTU4ZWUzYzAiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJKdWxpZW4gRGVncmF2ZSIsInByZWZlcnJlZF91c2VybmFtZSI6Imp1bGllbiIsImdpdmVuX25hbWUiOiJKdWxpZW4iLCJmYW1pbHlfbmFtZSI6IkRlZ3JhdmUiLCJlbWFpbCI6Imp1bGllbmRlZ3JhdmVza3lAZ21haWwuY29tIn0.sbGSWkVOfYfaQMKKxCfwLwzT2BtwPS-OqFdR0PoKJsmRBejmKf74AaF3JDrGZaL_-60jY1rbtCSaPBBw6kEJV5ikhelFH-jyiu--1LTC7SG30WME0q2ET2LvnLEvG_w7KdnP2F_yeG4jh0tdkZO1HHEBXjDIcasKGVWtG5w654bnmNe26QfCZlaPzBJpoYZAMbCbZi3TfnmxM_iFWtDW7O6p42uliMqcjKpdOZJM1cEHpI2vfoyKviWivX0iETmQXFhcg74QjADjVND13bdU34IViwmN10-QVTpFZq0a91Vye6NCKWPNL0MbLF2xKSOIDvQcoe4QQTUv1Xj3etXCug"

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

  public login(token:any)
  {
    this.setSessionId(token)
    location.reload();
  }
}