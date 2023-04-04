import { Component, OnInit } from '@angular/core';
import { RecordService } from 'src/app/services/piano/record.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {
  
  isRecordStarted = false;
  ngOnInit(): void {

  }
  
 constructor(private recordService: RecordService)
 {

 }

 recordBtnClicked()
 {
  console.log("Start record")
  this.isRecordStarted = true;
  this.recordService.startRecord();
 }
 
 stopRecordBtnClicked()
 {
  console.log("Stops record")
  this.isRecordStarted = false;
  this.recordService.stopRecord();
 }


}
