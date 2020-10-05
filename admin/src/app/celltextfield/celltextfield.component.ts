import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-celltextfield',
  templateUrl: './celltextfield.component.html',
  styleUrls: ['./celltextfield.component.css']
})
export class CelltextfieldComponent implements OnInit {

  data:any;
  currentroute: string;
  
  constructor(private router: Router) {
    this.currentroute=this.router.url
   }

  agInit(params){
    this.data=params.data;
  }
  ngOnInit() {
    
  }
  getvalue(data:any){
    console.log(data)
  }

}
