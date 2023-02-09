import { OverlayModule } from "@angular/cdk/overlay";
import { registerLocaleData } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, zh_CN } from "ng-zorro-antd/i18n";
import zh from '@angular/common/locales/zh';
import { AppInitializerProvider } from "projects/frame";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";


registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    OverlayModule,
    AppRoutingModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    ...AppInitializerProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
