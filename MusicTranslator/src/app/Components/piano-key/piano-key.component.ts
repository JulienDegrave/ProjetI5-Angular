import { Component, OnInit, Input } from '@angular/core';
import { PianoPlayService } from '../../services/piano.play.service';

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
  noteSound = null as any;

  constructor(private pianoService: PianoPlayService) { }

  ngOnInit() { 
    this.pianoService.registerPianoKey(this);
  }
 
  ngAfterViewChecked() 
  {
    this.noteSound = new Audio();
    this.noteSound.src = this.pianoSoundUrl;
    this.noteSound.load();
  }

  onPianoKeyDown(event: Event) 
  {
    if (event) event.preventDefault();

    console.log(this.noteSound.src)
    if (this.noteSound) this.noteSound.play();
    this.isActive = true;
  }

  onPianoKeyUp(event: Event) {
    if (event) event.preventDefault();
    this.isActive = false;
  }
}