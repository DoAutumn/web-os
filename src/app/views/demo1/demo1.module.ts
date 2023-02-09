import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Demo1Component } from './demo1.component';
import { RouterModule, Routes } from '@angular/router';
import { WindowModule } from 'projects/frame';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { Sub1Component } from './sub1/sub1.component';
import { Sub2Component } from './sub2/sub2.component';
import { NzButtonModule } from 'ng-zorro-antd/button';


const routes: Routes = [
  {
    path: '',
    component: Demo1Component
  },
  {
    path: 'sub1',
    component: Sub1Component
  },
  {
    path: 'sub2',
    component: Sub2Component
  }
];


@NgModule({
  declarations: [
    Demo1Component,
    Sub1Component,
    Sub2Component
  ],
  imports: [
    CommonModule,
    WindowModule,
    NzTableModule,
    NzDividerModule,
    NzButtonModule,
    RouterModule.forChild(routes)
  ]
})
export class Demo1Module { }
