import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { AppService } from '../../service/app.service';
import { NotifyService } from '../../service/notify.service';
import { getRouteSnapshotURL } from '../../SimpleReuseStrategy';
import { Drag } from './window-helper';
import { Rect, WindowState } from './window-types';

@Component({
  selector: 'mz-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.less']
})
export class WindowComponent implements OnInit, OnDestroy {

  @Input() mzTitle?: string;

  @Input() minimizable: boolean = true;

  @Input() maximizable: boolean = true;

  /** 是否显示为毛玻璃效果 */
  @Input() frosted: boolean = false;

  /** 外部设置样式 */
  @Input() style: any;

  /** 窗口重新处于活动状态的事件 */
  @Output() active = new EventEmitter();

  /** 窗口切换为非活动状态的事件 */
  @Output() inactive = new EventEmitter();

  @ViewChild('win') win?: ElementRef;

  rect: Rect = new Rect();

  drag: Drag = new Drag(this.rect);

  state: WindowState = 'normal';

  inAnimation: boolean = false;

  inactiveFlag: boolean = false;

  routePath: string = '';
  routeSnapshotURL: string = '';

  get winStyle() {
    return this.state === 'maximize' ?
      { left: 0, top: 0, width: '100%', height: '100%', transform: 'scale(1,1)', opacity: 1, ...this.style }
      :
      this.state === 'minimize' ?
        { left: this.rect.x + 'px', top: this.rect.y + 'px', width: this.rect.w + 'px', height: this.rect.h + 'px', transform: `scale(${this.rect.sx},${this.rect.sy})`, opacity: 0, ...this.style }
        :
        { left: this.rect.x + 'px', top: this.rect.y + 'px', width: this.rect.w + 'px', height: this.rect.h + 'px', transform: 'scale(1,1)', opacity: 1, ...this.style };
  }

  constructor(private appSer: AppService, private notify: NotifyService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.style) {
      this.rect.x = this.style.x;
      this.rect.y = this.style.y;
      this.rect.w = this.style.w;
      this.rect.h = this.style.h;
    }
    else {
      this.rect.x = this.appSer.offsetX += 25;
      this.rect.y = this.appSer.offsetY += 25;
      this.rect.w = 800;
      this.rect.h = 600;
    }

    this.routePath = (this.route as any)._routerState.snapshot.url;
    this.routeSnapshotURL = getRouteSnapshotURL(this.route);

    this.appSer.winMapping[this.routeSnapshotURL] = this;

    this.handleActive();
  }

  handleClick(event: MouseEvent) {
    this.router.navigate([this.routePath]);
  }

  handleClose(event: MouseEvent) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.notify.notify('closeWindow', this.routeSnapshotURL);
  }

  handleMax(event: MouseEvent) {
    this.state = this.state === 'maximize' ? 'normal' : 'maximize';
    this.handleAnimation();
  }

  handleMin(event: MouseEvent) {
    event.preventDefault();
    event.stopImmediatePropagation();
    html2canvas(this.win?.nativeElement).then(canvas => {
      this.rect._state = this.state;
      this.rect._x = this.rect.x;
      this.rect._y = this.rect.y;
      const rect = this.appSer.dockRef?.nativeElement.getBoundingClientRect() || { right: 0, top: 0 };
      this.rect.x = rect.right - 4 - this.rect.w / 2;
      this.rect.y = rect.top - this.rect.h / 2;
      this.rect.sx = 30 / this.rect.w;
      this.rect.sy = 30 / this.rect.h;

      setTimeout(() => {
        this.notify.notify('minWindow', { routePath: this.routePath, routeSnapshotURL: this.routeSnapshotURL, image: canvas.toDataURL('image/png'), title: this.mzTitle });
      }, 300);

      this.state = 'minimize';
      this.handleAnimation();
    });
  }

  handleShow() {
    this.rect.x = this.rect._x;
    this.rect.y = this.rect._y;
    this.handleAnimation();
    this.state = this.rect._state || 'normal';
  }

  ngOnDestroy(): void {
    this.appSer.offsetX -= 25;
    this.appSer.offsetY -= 25;
    delete this.appSer.winMapping[this.routeSnapshotURL];
  }



  handleAnimation() {
    this.inAnimation = true;
    setTimeout(() => {
      this.inAnimation = false;
    }, 300);
  }

  handleActive() {
    this.inactiveFlag = false;
    this.active.emit();
  }

  handleInactive() {
    this.inactiveFlag = true;
    this.inactive.emit();
  }

}
