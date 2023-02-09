import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { WindowModule } from "../window/window.module";
import { AboutComponent } from "./about.component";


@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    WindowModule,
    NzIconModule,
    RouterModule.forChild([{ path: '', component: AboutComponent }])
  ]
})
export class AboutModule { }
