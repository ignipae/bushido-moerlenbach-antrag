import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms"

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AntragComponent} from './antrag/antrag.component';
import {KuendigungComponent} from './kuendigung/kuendigung.component';
import {InputComponent} from './shared/input/input.component';

@NgModule({
  declarations: [
    AppComponent, AntragComponent, KuendigungComponent, InputComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}