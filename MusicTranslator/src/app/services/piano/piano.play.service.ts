import { PianoKeyComponent } from '../../Components/piano-key/piano-key.component';
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { Record } from '../../interfaces/record/record';
 
@Injectable()
export class PianoPlayService { 
    pianoKeys:PianoKeyComponent[] = [];
 
    startKeycode = 49;
    endKeycode = 57;
    intervalId : any;

    notesKeysMap : Map<number, number> = new Map<number,number>();


    constructor( @Inject(DOCUMENT) private document: any) {
        this.document.addEventListener('keydown', this.onKeydown.bind(this));
        this.document.addEventListener('keyup', this.onKeyup.bind(this));
        this.initNotesKeysMaps()
    }

    getAssociatedPianoKey(event: KeyboardEvent):PianoKeyComponent {
        let keycode = event.keyCode;
        console.log("key: "+keycode)

        let index : number | undefined = this.notesKeysMap.get(keycode);
        console.log("index:" + index)
        console.log("this.pianoKeys.length:" + this.pianoKeys.length)

        if(index == undefined)
        {
            console.log(" index undefined")
            return null as any;
        }

        if(index < this.pianoKeys.length)
        {
            console.log(" index OK")
            return this.pianoKeys[index];
        }
        
        return null as any;
    }

    registerPianoKey(key: PianoKeyComponent) {
        this.pianoKeys.push(key);
    }

    onKeydown(event: KeyboardEvent) {
        let keyToPlay = this.getAssociatedPianoKey(event);
        if (keyToPlay)
        {
            keyToPlay.onPianoKeyClicked(event);
        }
    }

    onKeyup(event: KeyboardEvent) {
        let keyToPlay = this.getAssociatedPianoKey(event);
        if (keyToPlay) keyToPlay.onPianoKeyReleased(event);
    }

    initNotesKeysMaps()
    {
        let keysArrayInOrder =[65,90,69,82,84,89,85,73,79,80,221,186, /* First octave */
                               81,83,68,70,71,72,74,75,76,77,192,220,  /* Second octave */
                               16,226,87,88,67,86,66,78,188,190,191,223];
        let index = 0;

        keysArrayInOrder.forEach(value => {
            this.notesKeysMap.set(value, index)
            index++;
        })
    }

    playRecord(record:Record)
    {
        console.log("PLAYYYYY")
        console.log(record)
        let max = Math.max(...record.notes.keys())
        let counter = 0.0
        this.intervalId = setInterval(() => {

            // console.log(counter / 1000)
            if(counter > 15000) clearInterval(this.intervalId);

            if(record.notes.has(counter / 1000)) {
                let currentNote = record.notes.get(counter/1000);
                for(let i = 0 ; i < this.pianoKeys.length ; i++)
                {
                    if(currentNote?.note == this.pianoKeys.at(i)?.keyName)
                    {
                        // console.log(Date.now() + " |play " + currentNote?.key)
                        this.pianoKeys.at(i)?.setKeyDown()
                        setTimeout( () => { 
                            // console.log(Date.now() + " |setKeyUp " + currentNote?.key + " TIMOUT " +currentNote?.timeout )
                            this.pianoKeys.at(i)?.setKeyUp()
                        }, currentNote?.timeout)
                    }
                }
            }
            counter += record.timeSlot * 1000
        }, record.timeSlot*1000)
    }
}