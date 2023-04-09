import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PianoComponent } from './Components/piano/piano.component';
import { LoginComponent } from './views/login/login/login.component';
import { MainComponent } from './views/main/main.component';
import { SignUpComponent } from './views/sign-up/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', component: MainComponent},
  { path:"login", component: LoginComponent},
  { path:"sign-up", component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
