import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AppService } from '../../service/app.service';
import { NotifyService } from '../../service/notify.service';
import { TimeService } from '../../widget/time/time.service';

@Component({
  selector: 'mz-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.less']
})
export class MenuBarComponent implements OnInit {

  osVisible: boolean = false;

  currentAppVisible: boolean = false;

  drawerVisible: boolean = false;

  ctcVisible: boolean = false;

  constructor(
    private router: Router,
    private notification: NzNotificationService,
    private notify: NotifyService,
    public appSer: AppService,
    public service: TimeService
  ) { }

  ngOnInit(): void { }

  handleAbout() {
    this.router.navigate(['/about']);
    this.osVisible = false;
  }

  handleAboutApp() {
    this.currentAppVisible = false;
    this.notification.blank(
      '',
      '请根据实际需求自行实现该功能.',
      { nzDuration: 2000, nzClass: 'os-notification' }
    );
  }

  handleExitApp() {
    this.currentAppVisible = false;
    this.notify.notify('exitApp');
  }

  handleCtc(event: MouseEvent) {
    if (this.ctcVisible) {
      this.ctcVisible = false;
      return;
    }
    event.stopPropagation();
    this.ctcVisible = true;
  }

  @HostListener('document:click', ['$event']) documentClick(event: MouseEvent) {
    this.ctcVisible = false;
  }

}
