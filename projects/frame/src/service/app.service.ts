import { HttpClient } from '@angular/common/http';
import { Injectable, ElementRef, APP_INITIALIZER } from '@angular/core';
import { Router, RouteReuseStrategy } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DockItem } from '../component/dock/dock-item/dock-item';
import { WindowComponent } from '../component/window/window.component';
import { SimpleReuseStrategy } from '../SimpleReuseStrategy';
import { ConfigService } from './config.service';
import { ThemeService } from './theme.service';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  apps: DockItem[] = [];

  currentApp?: DockItem | null;

  winMapping: { [key: string]: WindowComponent } = {};

  offsetX: number = 100;
  offsetY: number = 100;
  mainSize = { width: 0, height: 0 };

  dockRef?: ElementRef<HTMLDivElement>;


  constructor(private http: HttpClient, private router: Router) {
    const routes = this.router.config[0]?.children;
    routes?.push({
      path: 'about',
      loadChildren: () => import('../component/about/about.module').then(m => m.AboutModule)
    });

    this.mainSize.width = window.innerWidth;
    this.mainSize.height = window.innerHeight - 25 - 45;
  }

  load() {
    return new Promise((resolve, reject) => {
      this.http.get('./assets/app.properties').subscribe({
        next: (res: any) => {
          this.initApps(res.apps);
          resolve(res);
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }

  private initApps(value: any) {
    if (!value || !value.length) return;
    value.map((app: any) => {
      this.apps.push(new DockItem().init(app));
    });
  }
}


export const AppInitializerProvider = [
  {
    provide: APP_INITIALIZER,
    useFactory: (ser: AppService) => () => {
      return ser.load();
    },
    deps: [AppService],
    multi: true
  },
  {
    provide: APP_INITIALIZER,
    useFactory: (ser: ThemeService) => () => {
      return ser.init();
    },
    deps: [ThemeService],
    multi: true
  },
  {
    provide: APP_INITIALIZER,
    useFactory: (ser: ConfigService) => () => {
      return ser.init();
    },
    deps: [ConfigService],
    multi: true
  },
  {
    provide: RouteReuseStrategy,
    useClass: SimpleReuseStrategy
  },
  NzNotificationService
];