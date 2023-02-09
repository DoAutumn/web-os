
export type WindowState = 'normal' | 'minimize' | 'maximize';

export class Rect {
  x: number = 0;
  y: number = 0;
  w: number = 0;
  h: number = 0;
  _x: number = 0;
  _y: number = 0;
  _w: number = 0;
  _h: number = 0;
  sx: number = 1;
  sy: number = 1;
  _state?: WindowState;
}