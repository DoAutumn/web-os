import { OverlayModule } from "@angular/cdk/overlay";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { TimeModule } from "../../widget/time/time.module";
import { CtcModule } from "../../widget/ctc/ctc.module";
import { MenuBarComponent } from "./menu-bar.component";




@NgModule({
  declarations: [
    MenuBarComponent
  ],
  imports: [
    CommonModule,
    OverlayModule,
    CtcModule,
    TimeModule,
    NzDividerModule,
    NzDrawerModule,
    NzIconModule,
    NzNotificationModule,
    NzPopoverModule
  ],
  exports: [
    MenuBarComponent
  ]
})
export class MenuBarModule { }
