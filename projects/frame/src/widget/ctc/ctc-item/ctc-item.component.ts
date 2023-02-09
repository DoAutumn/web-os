import { Component, Input, OnInit } from '@angular/core';
import { ConfigService, getSettingData } from '../../../service/config.service';

@Component({
  selector: 'mz-ctc-item',
  templateUrl: './ctc-item.component.html',
  styleUrls: ['./ctc-item.component.less']
})
export class CtcItemComponent implements OnInit {

  @Input() icon: string = '';

  @Input() alias: string = '';

  @Input() key: string = '';

  @Input() openValue: string = '';


  get open() {
    return this.key === 'i18n' ? true : this.key === 'fullscreen' ? !!document.fullscreenElement : getSettingData()[this.key] === this.openValue;
  }

  constructor(private configSer: ConfigService) { }

  ngOnInit(): void {
  }

  handleClick(event: MouseEvent) {
    switch (this.key) {
      case 'dir':
        this.configSer.toggleDir();
        break;
      case 'fullscreen':
        document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
        break;
      case 'keyboard':
        // 您已开启键盘独占模式，在此模式下，WebOS将会阻断操作系统的部分快捷键，如 command + w、command + tab 等。
        // 查看更多快捷键。
        event.stopPropagation();
        this.configSer.monopolizeKeyboard();
        break;
    }
  }

}
