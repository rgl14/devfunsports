import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-celldisabledusedlimit',
  templateUrl: './celldisabledusedlimit.component.html',
  styleUrls: ['./celldisabledusedlimit.component.css']
})
export class CelldisabledusedlimitComponent implements OnInit {
  data: any;
  currentroute: any;

  constructor(private router: Router) {
    this.currentroute=this.router.url
   }
   
  agInit(params){
    this.data=params.data;
  }
  ngOnInit() {
  }

}
