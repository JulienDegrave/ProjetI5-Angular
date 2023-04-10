import { Injectable } from '@angular/core';
import { HarmonicaHoleComponent } from 'src/app/Components/harmonica/harmonica-hole/harmonica-hole.component';
import { RecordItem } from 'src/app/interfaces/record-item/record-item';
import { Record } from 'src/app/interfaces/record/record';

@Injectable({
  providedIn: 'root'
})
export class HarmonicaService 
{
  
  harmonicaHoles:HarmonicaHoleComponent[] = [];
  holeIntervalsMap : Map<number, Array<number>>;

  tonality:string ="C"
  
  notesList= ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]

  
  intervalId : any;
  currentHole:any;
  currentInterval:any;

  constructor() 
  { 
    
    this.holeIntervalsMap = new Map<number, Array<number>>();
    this.initHoleNotesMap();
  }

  registerHarmonicaHole(key: HarmonicaHoleComponent) 
  {
    this.harmonicaHoles.push(key);
    key.setNodeListInterval(this.holeIntervalsMap.get(key.holeNumber))
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

  getNoteFromInterval(holeNumber:number, int:number) : string
  {
      if(int == undefined) return "if(!int";

    let indexNotesArray = int % 12;
    let octave = 1;

    if(int >= 12) octave = 2;
    if(int >= 24) octave = 3;

    let noteString = this.notesList.at(indexNotesArray);

    if(!noteString) return "if(!noteString)";

    octave = octave + 2
    noteString += octave.toString()

    return noteString;
  }

  getNote(holeNumber:number, noteNumber:number) : string
  {
    let noteList = this.holeIntervalsMap.get(holeNumber);
  

    if(!noteList) return " if(!noteList)";

    if( noteNumber >= noteList.length) return "";

    console.log("Note number : " + noteNumber)
    let intervalFromMainNote = noteList.at(noteNumber);
    console.log("Note intervalFromMainNote : " + intervalFromMainNote)

    if(intervalFromMainNote == undefined) return "if(!intervalFromMainNote";

    let indexNotesArray = intervalFromMainNote % 12;
    let octave = 1;

    if(intervalFromMainNote >= 12) octave = 2;
    if(intervalFromMainNote >= 24) octave = 3;

    let noteString = this.notesList.at(indexNotesArray);

    if(!noteString) return "if(!noteString)";

    octave = octave + 2
    noteString += octave.toString()

    return noteString;
  }

  getIndex(holeNumber:number, noteNumber:number) : string
  {
    return "";
  }

  playRecord(record:Record)
    {
        console.log("PLAYYYYY")
        console.log(record)
        let max = Math.max(...record.notes.keys())
        let counter = 0.0
        this.intervalId = setInterval(() => {

            if(counter > 15000) clearInterval(this.intervalId);

            if(record.notes.has(counter / 1000)) {
                // Retrieve note to play
                let currentNote = record.notes.get(counter/1000);
                console.log("currentNote : " + currentNote)

                if(!currentNote) return;
                let currentHole = this.findHoleFromNote(currentNote);
                console.log("Current HOLE : " + currentHole);

                // Find the hole to can produce the note
                for(let i = 0 ; i < this.harmonicaHoles.length ; i++)
                {
                    if(currentHole == this.harmonicaHoles.at(i)?.holeNumber)
                    {
                      let currentNoteHole= this.harmonicaHoles.at(i)?.getHoleNoteFromInterval(this.currentInterval);
                      console.log("currentNoteHole: " + currentNoteHole);
                        // console.log(Date.now() + " |play " + currentNote?.key)
                      if(currentNoteHole == undefined) continue;
                      this.harmonicaHoles.at(i)?.setHoleDown(currentNoteHole)
                      setTimeout( () => { 
                            // console.log(Date.now() + " |setKeyUp " + currentNote?.key + " TIMOUT " +currentNote?.timeout )
                        if(currentNoteHole != undefined)   
                          this.harmonicaHoles.at(i)?.setHoleUp(currentNoteHole)
                      }, currentNote?.timeout)
                    }
                }
            }
            counter += record.timeSlot * 1000
        }, record.timeSlot*1000)
    }

    findHoleFromNote(note:RecordItem) : number
    {
      let octave = note.note.charAt(note.note.length - 1);
      let cHole= -1;
      for (let [key, value] of this.holeIntervalsMap) 
      {
        console.log(`Clé : ${key}`);
        console.log(`octave : ${octave}`);
        //console.log(`Valeur : ${value}`);

        if (octave == "4" && key < 4 )
        {
          continue;
        }

        if (octave == "5" && key < 7 )
        {
          continue;
        }

        for(let i = 0; i < value.length ; i++)
        {
          let interval = value.at(i)
          if(interval == undefined) continue;
          let indexNotesArray = interval % 12;
          let noteString = this.notesList.at(indexNotesArray) + octave;
          console.log(`interval : ${interval}`);
          console.log(`noteString : ${noteString}`);
          console.log(`note.note : ${note.note}`);
          if(note.note == noteString)
          {
            cHole = key; 
            this.currentInterval = i;
            //console.log(`cHole : ${cHole}`);
            //console.log(`currentInterval : ${this.currentInterval}`);
          } 
        }

        if(cHole != -1 ) break;

      
    }
    console.log(`return cHole`);
    return cHole
  }
}
