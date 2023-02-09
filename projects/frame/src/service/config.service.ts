import { Direction } from '@angular/cdk/bidi';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  dir: Direction = 'ltr';

  keyboard: KeyboardMode = 'normal';

  keyupHandler: any;

  constructor() {
    this.keyupHandler = this.documentKeyup.bind(this);
  }

  init() {
    return new Promise((resolve, reject) => {
      const data = getSettingData();
      this.dir = data.dir || this.dir;
      this.keyboard = data.keyboard || this.keyboard;
      this.toggleDir(true);
      this.monopolizeKeyboard(true);
      resolve({});
    });
  }

  toggleDir(init: boolean = false) {
    if (!init) {
      this.dir = this.dir === 'ltr' ? 'rtl' : 'ltr';
      setSettingData('dir', this.dir);
    }
    if (this.dir === 'rtl') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.classList.add('rtl');
    }
    else {
      document.documentElement.removeAttribute('dir');
      document.documentElement.classList.remove('rtl');
    }
  }

  monopolizeKeyboard(init: boolean = false) {
    if (!init) {
      this.keyboard = this.keyboard === 'normal' ? 'monopoly' : 'normal';
      setSettingData('keyboard', this.keyboard);
    }
    if (this.keyboard === 'normal') {
      document.removeEventListener('keyup', this.keyupHandler);
    }
    else {
      document.addEventListener('keyup', this.keyupHandler);
    }
  }

  documentKeyup(event: KeyboardEvent) {
    console.log(event);
  }
}


export type KeyboardMode = 'normal' | 'monopoly';

export type SettingData = {
  theme: string,           // 外观，浅色、深色、自动
  primaryColor: string,    // 主色调
  i18n: string,            // 语言
  dir: Direction,          // 文字方向
  keyboard: KeyboardMode,  // 键盘独占模式
  [key: string]: any
}

export const getSettingData = (): SettingData => {
  return JSON.parse(localStorage.getItem('WEB-OS') || '{}');
}

export const setSettingData = (key: string, value: string) => {
  const data = getSettingData();
  data[key] = value;
  localStorage.setItem('WEB-OS', JSON.stringify(data));
}