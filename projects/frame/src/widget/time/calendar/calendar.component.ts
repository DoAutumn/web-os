import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TimeService } from '../../time/time.service';

@Component({
  selector: 'mz-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less']
})
export class CalendarComponent implements OnInit, AfterViewInit {

  @ViewChild('cvs') cvs?: ElementRef;

  ctx: CanvasRenderingContext2D | any;

  constructor(private service: TimeService) { }

  year: number = 0;

  month: number = 0;

  date: number = 0;

  weekInfo = [{ name: '日' }, { name: '一' }, { name: '二' }, { name: '三' }, { name: '四' }, { name: '五' }, { name: '六' }];

  monthInfo = [{ name: '一月' }, { name: '二月' }, { name: '三月' }, { name: '四月' }, { name: '五月' }, { name: '六月' }, { name: '七月' }, { name: '八月' }, { name: '九月' }, { name: '十月' }, { name: '十一月' }, { name: '十二月' }];

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.ctx = this.cvs?.nativeElement.getContext('2d');
    this.handleUpdate();
  }

  renderCalendar() {
    let dateList = [];

    // 1号是周几
    let day = new Date(this.year, this.month, 1).getDay();
    for (let i = 0; i < day; i++) {
      dateList.push({ key: null });
    }

    // 当月共多少天
    let date = new Date(this.year, this.month + 1, 0).getDate();
    for (let i = 1; i <= date; i++) {
      dateList.push({ key: i });
    }
    return this.cutDateList(dateList, 7);
  }

  cutDateList(dateList: any, length: number) {
    let newArr = [];
    let resultArr = [];
    let flag = false;
    for (let i = 0, count = 1; i < dateList.length; i++, count++) {
      let item = dateList[i];
      newArr.push(item);
      if (count % length === 0 && !flag) {
        resultArr.push(newArr);
        newArr = [];
      }
      if (count === dateList.length - 1) {
        resultArr.push(newArr);
        flag = true;
      }
    }
    return resultArr;
  }

  drawUI(dateList: any) {
    let w = 300, h = 300;
    this.ctx.clearRect(0, 0, w, h);

    this.ctx.font = '22px fangsong';
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillStyle = 'red';
    this.ctx.fillText(this.monthInfo[this.month].name, 55, 40);
    this.ctx.fillStyle = 'black';

    const rows = dateList.length, cols = 7;

    w -= 30;
    h -= 80;

    const weekH = h / rows - 10;

    for (let i = 0; i < cols; i++) {
      let txt = this.weekInfo[i].name;
      let textPos = { x: w / cols * i + w / cols / 2, y: weekH / 2 };
      this.ctx.fillText(txt, textPos.x + 15, textPos.y + 60);
    }

    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < dateList[x].length; y++) {
        let txt = dateList[x][y].key || '';
        let textPos = { x: w / cols * y + w / cols / 2, y: (h - weekH) / rows * (x + 2) - (h - weekH) / rows / 2 };
        if (txt === this.date) {
          this.ctx.fillStyle = 'red';
          this.ctx.arc(textPos.x + 14, textPos.y + 60, 18, 0, 2 * Math.PI);
          this.ctx.fill();
          this.ctx.fillStyle = 'white';
        } else {
          this.ctx.fillStyle = 'black';
        }
        this.ctx.fillText(txt, textPos.x + 15, textPos.y + 60);
      }
    }
  }

  handleUpdate() {
    const now = this.service.now;
    this.year = now.getFullYear();
    this.month = now.getMonth();
    this.date = now.getDate();
    this.drawUI(this.renderCalendar());
  }

}
