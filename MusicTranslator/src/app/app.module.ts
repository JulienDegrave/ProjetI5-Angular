import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PianoPlayService } from './services/piano.play.service';
import { PianoKeyComponent } from './components/piano-key/piano-key.component';
import { PianoComponent } from './components/piano/piano.component';
import { PianoOctaveComponent } from './components/piano-octave/piano-octave.component';

@NgModule({
  declarations: [
    AppComponent,
    PianoKeyComponent,
    PianoComponent,
    PianoOctaveComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [PianoPlayService],
  bootstrap: [AppComponent]
})
export class AppModule { }