import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../service/theme.service';

@Component({
  selector: 'mz-ctc',
  templateUrl: './ctc.component.html',
  styleUrls: ['./ctc.component.less']
})
export class CtcComponent implements OnInit {

  constructor(public themeSer: ThemeService) { }

  ngOnInit(): void {
  }

  handleToggleColor(event: MouseEvent, color: string) {
    event.stopPropagation();
    this.themeSer.setPrimaryColor(color);
  }

}
