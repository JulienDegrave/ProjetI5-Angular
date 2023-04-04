import { PianoKeyComponent } from '../components/piano-key/piano-key.component';
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
 
@Injectable()
export class PianoPlayService { 
    pianoKeys:PianoKeyComponent[] = [];
 
    startKeycode = 49;
    endKeycode = 57;

    constructor( @Inject(DOCUMENT) private document: any) {
        this.document.addEventListener('keydown', this.onKeydown.bind(this));
        this.document.addEventListener('keyup', this.onKeyup.bind(this));
    }

    getAssociatedPianoKey(event: KeyboardEvent):PianoKeyComponent {
        let keycode = event.keyCode;
        
        if (keycode >= this.startKeycode && keycode <= this.endKeycode)
            return this.pianoKeys[(this.endKeycode - this.startKeycode) - (this.endKeycode - keycode)];

        return null as any;
    }

    registerPianoKey(key: PianoKeyComponent) {
        this.pianoKeys.push(key);
    }

    onKeydown(event: KeyboardEvent) {
        let keyToPlay = this.getAssociatedPianoKey(event);
        if (keyToPlay) keyToPlay.onPianoKeyDown(event);
    }

    onKeyup(event: KeyboardEvent) {
        let keyToPlay = this.getAssociatedPianoKey(event);
        if (keyToPlay) keyToPlay.onPianoKeyUp(event);
    }
}