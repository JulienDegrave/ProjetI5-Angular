import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HarmonicaService } from 'src/app/services/harmonica/harmonica.service';
import { APIService } from 'src/app/services/HTTPServices/apiservice.service';
import { PianoPlayService } from 'src/app/services/piano/piano.play.service';
import { RecordService } from 'src/app/services/piano/record.service';
import { MessageBoxComponent } from './message-box/message-box.component';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css'],
})
export class ControlPanelComponent implements OnInit {
  
  recordsName = [""]
  selectedRecord = ""
  isRecordStarted = false;
  ngOnInit(): void 
  {
    this.refreshRecordsList();
  }
  
 constructor(private recordService: RecordService, 
             private pianoPlayService : PianoPlayService,
             private harmonicaService :  HarmonicaService,
             private apiSr: APIService, 
             private dialog: MatDialog, 
             private authSr: AuthService) {}

 recordBtnClicked()
 {
  console.log("Start record")
  this.isRecordStarted = true;
  this.recordService.startRecord();
 }

 test()
 {
  console.log("Test")
  const dialogRef = new MatDialogConfig() 
  dialogRef.position = {'top':'0'}
  this.dialog.open(MessageBoxComponent, {
    width: '500px',
    height: '400px',
    autoFocus: true
  }).afterClosed().subscribe(t=>{

    console.log('The dialog was closed');
    console.log(t.value);
  });

 }

 refreshRecordsList()
 {
  this.apiSr.getAllRecords().subscribe(data =>{
    
    console.log("RESPONSE");
    if(data.length != 0)
    {
      this.selectedRecord = data[0].name;
    }
    this.recordsName = []
    data.forEach(value =>{
      console.log(value.name);
      this.recordsName.push(value.name)
    })
  })
 }
 
 
 stopRecordBtnClicked()
 {
  console.log("Stops record")
  this.isRecordStarted = false;
  this.recordService.stopRecord().subscribe(data =>{
    this.refreshRecordsList()
  })
 }

 playButtonClicked()
 {
    this.apiSr.getRecordByName(this.selectedRecord).subscribe(data =>{
      this.pianoPlayService.playRecord(data);
      this.harmonicaService.playRecord(data);
    })
 }

 proutLogout()
 {
  this.authSr.logout()
 }


}
