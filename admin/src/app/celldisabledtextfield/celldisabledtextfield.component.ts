import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-celldisabledtextfield',
  templateUrl: './celldisabledtextfield.component.html',
  styleUrls: ['./celldisabledtextfield.component.css']
})
export class CelldisabledtextfieldComponent implements OnInit {

  data:any;
  currentroute: string;
  header="";
  constructor(private router: Router) {
    this.currentroute=this.router.url
   }

  agInit(params){
    this.data=params.data;
    this.header=params.colDef.headerName
  }
  ngOnInit() {
    
  }
  getvalue(data:any){
    console.log(data)
  }

}
