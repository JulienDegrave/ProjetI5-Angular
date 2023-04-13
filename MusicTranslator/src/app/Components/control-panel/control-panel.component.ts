import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HarmonicaService } from 'src/app/services/harmonica/harmonica.service';
import { APIService } from 'src/app/services/HTTPServices/apiservice.service';
import { PianoPlayService } from 'src/app/services/piano/piano.play.service';
import { RecordService } from 'src/app/services/piano/record.service';
import { MessageBoxComponent } from './message-box/message-box.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css'],
})
export class ControlPanelComponent implements OnInit {
  
  recordsName = [""]
  selectedRecord = ""
  tonalities = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]
  selectedTonality = "C"
  isRecordStarted = false;
  isChecked : boolean = false;

  isPianoSelectedPlay : boolean = true;
  isHarmoSelectedPlay : boolean = false;
  isVoiceSelectedPlay : boolean = false;
  isPianoSelectedRecord : boolean = true;
  isHarmoSelectedRecord : boolean = false;
  isVoiceSelectedRecord : boolean = false;

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

 viewHarmonicaNotesInPianoKeys()
 {
  console.log(this.isChecked);
  if(this.isChecked)
  {
    let playableNotes : string[] = this.harmonicaService.getAllPlayableNotes(); 
    // Update piano view by highlighting corresponding keys
    this.pianoPlayService.highlightKeys(playableNotes);
  }else{
    this.pianoPlayService.highlightKeys([]);
  }

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
 
  cancelRecordBtnClicked()
  {
    console.log("Cancel record")
    this.isRecordStarted = false;
    this.recordService.cancelRecord();

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

  stopPlayButtonClicked()
  {
  }

  pauseButtonClicked()
  {
  }

  downloadButtonClicked()
  {
  }

  proutLogout()
  {
    this.authSr.logout()
  }

  onWheelTonality(event: WheelEvent) 
  {
    event.preventDefault(); // prevent default scrolling behavior
    const delta = Math.sign(event.deltaY); // get scroll direction
    const currentIndex = this.tonalities.indexOf(this.selectedTonality);
    const newIndex = currentIndex + delta;
    if (newIndex >= 0 && newIndex < this.tonalities.length) {
      this.selectedTonality = this.tonalities[newIndex];
      this.onSelectTonality()
    }
  }

  onSelectTonality()
  {
    // Compute tonality for harmonicaService
    let tonalityToInt = this.tonalities.indexOf(this.selectedTonality); 
    // Change harmonica tonality and retrieve harmonica notes
    let playableNotes : string[] = this.harmonicaService.changeTonality(tonalityToInt); 
    // Update piano view by highlighting corresponding keys
    if(this.isChecked)
      this.pianoPlayService.highlightKeys(playableNotes);  
  }

  onSelectRecordInstrumentClicked(instrument:string)
  {
    console.log("ENABLE " + instrument)
    if(instrument == "PIANO")
    {
      this.isPianoSelectedRecord = true;
      this.isHarmoSelectedRecord = false;
      this.isVoiceSelectedRecord = false; 
    }
    else if(instrument == "HARMONICA")
    {
      
      this.isPianoSelectedRecord = false;
      this.isHarmoSelectedRecord = true;
      this.isVoiceSelectedRecord = false; 
    }
    else if(instrument == "VOICE")
    {
      
      this.isPianoSelectedRecord = false;
      this.isHarmoSelectedRecord = false;
      this.isVoiceSelectedRecord = true; 
    }

  }

  onSelectPlayInstrumentClicked(instrument:string)
  {
    if(instrument == "PIANO")
    {
      this.isPianoSelectedPlay = true;
      this.isHarmoSelectedPlay = false;
      this.isVoiceSelectedPlay = false; 
    }
    else if(instrument == "HARMONICA")
    {
      
      this.isPianoSelectedPlay = false;
      this.isHarmoSelectedPlay = true;
      this.isVoiceSelectedPlay = false; 
    }
    else if(instrument == "VOICE")
    {
      
      this.isPianoSelectedPlay = false;
      this.isHarmoSelectedPlay = false;
      this.isVoiceSelectedPlay = true; 
    }
  }

}
