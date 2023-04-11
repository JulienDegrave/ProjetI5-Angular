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

  numberOfNotes : number = 2;

  noteListIntervalMap : Map<number, number>;
  
  currentTonality : number = 2;
  l0isActive: boolean = false;
  l1isActive: boolean = false;
  l2isActive: boolean = false;
  l3isActive: boolean = false;
  
  h0isActive: boolean = false;
  h1isActive: boolean = false;
  h2isActive: boolean = false;

  notesMap : Map<number/*hole*/, string /*Note*/>;
  
  noteSound = null as any;
  startPlayTime : number = 0;

  constructor(private harmonicaSr:HarmonicaService)
  {
    this.noteListIntervalMap  = new  Map<number, number>();
    this.notesMap             = new  Map<number, string>();
  }

  ngOnInit()
  {
    this.harmonicaSr.registerHarmonicaHole(this);
  }

  computeNoteOctave(note:string, tonality:number) : string
  {
    if(note == "C")
    {
      if(this.holeNumber <= 3)
        this.currentTonality = this.currentTonality +1 ;
    } 
    return note + this.currentTonality.toString();
  }

  initNotes()
  {
    console.log("this.notesMap")
    let tonality        = this.harmonicaSr.tonalityInt;
    let notesList = this.harmonicaSr.notesList;
    let i0 :number =0;
    let i1 :number =0;
    let i2 :number =0;
    let i3 :number =0;
    let i4 :number =0;

    i0 = this.harmonicaSr.holeIntervalsMap.get(this.holeNumber)?.at(0) || 0;
    i1 = this.harmonicaSr.holeIntervalsMap.get(this.holeNumber)?.at(1) || 0;

    if(this.holeNumber == 1)
    {
      i2 = this.harmonicaSr.holeIntervalsMap.get(this.holeNumber)?.at(2) || 0;
      this.notesMap.set(1, this.harmonicaSr.computeNoteOctave( notesList.at( ( i0 + tonality) % 12 ) ||"",this.holeNumber));
      this.notesMap.set(-1, this.harmonicaSr.computeNoteOctave( notesList.at( ( i1 + tonality) % 12 ) ||"",this.holeNumber) );
      this.notesMap.set(0, this.harmonicaSr.computeNoteOctave( notesList.at( ( i2 + tonality) % 12 ) ||"",this.holeNumber) );
    }
    if(this.holeNumber == 2)
    {
      i2 = this.harmonicaSr.holeIntervalsMap.get(this.holeNumber)?.at(2) || 0;
      i3 = this.harmonicaSr.holeIntervalsMap.get(this.holeNumber)?.at(3) || 0;
      this.notesMap.set(1, this.harmonicaSr.computeNoteOctave( notesList.at( ( i0 + tonality) % 12 ) ||"",this.holeNumber) );
      this.notesMap.set(-2, this.harmonicaSr.computeNoteOctave( notesList.at( ( i1 + tonality) % 12 ) ||"",this.holeNumber) );
      this.notesMap.set(-1, this.harmonicaSr.computeNoteOctave( notesList.at( ( i2 + tonality) % 12 ) ||"",this.holeNumber) );
      this.notesMap.set(0, this.harmonicaSr.computeNoteOctave( notesList.at( ( i3 + tonality) % 12 ) ||"",this.holeNumber) );
    }
    if(this.holeNumber == 3)
    {
      i2 = this.harmonicaSr.holeIntervalsMap.get(this.holeNumber)?.at(2) || 0;
      i3 = this.harmonicaSr.holeIntervalsMap.get(this.holeNumber)?.at(3) || 0;
      i4 = this.harmonicaSr.holeIntervalsMap.get(this.holeNumber)?.at(4) || 0;
      this.notesMap.set(1, this.harmonicaSr.computeNoteOctave( notesList.at( ( i0 + tonality) % 12 ) ||"",this.holeNumber) );
      this.notesMap.set(-3, this.harmonicaSr.computeNoteOctave( notesList.at( ( i1 + tonality) % 12 ) ||"",this.holeNumber));
      this.notesMap.set(-2, this.harmonicaSr.computeNoteOctave( notesList.at( ( i2 + tonality) % 12 ) ||"",this.holeNumber) );
      this.notesMap.set(-1, this.harmonicaSr.computeNoteOctave( notesList.at( ( i3 + tonality) % 12 ) ||"",this.holeNumber) );
      this.notesMap.set(0, this.harmonicaSr.computeNoteOctave( notesList.at( ( i4 + tonality) % 12 ) ||"",this.holeNumber) );
    }
    if(this.holeNumber == 4)
    {
      i2 = this.harmonicaSr.holeIntervalsMap.get(this.holeNumber)?.at(2) || 0;
      this.notesMap.set(1, this.harmonicaSr.computeNoteOctave( notesList.at( ( i0 + tonality) % 12 ) ||"",this.holeNumber) );
      this.notesMap.set(-1, this.harmonicaSr.computeNoteOctave( notesList.at( ( i1 + tonality) % 12 ) ||"",this.holeNumber) );
      this.notesMap.set(0, this.harmonicaSr.computeNoteOctave( notesList.at( ( i2 + tonality) % 12 ) ||"",this.holeNumber) );
    }
    if(this.holeNumber == 5)
    {
      this.notesMap.set(1, this.harmonicaSr.computeNoteOctave( notesList.at( ( i0 + tonality) % 12 ) ||"",this.holeNumber) );
      this.notesMap.set(0, this.harmonicaSr.computeNoteOctave( notesList.at( ( i1 + tonality) % 12 ) ||"",this.holeNumber) );
    }
    if(this.holeNumber == 6)
    {
      i2 = this.harmonicaSr.holeIntervalsMap.get(this.holeNumber)?.at(2) || 0;
      this.notesMap.set(1, this.harmonicaSr.computeNoteOctave( notesList.at( ( i0 + tonality) % 12 ) ||"",this.holeNumber) );
      this.notesMap.set(-1, this.harmonicaSr.computeNoteOctave( notesList.at( ( i1 + tonality) % 12 ) ||"",this.holeNumber) );
      this.notesMap.set(0, this.harmonicaSr.computeNoteOctave( notesList.at( ( i2 + tonality) % 12 ) ||"",this.holeNumber) );
    }
    if(this.holeNumber == 7)
    {
      this.notesMap.set(1, this.harmonicaSr.computeNoteOctave( notesList.at( ( i0 + tonality) % 12 ) ||"",this.holeNumber)  );
      this.notesMap.set(0, this.harmonicaSr.computeNoteOctave( notesList.at( ( i1 + tonality) % 12 ) ||"",this.holeNumber)  );
    }
    if(this.holeNumber == 8 || this.holeNumber == 9)
    {
      i2 = this.harmonicaSr.holeIntervalsMap.get(this.holeNumber)?.at(2) || 0;
      this.notesMap.set(2, this.harmonicaSr.computeNoteOctave( notesList.at( ( i0 + tonality) % 12 ) ||"",this.holeNumber)  );
      this.notesMap.set(1, this.harmonicaSr.computeNoteOctave( notesList.at( ( i1 + tonality) % 12 ) ||"",this.holeNumber)  );
      this.notesMap.set(0, this.harmonicaSr.computeNoteOctave( notesList.at( ( i2 + tonality) % 12 ) ||"",this.holeNumber)  );
    }
    if(this.holeNumber == 10)
    {
      i2 = this.harmonicaSr.holeIntervalsMap.get(this.holeNumber)?.at(2) || 0;
      i3 = this.harmonicaSr.holeIntervalsMap.get(this.holeNumber)?.at(3) || 0;
      this.notesMap.set(0, this.harmonicaSr.computeNoteOctave( notesList.at( ( i3 + tonality) % 12 ) ||"",this.holeNumber)  );
      this.notesMap.set(3, this.harmonicaSr.computeNoteOctave( notesList.at( ( i2 + tonality) % 12 ) ||"",this.holeNumber)  );
      this.notesMap.set(2, this.harmonicaSr.computeNoteOctave( notesList.at( ( i1 + tonality) % 12 ) ||"",this.holeNumber)  );
      this.notesMap.set(1, this.harmonicaSr.computeNoteOctave( notesList.at( ( i0 + tonality) % 12 ) ||"",this.holeNumber)  );
    }
    
    console.log(this.notesMap)
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
    if(this.holeNumber == 10)
    {
      this.noteListIntervalMap.set(0, 3);
      this.noteListIntervalMap.set(1, 2);
      this.noteListIntervalMap.set(2, 1);
      this.noteListIntervalMap.set(3, 0);
    }
    
    console.log(this.noteListIntervalMap)
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
    let ok = this.harmonicaSr.hasLow1(this.holeNumber);
    if(ok) this.numberOfNotes++;
    return ok;
  }
  hasLow2() : boolean
  { 
    let ok = this.harmonicaSr.hasLow2(this.holeNumber);
    if(ok) this.numberOfNotes++; 
    return ok;
  }
  hasLow3() : boolean
  {
    let ok = this.harmonicaSr.hasLow3(this.holeNumber);
    if(ok) this.numberOfNotes++;
    return ok;
  }

  hasHigh1() : boolean
  {
    let ok = this.harmonicaSr.hasHigh1(this.holeNumber);
    if(ok) this.numberOfNotes++;
    return ok;
  }
  hasHigh2() : boolean
  {
    let ok = this.harmonicaSr.hasHigh2(this.holeNumber);
    if(ok) this.numberOfNotes++;
    return ok;
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
    
    console.log("this.notesMap.get(1) " + this.notesMap.get(noteNumber) )
    let currentNote :string = this.notesMap.get(noteNumber) || "";
    //this.currentNote = this.harmonicaSr.getNote(this.holeNumber,noteNumber -1);
    console.log("NOTE : " + currentNote);
    
    this.noteSound = new Audio();
    this.noteSound.src = this.harmonicaSoundUrl(currentNote);
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
