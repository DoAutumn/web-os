import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NotifyService } from '../../../service/notify.service';
import { DockItem } from './dock-item';

@Component({
  selector: 'mz-dock-item',
  templateUrl: './dock-item.component.html',
  styleUrls: ['./dock-item.component.less']
})
export class DockItemComponent implements OnInit {

  @Input() mode: DockItem = new DockItem();

  @Output() mouseenter = new EventEmitter();

  @Output() mouseleave = new EventEmitter();

  loading: boolean = false;

  constructor(private router: Router, private notify: NotifyService) { }

  ngOnInit(): void {
  }

  handleClick() {
    if (this.mode.isMinWin) {
      this.notify.notify('showWindow', this.mode);
      return;
    }

    if (!this.mode.running) {
      // 仅是为了实现启动动画
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.mode.running = true;
      }, 1000);
    }
    this.router.navigate([`/${this.mode.path}`]);
  }

  handleMouseenter() {
    this.mouseenter.emit(this.mode);
  }

  handleMouseleave() {
    this.mouseleave.emit(this.mode);
  }

}
