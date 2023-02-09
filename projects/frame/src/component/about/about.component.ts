import { Component, OnInit } from '@angular/core';
import { AppService } from '../../service/app.service';
import { TimeService } from '../../widget/time/time.service';

@Component({
  selector: 'mz-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.less']
})
export class AboutComponent implements OnInit {

  style: any;

  version: string = '';

  constructor(private appSer: AppService, public timeSer: TimeService) { }

  ngOnInit(): void {
    this.style = {
      x: (this.appSer.mainSize.width - 200) / 2,
      y: this.appSer.mainSize.height / 2 - 280,
      w: 200,
      h: 280,
      'text-align': 'center'
    };
    this.version = require('../../../../../package.json').version;
  }

}
