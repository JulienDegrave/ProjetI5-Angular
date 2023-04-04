import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.scss'] 
})
export class PianoComponent implements OnInit {
  octaves = [3, 4, 5];
  constructor() { }

  ngOnInit() {
  }

}