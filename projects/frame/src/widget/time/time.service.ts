import { Injectable, OnDestroy } from '@angular/core';

/**
 * 在 menubar 和 clock 中都需要获取当前时间，故统一使用这里的一个定时器
 */
@Injectable({
  providedIn: 'root'
})
export class TimeService implements OnDestroy {

  now: Date = new Date();

  timer?: any;

  clockUpdateHandler?: Function;

  constructor() {
    // 三百六十分之一秒更新一次，为了 clock 能够绘制动画流畅的秒针
    const time = 1000 / 360;

    this.timer = setInterval(() => {
      this.now = new Date();
      this.clockUpdateHandler && this.clockUpdateHandler();
    }, time);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
