import { Injectable } from '@angular/core';
import { Record } from 'src/app/interfaces/record/record';
import { RecordItem } from 'src/app/interfaces/record-item/record-item';
import { PianoPlayService } from './piano.play.service';
import { APIService } from '../HTTPServices/apiservice.service';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageBoxComponent } from 'src/app/Components/control-panel/message-box/message-box.component';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  isRecording : Boolean = false
  record: Record = {notes:new Map<number, RecordItem>(), timeSlot:0.015, id:0, name:""}
  private startTime: number = 0;
  private stopTime: number = 0;

  constructor(private pianoSr:PianoPlayService, private apiSr: APIService, public dialog:MatDialog) { }

  startRecord()
  {
    // Reset current record
    this.record.name = ""
    this.record.notes.clear();

    this.startTime = Date.now();
    this.isRecording = true;
  }

  stopRecord() : Observable<Object>
  {
    this.isRecording = false;

    console.log("Record stopped !")
    console.log(this.record)
    // this.pianoSr.playRecord(this.record)

    // Ask user for a label
    //this.record.name = this.getRecordName();
    const obs = new Observable<Object>((observer) => {
      this.dialog.open(MessageBoxComponent, {
        width: '500px',
        height: '400px',
        autoFocus: true
      }).afterClosed().subscribe(t=>{
        let rName = t.value;
        this.record.name = rName;
        console.log('The dialog was closed');
        console.log(t.value);

      //  this.pianoSr.playRecord(this.record);
        // Send to backend
        this.apiSr.createRecord(this.record).subscribe(data=>{
          // Update observer to notify control panel, in order to reload drop box with records names
          observer.next()
        });
      });

    })
    return obs;
    return this.apiSr.createRecord(this.record);
    //this.pianoSr.playRecord(this.record);
  }


  isRec() : Boolean
  {
    return this.isRecording;
  }

  pushNote(note:string, noteDuration:number)
  {
    let currentTime = (Date.now() - this.startTime) ;
    let timeSlot = this.record.timeSlot * 1000
    while(currentTime % timeSlot != 0)
    {
      currentTime++;
    }
    
    this.record.notes.set(currentTime/1000, {id:0, note:note, timeout:noteDuration * 1000})
  }
}
