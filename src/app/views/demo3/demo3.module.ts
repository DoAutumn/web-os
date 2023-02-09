import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Demo3Component } from './demo3.component';
import { RouterModule, Routes } from '@angular/router';
import { WindowModule } from 'projects/frame';
import { Sub1Component } from './sub1/sub1.component';
import { Sub2Component } from './sub2/sub2.component';
import { NzButtonModule } from 'ng-zorro-antd/button';


const routes: Routes = [
  {
    path: '',
    component: Demo3Component,
    children: [
      {
        path: '',
        redirectTo: 'sub1',
        pathMatch: 'full'
      },
      {
        path: 'sub1',
        component: Sub1Component,
        data: { inWindow: true }
      },
      {
        path: 'sub2',
        component: Sub2Component,
        data: { inWindow: true }
      }
    ]
  }
];


@NgModule({
  declarations: [
    Demo3Component,
    Sub1Component,
    Sub2Component
  ],
  imports: [
    CommonModule,
    WindowModule,
    NzButtonModule,
    RouterModule.forChild(routes)
  ]
})
export class Demo3Module { }
