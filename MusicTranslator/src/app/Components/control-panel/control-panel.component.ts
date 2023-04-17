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
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

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
  isPlayingStarted = false;
  isChecked : boolean = false;

  voiceRecord: any;
  voiceRecordStream : any;
  recordedChunks: any[] = [];

  isPianoSelectedPlay : boolean = true;
  isHarmoSelectedPlay : boolean = false;
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
             private authSr: AuthService,
             private domSanitizer: DomSanitizer) {}

             
 sanitize(url: string) {
  return this.domSanitizer.bypassSecurityTrustUrl(url);
 }

 recordBtnClicked()
 {
  console.log("Start record")
  this.isRecordStarted = true;
  if(this.isPianoSelectedRecord)
    this.recordService.startRecord();
  //else if(this.isHarmoSelectedRecord)
    //this.harmonicaService.startRecord();
  else if(this.isVoiceSelectedRecord)
    navigator.mediaDevices.getUserMedia({audio : true}).then(s=>{
      this.voiceRecordStream = s;
      this.startVoiceRecord(s);
    });

 }

 startVoiceRecord(stream:MediaStream)
 {
  console.log("START VOICE RECORD");

  //Start Actuall Recording
  let StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
  this.voiceRecord = new StereoAudioRecorder(stream, {mimeType:"audio/wav",sampleRate: 48000 , bitsPerSecond:128000,audioBitsPerSecond: 128000});
  this.voiceRecord.record();

 }

 stopVoiceRecord(blob : Blob )
 {
  console.log("STOP VOICE RECORD");
  
  let url = URL.createObjectURL(blob);
  
  // Create a new FormData object
  let formData = new FormData();
  // Append the recorded audio file to the FormData object

  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = "none";
  a.href = url;
  a.download = "recording.mp3";
  a.click();
  URL.revokeObjectURL(url);

  this.voiceRecordStream.getAudioTracks().forEach((track: { stop: () => any; }) => track.stop());
  this.voiceRecord.stop();

  this.voiceRecordStream = null;


  this.pianoPlayService.disableKeyboardFocus();
  this.dialog.open(MessageBoxComponent, {
      width: '500px',
      height: '400px',
      autoFocus: true
    }).afterClosed().subscribe(t=>{
      let rName = t.value;
    
      formData.append("file", blob, rName + ".wav");
      console.log('The dialog was closed');
      console.log(t.value);
      this.pianoPlayService.enableKeyboardFocus();
      // Send record to the back end
      this.apiSr.computeVoiceRecord(formData).subscribe(data=>{
        console.log("Record received ! " + data.name);
        data.name =rName; 
        this.apiSr.createRecord(data).subscribe(res =>{
          this.refreshRecordsList();
          this.selectedRecord = data.name;
        });
      });

    });


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

    if(this.voiceRecordStream != null)
    {
      this.voiceRecordStream.getAudioTracks().forEach((track: { stop: () => any; }) => track.stop());
      this.voiceRecord.stop();
    }
  }

  stopRecordBtnClicked()
  {
    console.log("Stops record")
    this.isRecordStarted = false;
    if(this.isPianoSelectedRecord)
    {
      this.pianoPlayService.disableKeyboardFocus();
      this.recordService.stopRecord().subscribe(data =>{
        this.refreshRecordsList();
        this.pianoPlayService.enableKeyboardFocus();
      })
    }
    else if(this.isVoiceSelectedRecord)
      this.voiceRecord.stop(this.stopVoiceRecord.bind(this));
    
  }

  playButtonClicked()
  {
    this.apiSr.getRecordByName(this.selectedRecord).subscribe(data =>{
      console.log("DATA");
      console.log(data);
      if(this.isPianoSelectedPlay)
        this.pianoPlayService.playRecord(data, this);
      if(this.isHarmoSelectedPlay)
        this.harmonicaService.playRecord(data, this);
        this.isPlayingStarted = true;
    })
  }

  deleteButtonClicked()
  {
    this.apiSr.deleteRecord(this.selectedRecord).subscribe(data => {
      console.log(data);
      this.refreshRecordsList();
    });
  }

  stopPlayButtonClicked()
  {
    console.log("SYOPPP")
    this.pianoPlayService.stopPlay();
    this.harmonicaService.stopPlay();
    this.isPlayingStarted = false;
    
  }

  pauseButtonClicked()
  {
  }

  downloadButtonClicked()
  {
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
      this.isPianoSelectedPlay = !this.isPianoSelectedPlay;
    }
    else if(instrument == "HARMONICA")
    {
      this.isHarmoSelectedPlay = !this.isHarmoSelectedPlay;
    }
    else if(instrument == "VOICE")
    {
      
      this.isPianoSelectedPlay = false;
      this.isHarmoSelectedPlay = false;
    }
  }

}
