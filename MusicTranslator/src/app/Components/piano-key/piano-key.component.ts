import { Component, OnInit, Input, HostListener } from '@angular/core';
import { RecordService } from 'src/app/services/piano/record.service';
import { PianoPlayService } from '../../services/piano/piano.play.service';

// A single piano key which is able to be played via the mouse or using the keys
@Component({
  selector: 'app-piano-key',
  templateUrl: './piano-key.component.html',
  styleUrls: ['./piano-key.component.scss'] 
})
export class PianoKeyComponent implements OnInit 
{
  get sharpKey() { return !this.note || this.note.endsWith("b"); }
  get keyName(): string { return `${this.note}${this.index}` };
  get pianoSoundUrl(): string { return `/assets/piano-mp3/${this.note}${this.index}.mp3` };

  @Input() note: string = "";
  @Input() index: number = 0;

  isActive: boolean = false;
  isPlayable : boolean = false;
  noteSound = null as any;
  startPlayTime : number = 0;

  constructor(private pianoService: PianoPlayService, private recordService: RecordService) { }

  ngOnInit() { 
    this.pianoService.registerPianoKey(this);
  }
 
  ngAfterViewChecked() 
  {
  }
  
  onPianoKeyClicked(event: Event) 
  {
    if (event) event.preventDefault();
    this.setKeyDown();
  }

  setKeyDown()
  {
    //console.log("setKeyDown")
    this.noteSound = new Audio();
    this.noteSound.src = this.pianoSoundUrl;
    this.noteSound.load();
    if (this.noteSound)
    {
      this.noteSound.play();
    } 
    this.isActive = true;
    this.startPlayTime = Date.now();

  }

  onPianoKeyReleased(event: Event) {
    if (event) event.preventDefault();
    this.setKeyUp()
  } 

  setKeyUp()
  {
    this.isActive = false;
    if(this.recordService.isRec())
    {
      let noteDuration = (Date.now() - this.startPlayTime) / 1000;
      this.recordService.pushNote( this.keyName, noteDuration)
    }
  }

  
}