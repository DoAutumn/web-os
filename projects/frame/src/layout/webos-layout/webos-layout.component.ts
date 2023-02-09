import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { DockItem } from '../../component/dock/dock-item/dock-item';
import { AppService } from '../../service/app.service';
import { ConfigService } from '../../service/config.service';
import { NotifyService } from '../../service/notify.service';
import { cacheRouters } from '../../SimpleReuseStrategy';

@Component({
  selector: 'mz-webos-layout',
  templateUrl: './webos-layout.component.html',
  styleUrls: ['./webos-layout.component.less']
})
export class WebOSLayoutComponent implements OnInit, AfterViewInit {

  @ViewChild('main') main?: ElementRef;

  @ViewChild('container', { read: ViewContainerRef }) container?: ViewContainerRef;

  routeSnapshotURL: string = '';


  constructor(private appSer: AppService, private notify: NotifyService, private router: Router, private route: ActivatedRoute, public configSer: ConfigService) { }

  ngOnInit(): void {
    this.handleRefresh();
    this.handleListener();
    this.handleRouterEvent();
    this.handleSetCurrentApp((this.route as any)._routerState.snapshot.url);
  }


  handleListener() {
    this.notify.get('closeWindow').subscribe((res: string) => {
      this.routeSnapshotURL = res;

      const win = this.appSer.winMapping[this.routeSnapshotURL];
      delete this.appSer.winMapping[this.routeSnapshotURL];

      const list = Object.values(this.appSer.winMapping);

      this.appSer.apps.map(app => {
        const win = list.find(item => app.path && item.routePath.indexOf(app.path) !== -1);
        !win && (app.running = false);
      });

      const snapshots = cacheRouters();
      if (snapshots[this.routeSnapshotURL]) {
        this.container?.remove(this.container?.indexOf(snapshots[this.routeSnapshotURL].componentRef.hostView));

        delete snapshots[this.routeSnapshotURL];
        this.routeSnapshotURL = '';
        return;
      }

      win.ngOnDestroy();
      this.handleNavigate();
    });

    this.notify.get('minWindow').subscribe((res: any) => {
      const { routePath, routeSnapshotURL, title, image } = res;

      this.appSer.apps.push(new DockItem().init({ name: title, iconPath: image, path: routePath, routeSnapshotURL: routeSnapshotURL, isMinWin: true }));

      if (cacheRouters()[routeSnapshotURL]) {
        return;
      }

      this.handleNavigate();
    });

    this.notify.get('showWindow').subscribe(dockItem => {
      this.router.navigate([dockItem.path]);

      dockItem.disappear();
      setTimeout(() => {
        this.appSer.apps.splice(this.appSer.apps.indexOf(dockItem), 1);
      }, 200);
    });

    this.notify.get('exitApp').subscribe(() => {
      const path = this.appSer.currentApp?.path || '';
      if (!path) return;

      const snapshots = cacheRouters();

      Object.values(this.appSer.winMapping)
        .filter(win => win.routePath.indexOf(path) !== -1).map(win => {
          const snapshotURL = win.routeSnapshotURL;
          delete this.appSer.winMapping[snapshotURL];
          if (snapshots[snapshotURL]) {
            this.container?.remove(this.container.indexOf(snapshots[snapshotURL].componentRef.hostView));
            delete snapshots[snapshotURL];
          } else {
            this.routeSnapshotURL = snapshotURL;
          }
          win.ngOnDestroy();
        });

      this.appSer.currentApp && (this.appSer.currentApp.running = false);

      this.handleNavigate();
    });
  }


  handleRouterEvent() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: any) => {
        this.handleSetCurrentApp(event.url);

        const snapshots = cacheRouters();
        // console.log(snapshots);
        this.routeSnapshotURL && delete snapshots[this.routeSnapshotURL] && (this.routeSnapshotURL = '');

        Object.keys(snapshots).map((key: string) => {
          const snapshot = snapshots[key];
          const win = this.appSer.winMapping[key];

          if (!snapshot) {
            win && win.handleActive();
            win && win.state === 'minimize' && win.handleShow();
            return;
          }

          if (snapshot.inserted) return;
          snapshot.inserted = true;

          win && win.handleInactive();

          !snapshot.route.value.data.value.inWindow && this.container?.insert(snapshot.componentRef.hostView);
        });
      });
  }


  handleNavigate() {
    const list = Object.values(this.appSer.winMapping).filter(win => win.state !== 'minimize');
    const url = list.length ? list[list.length - 1].routePath : '/';
    this.router.navigate([url]);
  }


  handleSetCurrentApp(url: string) {
    this.appSer.currentApp = url === '/' ? null : this.appSer.apps.filter(app => app.path).find(app => url.indexOf(app.path) !== -1);
  }


  /**
   * 刷新页面时可以有两种处理方式：
   * 1、刷新页面进入根路由
   * 2、刷新页面保留当前路由对应的窗口
   */
  handleRefresh() {
    // 确保刷新页面时进入根路由，所有app均为未启动的状态
    // if (location.hash !== '#/') {
    //   location.href = location.origin;
    // }

    // 刷新页面时，保留当前路由对应的窗口，同时将dock中对应的dockItem设置为启动状态
    const app = this.appSer.apps.find(item => item.path && (this.route as any)._routerState.snapshot.url.indexOf(item.path) !== -1);
    app && (app.running = true);
  }



  ngAfterViewInit(): void {
    this.handleResize();

    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }

  handleResize() {
    this.appSer.mainSize.width = this.main?.nativeElement.offsetWidth;
    this.appSer.mainSize.height = this.main?.nativeElement.offsetHeight;
  }

}
