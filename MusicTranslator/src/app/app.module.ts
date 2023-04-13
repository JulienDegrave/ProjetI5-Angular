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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MessageBoxComponent } from './Components/control-panel/message-box/message-box.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SessionInterceptor } from './interceptors/auth/auth.interceptor';
import { LoginComponent } from './views/login/login/login.component';
import { UserService } from './services/user/user.service';
import { SignUpComponent } from './views/sign-up/sign-up/sign-up.component';
import {MatButtonModule} from '@angular/material/button';
import { HarmonicaComponent } from './Components/harmonica/harmonica/harmonica.component';
import { HarmonicaHoleComponent } from './Components/harmonica/harmonica-hole/harmonica-hole.component';
import {MatIconModule} from '@angular/material/icon';




@NgModule({
  declarations: [
    AppComponent,
    PianoKeyComponent,
    PianoOctaveComponent,
    MainComponent,
    ControlPanelComponent,
    MessageBoxComponent, 
    PianoComponent, 
    LoginComponent, 
    SignUpComponent, 
    HarmonicaComponent, 
    HarmonicaHoleComponent
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
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:SessionInterceptor,
      multi:true
    },
    {
      provide:PianoPlayService
    },
    {
      provide:UserService
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    MessageBoxComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }