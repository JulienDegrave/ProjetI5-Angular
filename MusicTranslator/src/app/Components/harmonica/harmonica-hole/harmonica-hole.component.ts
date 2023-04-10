import { Component, Input, OnInit } from '@angular/core';
import { HarmonicaService } from 'src/app/services/harmonica/harmonica.service';

@Component({
  selector: 'app-harmonica-hole',
  templateUrl: './harmonica-hole.component.html',
  styleUrls: ['./harmonica-hole.component.css']
})
export class HarmonicaHoleComponent implements OnInit 
{
  @Input() holeNumber = 0;

  currentNote : string = "";

  noteListIntervalMap : Map<number, number>;
  
  l0isActive: boolean = false;
  l1isActive: boolean = false;
  l2isActive: boolean = false;
  l3isActive: boolean = false;
  
  h0isActive: boolean = false;
  h1isActive: boolean = false;
  h2isActive: boolean = false;

  
  noteSound = null as any;
  startPlayTime : number = 0;

  constructor(private harmonicaSr:HarmonicaService)
  {
    this.noteListIntervalMap = new  Map<number, number>();
  }

  ngOnInit()
  {
    this.harmonicaSr.registerHarmonicaHole(this);
  }

  setNodeListInterval(ints:number[] | undefined)
  {
    console.log("setNodeListInterval : " +ints)
    
    if(!ints) return;
    
    if(this.holeNumber == 1)
    {
      this.noteListIntervalMap.set(0, 1);
      this.noteListIntervalMap.set(1, -1);
      this.noteListIntervalMap.set(2, 0);
    }
    if(this.holeNumber == 2)
    {
      this.noteListIntervalMap.set(0, 1);
      this.noteListIntervalMap.set(1, -2);
      this.noteListIntervalMap.set(2, -1);
      this.noteListIntervalMap.set(3, 0);
    }
    if(this.holeNumber == 3)
    {
      this.noteListIntervalMap.set(0, 1);
      this.noteListIntervalMap.set(1, -3);
      this.noteListIntervalMap.set(2, -2);
      this.noteListIntervalMap.set(3, -1);
      this.noteListIntervalMap.set(4, 0);
    }
    if(this.holeNumber == 4)
    {
      this.noteListIntervalMap.set(0, 1);
      this.noteListIntervalMap.set(1, -1);
      this.noteListIntervalMap.set(2, 0);
    }
    if(this.holeNumber == 5)
    {
      this.noteListIntervalMap.set(0, 1);
      this.noteListIntervalMap.set(1, 0);
    }
    if(this.holeNumber == 6)
    {
      this.noteListIntervalMap.set(0, 1);
      this.noteListIntervalMap.set(1, -1);
      this.noteListIntervalMap.set(2, 0);
    }
    
    if(this.holeNumber == 7)
    {
      this.noteListIntervalMap.set(0, 1);
      this.noteListIntervalMap.set(1, 0);
    }
    if(this.holeNumber == 8)
    {
      this.noteListIntervalMap.set(0, 2);
      this.noteListIntervalMap.set(1, 1);
      this.noteListIntervalMap.set(2, 0);
    }
    if(this.holeNumber == 9)
    {
      this.noteListIntervalMap.set(0, 2);
      this.noteListIntervalMap.set(1, 1);
      this.noteListIntervalMap.set(2, 0);
    }
    
    if(this.holeNumber == 9)
    {
      this.noteListIntervalMap.set(0, 3);
      this.noteListIntervalMap.set(1, 2);
      this.noteListIntervalMap.set(2, 1);
      this.noteListIntervalMap.set(3, 0);
    }
    // let startCount = 3;
    // let index = 0;
    // if(!this.hasHigh2())startCount--;
    // if(!this.hasHigh1())startCount--;
    // ints.forEach(element => {
    //   this.noteListIntervalMap.set(index++, startCount);
    //   startCount--;
    //   if(startCount == 0 )startCount = -1
    // });

  }

  getHoleNoteFromInterval(int:number) : number | undefined
  {
    console.log("FIND " + int)
    console.log(this.noteListIntervalMap)
    let result = this.noteListIntervalMap.get(int);
    console.log("FIND 2" + result)
    return result

  }

  hasLow1() : boolean
  {
    return this.harmonicaSr.hasLow1(this.holeNumber);
  }
  hasLow2() : boolean
  {
    return this.harmonicaSr.hasLow2(this.holeNumber);
  }
  hasLow3() : boolean
  {
    return this.harmonicaSr.hasLow3(this.holeNumber);
  }

  hasHigh1() : boolean
  {
    return this.harmonicaSr.hasHigh1(this.holeNumber);
  }
  hasHigh2() : boolean
  {
    return this.harmonicaSr.hasHigh2(this.holeNumber);
  }


  onHolePressed(event: Event, noteNumber:number)
  {
    console.log("pressed " + noteNumber)
    if (event) event.preventDefault();

    this.setHoleDown(noteNumber);

  }

  setHoleDown(noteNumber:number)
  {
    console.log("setHoleDown " + noteNumber )
    this.toggleHole(noteNumber, true)
    
    this.currentNote = this.harmonicaSr.getNote(this.holeNumber,noteNumber -1);
    console.log("NOTE : " + this.currentNote);
    
    this.noteSound = new Audio();
    this.noteSound.src = this.harmonicaSoundUrl(this.currentNote);
    this.noteSound.load();
    if (this.noteSound)
    {
      this.noteSound.play();
    }
    this.startPlayTime = Date.now();
  }

  onHoleReleased(event: Event, noteNumber:number)
  {
    if (event) event.preventDefault();

    this.setHoleUp(noteNumber);
  }

  setHoleUp(noteNumber:number)
  {
    this.toggleHole(noteNumber, false);
    this.currentNote = "";
  }

  toggleHole(hole:number, state:boolean)
  {
    switch(hole)
    {
      case -3:
        this.l3isActive = state;
        break;
        
      case -2:
        this.l2isActive = state;
        break;
        
      case -1:
        this.l1isActive = state;
        break;
        
      case 0:
        this.l0isActive = state;
        break;
      
      case 1:
        this.h0isActive = state;
        break;

      case 2:
        this.h1isActive = state;
        break;

      case 3:
        this.h2isActive = state;
        break;
    }
  }

  
  harmonicaSoundUrl(note:string): string 
  { 
    return `/assets/piano-mp3/${note}.mp3` 
  };  

}
