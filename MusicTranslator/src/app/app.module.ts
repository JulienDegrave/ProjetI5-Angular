import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PianoPlayService } from './services/piano.play.service';
import { PianoKeyComponent } from './Components/piano-key/piano-key.component';
import { PianoComponent } from './Components/piano/piano.component';
import { PianoOctaveComponent } from './Components/piano-octave/piano-octave.component';
import { MainComponent } from './views/main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { ControlPanelComponent } from './Components/control-panel/control-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    PianoKeyComponent,
    PianoComponent,
    PianoOctaveComponent,
    MainComponent,
    ControlPanelComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule
  ],
  providers: [PianoPlayService],
  bootstrap: [AppComponent]
})
export class AppModule { }