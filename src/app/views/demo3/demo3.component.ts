import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demo3',
  templateUrl: './demo3.component.html',
  styleUrls: ['./demo3.component.less']
})
export class Demo3Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goTo(path: string) {
    this.router.navigate([`/demo3/${path}`]);
  }

  handleActive() {
    console.log('demo3 active');
  }

  handleInactive() {
    console.log('demo3 inactive');
  }

}
