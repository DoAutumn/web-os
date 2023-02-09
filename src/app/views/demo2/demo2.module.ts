import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WindowModule } from 'projects/frame';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { Demo2Component } from './demo2.component';



@NgModule({
  declarations: [
    Demo2Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WindowModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzCheckboxModule,
    RouterModule.forChild([{ path: '', component: Demo2Component }])
  ]
})
export class Demo2Module { }
