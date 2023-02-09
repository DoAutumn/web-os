import { Rect } from "./window-types";

export class Drag {

  downX: number = 0;
  downY: number = 0;

  rect: Rect = new Rect();

  mousemoveHandler: any;
  mouseupHandler: any;

  constructor(rect: Rect) {
    this.rect = rect;
    this.mousemoveHandler = this.handleMousemove.bind(this);
    this.mouseupHandler = this.handleMouseup.bind(this);
  }

  handleMousedown(event: MouseEvent) {
    this.downX = event.clientX;
    this.downY = event.clientY;
    this.rect._x = this.rect.x;
    this.rect._y = this.rect.y;

    document.addEventListener('mousemove', this.mousemoveHandler);
    document.addEventListener('mouseup', this.mouseupHandler);
  }

  handleMousemove(event: MouseEvent) {
    let x = event.clientX, y = event.clientY;
    if (x < 0) x = 0;
    if (x > window.innerWidth) x = window.innerWidth;
    if (y < 0) y = 0;
    if (y > window.innerHeight) y = window.innerHeight;
    let distX = x - this.downX;
    let distY = y - this.downY;
    this.rect.x = this.rect._x + distX;
    this.rect.y = this.rect._y + distY;
    if (this.rect.y <= 0) {
      this.rect.y = 0;
    }
  }

  handleMouseup(event: MouseEvent) {
    document.removeEventListener('mousemove', this.mousemoveHandler);
    document.removeEventListener('mouseup', this.mouseupHandler);
  }
}