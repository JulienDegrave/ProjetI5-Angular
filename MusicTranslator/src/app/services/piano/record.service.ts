import { Injectable } from '@angular/core';
import { Record } from 'src/app/interfaces/record/record';
import { RecordItem } from 'src/app/interfaces/record-item/record-item';
import { PianoPlayService } from '../piano.play.service';
@Injectable({
  providedIn: 'root'
})
export class RecordService {

  isRecording : Boolean = false
  record: Record = {notes:new Map<number, RecordItem>(), timeSlot:0.025}
  private startTime: number = 0;
  private stopTime: number = 0;

  constructor(private pianoSr:PianoPlayService) { }

  startRecord()
  {
    this.startTime = Date.now();
    this.isRecording = true;
  }

  stopRecord()
  {
    this.isRecording = false;
    console.log("Record stopped !")
    console.log(this.record)
    //this.pianoSr.playRecord(this.record)
    // TBD : Send record to BACKEND
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
    console.log("Note " + note + "currentTime " + currentTime )
    this.record.notes.set(currentTime/1000, {key:note, timeout:noteDuration})
    
  }
}
