import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebOSLayoutComponent } from 'projects/frame';

const routes: Routes = [
  {
    path: '',
    component: WebOSLayoutComponent,
    children: [
      {
        path: 'demo1',
        loadChildren: () => import('./views/demo1/demo1.module').then(m => m.Demo1Module)
      },
      {
        path: 'demo2',
        loadChildren: () => import('./views/demo2/demo2.module').then(m => m.Demo2Module)
      },
      {
        path: 'demo3',
        loadChildren: () => import('./views/demo3/demo3.module').then(m => m.Demo3Module)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
