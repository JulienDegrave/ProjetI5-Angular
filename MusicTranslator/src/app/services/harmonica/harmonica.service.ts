import { Injectable } from '@angular/core';
import { ControlPanelComponent } from 'src/app/Components/control-panel/control-panel.component';
import { HarmonicaHoleComponent } from 'src/app/Components/harmonica/harmonica-hole/harmonica-hole.component';
import { RecordItem } from 'src/app/interfaces/record-item/record-item';
import { Record } from 'src/app/interfaces/record/record';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class HarmonicaService 
{
  
  harmonicaHoles:HarmonicaHoleComponent[] = [];
  holeIntervalsMap : Map<number, Array<number>>;

  tonality:number = 24// 24 = C
  currentTonality:number = 2 // 0 = C
  
  //notesList= ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]
  notesList= ["C2", "Db2", "D2", "Eb2", "E2", "F2", "Gb2", "G2", "Ab2", "A2", "Bb2", "B2",
              "C3", "Db3", "D3", "Eb3", "E3", "F3", "Gb3", "G3", "Ab3", "A3", "Bb3", "B3",
              "C4", "Db4", "D4", "Eb4", "E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4",
              "C5", "Db5", "D5", "Eb5", "E5", "F5", "Gb5", "G5", "Ab5", "A5", "Bb5", "B5",
              "C6", "Db6", "D6", "Eb6", "E6", "F6", "Gb6", "G6", "Ab6", "A6", "Bb6", "B6",
              "C7", "Db7", "D7", "Eb7", "E7", "F7", "Gb7", "G7", "Ab7", "A7", "Bb7", "B7"]

  notesMap : Map<string/*Tonality*/,Array<string>/*Notes*/>;
  
  intervalId : any;
  currentInterval:any;

  constructor() 
  { 
    this.holeIntervalsMap = new Map<number, Array<number>>();
    this.notesMap = new Map<string,Array<string>>();
    this.initHoleNotesMap();

    
  }

  changeTonality(newTonality:number) : string[]
  {
    //console.log(newTonality)
    if(newTonality < 7)
      this.tonality = newTonality + 24;
    else
      this.tonality = newTonality + 12;

    this.harmonicaHoles.forEach(hole=>{
      hole.initNotes();        
    })

    return this.getAllPlayableNotes();
  }


  registerHarmonicaHole(key: HarmonicaHoleComponent) 
  {
    this.harmonicaHoles.push(key);

    // When all hole are registered, init notes for each one
    if(this.harmonicaHoles.length == 10)
    {
      this.harmonicaHoles.forEach(hole=>{
        hole.initNotes();        
      })
    }
  }

  initHoleNotesMap()
  {
    this.holeIntervalsMap.set(1, [0, 1, 2]);      // C - Db - D             X Eb X
    this.holeIntervalsMap.set(2, [4, 5, 6, 7]);   // E - F - Gb - G 
    this.holeIntervalsMap.set(3, [7, 8, 9, 10, 11]);// G - Ab - A - Bb - B
    this.holeIntervalsMap.set(4, [12, 13, 14]);      // C - Db - D
    this.holeIntervalsMap.set(5, [16, 17]);         // E - F                  X Eb X
    this.holeIntervalsMap.set(6, [19, 20, 21]);      // G - Ab - A
    this.holeIntervalsMap.set(7, [24, 23]);         // B - C
    this.holeIntervalsMap.set(8, [28, 27, 26]);      // D - Eb - E
    this.holeIntervalsMap.set(9, [31, 30,29]);      // F - Gb - G
    this.holeIntervalsMap.set(10, [36,35,34,33]);  // A - Bb - B - C
  }

  computeNoteOctave(intervalfromMainNote:number) : string | undefined
  {
    let currentIndex = intervalfromMainNote + this.tonality;
    return this.notesList.at(currentIndex);
  }

  getAllPlayableNotes()
  {
    let result : string[] = []

    this.harmonicaHoles.forEach(hole =>{
      for(let [key, value] of hole.notesMap)
      {
        result.push(value);
      }
    })

    return result;
  }

  hasLow1(harmonicaHole:number) : boolean
  {
    return harmonicaHole == 1 || 
           harmonicaHole == 2 || 
           harmonicaHole == 3 || 
           harmonicaHole == 4 || 
           harmonicaHole == 6; 
    return true;
  }
  hasLow2(harmonicaHole:number) : boolean
  {
    return  harmonicaHole == 2 || 
            harmonicaHole == 3; 
  }

  hasLow3(harmonicaHole:number) : boolean
  {
    return  harmonicaHole == 3;  
  }

  hasHigh1(harmonicaHole:number) : boolean
  {
    return harmonicaHole == 8 || 
           harmonicaHole == 9 || 
           harmonicaHole == 10;
  }

  hasHigh2(harmonicaHole:number) : boolean
  {
    return harmonicaHole == 10;
  }

  playRecord(record:Record, parent: ControlPanelComponent)
  {
    console.log("Play")
    //console.log(record)
    let max = Math.max(...record.notes.keys())
    let nbOfNotesPlayed = 0;
    let counter = 0.0
    this.intervalId = setInterval(() => {

        if(counter > 25000 ||nbOfNotesPlayed >= record.notes.size)
        {
          console.log("SToP PLAY")
          this.stopPlay();
          parent.isPlayingStarted = false;
        } 

        if(record.notes.has(counter / 1000)) {
          // Retrieve note to play
          nbOfNotesPlayed++;
          let currentNote = record.notes.get(counter/1000);
          if(!currentNote) return;
          //let currentHole = this.findHoleFromNote(currentNote);
          let [currentHole, currentHoleNumber] = this.findHoleFromNote2(currentNote);
          // console.log("Current HOLE : " + currentHole);
          // console.log("Current currentHoleNumber : " + currentHoleNumber);
          currentHole?.setHoleDown(currentHoleNumber)
          let timeOut = currentNote?.timeout;
          if(timeOut < 100) timeOut = 100;
          console.log(" currentNote?.timeout : " +  timeOut);
          setTimeout( () => { 
            // console.log(Date.now() + " |setKeyUp " + currentNote?.key + " TIMOUT " +currentNote?.timeout )
            if(currentHoleNumber != undefined)   
              currentHole?.setHoleUp(currentHoleNumber)
          }, timeOut)
        }
            counter += record.timeSlot * 1000
      }, record.timeSlot*1000)
    }

    stopPlay()
    {
      clearInterval(this.intervalId);
    }

    
    findHoleFromNote2(note:RecordItem): [HarmonicaHoleComponent | undefined, number]
    {
      let harmonicaHoleComponent = undefined;
      let holeNumber = 0;

      this.harmonicaHoles.forEach(hole=>{
        for(let [key, value] of hole.notesMap)
        {
          if(note.note == value)
          {
            harmonicaHoleComponent = hole;
            holeNumber = key;
            break;

          }
        }
      })
      return [harmonicaHoleComponent, holeNumber];
    }
}


