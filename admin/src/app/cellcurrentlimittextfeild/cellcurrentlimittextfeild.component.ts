import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cellcurrentlimittextfeild',
  templateUrl: './cellcurrentlimittextfeild.component.html',
  styleUrls: ['./cellcurrentlimittextfeild.component.css']
})
export class CellcurrentlimittextfeildComponent implements OnInit {
  data: any;
  Currentlimit: any;

  constructor() { }

  ngOnInit() {
  }
  agInit(params) {
    this.data = params.data;
    this.data.currentLimit=parseFloat(this.data.currentLimit).toFixed(0);
    console.log(this.data.currentLimit);
  }

}
