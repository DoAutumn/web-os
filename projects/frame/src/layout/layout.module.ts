import { BidiModule } from "@angular/cdk/bidi";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DockModule } from "../component/dock/dock.module";
import { MenuBarModule } from "../component/menu-bar/menu-bar.module";
import { BlankLayoutComponent } from "./blank-layout/blank-layout.component";
import { WebOSLayoutComponent } from "./webos-layout/webos-layout.component";



@NgModule({
  declarations: [
    WebOSLayoutComponent,
    BlankLayoutComponent
  ],
  imports: [
    BidiModule,
    CommonModule,
    RouterModule,
    MenuBarModule,
    DockModule
  ],
  exports: [
    WebOSLayoutComponent,
    BlankLayoutComponent
  ]
})
export class LayoutModule { }
