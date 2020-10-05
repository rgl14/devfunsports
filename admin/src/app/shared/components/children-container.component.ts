import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-children-container',
  template: `<router-outlet></router-outlet>`,
  styles: []
})
export class ChildrenContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
