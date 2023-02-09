import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { CtcComponent } from './ctc.component';
import { CtcItemComponent } from './ctc-item/ctc-item.component';



@NgModule({
  declarations: [
    CtcComponent,
    CtcItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzIconModule,
    NzDropDownModule,
    NzRadioModule
  ],
  exports: [
    CtcComponent
  ]
})
export class CtcModule { }
