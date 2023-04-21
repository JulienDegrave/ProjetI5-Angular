import { PianoKeyComponent } from '../../Components/piano-key/piano-key.component';
import { ElementRef, Inject, Injectable, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { Record } from '../../interfaces/record/record';
import { Observable } from 'rxjs';
import { ControlPanelComponent } from 'src/app/Components/control-panel/control-panel.component';
import { DarkModeService } from 'angular-dark-mode';
 
@Injectable()
export class PianoPlayService { 
    pianoKeys:PianoKeyComponent[] = [];
 
    startKeycode = 49;
    endKeycode = 57;
    intervalId : any;
    keyDownBind : any;
    keyUpBind : any;
    isPlaying : boolean = false;
    isDark : boolean = false;

    notesKeysMap : Map<number, number> = new Map<number,number>();


    constructor( @Inject(DOCUMENT) private document: any,private darkModeService: DarkModeService) 
    {
        this.keyDownBind = this.onKeydown.bind(this);
        this.keyUpBind = this.onKeyup.bind(this);
        this.document.addEventListener('keydown', this.keyDownBind);
        this.document.addEventListener('keyup', this.keyUpBind);
        this.initNotesKeysMapsFromKeyboardId()
    }

    disableKeyboardFocus()
    {
        this.document.removeEventListener('keydown',this.keyDownBind);
        this.document.removeEventListener('keyup', this.keyUpBind);
    }
    enableKeyboardFocus()
    {
        this.document.addEventListener('keydown', this.keyDownBind);
        this.document.addEventListener('keyup',this.keyUpBind);
    }

    highlightKeys(keys:string[])
    {
        console.log("highlightKeys")
        this.pianoKeys.forEach(pianoKey=>{
            pianoKey.isPlayable = false;
            keys.forEach(key=>{
                if(key == pianoKey.keyName)
                {
                    pianoKey.isPlayable = true;
                }
            })
        })

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

    initNotesKeysMapsFromKeyboardId()
    {
        let keysArrayInOrder =[65,90,69,82,84,89,85,73,79,80,221,186, /* First octave */
                               81,83,68,70,71,72,74,75,76,77,192,220,  /* Second octave */
                               16,226,87,88,67,86,66,78,188,190,191,223,32];
        let index = 0;

        keysArrayInOrder.forEach(value => {
            this.notesKeysMap.set(value, index)
            index++;
        })
    }

    playRecord(record:Record, parent: ControlPanelComponent) 
    {
        //console.log("PLAYYYYY")
        console.log(record)
        let nbOfNotesPlayed = 0;
        let counter = 0.0
        this.isPlaying = true;
        this.intervalId = setInterval(() => {

            // console.log(counter / 1000)
            if(counter > 25000 ||nbOfNotesPlayed >= record.notes.size)
            {
                this.stopPlay();
                parent.isPlayingStarted = false;
            } 

            console.log("INTERVAL")
            if(record.notes.has(counter / 1000)) {
                let currentNote = record.notes.get(counter/1000);
                nbOfNotesPlayed++;
                //console.log("currentNote " + currentNote)
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

    stopPlay()
    {
        console.log("SOTPPP")
        if(this.isPlaying)
        {
            clearInterval(this.intervalId);
        }
    }
    


    trollVal_notesArray = ["D3","F3","G3","A3", "D3","F3","G3","A3"];
    trollVal_cnotesArray = ["0","0","0","0", "0","0","0","0"];

    trollVal_notePlayed(note:string)
    {
        this.trollVal_cnotesArray.shift();
        this.trollVal_cnotesArray.push(note);

        if(JSON.stringify(this.trollVal_notesArray) == JSON.stringify(this.trollVal_cnotesArray))
        {
           // this.renderer.setStyle(this.el.nativeElement.ownerDocument.body,'backgroundColor', '');
           this.isDark = !this.isDark;
           this.darkModeService.toggle();
           console.log("TOGGLE")
           this.pianoKeys.forEach(key =>{
            key.setDark(this.isDark);
           })
        }
    }
}