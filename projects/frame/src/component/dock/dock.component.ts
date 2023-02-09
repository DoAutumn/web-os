import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AppService } from '../../service/app.service';
import { DockItem } from './dock-item/dock-item';

@Component({
  selector: 'mz-dock',
  templateUrl: './dock.component.html',
  styleUrls: ['./dock.component.less']
})
export class DockComponent implements OnInit, AfterViewInit {

  @ViewChild('dock') dockRef?: ElementRef<HTMLDivElement>;

  constructor(public appSer: AppService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.appSer.dockRef = this.dockRef;
  }

  handleMouseenter(mode: DockItem) {
    mode.scale = 1.35;
    mode.margin = 8;
    const index = this.appSer.apps.indexOf(mode);
    let i: number, s: number, m: number;
    for (i = index - 1; i >= 0; i--) {
      s = mode.scale - (index - i) * 0.1;
      m = mode.margin - (index - i) * 0.75;
      s = s < 1 ? 1 : s;
      m = m < 4 ? 4 : m;
      this.appSer.apps[i].scale = s;
      this.appSer.apps[i].margin = m;
    }
    for (i = index + 1; i < this.appSer.apps.length; i++) {
      s = mode.scale - (i - index) * 0.1;
      m = mode.margin - (i - index) * 0.75;
      s = s < 1 ? 1 : s;
      m = m < 4 ? 4 : m;
      this.appSer.apps[i].scale = s;
      this.appSer.apps[i].margin = m;
    }
  }

  handleMouseleave(event: MouseEvent) {
    this.appSer.apps.map(a => {
      a.scale = 1;
      a.margin = 4;
    });
  }

}
