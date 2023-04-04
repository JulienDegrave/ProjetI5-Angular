import { Component, Input } from '@angular/core';
 
@Component({
  selector: 'app-piano-octave',
  templateUrl: './piano-octave.component.html',
  styleUrls: ['./piano-octave.component.scss']
})
export class PianoOctaveComponent  
{
  @Input() octaveIndex = 0;
  octaveNotes = [ "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
}