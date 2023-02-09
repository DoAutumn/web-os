import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.less']
})
export class Demo1Component implements OnInit {

  listOfData: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.listOfData = new Array(100).fill(0).map((_, index) => ({
      id: index,
      name: `Edward King ${index}`,
      age: 32,
      address: `London, Park Lane no. ${index}`,
      disabled: index % 2 === 0
    }));
  }

  goTo(path: string) {
    this.router.navigate([`/demo1/${path}`]);
  }

  handleActive() {
    console.log('demo1 active');
  }

  handleInactive() {
    console.log('demo1 inactive');
  }

}
