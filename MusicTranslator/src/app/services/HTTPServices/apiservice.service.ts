import { Injectable } from '@angular/core';
import { Record } from 'src/app/interfaces/record/record';
import { RecordItem } from 'src/app/interfaces/record-item/record-item';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { RecordDeserializer } from '../piano/record.deserialise';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class APIService
{
  apiUrl = 'http://localhost:8081/api/';
  constructor(private http: HttpClient, private authSr:AuthService) { }

  createRecord(record: Record) : Observable<Object>
  {
    console.log("createRecord")
    const notesObj = Object.fromEntries(record.notes);
    const recordWithoutNotes = { ...record, notes: notesObj };
    const body = JSON.stringify(recordWithoutNotes);
    const headers = { 'Content-Type': 'application/json' };

    return this.http.post(this.apiUrl+"write", body, { headers });
  }

  getRecordByName(name: string): Observable<Record> {
  return this.http.get<any>(this.apiUrl + "getRecord?name=" + name).pipe(
    tap(response => console.log("Response string:", response)),
    map(json => RecordDeserializer.deserialize(json))
  );
}

getAllRecords(): Observable<Record[]> 
{
  console.log("getAllRecords")
  return this.http.get<Record[]>(`${this.apiUrl}getAllRecords`).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // handle 401 error here, for example redirect to login page
        this.authSr.logout()
        location.reload();
      }
      return throwError(error)
    })
  );
}

  hello()
  {
    this.http.get(this.apiUrl + "hello",  { responseType: 'text' })
    .subscribe(data => {
      console.log(data);
    });

  }

  deleteRecord(record: Record)
  {

  }

  login(username:String, password:string): Observable<{Authorization:any,message:any}>
  {
    console.log(username)
    console.log(password)
    let body = {"login" :username, "password":password}
    
    const headers = { 'Content-Type': 'application/json' };

    return this.http.post<{Authorization: any, message: any}>(this.apiUrl + "login", body, { headers });
  }
}
