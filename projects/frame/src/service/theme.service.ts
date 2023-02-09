import { Injectable } from '@angular/core';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { getSettingData, setSettingData } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  theme: string = 'light';

  primaryColor: string = '#1890ff';

  primaryColors = ['#f5222d', '#fa541c', '#faad14', '#13c2c2', '#52c41a', '#1890ff', '#2f54eb', '#722ed1'];

  constructor(private nzConfigSer: NzConfigService) { }

  init() {
    return new Promise((resolve, reject) => {
      const data = getSettingData();
      this.theme = data.theme || this.theme;
      this.primaryColor = data.primaryColor || this.primaryColor;
      this.nzConfigSer.set('theme', { primaryColor: this.primaryColor });
      resolve({});
    });
  }

  setPrimaryColor(color: string) {
    this.primaryColor = color;
    this.nzConfigSer.set('theme', { primaryColor: color });
    setSettingData('primaryColor', color);
  }
}