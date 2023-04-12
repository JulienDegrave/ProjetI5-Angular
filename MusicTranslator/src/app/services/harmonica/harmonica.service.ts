import { Injectable } from '@angular/core';
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

  tonality:number = 12// 12 = C
  currentTonality:number = 2 // 0 = C
  
  //notesList= ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]
  notesList= ["C2", "Db2", "D2", "Eb2", "E2", "F2", "Gb2", "G2", "Ab2", "A2", "Bb2", "B2",
              "C3", "Db3", "D3", "Eb3", "E3", "F3", "Gb3", "G3", "Ab3", "A3", "Bb3", "B3",
              "C4", "Db4", "D4", "Eb4", "E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4",
              "C5", "Db5", "D5", "Eb5", "E5", "F5", "Gb5", "G5", "Ab5", "A5", "Bb5", "B5",
              "C6", "Db6", "D6", "Eb6", "E6", "F6", "Gb6", "G6", "Ab6", "A6", "Bb6", "B6"]

  notesMap : Map<string/*Tonality*/,Array<string>/*Notes*/>;
  
  intervalId : any;
  currentHole:any;
  currentInterval:any;

  constructor() 
  { 
    this.holeIntervalsMap = new Map<number, Array<number>>();
    this.notesMap = new Map<string,Array<string>>();
    this.initHoleNotesMap();
  }

  changeTonality(newTonality:number) : string[]
  {
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
    //key.setNodeListInterval(this.holeIntervalsMap.get(key.holeNumber))
  }

  initHoleNotesMap()
  {
    // this.holeIntervalsMap.set(1, [0, 1, 1]);      // C - Db - D             X Eb X
    // this.holeIntervalsMap.set(2, [2, 1, 1, 1]);   // E - F - Gb - G 
    // this.holeIntervalsMap.set(3, [0, 1, 1, 1, 1]);// G - Ab - A - Bb - B
    // this.holeIntervalsMap.set(4, [1, 1, 1]);      // C - Db - D
    // this.holeIntervalsMap.set(5, [2, 1]);         // E - F                  X Eb X
    // this.holeIntervalsMap.set(6, [2, 1, 1]);      // G - Ab - A
    // this.holeIntervalsMap.set(7, [2, 1]);         // B - C
    // this.holeIntervalsMap.set(8, [2, 1, 1]);      // D - Eb - E
    // this.holeIntervalsMap.set(9, [1, 1, 1]);      // F - Gb - G
    // this.holeIntervalsMap.set(10, [1, 1, 1, 1]);  // A - Bb - B - C

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

  playRecord(record:Record)
  {
    console.log("Play")
    console.log(record)
    let max = Math.max(...record.notes.keys())
    let counter = 0.0
    this.intervalId = setInterval(() => {

      if(counter > 15000) clearInterval(this.intervalId);

        if(record.notes.has(counter / 1000)) {
          // Retrieve note to play
          let currentNote = record.notes.get(counter/1000);
          if(!currentNote) return;
          //let currentHole = this.findHoleFromNote(currentNote);
          let [currentHole, currentHoleNumber] = this.findHoleFromNote2(currentNote);
          // console.log("Current HOLE : " + currentHole);
          // console.log("Current currentHoleNumber : " + currentHoleNumber);
          currentHole?.setHoleDown(currentHoleNumber)
          setTimeout( () => { 
            // console.log(Date.now() + " |setKeyUp " + currentNote?.key + " TIMOUT " +currentNote?.timeout )
            if(currentHoleNumber != undefined)   
              currentHole?.setHoleUp(currentHoleNumber)
          }, currentNote?.timeout)

                // Find the hole to can produce the note
                // for(let i = 0 ; i < this.harmonicaHoles.length ; i++)
                // {
                //     if(currentHole == this.harmonicaHoles.at(i)?.holeNumber)
                //     {
                //       let currentNoteHole= this.harmonicaHoles.at(i)?.getHoleNoteFromInterval(this.currentInterval);
                //       console.log("currentNoteHole: " + currentNoteHole);
                //         // console.log(Date.now() + " |play " + currentNote?.key)
                //       if(currentNoteHole == undefined) continue;
                //       this.harmonicaHoles.at(i)?.setHoleDown(currentNoteHole)
                //       setTimeout( () => { 
                //             // console.log(Date.now() + " |setKeyUp " + currentNote?.key + " TIMOUT " +currentNote?.timeout )
                //         if(currentNoteHole != undefined)   
                //           this.harmonicaHoles.at(i)?.setHoleUp(currentNoteHole)
                //       }, currentNote?.timeout)
                //     }
                // }
            }
            counter += record.timeSlot * 1000
        }, record.timeSlot*1000)


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
