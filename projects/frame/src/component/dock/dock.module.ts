import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { DockComponent } from './dock.component';
import { DockItemComponent } from './dock-item/dock-item.component';



@NgModule({
  declarations: [
    DockComponent,
    DockItemComponent
  ],
  imports: [
    CommonModule,
    NzToolTipModule
  ],
  exports: [
    DockComponent
  ]
})
export class DockModule { }
