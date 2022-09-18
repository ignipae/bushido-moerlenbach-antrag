import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AntragComponent } from "./antrag/antrag.component";
import { KuendigungComponent } from "./kuendigung/kuendigung.component";
import { InputComponent } from "./shared/input/input.component";
import "@ui5/webcomponents/dist/DatePicker";
//import "@ui5/webcomponents/dist/json-imports/i18n.js";
import "@ui5/webcomponents/dist/Assets.js";



@NgModule({
  declarations: [
    AppComponent,
    AntragComponent,
    KuendigungComponent,
    InputComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
