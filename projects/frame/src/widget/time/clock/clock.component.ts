import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TimeService } from '../time.service';

@Component({
  selector: 'mz-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.less']
})
export class ClockComponent implements OnInit, AfterViewInit {

  @ViewChild('cvs') cvs?: ElementRef;

  ctx: CanvasRenderingContext2D | any;

  constructor(private service: TimeService) {
    this.service.clockUpdateHandler = () => {
      this.handleUpdate();
    };
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.ctx = this.cvs?.nativeElement.getContext('2d');
    this.handleUpdate();
  }

  drawPanel() {
    this.ctx.translate(150, 150);
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 130, 0, 2 * Math.PI);
    this.ctx.fillStyle = "white";
    this.ctx.fill();
  }

  drawNumOfHour() {
    this.ctx.beginPath();
    this.ctx.font = "30px fangsong";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillStyle = "black";
    for (let i = 0; i < 12; i++) {
      this.ctx.fillText(
        i + 1,
        108 * Math.cos(((i * 30 - 60) * Math.PI) / 180),
        108 * Math.sin(((i * 30 - 60) * Math.PI) / 180)
      );
    }
  }

  drawCenterPoint() {
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 8, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.fillStyle = "gray";
    this.ctx.arc(0, 0, 5, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  drawHourHand(hour: number, minute: number) {
    const angle = ((2 * Math.PI) / 12) * hour + (((1 / 6) * Math.PI) / 60) * minute;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.lineWidth = 5;
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = "black";
    this.ctx.rotate(angle);
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, -50);
    this.ctx.stroke();
    this.ctx.restore();
  }

  drawMinuteHand(minute: number) {
    const angle = ((2 * Math.PI) / 60) * minute;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = "black";
    this.ctx.rotate(angle);
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, -70);
    this.ctx.stroke();
    this.ctx.restore();
  }

  drawSecondHand(second: number, millisecond: number) {
    const angle = ((2 * Math.PI) / 60) * second + ((2 * Math.PI) / 60 / 1000) * millisecond;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = "red";
    this.ctx.rotate(angle);
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, -90);
    this.ctx.stroke();
    this.ctx.restore();
  }

  handleUpdate() {
    const now = this.service.now;
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();
    this.ctx.clearRect(0, 0, 600, 600);
    this.ctx.save();
    this.drawPanel();
    this.drawNumOfHour();
    this.drawSecondHand(seconds, milliseconds);
    this.drawMinuteHand(minutes);
    this.drawHourHand(hours, minutes);
    this.drawCenterPoint();
    this.ctx.restore();
  }

}
