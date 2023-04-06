import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { PianoPlayService } from './services/piano/piano.play.service';
import { PianoKeyComponent } from './Components/piano-key/piano-key.component';
import { PianoComponent } from './Components/piano/piano.component';
import { PianoOctaveComponent } from './Components/piano-octave/piano-octave.component';
import { MainComponent } from './views/main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { ControlPanelComponent } from './Components/control-panel/control-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageBoxComponent } from './Components/control-panel/message-box/message-box.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';




@NgModule({
  declarations: [
    AppComponent,
    PianoKeyComponent,
    PianoOctaveComponent,
    MainComponent,
    ControlPanelComponent,
    MessageBoxComponent, 
    PianoComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    BrowserAnimationsModule,
    CommonModule
  ],
  providers: [PianoPlayService],
  bootstrap: [AppComponent],
  entryComponents: [
    MessageBoxComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }